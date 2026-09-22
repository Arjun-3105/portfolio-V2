"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { X, ArrowUpRight, Github, CheckCircle2, Cpu, Lightbulb, AlertTriangle, Layers, BookOpen } from "lucide-react";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Case Study Container */}
      <div className="relative w-full max-w-5xl my-auto bg-canvas border border-editorial-border rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5 bg-canvas/90 backdrop-blur-md border-b border-editorial-border">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-editorial-accent tracking-widest">
              CASE STUDY · {project.number}
            </span>
            <span className="h-[1px] w-6 bg-editorial-border" />
            <h2 className="text-sm sm:text-base font-medium tracking-editorial uppercase text-fg">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border border-editorial-border hover:border-fg-muted text-fg-muted hover:text-fg transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB REPO</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close case study"
              className="p-2 rounded-full border border-editorial-border hover:bg-canvas-hover text-fg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Narrative Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-12">
          {/* Hero Banner inside case study */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-canvas-subtle border border-editorial-border text-fg-subtle uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="editorial-headline text-3xl sm:text-5xl text-fg">
              {project.name}: {project.tagline}
            </h1>

            <p className="text-base text-fg-muted font-light leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Real Project Image preview showcase */}
          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-2xl overflow-hidden border border-editorial-border bg-canvas-subtle shadow-inner">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* The Story Grid: 2-Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 01 The Problem */}
            <div className="p-6 rounded-2xl border border-editorial-border bg-canvas-card space-y-3">
              <div className="flex items-center gap-2 text-rose-500 text-xs font-mono uppercase tracking-widest">
                <AlertTriangle className="w-4 h-4" />
                <span>01 / THE PROBLEM</span>
              </div>
              <h3 className="text-lg font-medium text-fg">What was broken or missing?</h3>
              <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            {/* 02 The Idea */}
            <div className="p-6 rounded-2xl border border-editorial-border bg-canvas-card space-y-3">
              <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono uppercase tracking-widest">
                <Lightbulb className="w-4 h-4" />
                <span>02 / THE IDEA</span>
              </div>
              <h3 className="text-lg font-medium text-fg">The conceptual thesis</h3>
              <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
                {project.caseStudy.idea}
              </p>
            </div>
          </div>

          {/* 03 The System Architecture */}
          <div className="p-8 rounded-2xl border border-editorial-border bg-canvas-card space-y-6">
            <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>03 / THE SYSTEM ARCHITECTURE</span>
            </div>

            <div>
              <h3 className="text-xl font-medium text-fg">Technical Blueprint</h3>
              <p className="text-xs sm:text-sm text-fg-muted font-light mt-1">
                {project.caseStudy.system.overview}
              </p>
            </div>

            {/* Architectural Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {project.caseStudy.system.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-editorial-border bg-canvas-subtle space-y-1.5"
                >
                  <span className="text-[10px] font-mono text-editorial-accent">STEP 0{idx + 1}</span>
                  <p className="text-xs text-fg leading-relaxed">{arch}</p>
                </div>
              ))}
            </div>

            {/* Technologies Stack */}
            <div className="pt-4 border-t border-editorial-border/60">
              <p className="text-[10px] font-mono uppercase tracking-ultrawide text-fg-subtle mb-2">
                TECHNOLOGY STACK
              </p>
              <div className="flex flex-wrap gap-2">
                {project.caseStudy.system.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-canvas-subtle border border-editorial-border text-fg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 04 The Build & Decisions */}
          <div className="p-8 rounded-2xl border border-editorial-border bg-canvas-card space-y-5">
            <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>04 / THE BUILD</span>
            </div>

            <h3 className="text-xl font-medium text-fg">Engineering Tradeoffs &amp; Decisions</h3>
            <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
              {project.caseStudy.build.details}
            </p>

            <div className="space-y-2.5 pt-2">
              {project.caseStudy.build.keyDecisions.map((dec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-canvas-subtle border border-editorial-border text-xs text-fg-muted">
                  <CheckCircle2 className="w-4 h-4 text-editorial-accent shrink-0 mt-0.5" />
                  <span>{dec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 05 The Results */}
          <div className="p-8 rounded-2xl border border-editorial-border bg-canvas-card space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4" />
              <span>05 / THE RESULTS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.caseStudy.result.metrics.map((m, i) => (
                <div key={i} className="p-4 rounded-xl border border-editorial-border bg-canvas-subtle">
                  <p className="text-base font-semibold text-fg">{m}</p>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
              {project.caseStudy.result.outcome}
            </p>
          </div>

          {/* 06 What I Learned (Editorial Heart) */}
          <div className="p-8 rounded-2xl border border-editorial-accent/40 bg-canvas-card space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>06 / WHAT I LEARNED — THE HONEST TAKEAWAY</span>
            </div>

            <blockquote className="editorial-italic text-lg sm:text-xl text-fg leading-relaxed">
              &ldquo;{project.caseStudy.learnings}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-10 py-4 bg-canvas border-t border-editorial-border flex items-center justify-between">
          <span className="text-[11px] font-mono text-fg-subtle uppercase">
            END OF CASE STUDY
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-fg text-canvas text-xs font-mono uppercase tracking-editorial"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

