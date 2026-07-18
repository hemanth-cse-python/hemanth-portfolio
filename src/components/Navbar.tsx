"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#publication", label: "Publication" },
  { href: "#certificates", label: "Certificates" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass-strong flex items-center justify-between rounded-2xl px-5 py-3 ${scrolled ? "shadow-xl" : ""}`}>
          <a href="#home" className="font-display text-lg font-bold text-gradient" aria-label="Home">
            &lt;Hemanth /&gt;
          </a>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center rounded-lg bg-gradient-brand px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105"
          >
            Hire Me
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-strong mt-2 rounded-2xl p-3 lg:hidden"
            >
              <div className="grid grid-cols-2 gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.href ? "page" : undefined}
                    className={`rounded-lg px-3 py-2 text-sm hover:bg-white/5 hover:text-foreground ${
                      active === l.href ? "text-foreground bg-white/5" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
