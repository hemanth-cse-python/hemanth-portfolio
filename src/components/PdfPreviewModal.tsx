"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, Loader2, AlertCircle } from "lucide-react";
import { downloadAsset } from "@/lib/download-asset";
import type { AssetLike } from "@/lib/download-asset";

type PdfPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
  subtitle?: string;
  /** Optional asset pointer for the download helper. Falls back to url-only download. */
  asset?: AssetLike;
  downloadName?: string;
  /** Icon shown in the header next to the label. */
  icon?: React.ReactNode;
  /** Header label (e.g. "Certificate Preview"). */
  label?: string;
};

export function PdfPreviewModal({
  open,
  onClose,
  url,
  title,
  subtitle,
  asset,
  downloadName = "document.pdf",
  icon,
  label = "PDF Preview",
}: PdfPreviewModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle Escape key.
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    // Focus the close button for accessibility.
    const timer = setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKey);
      clearTimeout(timer);
    };
  }, [open, onClose]);

  // Reset state when reopened, with a fallback timer since iframe onLoad
  // doesn't fire reliably for browser-native PDF viewers.
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(false);
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, [open, url]);


  const handleDownload = () => {
    downloadAsset(asset ?? { url, original_filename: downloadName }, downloadName, title);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-preview-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-card)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/5 px-5 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {icon || <FileText size={14} className="text-primary" />}
                  <span>{label}</span>
                </div>
                <h3 id="pdf-preview-title" className="mt-1 truncate text-lg font-semibold sm:text-xl">
                  {title}
                </h3>
                {subtitle && (
                  <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Viewer */}
            <div className="relative flex-1 overflow-hidden bg-black/40">
              {/* Loading state - plain div for instant visibility */}
              {loading && !error && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--color-card)] text-muted-foreground">
                  <Loader2 size={32} className="animate-spin text-primary" />
                  <span className="text-sm font-medium">Loading preview…</span>
                </div>
              )}

              {/* Error state */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[var(--color-card)] p-6 text-center"
                  >
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
                      <AlertCircle size={28} className="text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium">Couldn&apos;t load the preview</p>
                      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                        The PDF may be unavailable or your browser may block inline previews. Try opening it in a new tab.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium hover:bg-white/10"
                      >
                        <ExternalLink size={15} /> Open in new tab
                      </a>
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-medium text-white ring-glow"
                      >
                        <Download size={15} /> Download
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PDF iframe - always visible; overlay covers it while loading */}
              <iframe
                ref={iframeRef}
                src={url}
                title={title}
                className={`h-[70vh] w-full ${error ? "invisible" : "visible"}`}
                onLoad={() => setLoading(false)}
                onError={handleError}
              />

            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 px-5 py-4 sm:px-6">
              <p className="text-xs text-muted-foreground">
                Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-foreground">Esc</kbd> to close
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium hover:bg-white/10"
                >
                  <ExternalLink size={15} /> Open in new tab
                </a>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-medium text-white ring-glow transition-transform hover:scale-[1.02]"
                >
                  <Download size={15} /> Download
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
