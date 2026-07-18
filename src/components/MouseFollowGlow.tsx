"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseFollowGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 50, damping: 20 });
  const sy = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, oklch(0.6 0.22 280 / 0.15) 0%, transparent 60%)",
        filter: "blur(40px)",
      }}
    />
  );
}
