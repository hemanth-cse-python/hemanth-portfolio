"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, Eye, Calendar, Building2 } from "lucide-react";
import { Section } from "@/components/Section";
import pythonn from "@/assets/pythonn.pdf";
import webdev from "@/assets/webdev.pdf";
import cse from "@/assets/cse.pdf";
import { downloadAsset } from "@/lib/download-asset";
import { PdfPreviewModal } from "@/components/PdfPreviewModal";

type Certificate = {
  id: string;
  name: string;
  issuedBy: string;
  issueDate: string;
  fileUrl: string;
  /** Optional image preview. Falls back to a gradient placeholder when omitted. */
  imageUrl?: string;
  /** Tailwind gradient classes for the placeholder thumbnail. */
  gradient: string;
};

// Add more certificates here — the grid is unlimited.
const certificates: Certificate[] = [
  {
    id: "edunoverse-python",
    name: "Python Internship Certificate",
    issuedBy: "Edunoverse Tech Solutions",
    issueDate: "October 2025",
    fileUrl: pythonn,
    gradient: "from-blue-500/40 via-indigo-500/30 to-purple-500/40",
  },
  {
    id: "vault-webdev",
    name: "Web Development Internship",
    issuedBy: "Vault Of Codes",
    issueDate: "February 2024",
    fileUrl: webdev,
    gradient: "from-cyan-500/40 via-blue-500/30 to-violet-500/40",
  },
  {
    id: "cse-recognition",
    name: "CSE Batch Recognition",
    issuedBy: "Department of CSE",
    issueDate: "May 2025",
    fileUrl: cse,
    gradient: "from-purple-500/40 via-fuchsia-500/30 to-pink-500/40",
  },
];

function Thumbnail({ cert }: { cert: Certificate }) {
  if (cert.imageUrl) {
    return (
      <img
        src={cert.imageUrl}
        alt={cert.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
    );
  }
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${cert.gradient} transition-transform duration-700 group-hover:scale-110`}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
          <Award size={26} className="text-white" />
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
          Certificate
        </div>
      </div>
    </div>
  );
}

export function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <Section id="certificates" eyebrow="Certificates" title="Achievements & Credentials">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <motion.article
            key={cert.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-3xl glass-strong transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-30px_oklch(0.6_0.22_280_/_0.5)]"
          >
            {/* Preview */}
            <button
              type="button"
              onClick={() => setActive(cert)}
              className="relative block aspect-[4/3] w-full overflow-hidden"
              aria-label={`Preview ${cert.name}`}
            >
              <Thumbnail cert={cert} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-center gap-2 pb-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20">
                  <Eye size={14} /> Click to preview
                </span>
              </div>
            </button>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div>
                <h3 className="text-lg font-semibold leading-snug">{cert.name}</h3>
                <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-primary" />
                    <span>{cert.issuedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActive(cert)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-medium text-white ring-glow transition-transform hover:scale-[1.02]"
                >
                  <Eye size={15} /> Preview
                </button>
                <button
                  type="button"
                  onClick={() => downloadAsset({ url: cert.fileUrl, original_filename: `${cert.name}.pdf` }, `${cert.name}.pdf`, cert.name)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
                >
                  <Download size={15} /> Download
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <PdfPreviewModal
        open={!!active}
        onClose={() => setActive(null)}
        url={active?.fileUrl ?? ""}
        title={active?.name ?? "Certificate"}
        subtitle={active ? `${active.issuedBy} · ${active.issueDate}` : undefined}
        asset={{ url: active?.fileUrl, original_filename: `${active?.name ?? "certificate"}.pdf` }}
        downloadName={`${active?.name ?? "certificate"}.pdf`}
        label="Certificate Preview"
        icon={<Award size={14} className="text-primary" />}
      />
    </Section>
  );
}
