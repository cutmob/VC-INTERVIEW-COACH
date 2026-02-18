"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteShell } from "@/components/site-shell";

type StartSessionResponse = {
  client_secret?: string;
  model?: string;
  error?: string;
};

const SESSION_MS = 7 * 60 * 1000;

export default function SessionPage() {
  const params = useSearchParams();
  const initial = useMemo(() => params.get("token") ?? "", [params]);
  const [token, setToken] = useState(initial);
  const [status, setStatus] = useState("Idle");
  const [running, setRunning] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const endSession = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    micStreamRef.current?.getTracks().forEach((track) => track.stop());
    micStreamRef.current = null;

    pcRef.current?.close();
    pcRef.current = null;

    setRunning(false);
    setStatus("Session complete.");
  };

  useEffect(() => endSession, []);

  const start = async () => {
    setStatus("Validating token and creating realtime session...");

    const res = await fetch("/api/start-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    const data = (await res.json()) as StartSessionResponse;
    if (!res.ok || !data.client_secret || !data.model) {
      setStatus(data.error ?? "Unable to start session");
      return;
    }

    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      const pc = new RTCPeerConnection();
      micStreamRef.current = media;
      pcRef.current = pc;

      media.getTracks().forEach((track) => pc.addTrack(track, media));

      pc.ontrack = (event) => {
        const audioEl = remoteAudioRef.current;
        if (!audioEl) {
          return;
        }
        audioEl.srcObject = event.streams[0];
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(data.model)}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${data.client_secret}`,
          "Content-Type": "application/sdp"
        }
      });

      if (!sdpResponse.ok) {
        throw new Error("Unable to establish realtime media connection");
      }

      const answerSdp = await sdpResponse.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

      setRunning(true);
      setStatus("Live. Pitch now — interruptions will start quickly.");
      timerRef.current = window.setTimeout(endSession, SESSION_MS);
    } catch (error) {
      endSession();
      setStatus(error instanceof Error ? error.message : "Failed to start media session");
    }
  };

  return (
    <SiteShell>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-8">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
          <h1 className="text-3xl font-bold">Live Pitch Room</h1>
          <p className="mt-2 text-zinc-300">The coach opens: “Go ahead. You have 60 seconds.” Then it interrupts weak framing.</p>

          <div className="mt-6 space-y-4">
            <label className="block text-sm text-zinc-300">
              Access key
              <input
                value={token}
                onChange={(e) => setToken(e.target.value.toUpperCase())}
                placeholder="PCH-XXXX-XXXX"
                className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-base"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={start}
                disabled={running}
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {running ? "Session Active" : "Start 7-Minute Session"}
              </button>
              <button
                onClick={endSession}
                disabled={!running}
                className="rounded-md border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                End Session
              </button>
            </div>
          </div>

          <p className="mt-5 text-sm text-zinc-400">Status: {status}</p>
          <audio ref={remoteAudioRef} autoPlay className="mt-4 w-full" controls />
        </section>
      </main>
    </SiteShell>
  );
}
