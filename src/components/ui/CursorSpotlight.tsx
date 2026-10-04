"use client";

import React, { useEffect, useState } from "react";

export default function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        if (!visible) setVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, var(--spotlight-color, rgba(217, 119, 6, 0.05)), transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}
