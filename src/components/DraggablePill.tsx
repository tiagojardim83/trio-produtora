import { useRef, useState } from "react";
import type { ReactNode } from "react";

type DraggablePillProps = {
  children: ReactNode;
  position: string;
  rotate?: number;
};

const DraggablePill = ({ children, position, rotate = 0 }: DraggablePillProps) => {
  const innerRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = innerRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    setDragging(true);

    const startX = e.clientX - posRef.current.x;
    const startY = e.clientY - posRef.current.y;

    const onMove = (ev: PointerEvent) => {
      posRef.current = { x: ev.clientX - startX, y: ev.clientY - startY };
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
    };
    const onUp = () => {
      setDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div className={`absolute z-20 ${position}`} style={{ rotate: `${rotate}deg` }}>
      <span
        ref={innerRef}
        onPointerDown={onPointerDown}
        className={`inline-block touch-none select-none rounded-full bg-trio-gold px-5 py-2.5 text-sm font-extrabold text-ink shadow-lg transition-shadow sm:text-base ${
          dragging ? "cursor-grabbing shadow-2xl" : "cursor-grab hover:shadow-xl"
        }`}
      >
        {children}
      </span>
    </div>
  );
};

export default DraggablePill;
