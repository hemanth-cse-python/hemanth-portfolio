"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });
  const glowX = useSpring(x, { stiffness: 100, damping: 20 });
  const glowY = useSpring(y, { stiffness: 100, damping: 20 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch, larger screens
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        "a, button, input, textarea, [role='button'], [data-cursor='hover']",
      );
      setHovering(interactive);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[300] hidden lg:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{ scale: hovering ? 1.6 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="-translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white mix-blend-difference"
        />
      </motion.div>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[299] hidden lg:block"
        style={{ x: glowX, y: glowY }}
      >
        <motion.div
          animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="-translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-primary/60 bg-primary/10 backdrop-blur-sm"
        />
      </motion.div>
    </>
  );
}
