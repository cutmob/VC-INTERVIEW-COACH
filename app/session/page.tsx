"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { UPLOAD_ACCEPT, UPLOAD_MAX_SIZE_MB } from "@/lib/constants";
import type { VoiceGender } from "@/lib/constants";

type StartSessionResponse = {
  client_secret?: string;
  model?: string;
  remaining_seconds?: number;
  error?: string;
};

const ACCEPTED_EXTENSIONS = Object.values(UPLOAD_ACCEPT).flat();
const ACCEPTED_MIME = Object.keys(UPLOAD_ACCEPT);
const MAX_BYTES = UPLOAD_MAX_SIZE_MB * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function SessionInner() {
  const params = useSearchParams();
  const initial = useMemo(() => params.get("token") ?? "", [params]);
  const [token, setToken] = useState(initial);
  const [voice, setVoice] = useState<VoiceGender>("male");
  const [status, setStatus] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const endSession = useCallback(() => {
    if (timerRef.current) { window.clearTimeout(timerRef.current); timerRef.current = null; }
    if (countdownRef.current) { window.clearInterval(countdownRef.current); countdownRef.current = null; }
    micStreamRef.current?.getTracks().forEach((t: MediaStreamTrack) => t.stop());
    micStreamRef.current = null;
    dcRef.current = null;
    pcRef.current?.close();
    pcRef.current = null;
    setRunning(false);
    setSecondsLeft(null);
    setStatus("Session complete.");
    setUploadStatus(null);
  }, []);

  useEffect(() => endSession, [endSession]);

  const sendImage = useCallback(async (file: File) => {
    const dc = dcRef.current;
    if (!dc || dc.readyState !== "open") {
      setUploadStatus("Session not ready — start a session first.");
      return;
    }
    if (!ACCEPTED_MIME.includes(file.type)) {
      setUploadStatus(`Unsupported format. Use: ${ACCEPTED_EXTENSIONS.join(", ")}`);
      return;
    }
    if (file.size > MAX_BYTES) {
      setUploadStatus(`File too large. Max ${UPLOAD_MAX_SIZE_MB}MB.`);
      return;
    }
    try {
      setUploadStatus(`Sending ${file.name}…`);
      const dataUrl = await fileToBase64(file);
      const event = JSON.stringify({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [
            { type: "input_image", image_url: dataUrl },
            { type: "input_text", text: `I've uploaded a pitch document: ${file.name}. Please review what you see and incorporate it into your evaluation.` },
          ],
        },
      });
      dc.send(event);
      // Prompt a response about the uploaded material
      dc.send(JSON.stringify({ type: "response.create" }));
      setUploadStatus(`Sent: ${file.name}`);
      setTimeout(() => setUploadStatus(null), 3000);
    } catch {
      setUploadStatus("Failed to process file.");
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) sendImage(file);
    e.target.value = "";
  }, [sendImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) sendImage(file);
  }, [sendImage]);

  const start = async () => {
    setStatus("Validating token…");
    const res = await fetch("/api/start-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, voice }),
    });
    const data = (await res.json()) as StartSessionResponse;
    if (!res.ok || !data.client_secret || !data.model) {
      setStatus(data.error ?? "Unable to start session");
      return;
    }
    try {
      setStatus("Requesting microphone access…");
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      const pc = new RTCPeerConnection();
      micStreamRef.current = media;
      pcRef.current = pc;
      media.getTracks().forEach((track) => pc.addTrack(track, media));

      // Create data channel for sending events (images, text)
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      pc.ontrack = (event) => {
        const el = remoteAudioRef.current;
        if (el) el.srcObject = event.streams[0];
      };
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      setStatus("Connecting to coach…");
      const sdpRes = await fetch(
        `https://api.openai.com/v1/realtime?model=${encodeURIComponent(data.model)}`,
        { method: "POST", body: offer.sdp, headers: { Authorization: `Bearer ${data.client_secret}`, "Content-Type": "application/sdp" } }
      );
      if (!sdpRes.ok) throw new Error("Unable to establish realtime connection");
      await pc.setRemoteDescription({ type: "answer", sdp: await sdpRes.text() });
      const serverSeconds = data.remaining_seconds ?? 420;
      setRunning(true);
      setSecondsLeft(serverSeconds);
      setStatus(null);
      timerRef.current = window.setTimeout(endSession, serverSeconds * 1000);
      countdownRef.current = window.setInterval(() => {
        setSecondsLeft((s: number | null) => (s !== null && s > 0 ? s - 1 : 0));
      }, 1000);
    } catch (err) {
      endSession();
      setStatus(err instanceof Error ? err.message : "Failed to start session");
    }
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <SiteShell>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-0 py-6 sm:py-10">
        <div className="relative overflow-hidden rounded-2xl border border-wood-200 bg-wood-100 p-5 sm:p-9 shadow-sm dark:bg-white/[0.04] dark:border-white/10 dark:backdrop-blur-sm dark:shadow-none">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(199,125,77,0.4), transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px hidden dark:block"
            style={{ background: "linear-gradient(90deg, transparent, rgba(196,122,74,0.6), transparent)" }}
          />

          <div className="mb-8 border-b border-wood-200 pb-8 dark:border-white/[0.07]">
            <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-wood-500 dark:text-wood-300">
              Session Room
            </p>
            <h1 className="heading-display text-2xl sm:text-3xl text-wood-900 dark:text-wood-900">Live Pitch Room</h1>
          </div>

          {/* Timer */}
          {running && secondsLeft !== null && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-wood-300 bg-wood-200/50 px-5 py-3 dark:border-wood-400/20 dark:bg-wood-400/10">
              <span className="text-sm font-medium text-wood-700 dark:text-wood-300">Time remaining</span>
              <span className="font-mono text-lg font-bold text-wood-900 dark:text-wood-300">{fmt(secondsLeft)}</span>
            </div>
          )}

          {/* Access key */}
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium text-wood-700 dark:text-wood-600">Access key</label>
            <input
              value={token}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value.toUpperCase())}
              placeholder="PCH-XXXX-XXXX"
              disabled={running}
              className="w-full rounded-xl border border-wood-300 bg-wood-50 px-4 py-3 font-mono text-sm text-wood-900 placeholder-wood-400 transition focus:border-wood-400 focus:outline-none focus:ring-1 focus:ring-wood-400/30 disabled:opacity-50 dark:border-white/10 dark:bg-black/30 dark:text-wood-800 dark:placeholder-[#524E4B] dark:focus:border-wood-400/50 dark:focus:ring-wood-400/30"
            />
          </div>

          {/* Voice toggle */}
          <div className="mb-6 space-y-2">
            <label className="block text-sm font-medium text-wood-700 dark:text-wood-600">Interviewer voice</label>
            <div className="flex gap-2">
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  disabled={running}
                  onClick={() => setVoice(g)}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition disabled:opacity-50 ${
                    voice === g
                      ? "border-wood-400 bg-wood-400 text-white shadow-sm dark:border-wood-400 dark:bg-wood-400 dark:text-white"
                      : "border-wood-300 bg-wood-50 text-wood-600 hover:border-wood-400 hover:text-wood-900 dark:border-white/10 dark:bg-white/5 dark:text-wood-700 dark:hover:border-white/20 dark:hover:text-wood-900"
                  }`}
                >
                  {g === "male" ? "Male" : "Female"}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={start}
              disabled={running || !token.trim()}
              className="flex-1 rounded-full bg-wood-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(199,125,77,0.3)] transition hover:bg-wood-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-wood-400 dark:shadow-[0_0_20px_rgba(196,122,74,0.3)] dark:hover:bg-wood-300"
            >
              {running ? "Session Active" : "Start Session"}
            </button>
            <button
              onClick={endSession}
              disabled={!running}
              className="rounded-full border border-wood-300 bg-wood-50 px-6 py-3 text-sm font-semibold text-wood-600 transition hover:border-wood-400 hover:text-wood-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-wood-700 dark:hover:border-white/20 dark:hover:text-wood-900"
            >
              Stop
            </button>
          </div>

          {status && (
            <p className="mt-5 font-mono text-xs text-wood-500 dark:text-[#6B6360]">{status}</p>
          )}

          <audio ref={remoteAudioRef} autoPlay className="hidden" />
        </div>

        {/* Upload panel — only visible during active session */}
        {running && (
          <div
            className="mt-4 rounded-2xl border border-wood-200 bg-wood-100 p-4 sm:p-6 shadow-sm dark:bg-white/[0.04] dark:border-white/10"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-wood-700 dark:text-wood-600">Pitch Materials</p>
              <span
                className="cursor-help text-xs text-wood-400 dark:text-wood-700 underline decoration-dotted underline-offset-2"
                title={`Upload images of pitch decks, financials, or product screenshots. Accepted: ${ACCEPTED_EXTENSIONS.join(", ")}. Max ${UPLOAD_MAX_SIZE_MB}MB per file. The AI will review and reference uploaded materials in its evaluation.`}
              >
                What can I upload?
              </span>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-wood-300 bg-wood-50/50 px-4 py-6 text-sm text-wood-500 transition hover:border-wood-400 hover:bg-wood-50 hover:text-wood-700 dark:border-white/10 dark:bg-white/[0.02] dark:text-wood-700 dark:hover:border-white/20 dark:hover:text-wood-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span>Drop an image here or click to upload</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_MIME.join(",")}
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload pitch material"
            />

            {uploadStatus && (
              <p className="mt-3 font-mono text-xs text-wood-500 dark:text-[#6B6360]">{uploadStatus}</p>
            )}
          </div>
        )}
      </main>
    </SiteShell>
  );
}

export default function SessionPage() {
  return (
    <Suspense fallback={null}>
      <SessionInner />
    </Suspense>
  );
}
