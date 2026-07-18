"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download, ArrowRight, Github, Linkedin, Mail,
  Code2, Braces, Database, Terminal, GitBranch, Cpu, FileCode2, Binary, Sparkles, Bug,
} from "lucide-react";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import profileImg from "@/assets/profile.png";

const roles = [
  "Python Developer",
  "Web Developer",
  "SQL Developer",
  "Machine Learning Enthusiast",
];

function useTypewriter(words: string[], typeSpeed = 90, deleteSpeed = 45, hold = 1400) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words, typeSpeed, deleteSpeed, hold]);

  return text;
}

const floatingIcons = [
  { Icon: Code2, x: "6%", y: "18%", size: 28, delay: 0 },
  { Icon: Braces, x: "12%", y: "72%", size: 34, delay: 0.4 },
  { Icon: Database, x: "88%", y: "22%", size: 30, delay: 0.8 },
  { Icon: Terminal, x: "92%", y: "68%", size: 26, delay: 1.2 },
  { Icon: GitBranch, x: "22%", y: "88%", size: 24, delay: 1.6 },
  { Icon: Cpu, x: "78%", y: "12%", size: 32, delay: 2.0 },
  { Icon: FileCode2, x: "4%", y: "48%", size: 26, delay: 2.4 },
  { Icon: Binary, x: "94%", y: "45%", size: 28, delay: 2.8 },
  { Icon: Sparkles, x: "18%", y: "8%", size: 22, delay: 3.2 },
  { Icon: Bug, x: "82%", y: "88%", size: 24, delay: 3.6 },
];

export function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[100svh] items-center px-4 pt-28 pb-16"
    >
      {/* Floating coding icons */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingIcons.map(({ Icon, x, y, size, delay }, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/25"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.9, 0.9, 0.9],
              y: [20, 0, -14, 0],
              rotate: [0, 8, -6, 0],
            }}
            transition={{
              duration: 8,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_1fr]">
        {/* Left: Copy */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for internships & entry-level roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]"
          >
            <span className="block text-foreground/70 text-2xl sm:text-3xl font-medium mb-2">
              Hi, I'm
            </span>
            <span className="text-gradient">Sripathi Hemanth</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg sm:text-xl font-semibold text-foreground/90"
          >
            Python Full Stack Developer
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-4 flex items-center justify-center md:justify-start gap-2 text-base sm:text-lg text-muted-foreground"
          >
            <span className="text-primary">&gt;</span>
            <span className="font-mono">{typed}</span>
            <span className="inline-block h-5 w-[2px] bg-primary animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 max-w-xl mx-auto md:mx-0 text-sm sm:text-base text-muted-foreground"
          >
            Computer Science undergrad crafting clean, performant products with Python, SQL and
            modern web technologies. Passionate about building things that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3"
          >
            <a
              href={resumeAsset.url}
              target="_blank"
              rel="noreferrer"
              download
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-medium text-white ring-glow transition-transform hover:scale-105"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl glass-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex items-center justify-center md:justify-start gap-3"
          >
            {[
              { href: "https://github.com/hemanth-cse-python", Icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/hemanth-sripathi-9850a02bb", Icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:hemanthbunny023@gmail.com", Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group grid h-11 w-11 place-items-center rounded-xl glass transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Icon size={18} className="text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2 relative mx-auto w-full max-w-sm"
        >
          {/* Glow */}
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-30 blur-3xl" />

          <div className="glass-strong ring-glow relative rounded-[2rem] p-4">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={profileImg}
                alt="Sripathi Hemanth portrait"
                width={768}
                height={768}
                className="aspect-square w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Currently</div>
                  <div className="text-sm font-semibold text-white">Building & Learning</div>
                </div>
                <span className="rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                  Open to work
                </span>
              </div>
            </div>
          </div>

          {/* Floating badge — top left */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-strong absolute -left-4 top-6 hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white">
              <Braces size={14} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Stack</div>
              <div className="text-xs font-semibold">Python • SQL</div>
            </div>
          </motion.div>

          {/* Floating badge — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="glass-strong absolute -right-4 bottom-10 hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white">
              <Sparkles size={14} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Focus</div>
              <div className="text-xs font-semibold">Full Stack + ML</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
