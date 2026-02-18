"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { SiteShell } from "@/components/site-shell";

type StartSessionResponse = { client_secret?: string; model?: string; error?: string };
const SESSION_MS = 7 * 60 * 1000;

function SessionInner() {
  const params = useSearchParams();
  const initial = useMemo(() => params.get("token") ?? "", [params]);
  const [token, setToken] = useState(initial);
  const [status, setStatus] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const endSession = () => {
    if (timerRef.current) { window.clearTimeout(timerRef.current); timerRef.current = null; }
    if (countdownRef.current) { window.clearInterval(countdownRef.current); countdownRef.current = null; }
    micStreamRef.current?.getTracks().forEach((t: MediaStreamTrack) => t.stop());
    micStreamRef.current = null;
    pcRef.current?.close();
    pcRef.current = null;
    setRunning(false);
    setSecondsLeft(null);
    setStatus("Session complete.");
  };

  useEffect(() => endSession, []);

  const start = async () => {
    setStatus("Validating token...");
    const res = await fetch("/api/start-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = (await res.json()) as StartSessionResponse;
    if (!res.ok || !data.client_secret || !data.model) {
      setStatus(data.error ?? "Unable to start session");
      return;
    }
    try {
      setStatus("Requesting microphone access...");
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      const pc = new RTCPeerConnection();
      micStreamRef.current = media;
      pcRef.current = pc;
      media.getTracks().forEach((track) => pc.addTrack(track, media));
      pc.ontrack = (event) => {
        const el = remoteAudioRef.current;
        if (el) el.srcObject = event.streams[0];
      };
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      setStatus("Connecting to coach...");
      const sdpRes = await fetch(
        `https://api.openai.com/v1/realtime?model=${encodeURIComponent(data.model)}`,
        { method: "POST", body: offer.sdp, headers: { Authorization: `Bearer ${data.client_secret}`, "Content-Type": "application/sdp" } }
      );
      if (!sdpRes.ok) throw new Error("Unable to establish realtime connection");
      await pc.setRemoteDescription({ type: "answer", sdp: await sdpRes.text() });
      setRunning(true);
      setSecondsLeft(SESSION_MS / 1000);
      setStatus(null);
      timerRef.current = window.setTimeout(endSession, SESSION_MS);
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

          {running && secondsLeft !== null && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-wood-300 bg-wood-200/50 px-5 py-3 dark:border-wood-400/20 dark:bg-wood-400/10">
              <span className="text-sm font-medium text-wood-700 dark:text-wood-300">Time remaining</span>
              <span className="font-mono text-lg font-bold text-wood-900 dark:text-wood-300">{fmt(secondsLeft)}</span>
            </div>
          )}

          <div className="mb-6 space-y-2">
            <label className="block text-sm font-medium text-wood-700 dark:text-wood-600">Access key</label>
            <input
              value={token}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value.toUpperCase())}
              placeholder="PCH-XXXX-XXXX"
              disabled={running}
              className="w-full rounded-xl border border-wood-300 bg-wood-50 px-4 py-3 font-mono text-sm text-wood-900 placeholder-wood-400 transition focus:border-wood-400 focus:outline-none focus:ring-1 focus:ring-wood-400/30 disabled:opacity-50 dark:border-white/10 dark:bg-black/30 dark:text-wood-800 dark:placeholder-[#524E4B] dark:focus:border-wood-400/50 dark:focus:ring-wood-400/30"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={start}
              disabled={running || !token.trim()}
              className="flex-1 rounded-full bg-wood-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(199,125,77,0.3)] transition hover:bg-wood-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-wood-400 dark:shadow-[0_0_20px_rgba(196,122,74,0.3)] dark:hover:bg-wood-300"
            >
              {running ? "Session Active" : "Start 7-Minute Session"}
            </button>
            <button
              onClick={endSession}
              disabled={!running}
              className="rounded-full border border-wood-300 bg-wood-50 px-6 py-3 text-sm font-semibold text-wood-600 transition hover:border-wood-400 hover:text-wood-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-wood-700 dark:hover:border-white/20 dark:hover:text-wood-900"
            >
              End Session
            </button>
          </div>

          {status && (
            <p className="mt-5 font-mono text-xs text-wood-500 dark:text-[#6B6360]">{status}</p>
          )}

          <audio ref={remoteAudioRef} autoPlay className="mt-6 w-full opacity-60" />
        </div>
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
