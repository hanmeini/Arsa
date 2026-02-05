"use client";

import { useEffect, useRef } from "react";

export function GlowCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const headOpacityRef = useRef<number>(0); // For smooth fade in/out

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const isMoving = now - lastMoveTimeRef.current < 100; // Consider moving if event within 100ms

      // Update Head Opacity
      if (isMoving) {
        headOpacityRef.current = Math.min(headOpacityRef.current + 0.1, 1);
      } else {
        headOpacityRef.current = Math.max(headOpacityRef.current - 0.05, 0);
      }

      // 1. ADD: Add new point if moving and position changed
      if (isMoving && lastPosRef.current) {
        // Only add if distance is significant to avoid clumping
        const lastStored = trailRef.current[trailRef.current.length - 1];
        const dist = lastStored
          ? Math.hypot(lastStored.x - lastPosRef.current.x, lastStored.y - lastPosRef.current.y)
          : Infinity;

        if (dist > 2) {
          trailRef.current.push({ ...lastPosRef.current });
        }
      }

      // 2. REMOVE: Decay logic
      // Only remove points if we are over the limit OR if we are stopped (to clear the tail)
      if (trailRef.current.length > 25 || (!isMoving && trailRef.current.length > 0)) {
        trailRef.current.shift();
      }

      // Draw Comet Tail
      if (trailRef.current.length > 2 && headOpacityRef.current > 0.01) {
        // Gradient for the trail
        const gradient = ctx.createLinearGradient(
          trailRef.current[0].x, trailRef.current[0].y,
          trailRef.current[trailRef.current.length - 1].x, trailRef.current[trailRef.current.length - 1].y
        );
        gradient.addColorStop(0, "rgba(56, 189, 248, 0)"); // Fade out at end
        gradient.addColorStop(1, `rgba(56, 189, 248, ${0.6 * headOpacityRef.current})`); // Head opacity

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 0; i < trailRef.current.length - 1; i++) {
          const p1 = trailRef.current[i];
          const p2 = trailRef.current[i + 1];
          const progress = i / trailRef.current.length;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Taper and opacity
          ctx.lineWidth = progress * 6;
          ctx.strokeStyle = `rgba(56, 189, 248, ${progress * 0.5 * headOpacityRef.current})`;
          ctx.stroke();
        }
      }

      // Draw Head (Glowing Orb)
      if (lastPosRef.current && headOpacityRef.current > 0.01) {
        ctx.beginPath();
        const glow = ctx.createRadialGradient(
          lastPosRef.current.x, lastPosRef.current.y, 0,
          lastPosRef.current.x, lastPosRef.current.y, 15
        );
        const opacity = headOpacityRef.current;
        glow.addColorStop(0, `rgba(255, 255, 255, ${0.9 * opacity})`);
        glow.addColorStop(0.4, `rgba(56, 189, 248, ${0.5 * opacity})`);
        glow.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.fillStyle = glow;
        ctx.arc(lastPosRef.current.x, lastPosRef.current.y, 15, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * opacity})`;
        ctx.arc(lastPosRef.current.x, lastPosRef.current.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
