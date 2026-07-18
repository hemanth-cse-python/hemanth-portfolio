"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Code2,
  Github,
  ExternalLink,
  Brain,
  Route,
  BarChart3,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/Section";

const projects = [
  {
    title: "Deep Learning Based Route Optimization and Demand Forecasting",
    description:
      "Developed a machine learning system for logistics route optimization and demand forecasting using Python, TensorFlow, Pandas and NumPy.",
    features: ["Demand Prediction", "Route Optimization", "Data Visualization", "Machine Learning"],
    tags: ["Python", "TensorFlow", "Pandas", "NumPy"],
    icon: Rocket,
    githubUrl: "https://github.com/hemanth-cse-python",
    liveDemoAvailable: false,
  },
  {
    title: "Responsive Multi-Page Web Application",
    description:
      "Built during internship at Vaults of Codes — a fully responsive web application with optimized UI/UX using modern front-end best practices.",
    features: ["Responsive Design", "Multi-Page Layout", "Optimized UI/UX", "Modern Frontend"],
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    icon: Code2,
    githubUrl: "https://github.com/hemanth-cse-python",
    liveDemoAvailable: false,
  },
];

const featureIcons = [Brain, Route, BarChart3, Cpu];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const Icon = project.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass-strong transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_oklch(0.6_0.22_280_/_0.45)]"
    >
      {/* Animated gradient orb */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-brand opacity-15 blur-3xl transition-all duration-700 group-hover:opacity-35 group-hover:scale-110" />
      <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-20" />

      <div className="relative flex flex-1 flex-col p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-primary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon size={26} strokeWidth={1.8} />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:bg-white/10 group-hover:text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title & description */}
        <h3 className="mt-6 text-xl font-semibold leading-snug">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {/* Features */}
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {project.features.map((feature, i) => {
            const FeatureIcon = featureIcons[i % featureIcons.length];
            return (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-foreground/80 transition-colors group-hover:bg-white/10"
              >
                <FeatureIcon size={14} className="text-primary" />
                {feature}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white ring-glow transition-transform hover:scale-105"
          >
            <Github size={16} /> GitHub
          </a>
          <button
            disabled={!project.liveDemoAvailable}
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm font-medium text-muted-foreground opacity-60"
            aria-disabled="true"
          >
            <ExternalLink size={16} /> Live Demo
          </button>
        </div>
      </div>

      {/* Bottom progress accent */}
      <div className="relative h-1 w-full overflow-hidden bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-brand"
        />
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected Work">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
