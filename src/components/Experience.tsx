"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, Code2, Database, Braces, Globe } from "lucide-react";
import { Section } from "@/components/Section";

const experiences = [
  {
    id: "edunoverse",
    company: "Edunoverse Tech Solutions",
    role: "Python Internship",
    description:
      "Worked on data preprocessing, feature engineering, model training and evaluation using Python.",
    duration: "Aug 2025 - Oct 2025",
    location: "Remote",
    type: "Internship",
    icon: Database,
    skills: ["Python", "Data Preprocessing", "Feature Engineering", "Model Training", "Evaluation"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "vault-of-codes",
    company: "Vault Of Codes",
    role: "Web Development Internship",
    description: "Built responsive websites using HTML CSS JavaScript and improved UI performance.",
    duration: "Jan 2024 - Feb 2024",
    location: "Remote",
    type: "Internship",
    icon: Globe,
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI Performance"],
    color: "from-violet-500 to-fuchsia-500",
  },
];

const floatingIcons = [Code2, Database, Braces];

function TimelineCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -60 : 60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const Icon = experience.icon;
  const FloatingIcon = floatingIcons[index % floatingIcons.length];

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x, scale }}
      className={`relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr] ${
        index % 2 === 0 ? "md:[&>*:first-child]:text-right" : "md:[&>*:last-child]:text-right"
      }`}
    >
      {/* Content side */}
      <div className={`${index % 2 === 0 ? "md:order-1 md:pr-8" : "md:order-3 md:pl-8"} order-2`}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-8"
        >
          {/* Animated gradient orb */}
          <div
            className={`absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${experience.color} opacity-10 blur-3xl transition-all duration-700 group-hover:opacity-25 group-hover:scale-125`}
          />
          <div
            className={`absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-tr ${experience.color} opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-15`}
          />

          <div className="relative">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${experience.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1">
                    <Briefcase size={12} className="text-primary" />
                    {experience.type}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1">
                    <Calendar size={12} className="text-accent" />
                    {experience.duration}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-semibold leading-tight">{experience.company}</h3>
                <p className={`text-gradient text-sm font-medium`}>{experience.role}</p>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {experience.description}
            </p>

            {/* Skills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:bg-white/10 group-hover:text-foreground/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-gradient-to-r ${experience.color}`}
            />
          </div>
        </motion.div>
      </div>

      {/* Timeline center */}
      <div className="relative order-1 flex flex-col items-center justify-center md:order-2">
        <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full glass-strong shadow-lg shadow-primary/20 ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110">
          <div
            className={`h-10 w-10 rounded-full bg-gradient-to-br ${experience.color} p-2.5 text-white`}
          >
            <FloatingIcon size={20} strokeWidth={1.8} />
          </div>
        </div>
      </div>

      {/* Empty opposite side */}
      <div
        className={`hidden md:block ${index % 2 === 0 ? "md:order-3 md:pl-8" : "md:order-1 md:pr-8"}`}
      />
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've Worked">
      <div ref={containerRef} className="relative mx-auto max-w-5xl">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 w-full bg-gradient-to-b from-primary via-accent to-transparent"
          />
        </div>

        {/* Timeline items */}
        <div className="relative space-y-16">
          {experiences.map((experience, index) => (
            <TimelineCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>

        {/* Timeline end dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute left-8 mt-12 h-4 w-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 md:left-1/2 md:-translate-x-1/2"
        />
      </div>
    </Section>
  );
}
