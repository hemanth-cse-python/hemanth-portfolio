"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, Sparkles, Eye } from "lucide-react";
import { Section } from "@/components/Section";
// import resumeAsset from "@/assets/resume.pdf.asset.json";
import resume from "@/assets/resume.pdf";
import { downloadAsset } from "@/lib/download-asset";
import { PdfPreviewModal } from "@/components/PdfPreviewModal";

export function Resume() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await downloadAsset({ url: resume, original_filename: "resume.pdf" }, "resume.pdf", "Resume");
  };

  return (
    <Section id="resume" eyebrow="Résumé" title="My Full Résumé">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] glass-strong transition-all duration-500 hover:shadow-[0_40px_100px_-40px_oklch(0.6_0.22_280_/_0.5)]"
      >
        {/* Animated gradient orbs */}
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-brand opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-40 group-hover:scale-110" />
        <div className="absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 opacity-10 blur-3xl transition-all duration-700 group-hover:opacity-30" />

        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-1 overflow-hidden bg-white/5">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full bg-gradient-brand"
          />
        </div>

        <div className="relative grid gap-10 p-8 md:grid-cols-[1.1fr_1fr] md:items-center md:p-12">
          {/* Left: Copy + CTAs */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-white/5"
            >
              <Sparkles size={14} className="text-primary" />
              Let's connect
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-4 text-3xl font-bold leading-tight md:text-4xl"
            >
              Interested in <span className="text-gradient">working together?</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 max-w-md text-sm text-muted-foreground md:text-base"
            >
              Download my latest resume for a complete snapshot of my education, technical skills,
              projects, and internships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={resume}
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-medium text-white ring-glow transition-transform hover:scale-105"
              >
                <Download size={16} />
                Download Resume
              </a>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
              >
                <Eye size={16} />
                View Resume
              </button>
            </motion.div>
          </div>

          {/* Right: Resume preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-brand opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />

            <motion.button
              type="button"
              onClick={() => setPreviewOpen(true)}
              whileHover={{ y: -6, rotate: 0 }}
              initial={{ rotate: -2 }}
              animate={{ rotate: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-2xl"
              aria-label="Preview resume"
            >
              <object
                data={`${resume}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                type="application/pdf"
                className="pointer-events-none block aspect-[1/1.294] w-full"
                aria-label="Resume preview"
              >
                <div className="grid aspect-[1/1.294] w-full place-items-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
                  <FileText size={48} />
                </div>
              </object>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand">
                      <FileText size={14} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/70">
                        PDF Preview
                      </div>
                      <div className="text-xs font-semibold">Resume.pdf</div>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-white/80" />
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom progress accent */}
        <div className="relative h-1 w-full overflow-hidden bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-brand"
          />
        </div>
      </motion.div>

      <PdfPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        url={resume}
        title="Sripathi Hemanth — Resume"
        subtitle="Full Stack Python Developer"
        asset={{ url: resume, original_filename: "resume.pdf" }}
        downloadName="resume.pdf"
        label="Résumé Preview"
        icon={<FileText size={14} className="text-primary" />}
      />
    </Section>
  );
}
