"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  MessageSquare,
  Map as MapIcon,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hemanthbunny023@gmail.com",
    href: "mailto:hemanthbunny023@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 90632 58550",
    href: "tel:+919063258550",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Andhra Pradesh, India",
    href: "#contact",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/hemanth-cse-python",
    href: "https://github.com/hemanth-cse-python",
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/hemanth-sripathi",
    href: "https://www.linkedin.com/in/hemanth-sripathi-9850a02bb",
    external: true,
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Please enter your full name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim() || formData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setResult("Sending...");

    const formDataToSend = new FormData();

    formDataToSend.append("access_key", "e4d49ecd-db81-413a-af05-48887c07d6f9");

    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();

    if (data.success) {

      setResult("Message Sent Successfully!");
      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setResult("");
      }, 4000);
    } else {
      alert("Faild to send message.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Section id="contact" eyebrow="Get in Touch" title="Let's Work Together">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-[2rem] glass-strong"
        >
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gradient-brand opacity-15 blur-3xl transition-all duration-700 group-hover:opacity-30" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 opacity-10 blur-3xl transition-all duration-700 group-hover:opacity-25" />

          <div className="relative p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-lg">
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Send a Message</h3>
                <p className="text-xs text-muted-foreground">
                  I'll get back to you as soon as possible.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-11 rounded-xl border-white/10 bg-white/5 px-4 placeholder:text-muted-foreground/60 focus-visible:bg-white/10 focus-visible:ring-primary"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    maxLength={100}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-11 rounded-xl border-white/10 bg-white/5 px-4 placeholder:text-muted-foreground/60 focus-visible:bg-white/10 focus-visible:ring-primary"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    maxLength={255}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project collaboration opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                  className="h-11 rounded-xl border-white/10 bg-white/5 px-4 placeholder:text-muted-foreground/60 focus-visible:bg-white/10 focus-visible:ring-primary"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  maxLength={200}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-xs text-destructive">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, role, or just say hi..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="min-h-[140px] resize-none rounded-xl border-white/10 bg-white/5 px-4 py-3 placeholder:text-muted-foreground/60 focus-visible:bg-white/10 focus-visible:ring-primary"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  maxLength={1000}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-muted-foreground">
                  All fields are required.
                </p>
                <Button
                  type="submit"
                  className="h-11 gap-2 rounded-xl bg-gradient-brand px-6 text-sm font-medium text-white ring-glow transition-transform hover:scale-105 hover:opacity-95"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 size={16} />
                      Message Ready
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </Button>
                {result && (
                  <p className="mt-4 text-center text-sm font-medium text-green-500">
                    {result}
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        {/* Contact Info + Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Info Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-4 transition-colors hover:bg-white/10"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-colors group-hover:text-white group-hover:bg-gradient-brand">
                  <item.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium">
                    {item.value}
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>
            ))}
          </div>

          {/* Google Maps Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative flex-1 overflow-hidden rounded-[2rem] glass min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="absolute inset-0 opacity-30">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, color-mix(in oklab, white 8%, transparent) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative flex h-full min-h-[260px] flex-col items-center justify-center p-8 text-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-30 blur-xl" />
                <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-white shadow-2xl">
                  <MapIcon size={28} />
                </div>
                <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-brand blur-[2px]" />
              </div>
              <h4 className="text-lg font-semibold">Andhra Pradesh, India</h4>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Available for remote opportunities and relocation within India.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-muted-foreground border border-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to work
              </div>
            </div>

            {/* Decorative map roads */}
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <svg className="h-full w-full" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="60%"
                  x2="100%"
                  y2="40%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                />
                <line
                  x1="20%"
                  y1="0"
                  x2="60%"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-accent"
                />
                <line
                  x1="80%"
                  y1="0"
                  x2="40%"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/50"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
