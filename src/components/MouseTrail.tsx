import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  isDragParticle: boolean;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, isDown: false });
  const particlesRef = useRef<Particle[]>([]);
  const trailPointsRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Color palette for a pure, bright beam of light
    const colors = [
      "#ffffff", // Pure White Core
      "#e0fcfd", // Ice White
      "#9bf4ff", // Soft Cyan
      "#00f0ff", // Bright Electric Cyan
    ];

    const getParticleColor = (isDrag: boolean) => {
      // Unified pure light tones
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const spawnParticles = (x: number, y: number, count: number, isDrag: boolean) => {
      // Calculate travel direction vectors
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.hypot(dx, dy);
      
      // Opposite angle of motion (flow backwards like fluid drag)
      const motionAngle = speed > 0.1 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2;
      const baseAngle = motionAngle + Math.PI;

      for (let i = 0; i < count; i++) {
        // Narrow spread cone (0.4 radians) so they form a beautiful stream
        const angleSpread = 0.5;
        const angle = baseAngle + (Math.random() - 0.5) * angleSpread;
        
        // Embers drift backwards relative to movement speed
        const driftSpeed = speed * 0.15 + Math.random() * 0.8 + 0.2;
        const vx = Math.cos(angle) * driftSpeed;
        const vy = Math.sin(angle) * driftSpeed;
        
        // Embers are small and elegant (no big confetti dots)
        const size = isDrag ? Math.random() * 3 + 1.5 : Math.random() * 2 + 0.8;
        // Slower decay for a more persistent, buttery trail
        const decay = isDrag ? Math.random() * 0.01 + 0.006 : Math.random() * 0.012 + 0.008;

        particlesRef.current.push({
          x,
          y,
          vx,
          vy,
          size,
          color: getParticleColor(isDrag),
          alpha: 1.0,
          decay,
          isDragParticle: isDrag,
        });
      }
    };

    // Global listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const isDrag = mouseRef.current.isDown;

      // Spawn particles based on motion
      const dist = Math.hypot(
        mouseRef.current.x - mouseRef.current.prevX,
        mouseRef.current.y - mouseRef.current.prevY
      );

      if (dist > 2) {
        const particlesToSpawn = isDrag ? Math.min(6, Math.floor(dist / 3)) : Math.min(2, Math.floor(dist / 8));
        spawnParticles(mouseRef.current.x, mouseRef.current.y, particlesToSpawn, isDrag);
      }

      // Add points for the connected fluid trailing ribbon
      trailPointsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        time: Date.now(),
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      setIsDragging(true);
      // Burst of particles on click
      spawnParticles(e.clientX, e.clientY, 15, true);
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;

      const dist = Math.hypot(
        mouseRef.current.x - mouseRef.current.prevX,
        mouseRef.current.y - mouseRef.current.prevY
      );

      if (dist > 2) {
        spawnParticles(mouseRef.current.x, mouseRef.current.y, 3, true);
      }

      trailPointsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        time: Date.now(),
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      mouseRef.current.isDown = true;
      setIsDragging(true);
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
      spawnParticles(touch.clientX, touch.clientY, 12, true);
    };

    const handleTouchEnd = () => {
      mouseRef.current.isDown = false;
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      // Filter out old ribbon trailing points (older than 250ms for move, 400ms for active drag)
      const lifetime = mouseRef.current.isDown ? 400 : 200;
      trailPointsRef.current = trailPointsRef.current.filter(
        (pt) => now - pt.time < lifetime
      );

      // 1. Draw the glowing ribbon / line path with elegant tapering width
      if (trailPointsRef.current.length > 1) {
        const total = trailPointsRef.current.length;

        // Pass 1: Outer ambient glow segment by segment
        for (let i = 1; i < total; i++) {
          const ratio = i / total; // Tapering ratio from 0 (tail) to 1 (cursor)
          const prevPt = trailPointsRef.current[i - 1];
          const currPt = trailPointsRef.current[i];

          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(currPt.x, currPt.y);

          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          const glowWidth = mouseRef.current.isDown ? 16 : 8;
          ctx.lineWidth = ratio * glowWidth;

          ctx.strokeStyle = mouseRef.current.isDown
            ? `rgba(0, 240, 255, ${ratio * 0.4})`
            : `rgba(0, 240, 255, ${ratio * 0.22})`;
          ctx.stroke();
        }

        // Pass 2: Inner core high-intensity glow segment by segment
        for (let i = 1; i < total; i++) {
          const ratio = i / total;
          const prevPt = trailPointsRef.current[i - 1];
          const currPt = trailPointsRef.current[i];

          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(currPt.x, currPt.y);

          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          const coreWidth = mouseRef.current.isDown ? 5 : 2.5;
          ctx.lineWidth = ratio * coreWidth;

          ctx.strokeStyle = mouseRef.current.isDown
            ? `rgba(255, 255, 255, ${ratio * 0.95})`
            : `rgba(255, 255, 255, ${ratio * 0.85})`;
          ctx.stroke();
        }
      }

      // 2. Update and Draw Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Apply slight air resistance/friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Glow effect
        if (p.isDragParticle) {
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = p.size * 1.5;
          ctx.shadowColor = p.color;
        }

        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        id="mouse-trail-canvas"
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Floating interactive tooltip showing how to activate high-energy drag mode */}
      <div className="fixed bottom-24 left-6 z-35 pointer-events-none select-none hidden md:flex flex-col gap-1 items-start bg-neutral-900/80 dark:bg-neutral-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-neutral-200/10 text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5 font-medium text-neutral-200">
          <div className={`w-2 h-2 rounded-full ${isDragging ? "bg-cyan-400 animate-ping" : "bg-cyan-500"}`} />
          <span>Rastro Luminoso Premium</span>
        </div>
        <p className="text-neutral-500">
          {isDragging ? "Modo de arrasto ativo! ✨" : "Arraste e segure o mouse para ativar o fluxo de energia"}
        </p>
      </div>
    </>
  );
}
