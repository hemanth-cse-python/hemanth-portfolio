"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[200] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-20 w-20">
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "oklch(0.68 0.19 265)",
                  borderRightColor: "oklch(0.65 0.22 300)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute inset-2 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: "oklch(0.72 0.22 300)",
                  borderLeftColor: "oklch(0.68 0.19 250)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 grid place-items-center font-display text-lg font-bold text-gradient">
                H
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              Loading Portfolio
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
