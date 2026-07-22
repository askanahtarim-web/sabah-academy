"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Brighter "hub" nodes carry a little more presence. */
  hub: boolean;
};

const SPRITE_SIZE = 64;

export default function ConstellationCanvas({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let linkDist = 150;
    let raf = 0;
    let running = false;
    let visible = true;

    const pointer = { x: 0, y: 0, active: false };

    // A radial-gradient sprite drawn once, then blitted per node. Far cheaper
    // than ctx.shadowBlur, which would tank the frame budget at this node count.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE_SIZE;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const c = SPRITE_SIZE / 2;
      const grad = sctx.createRadialGradient(c, c, 0, c, c, c);
      grad.addColorStop(0, "rgba(190, 224, 255, 0.95)");
      grad.addColorStop(0.18, "rgba(79, 163, 255, 0.7)");
      grad.addColorStop(0.5, "rgba(45, 125, 210, 0.22)");
      grad.addColorStop(1, "rgba(45, 125, 210, 0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    }

    function seed() {
      // Density tracks viewport area so phones don't render a hairball.
      const target = Math.round((width * height) / 15000);
      const count = Math.max(26, Math.min(100, target));
      linkDist = Math.max(105, Math.min(165, Math.min(width, height) * 0.22));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 0.9 + Math.random() * 1.5,
        hub: Math.random() < 0.14,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // Bounce at the edges to hold density steady.
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Links between neighbouring nodes.
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.32;
          ctx!.strokeStyle = `rgba(79,163,255,${alpha.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // Pointer tethers — subtle interactivity without extra state.
      if (pointer.active) {
        const reach = 190;
        for (const n of nodes) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > reach * reach) continue;
          const alpha = (1 - Math.sqrt(d2) / reach) * 0.5;
          ctx!.strokeStyle = `rgba(140,200,255,${alpha.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.stroke();
        }
      }

      // Nodes, blitted from the pre-rendered glow sprite.
      for (const n of nodes) {
        const size = (n.hub ? 13 : 8) * n.r;
        ctx!.drawImage(sprite, n.x - size / 2, n.y - size / 2, size, size);
      }
    }

    function tick() {
      step();
      draw();
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running || reduced || !visible) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Stop burning frames once the hero scrolls away.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    // Fine pointers only — touch drags would fight the scroll.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerLeave, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      if (finePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerout", onPointerLeave);
      }
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    />
  );
}
