"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import CaseStudyModal from "./CaseStudyModal";
import { useSound } from "@/context/SoundContext";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  Sliders,
} from "lucide-react";

export default function SelectedWork() {
  const { playKey } = useSound();
  const [activeIndex, setActiveIndex] = useState(2); // Default to Vaani (03)
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const total = projects.length;
  const lastWheelTime = useRef<number>(0);

  const handleNext = useCallback(() => {
    playKey();
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total, playKey]);

  const handlePrev = useCallback(() => {
    playKey();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total, playKey]);

  // Stage wheel navigation (horizontal trackpad scroll)
  const handleStageWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 240) return;
    if (Math.abs(e.deltaX) > 20) {
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      lastWheelTime.current = now;
    }
  };

  // Keyboard navigation (horizontal arrow keys only, preserving vertical page scroll)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProjectId !== null) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, modalProjectId]);

  const activeProject = projects[activeIndex];
  const activeModalProject = projects.find((p) => p.id === modalProjectId) || null;

  return (
    <section
      id="work"
      className="py-24 px-4 sm:px-8 border-b border-editorial-border bg-canvas overflow-hidden relative"
    >
      {/* Subtle ambient stage glow behind active project */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-editorial-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Chapter Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="editorial-meta text-editorial-accent">03 / THINGS I&apos;VE BUILT</span>
              <span className="h-[1px] w-8 bg-editorial-border" />
              <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
                3D SPATIAL CAROUSEL
              </span>
            </div>

            {/* Stepper counter badge */}
            <div className="flex items-center gap-2 font-mono text-xs text-fg-subtle bg-canvas-card px-3.5 py-1.5 rounded-full border border-editorial-border shadow-xs">
              <span className="text-editorial-accent font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="editorial-headline text-3xl sm:text-4xl md:text-5xl text-fg">
                From ideas to <span className="editorial-italic font-normal text-editorial-accent">real systems.</span>
              </h2>
              <p className="text-sm sm:text-base text-fg-muted font-light mt-1.5 max-w-xl leading-relaxed">
                Swipe, click side cards, or use arrow keys to navigate the 3D project deck.
              </p>
            </div>

            {/* Interactive Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="group flex items-center justify-center w-11 h-11 rounded-full border border-editorial-border bg-canvas-card hover:bg-canvas-subtle hover:border-editorial-accent text-fg transition-all active:scale-95 shadow-sm"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="group flex items-center justify-center w-11 h-11 rounded-full border border-editorial-border bg-canvas-card hover:bg-canvas-subtle hover:border-editorial-accent text-fg transition-all active:scale-95 shadow-sm"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Spatial Carousel Stage */}
        <div
          onWheel={handleStageWheel}
          className="relative w-full h-[580px] sm:h-[640px] flex items-center justify-center select-none"
          style={{ perspective: 1200 }}
        >
          {projects.map((project, index) => {
            // Calculate circular offset relative to active index
            let diff = index - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) return null;

            // 3D positioning calculations
            const xOffset = diff * 320; // horizontal separation
            const zOffset = -Math.abs(diff) * 160; // depth separation
            const rotateY = diff * -24; // 3D yaw angle
            const scale = isCenter ? 1 : Math.max(0.72, 1 - Math.abs(diff) * 0.16);
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(diff) * 0.4);
            const zIndex = 30 - Math.abs(diff) * 10;
            const blur = isCenter ? 0 : Math.abs(diff) * 2;

            return (
              <motion.div
                key={project.id}
                onClick={() => {
                  if (!isCenter) {
                    playKey();
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
                style={{
                  position: "absolute",
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                  cursor: isCenter ? "default" : "pointer",
                }}
                className={`w-[90vw] max-w-[560px] sm:max-w-[660px] rounded-3xl border bg-canvas-card overflow-hidden shadow-2xl transition-colors duration-300 ${
                  isCenter
                    ? "border-editorial-accent/60 shadow-editorial-accent/5 ring-1 ring-editorial-accent/20"
                    : "border-editorial-border hover:border-fg-muted/60"
                }`}
              >
                {/* Window Title Bar */}
                <div className="px-5 py-3 bg-canvas-subtle/80 border-b border-editorial-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono font-bold text-editorial-accent">
                      {project.number}
                    </span>
                    <span className="text-xs font-semibold text-fg tracking-tight">
                      {project.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>LIVE</span>
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-fg-subtle uppercase px-2 py-0.5 rounded bg-canvas border border-editorial-border/60 hidden sm:inline">
                      {project.tags[0]}
                    </span>
                  </div>
                </div>

                {/* App Screenshot Canvas */}
                <div className="relative w-full aspect-[16/9.5] bg-canvas overflow-hidden group">
                  <Image
                    src={project.image}
                    alt={`${project.name} application showcase`}
                    fill
                    priority={isCenter}
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Project Narrative & Details Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="space-y-1">
                    <p className="editorial-italic text-sm sm:text-base text-fg font-normal leading-snug line-clamp-1">
                      {project.tagline}
                    </p>
                    <p className="text-xs text-fg-muted font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-canvas-subtle border border-editorial-border text-fg-subtle uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-editorial-border/60 flex items-center justify-between gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalProjectId(project.id);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fg text-canvas text-xs uppercase font-mono tracking-editorial font-medium hover:opacity-90 transition-all active:scale-95 shadow-sm"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-editorial-accent hover:underline uppercase transition-colors"
                        >
                          <span>Live App ↗</span>
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-fg-subtle hover:text-fg uppercase transition-colors"
                      >
                        GitHub ↗
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Progress Bar & Quick Jump Indicators */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  playKey();
                  setActiveIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-2 bg-editorial-accent shadow-[0_0_8px_var(--accent)]"
                    : "w-2 h-2 bg-fg-subtle/30 hover:bg-fg-muted"
                }`}
                aria-label={`Jump to project ${idx + 1}: ${p.name}`}
              />
            ))}
          </div>

          <p className="text-[11px] font-mono text-fg-subtle tracking-editorial uppercase">
            ACTIVE: <span className="text-fg font-medium">{activeProject.name}</span> · CLICK SIDES OR ARROWS TO ROTATE
          </p>
        </div>

        {/* Global Case Study Reader Modal */}
        <CaseStudyModal
          project={activeModalProject}
          onClose={() => setModalProjectId(null)}
        />
      </div>
    </section>
  );
}
