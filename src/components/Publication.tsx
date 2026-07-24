"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, ExternalLink, Download, Calendar, Award, Eye } from "lucide-react";
import { Section } from "@/components/Section";
import publication from "@/assets/publication.pdf";
import { downloadAsset } from "@/lib/download-asset";
import { PdfPreviewModal } from "@/components/PdfPreviewModal";

export function Publication() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="publication" eyebrow="Research Publication" title="Published Work">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] glass-strong transition-all duration-500 hover:shadow-[0_40px_100px_-40px_oklch(0.6_0.22_280_/_0.5)]"
      >
        {/* Animated gradient orbs */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-brand opacity-15 blur-3xl transition-all duration-700 group-hover:opacity-30 group-hover:scale-110" />
        <div className="absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-20" />

        {/* Decorative top accent line */}
        <div className="absolute inset-x-0 top-0 h-1 overflow-hidden bg-white/5">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full bg-gradient-brand"
          />
        </div>

        <div className="relative flex flex-col gap-8 p-8 md:flex-row md:items-start md:p-10">
          {/* Publication icon block */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0"
          >
            <div className="grid h-24 w-24 place-items-center rounded-[1.5rem] bg-gradient-brand text-white shadow-xl shadow-primary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 md:h-28 md:w-28">
              <BookOpen size={42} strokeWidth={1.6} />
            </div>
            <div className="absolute -bottom-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <Award size={18} className="text-primary" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-white/5"
            >
              <FileText size={14} className="text-primary" />
              Research Paper
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-2xl font-bold leading-snug md:text-3xl"
            >
              <span className="text-gradient">
                Deep Learning-Based Route Optimization and Demand Forecasting for Smart Logistics
              </span>
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 space-y-2"
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/80">Published in:</span> International
                Journal of Emerging Research in Science Engineering and Management
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                  <span className="font-medium text-foreground/80">Volume 2</span>
                  <span className="text-white/20">|</span>
                  <span className="font-medium text-foreground/80">Issue 3</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                  <Calendar size={14} className="text-primary" />
                  <span className="font-medium text-foreground/80">March 2026</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-medium text-white ring-glow transition-transform hover:scale-105"
              >
                <Eye size={16} />
                Preview
              </button>
              <a
                href={publication}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
              >
                <ExternalLink size={16} />
                View Publication
              </a>
              <button
                type="button"
                onClick={() =>
                  downloadAsset(
                    { url: publication, original_filename: "publication.pdf" },
                    "publication.pdf",
                    "publication",
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
              >
                <Download size={16} />
                Download PDF
              </button>
            </motion.div>
          </div>
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
      </motion.article>

      <PdfPreviewModal
        open={open}
        onClose={() => setOpen(false)}
        url={publication}
        title="Deep Learning-Based Route Optimization"
        subtitle="International Journal of Emerging Research in Science Engineering and Management · Volume 2 Issue 3 · March 2026"
        asset={{ url: publication, original_filename: "publication.pdf" }}
        downloadName="publication.pdf"
        label="Publication Preview"
        icon={<BookOpen size={14} className="text-primary" />}
      />
    </Section>
  );
}
