"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function FloatingParticles({ count = 30 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { dark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let animId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    function animate() {
      c.clearRect(0, 0, w, h);
      const color = dark ? "rgba(74, 124, 89," : "rgba(74, 124, 89,";
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = color + "0.2)";
        c.fill();
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    const safeCanvas = canvas;
    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      safeCanvas.width = w;
      safeCanvas.height = h;
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count, dark]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
