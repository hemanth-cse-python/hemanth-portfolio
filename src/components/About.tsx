"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "CGPA", value: 7.3, suffix: "" },
  { label: "Projects", value: 5, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "Publication", value: 1, suffix: "" },
  { label: "Certificates", value: 5, suffix: "+" },
  { label: "Years Learning", value: 3, suffix: "+" },
];

const softSkills = ["Communication", "Teamwork", "Problem Solving", "Time Management"];

const education = [
  {
    title: "B.Tech — Computer Science & Engineering",
    place: "Siddhartha Institute of Engineering and Technology, AP",
    score: "CGPA 7.39",
    period: "2022 — 2026",
  },
  {
    title: "Intermediate — MPC",
    place: "Narayana Junior College",
    score: "60.2%",
    period: "2020 — 2022",
  },
  {
    title: "SSC — Class X",
    place: "Little Flower English Medium High School",
    score: "95.5%",
    period: "2019 — 2020",
  },
];

function AnimatedStat({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!inView) return;

    const start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = start + (value - start) * eased;
      setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, isDecimal]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
          About Me
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="text-gradient">A little about me</span>
        </h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Main description card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-3xl p-8"
        >
          <p className="text-base leading-relaxed text-muted-foreground">
            I am a{" "}
            <span className="text-foreground font-medium">
              Computer Science Engineering graduate
            </span>{" "}
            passionate about{" "}
            <span className="text-foreground">
              Python Development, Full Stack Development, SQL, JavaScript and Machine Learning
            </span>
            .
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I enjoy solving real-world problems through software development and continuously
            improve my technical skills by building projects and learning new technologies.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I am currently seeking{" "}
            <span className="text-foreground font-medium">
              entry-level Software Developer and Python Developer
            </span>{" "}
            opportunities where I can contribute while growing professionally.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {softSkills.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={16} className="text-primary" /> {s}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact / goal card */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin size={16} className="text-primary" /> Kadapa, Andhra Pradesh, India
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <Phone size={16} className="text-primary" /> +91 90632 58550
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <Mail size={16} className="text-primary" /> hemanthbunny023@gmail.com
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Career Goal
            </div>
            <p className="mt-2 text-sm text-foreground/90">
              Seeking entry-level Software Developer and Python Developer roles to contribute to
              impactful projects while growing professionally.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated stats cards */}
      <div ref={ref} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong group relative overflow-hidden rounded-2xl p-5 text-center transition-transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-10" />
            <div className="relative">
              <div className="text-3xl font-bold text-gradient">
                <AnimatedStat value={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground">
          <GraduationCap size={16} className="text-primary" /> Education
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {education.map((e) => (
            <div key={e.title} className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">{e.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{e.place}</div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="rounded-full bg-white/5 px-2 py-1 text-muted-foreground">
                  {e.period}
                </span>
                <span className="text-gradient font-semibold">{e.score}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
