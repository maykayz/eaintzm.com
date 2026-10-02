import { useEffect, useRef } from "react";

const GLOW_DOT = (color) => `0 0 16px 6px #FFF7E8cc, 0 0 50px 18px ${color}cc, 0 0 110px 40px ${color}66`;
const GLOW_RING = (color) => `0 0 70px 26px ${color}80, 0 0 140px 60px ${color}33`;

const CustomCursor = ({ color = "#7A2430" }) => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    let frameId;

    dot.style.backgroundColor = "#FFF7E8";
    dot.style.boxShadow = GLOW_DOT(color);
    ringEl.style.boxShadow = GLOW_RING(color);

    let suppressed = false;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current && !suppressed) {
        visible.current = true;
        dot.style.opacity = "1";
        ringEl.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ringEl.style.opacity = "0";
    };

    const onSuppress = () => {
      suppressed = true;
      onLeave();
    };
    const onUnsuppress = () => {
      suppressed = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("cursor:hide", onSuppress);
    window.addEventListener("cursor:show", onUnsuppress);

    const render = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.15;
      ring.current.y += (target.current.y - ring.current.y) * 0.15;

      dot.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;

      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("cursor:hide", onSuppress);
      window.removeEventListener("cursor:show", onUnsuppress);
      cancelAnimationFrame(frameId);
    };
  }, [color]);

  return (
    <>
      <span
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none opacity-0 transition-opacity duration-200 z-[999]"
      />
      <span
        ref={ringRef}
        className="fixed top-0 left-0 w-16 h-16 rounded-full border-2 pointer-events-none opacity-0 transition-opacity duration-200 z-[999]"
        style={{ borderColor: color }}
      />
    </>
  );
};

export default CustomCursor;
