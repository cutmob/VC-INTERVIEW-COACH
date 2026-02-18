"use client";

import { useEffect, useRef } from "react";

interface ColorStop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Color stops — warm copper / amber / burnt orange palette
    const stops: ColorStop[] = [
      { x: 0.3, y: 0.2, vx: 0.00018, vy: 0.00012, r: 196, g: 90, b: 45 },
      { x: 0.7, y: 0.3, vx: -0.00014, vy: 0.00016, r: 212, g: 118, b: 60 },
      { x: 0.5, y: 0.7, vx: 0.00010, vy: -0.00018, r: 160, g: 82, b: 45 },
      { x: 0.2, y: 0.6, vx: 0.00016, vy: -0.00010, r: 232, g: 168, b: 124 },
      { x: 0.8, y: 0.6, vx: -0.00012, vy: -0.00014, r: 180, g: 100, b: 50 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Move stops
      for (const s of stops) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > 1) s.vx *= -1;
        if (s.y < 0 || s.y > 1) s.vy *= -1;
      }

      // Clear
      ctx.fillStyle = "#0A0A0F";
      ctx.fillRect(0, 0, w, h);

      // Draw each color blob as a radial gradient
      for (const s of stops) {
        const cx = s.x * w;
        const cy = s.y * h;
        const radius = Math.max(w, h) * 0.65;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${s.r},${s.g},${s.b},0.22)`);
        grad.addColorStop(0.4, `rgba(${s.r},${s.g},${s.b},0.08)`);
        grad.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
