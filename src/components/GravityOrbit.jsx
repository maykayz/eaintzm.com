import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NODES = [
  { radius: 150, size: 16, speed: 9, color: "#5C1A22" },
  { radius: 210, size: 9, speed: -6, color: "#1D2742" },
  { radius: 95, size: 7, speed: 14, color: "#F3EDE4" },
];

const DEG_TO_RAD = Math.PI / 180;

const GravityOrbit = () => {
  const svgRef = useRef(null);
  const nodeElRefs = useRef([]);
  const lineElRefs = useRef([]);
  const angles = useRef(NODES.map((_, i) => (360 / NODES.length) * i));
  const velocities = useRef(NODES.map((node) => node.speed));
  const draggingIndex = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;

    const getCenter = () => {
      const rect = svg.getBoundingClientRect();
      return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
    };

    const render = (i) => {
      const rad = angles.current[i] * DEG_TO_RAD;
      const x = Math.cos(rad) * NODES[i].radius;
      const y = Math.sin(rad) * NODES[i].radius;
      const node = nodeElRefs.current[i];
      const line = lineElRefs.current[i];
      if (node) {
        node.setAttribute("cx", x);
        node.setAttribute("cy", y);
      }
      if (line) {
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
      }
    };

    const onPointerMove = (e) => {
      const i = draggingIndex.current;
      if (i === null) return;
      const { cx, cy } = getCenter();
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const nextAngle = Math.atan2(dy, dx) / DEG_TO_RAD;

      let delta = nextAngle - angles.current[i];
      delta = ((delta + 180) % 360 + 360) % 360 - 180;

      velocities.current[i] = delta * 3.5;
      angles.current[i] += delta;
      render(i);
    };

    const onPointerUp = () => {
      draggingIndex.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    const handles = NODES.map((_, i) => {
      const onPointerDown = (e) => {
        e.preventDefault();
        draggingIndex.current = i;
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      };
      const el = nodeElRefs.current[i];
      el.addEventListener("pointerdown", onPointerDown);
      return { el, onPointerDown };
    });

    const ticker = (time, deltaTime) => {
      const dt = deltaTime / 16.6;
      NODES.forEach((node, i) => {
        if (draggingIndex.current === i) return;
        velocities.current[i] = gsap.utils.interpolate(velocities.current[i], node.speed, 0.015);
        angles.current[i] += velocities.current[i] * dt;
        render(i);
      });
    };

    NODES.forEach((_, i) => render(i));
    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      handles.forEach(({ el, onPointerDown }) => el.removeEventListener("pointerdown", onPointerDown));
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const maxRadius = Math.max(...NODES.map((n) => n.radius));
  const viewSize = (maxRadius + 24) * 2;

  return (
    <div className="gravity-orbit">
      <svg
        ref={svgRef}
        viewBox={`${-viewSize / 2} ${-viewSize / 2} ${viewSize} ${viewSize}`}
      >
        <circle cx="0" cy="0" r="5" fill="#F3EDE4" />
        {NODES.map((node, i) => (
          <line
            key={`line-${i}`}
            ref={(el) => (lineElRefs.current[i] = el)}
            x1="0"
            y1="0"
            x2={node.radius}
            y2="0"
            stroke="#8C8178"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        {NODES.map((node, i) => (
          <circle
            key={`node-${i}`}
            ref={(el) => (nodeElRefs.current[i] = el)}
            r={node.size / 2}
            fill={node.color}
            className="gravity-orbit__node"
          />
        ))}
      </svg>
      <span className="gravity-orbit__hint">Drag to orbit</span>
    </div>
  );
};

export default GravityOrbit;
