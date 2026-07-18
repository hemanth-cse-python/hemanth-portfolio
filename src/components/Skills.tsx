"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Braces,
  FileCode2,
  Database,
  Code2,
  Palette,
  LayoutGrid,
  FlaskConical,
  Server,
  GitBranch,
  Github,
  BarChart3,
  Table2,
  Binary,
  Table,
  Sparkles,
  Cpu,
  Terminal,
} from "lucide-react";
import { Section } from "@/components/Section";

type Skill = {
  name: string;
  level: number;
  icon: React.ElementType;
};

type SkillGroup = {
  category: string;
  items: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    items: [
      { name: "Python", level: 90, icon: Braces },
      { name: "JavaScript", level: 82, icon: FileCode2 },
      { name: "SQL", level: 84, icon: Database },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", level: 88, icon: Code2 },
      { name: "CSS", level: 85, icon: Palette },
      { name: "Bootstrap", level: 80, icon: LayoutGrid },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Python", level: 86, icon: Terminal },
      { name: "Flask", level: 78, icon: FlaskConical },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", level: 84, icon: Server },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: 82, icon: GitBranch },
      { name: "GitHub", level: 80, icon: Github },
      { name: "Power BI", level: 78, icon: BarChart3 },
      { name: "Excel", level: 76, icon: Table2 },
    ],
  },
  {
    category: "Libraries",
    items: [
      { name: "NumPy", level: 80, icon: Binary },
      { name: "Pandas", level: 82, icon: Table },
      { name: "TensorFlow", level: 72, icon: Sparkles },
    ],
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-strong group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_oklch(0.6_0.22_280_/_0.35)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
            <Icon size={20} strokeWidth={1.8} />
          </div>
          <div>
            <div className="font-semibold text-foreground">{skill.name}</div>
            <div className="text-xs text-muted-foreground">Proficiency</div>
          </div>
        </div>
        <div className="text-lg font-bold text-gradient">{skill.level}%</div>
      </div>

      <div className="relative mt-5 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-brand"
        />
      </div>
    </motion.div>
  );
}

function SkillGroupSection({ group, groupIndex }: { group: SkillGroup; groupIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: groupIndex * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {group.category}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.items.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technical Toolkit">
      <div className="space-y-12">
        {skillGroups.map((group, i) => (
          <SkillGroupSection key={group.category} group={group} groupIndex={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <Cpu size={16} className="text-primary" />
          Areas of Interest
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Python Full Stack",
            "Web Development",
            "Data Analytics",
            "Power BI",
            "Machine Learning",
            "API Development",
            "Database Design",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full glass-strong px-4 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:bg-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
