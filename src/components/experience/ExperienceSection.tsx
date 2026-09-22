"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { workExperiences, educationInfo, achievementsList } from "@/data/experience";
import {
  Briefcase,
  Calendar,
  MapPin,
  GraduationCap,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the continuous animated spine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const spineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-28 px-6 sm:px-10 border-b border-editorial-border bg-canvas relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Chapter Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="editorial-meta text-editorial-accent">02 / EXPERIENCE</span>
            <span className="h-[1px] w-8 bg-editorial-border" />
            <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
              CROSS TIMELINE &amp; IMPACT
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="editorial-headline text-4xl sm:text-5xl md:text-6xl text-fg">
                Where I&apos;ve built &amp;{" "}
                <span className="editorial-italic font-normal text-editorial-accent">
                  delivered.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-fg-muted font-light mt-3 max-w-2xl leading-relaxed">
                A non-linear, cross-branching timeline of production engineering roles, distributed worker pipelines, and quantifiable backend architecture.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-fg-subtle border border-editorial-border px-3.5 py-1.5 rounded-full bg-canvas-card shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-editorial-accent" />
              <span>PRODUCTION ROLES</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP ALTERNATING (CROSS / ZIGZAG) TIMELINE (lg and above)            */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative py-8">
          {/* Central Vertical Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-editorial-border/60">
            {/* Animated drawing beam */}
            <motion.div
              style={{ height: spineHeight }}
              className="w-full bg-gradient-to-b from-editorial-accent via-amber-400 to-editorial-accent shadow-[0_0_12px_var(--accent)] rounded-full origin-top"
            />
          </div>

          <div className="space-y-28">
            {/* ----------------------------------------------------------------- */}
            {/* Milestone 01: WhatBytes (Card Left, Pill/Impact Right)           */}
            {/* ----------------------------------------------------------------- */}
            <div className="relative grid grid-cols-2 gap-16 items-center">
              {/* Left Side: WhatBytes Main Card */}
              <motion.div
                initial={{ opacity: 0, x: -60, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative group pr-6"
              >
                {/* Horizontal Connector to Center Spine */}
                <div className="absolute right-0 top-10 w-10 h-[1px] bg-gradient-to-r from-editorial-border to-editorial-accent/60 group-hover:bg-editorial-accent transition-colors duration-300" />

                <div className="rounded-3xl border border-editorial-border bg-canvas-card p-8 hover:border-editorial-accent/40 transition-all duration-300 shadow-sm hover:shadow-md space-y-6">
                  {/* Card Header */}
                  <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-editorial-border/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-editorial-accent">01</span>
                        <span className="h-[1px] w-4 bg-editorial-border" />
                        <h3 className="text-2xl font-medium tracking-tight text-fg group-hover:text-editorial-accent transition-colors">
                          {workExperiences[0].company}
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
                          {workExperiences[0].type}
                        </span>
                      </div>
                      <p className="text-base font-normal text-fg-muted">
                        {workExperiences[0].role}
                      </p>
                    </div>

                    <div className="text-right text-xs font-mono text-fg-subtle">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-editorial-accent" />
                        <span>{workExperiences[0].period}</span>
                      </div>
                      <p className="text-[11px] text-fg-subtle mt-0.5">{workExperiences[0].location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-fg-muted font-light leading-relaxed">
                    {workExperiences[0].description}
                  </p>

                  {/* Quantified Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {workExperiences[0].metrics?.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-xl bg-canvas-subtle/80 border border-editorial-border"
                      >
                        <p className="text-lg font-mono font-semibold text-fg">{m.value}</p>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-fg-subtle mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bullet achievements */}
                  <div className="space-y-2.5 pt-1">
                    {workExperiences[0].achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent shrink-0 mt-2" />
                        <p className="text-xs text-fg font-light leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="pt-3 border-t border-editorial-border/60 flex flex-wrap gap-1.5">
                    {workExperiences[0].technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-canvas-subtle border border-editorial-border text-fg-subtle hover:text-fg transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Center Node Marker */}
              <div className="absolute left-1/2 top-10 -translate-x-1/2 flex items-center justify-center z-20">
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent/30 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-editorial-accent bg-canvas shadow-sm" />
                </span>
              </div>

              {/* Right Side: Cross Highlighting & Quick Context */}
              <motion.div
                initial={{ opacity: 0, x: 60, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="pl-6 space-y-5"
              >
                <div className="p-6 rounded-2xl border border-editorial-border/80 bg-canvas-card/60 backdrop-blur-sm space-y-4 max-w-md">
                  <div className="flex items-center gap-2 text-xs font-mono text-editorial-accent uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>ASYNC DISTRIBUTED INFRASTRUCTURE</span>
                  </div>
                  <h4 className="text-lg font-medium text-fg">
                    30+ Media Ingestion Feeds &amp; &lt;40ms Feed Querying
                  </h4>
                  <p className="text-xs text-fg-muted font-light leading-relaxed">
                    Designed parallel Celery scraping tasks paired with dynamic IP proxy rotations, reducing ban rates by 98% while streaming real-time community chats via Django Channels and Redis pub/sub.
                  </p>
                  <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-fg-subtle">
                    <span className="px-2 py-0.5 rounded bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
                      HIGH CONCURRENCY
                    </span>
                    <span>500+ DAILY RECORDS</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* Milestone 02: Stealth Startup (Context Left, Card Right)         */}
            {/* ----------------------------------------------------------------- */}
            <div className="relative grid grid-cols-2 gap-16 items-center">
              {/* Left Side: Cross Highlighting & Quick Context */}
              <motion.div
                initial={{ opacity: 0, x: -60, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="pr-6 space-y-5 flex flex-col items-end text-right"
              >
                <div className="p-6 rounded-2xl border border-editorial-border/80 bg-canvas-card/60 backdrop-blur-sm space-y-4 max-w-md text-left">
                  <div className="flex items-center gap-2 text-xs font-mono text-editorial-accent uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>DOCUMENT AI &amp; PROCUREMENT</span>
                  </div>
                  <h4 className="text-lg font-medium text-fg">
                    ~70% Quotation Turnaround Reduction
                  </h4>
                  <p className="text-xs text-fg-muted font-light leading-relaxed">
                    Automated line-item extraction from 25+ procurement PDFs and scans using OCR + LLMs, automatically cross-referencing inventory across 20+ monthly orders with structured tracing.
                  </p>
                  <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-fg-subtle">
                    <span className="px-2 py-0.5 rounded bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
                      -60% DEBUG TIME
                    </span>
                    <span>STRUCTURED LOGGING</span>
                  </div>
                </div>
              </motion.div>

              {/* Center Node Marker */}
              <div className="absolute left-1/2 top-10 -translate-x-1/2 flex items-center justify-center z-20">
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent/30 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-editorial-accent bg-canvas shadow-sm" />
                </span>
              </div>

              {/* Right Side: Stealth Startup Main Card */}
              <motion.div
                initial={{ opacity: 0, x: 60, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative group pl-6"
              >
                {/* Horizontal Connector to Center Spine */}
                <div className="absolute left-0 top-10 w-10 h-[1px] bg-gradient-to-l from-editorial-border to-editorial-accent/60 group-hover:bg-editorial-accent transition-colors duration-300" />

                <div className="rounded-3xl border border-editorial-border bg-canvas-card p-8 hover:border-editorial-accent/40 transition-all duration-300 shadow-sm hover:shadow-md space-y-6">
                  {/* Card Header */}
                  <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-editorial-border/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-editorial-accent">02</span>
                        <span className="h-[1px] w-4 bg-editorial-border" />
                        <h3 className="text-2xl font-medium tracking-tight text-fg group-hover:text-editorial-accent transition-colors">
                          {workExperiences[1].company}
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
                          {workExperiences[1].type}
                        </span>
                      </div>
                      <p className="text-base font-normal text-fg-muted">
                        {workExperiences[1].role}
                      </p>
                    </div>

                    <div className="text-right text-xs font-mono text-fg-subtle">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-editorial-accent" />
                        <span>{workExperiences[1].period}</span>
                      </div>
                      <p className="text-[11px] text-fg-subtle mt-0.5">{workExperiences[1].location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-fg-muted font-light leading-relaxed">
                    {workExperiences[1].description}
                  </p>

                  {/* Quantified Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {workExperiences[1].metrics?.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-xl bg-canvas-subtle/80 border border-editorial-border"
                      >
                        <p className="text-lg font-mono font-semibold text-fg">{m.value}</p>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-fg-subtle mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bullet achievements */}
                  <div className="space-y-2.5 pt-1">
                    {workExperiences[1].achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent shrink-0 mt-2" />
                        <p className="text-xs text-fg font-light leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="pt-3 border-t border-editorial-border/60 flex flex-wrap gap-1.5">
                    {workExperiences[1].technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-canvas-subtle border border-editorial-border text-fg-subtle hover:text-fg transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* Milestone 03: Bennett University & Honors (Card Left, Achievements Right) */}
            {/* ----------------------------------------------------------------- */}
            <div className="relative grid grid-cols-2 gap-16 items-center">
              {/* Left Side: Academic Foundation Card */}
              <motion.div
                initial={{ opacity: 0, x: -60, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative group pr-6"
              >
                {/* Horizontal Connector to Center Spine */}
                <div className="absolute right-0 top-10 w-10 h-[1px] bg-gradient-to-r from-editorial-border to-editorial-accent/60 group-hover:bg-editorial-accent transition-colors duration-300" />

                <div className="rounded-3xl border border-editorial-border bg-canvas-card p-8 hover:border-editorial-accent/40 transition-all duration-300 shadow-sm hover:shadow-md space-y-6">
                  <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-editorial-border/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-editorial-accent">03</span>
                        <span className="h-[1px] w-4 bg-editorial-border" />
                        <h3 className="text-2xl font-medium tracking-tight text-fg group-hover:text-editorial-accent transition-colors">
                          {educationInfo.institution}
                        </h3>
                      </div>
                      <p className="text-sm font-normal text-fg-muted">
                        {educationInfo.degree}
                      </p>
                    </div>

                    <div className="text-right text-xs font-mono text-fg-subtle">
                      <span className="px-3 py-1 rounded-full bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent font-bold">
                        CGPA {educationInfo.cgpa}
                      </span>
                      <p className="text-[11px] text-fg-subtle mt-1">{educationInfo.standing}</p>
                    </div>
                  </div>

                  <p className="text-xs text-fg-muted font-light leading-relaxed">
                    Rigorous computer science curriculum emphasizing algorithm analysis, distributed databases, machine learning systems, and operating systems.
                  </p>

                  <div className="p-4 rounded-xl bg-canvas-subtle/80 border border-editorial-border flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-editorial-accent">
                        HONOR ROLL
                      </p>
                      <p className="text-sm font-medium text-fg mt-0.5">
                        {educationInfo.honors}
                      </p>
                    </div>
                    <Award className="w-5 h-5 text-editorial-accent" />
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-fg-subtle">
                    <span>{educationInfo.location}</span>
                    <span>{educationInfo.period}</span>
                  </div>
                </div>
              </motion.div>

              {/* Center Node Marker */}
              <div className="absolute left-1/2 top-10 -translate-x-1/2 flex items-center justify-center z-20">
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent/30 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-editorial-accent bg-canvas shadow-sm" />
                </span>
              </div>

              {/* Right Side: 3-Pillar Achievements & Research Stack */}
              <motion.div
                initial={{ opacity: 0, x: 60, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="pl-6 space-y-4"
              >
                {achievementsList.map((ach) => (
                  <div
                    key={ach.title}
                    className="p-5 rounded-2xl border border-editorial-border bg-canvas-card/80 hover:border-editorial-accent/40 transition-colors shadow-sm space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-editorial-accent">
                        {ach.tag}
                      </span>
                      <span className="text-xs font-mono font-semibold text-fg bg-canvas-subtle px-2 py-0.5 rounded border border-editorial-border">
                        {ach.metric}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-fg group-hover:text-editorial-accent transition-colors">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-fg-muted font-light leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET ADAPTIVE TIMELINE (< lg)                                  */}
        {/* ========================================================================= */}
        <div className="lg:hidden relative pl-6 sm:pl-8 border-l border-editorial-border/80 space-y-12 ml-2">
          {/* Work Experiences */}
          {workExperiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent/30 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-editorial-accent bg-canvas group-hover:bg-editorial-accent transition-colors duration-300 shadow-sm" />
                </span>
              </div>

              {/* Card Container */}
              <div className="rounded-3xl border border-editorial-border bg-canvas-card p-6 sm:p-8 hover:border-editorial-accent/40 transition-all duration-300 shadow-sm space-y-5">
                <div className="space-y-1.5 pb-4 border-b border-editorial-border/60">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-editorial-accent">
                      0{idx + 1}
                    </span>
                    <span className="h-[1px] w-4 bg-editorial-border" />
                    <h3 className="text-xl font-medium tracking-tight text-fg">
                      {exp.company}
                    </h3>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm font-normal text-fg-muted">{exp.role}</p>
                  <p className="text-[11px] font-mono text-fg-subtle">{exp.period} · {exp.location}</p>
                </div>

                <p className="text-xs text-fg-muted font-light leading-relaxed">
                  {exp.description}
                </p>

                {/* Metrics */}
                {exp.metrics && (
                  <div className="grid grid-cols-2 gap-2">
                    {exp.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 rounded-xl bg-canvas-subtle border border-editorial-border">
                        <p className="text-base font-mono font-semibold text-fg">{m.value}</p>
                        <p className="text-[9px] font-mono uppercase text-fg-subtle">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Achievements */}
                <div className="space-y-2 pt-1">
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent shrink-0 mt-1.5" />
                      <p className="text-xs text-fg font-light leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Tech */}
                <div className="pt-3 border-t border-editorial-border/60 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-canvas-subtle border border-editorial-border text-fg-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Academic Foundation (< lg) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-editorial-accent bg-canvas shadow-sm" />
            </div>

            <div className="rounded-3xl border border-editorial-border bg-canvas-card p-6 sm:p-8 space-y-5">
              <div className="space-y-1 pb-4 border-b border-editorial-border/60">
                <div className="flex items-center gap-2 text-xs font-mono text-editorial-accent uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>ACADEMIC FOUNDATION</span>
                </div>
                <h3 className="text-xl font-medium text-fg">{educationInfo.institution}</h3>
                <p className="text-xs text-fg-muted font-light">{educationInfo.degree}</p>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-editorial-accent">
                    CGPA {educationInfo.cgpa} ({educationInfo.standing})
                  </span>
                  <span>·</span>
                  <span className="text-xs font-mono text-fg-subtle">{educationInfo.period}</span>
                </div>
              </div>

              <div className="space-y-3">
                {achievementsList.map((ach) => (
                  <div key={ach.title} className="p-3.5 rounded-xl border border-editorial-border bg-canvas-subtle/60">
                    <div className="flex justify-between items-center text-[10px] font-mono text-editorial-accent">
                      <span>{ach.tag}</span>
                      <span className="text-fg font-semibold">{ach.metric}</span>
                    </div>
                    <h4 className="text-xs font-medium text-fg mt-1">{ach.title}</h4>
                    <p className="text-[11px] text-fg-muted font-light mt-0.5">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
