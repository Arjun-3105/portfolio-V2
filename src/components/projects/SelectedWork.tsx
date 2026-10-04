"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/projects";
import AppWindowFrame from "@/components/ui/AppWindowFrame";
import CaseStudyModal from "./CaseStudyModal";
import {
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Terminal,
  Sparkles,
  CheckCircle2,
  Code2,
} from "lucide-react";

type CategoryFilter = "all" | "rag" | "systems" | "tools";

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "rag", label: "Backend & RAG" },
  { id: "systems", label: "Systems & Linux" },
  { id: "tools", label: "DevTools & Web" },
];

const PROJECT_CATEGORIES: Record<string, CategoryFilter> = {
  notestamp: "rag",
  legalassistant: "rag",
  vaani: "rag",
  hirelens: "tools",
  emp: "rag",
  lynx: "systems",
  nook: "systems",
  "notion-job-tracker": "tools",
};

export default function SelectedWork() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("all");
  const [activeProjectId, setActiveProjectId] = useState<string>("vaani"); // Default to flagship Vaani
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  // Filtered projects list
  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === "all") return true;
    return PROJECT_CATEGORIES[p.id] === selectedFilter;
  });

  // Ensure active project is valid within filtered list
  useEffect(() => {
    if (!filteredProjects.some((p) => p.id === activeProjectId) && filteredProjects.length > 0) {
      setActiveProjectId(filteredProjects[0].id);
    }
  }, [selectedFilter, filteredProjects, activeProjectId]);

  const activeProject: Project =
    projects.find((p) => p.id === activeProjectId) || projects[0];

  const activeModalProject: Project | null =
    projects.find((p) => p.id === modalProjectId) || null;

  const currentIndex = filteredProjects.findIndex((p) => p.id === activeProjectId);

  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveProjectId(filteredProjects[prevIdx].id);
  };

  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    setActiveProjectId(filteredProjects[nextIdx].id);
  };

  // Keyboard navigation when hovered or active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is inside an input or modal is open
      if (
        modalProjectId !== null ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section id="work" className="py-24 px-6 sm:px-10 border-b border-editorial-border bg-canvas">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Chapter Header & Cockpit Controls */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="editorial-meta text-editorial-accent">03 / THINGS I&apos;VE BUILT</span>
              <span className="h-[1px] w-8 bg-editorial-border" />
              <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
                COMMAND DECK · {String(projects.length).padStart(2, "0")} ARCHIVED
              </span>
            </div>

            {/* Keyboard shortcut hint */}
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-fg-subtle bg-canvas-card px-3 py-1 rounded-full border border-editorial-border">
              <span className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border text-fg font-semibold">↑</span>
              <span className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border text-fg font-semibold">↓</span>
              <span>Use arrow keys to steer deck</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="editorial-headline text-3xl sm:text-4xl md:text-5xl text-fg">
                From ideas to <span className="editorial-italic font-normal text-editorial-accent">real systems.</span>
              </h2>
              <p className="text-sm sm:text-base text-fg-muted font-light mt-2 max-w-2xl leading-relaxed">
                Click any project in the cockpit to inspect the live build, architecture, and case study.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-canvas-card border border-editorial-border">
              {CATEGORIES.map((cat) => {
                const count =
                  cat.id === "all"
                    ? projects.length
                    : projects.filter((p) => PROJECT_CATEGORIES[p.id] === cat.id).length;
                const isSelected = selectedFilter === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-editorial-accent text-canvas font-medium shadow-xs"
                        : "text-fg-muted hover:text-fg hover:bg-canvas-subtle"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-canvas/20 text-canvas" : "bg-canvas-subtle text-fg-subtle"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The 2-Column Command Deck Cockpit */}
        <div ref={deckRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tactile Project Index (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <div className="flex items-center justify-between px-1 text-[11px] font-mono text-fg-subtle uppercase">
              <span>PROJECT INDEX ({filteredProjects.length})</span>
              <span>SELECT TO FOCUS</span>
            </div>

            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1 select-none">
              {filteredProjects.map((project, idx) => {
                const isActive = project.id === activeProjectId;

                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveProjectId(project.id)}
                    className={`group cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative ${
                      isActive
                        ? "bg-canvas-card border-editorial-accent shadow-sm ring-1 ring-editorial-accent/20 translate-x-1"
                        : "bg-canvas-card/60 border-editorial-border hover:border-editorial-border/80 hover:bg-canvas-card hover:translate-x-0.5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-mono font-bold transition-colors ${
                            isActive
                              ? "text-editorial-accent"
                              : "text-fg-subtle group-hover:text-fg"
                          }`}
                        >
                          {project.number}
                        </span>
                        <h4
                          className={`text-base font-medium tracking-tight transition-colors ${
                            isActive
                              ? "text-fg font-semibold"
                              : "text-fg-muted group-hover:text-fg"
                          }`}
                        >
                          {project.name}
                        </h4>
                      </div>

                      {/* Active indicator dot */}
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 mt-1 transition-all duration-300 ${
                          isActive
                            ? "bg-editorial-accent scale-125 shadow-[0_0_8px_var(--accent)]"
                            : "bg-transparent group-hover:bg-fg-subtle/30"
                        }`}
                      />
                    </div>

                    <p className="text-xs text-fg-muted font-light mt-1.5 line-clamp-1">
                      {project.tagline}
                    </p>

                    {/* Quick Tags row */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-editorial-border/50 text-[10px] font-mono text-fg-subtle">
                      {project.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-canvas-subtle border border-editorial-border/60 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                      {project.liveUrl && (
                        <span className="ml-auto text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          <span>LIVE</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cinematic Spotlight Stage (Cols 6-12) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-editorial-border bg-canvas-card p-6 sm:p-8 space-y-6 shadow-sm hover:border-editorial-accent/30 transition-all duration-300"
              >
                {/* Stage Header & Navigator Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-editorial-border/70">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-editorial-accent">
                      {activeProject.number}
                    </span>
                    <span className="h-[1px] w-4 bg-editorial-border" />
                    <span className="text-[10px] font-mono tracking-wider uppercase text-fg-subtle">
                      STAGE SPOTLIGHT
                    </span>
                  </div>

                  {/* Stepper controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-fg-subtle mr-2">
                      {currentIndex + 1} of {filteredProjects.length}
                    </span>
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg border border-editorial-border hover:bg-canvas-subtle text-fg-subtle hover:text-fg transition-colors"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg border border-editorial-border hover:bg-canvas-subtle text-fg-subtle hover:text-fg transition-colors"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* App Showcase Screenshot in Window Frame */}
                <div>
                  <AppWindowFrame
                    src={activeProject.image}
                    alt={`${activeProject.name} application showcase`}
                    url={activeProject.liveUrl || activeProject.githubUrl}
                    badge={activeProject.tags[0]}
                    aspect="aspect-[16/9.5]"
                  />
                </div>

                {/* Project Narrative & Details */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-fg tracking-tight">
                      {activeProject.name}
                    </h3>
                  </div>

                  <p className="editorial-italic text-base sm:text-lg text-fg-muted font-normal">
                    {activeProject.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Key Architecture Highlights */}
                {activeProject.highlights && (
                  <div className="p-4 rounded-2xl bg-canvas-subtle/70 border border-editorial-border/70 space-y-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-fg-subtle">
                      KEY ENGINEERING HIGHLIGHTS
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-fg-muted font-light">
                      {activeProject.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent shrink-0 mt-1.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-canvas border border-editorial-border text-fg-muted uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA Bar */}
                <div className="pt-4 border-t border-editorial-border/60 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setModalProjectId(activeProject.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-canvas text-xs uppercase font-mono tracking-editorial font-medium hover:opacity-90 transition-all active:scale-95 shadow-sm"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-editorial-border hover:border-editorial-accent bg-canvas-card text-editorial-accent hover:text-editorial-accent text-xs font-mono tracking-editorial uppercase transition-colors"
                    >
                      <span>Live Demo ↗</span>
                    </a>
                  )}

                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-editorial text-fg-subtle hover:text-fg uppercase transition-colors py-1"
                  >
                    <span>GitHub Repo ↗</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
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
