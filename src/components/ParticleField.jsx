import { useEffect, useRef } from "react";

const ParticleField = ({ color = "#E3C7A0", count = 220 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let frameId;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const baseRadius = () => Math.min(width, height) * 0.38;

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const scatter = (Math.random() - 0.5) * 0.5; // how far off the ring
        return {
          angle,
          radiusOffset: scatter,
          speed: (Math.random() - 0.5) * 0.0025 + 0.0006,
          size: Math.random() * 1.6 + 0.4,
          twinkleOffset: Math.random() * Math.PI * 2,
        };
      });
    }

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const r = baseRadius();

      particlesRef.current.forEach((p) => {
        p.angle += p.speed;
        const radius = r * (1 + p.radiusOffset);
        const x = cx + Math.cos(p.angle) * radius;
        const y = cy + Math.sin(p.angle) * radius * 0.82; // slight ellipse
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.0006 + p.twinkleOffset));

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = twinkle * 0.7;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [color, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default ParticleField;
