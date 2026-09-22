"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Newspaper, Layers, Eye, ShieldCheck } from "lucide-react";
import { Project } from "@/data/projects";

interface VaporMediaCardProps {
  project: Project;
  onOpenCaseStudy: () => void;
}

export default function VaporMediaCard({ project, onOpenCaseStudy }: VaporMediaCardProps) {
  const [selectedCard, setSelectedCard] = useState<number>(0);

  const sampleArticles = [
    {
      topic: "WORLD / AI",
      title: "The next era of AI is more open than ever.",
      readTime: "2 min read",
      sources: 14,
      biasScore: "Neutral / Balanced",
      summary:
        "Global consensus reveals accelerated migration toward decentralized weights and open evaluation benchmarks.",
    },
    {
      topic: "SCIENCE",
      title: "A second Earth might be closer than we think.",
      readTime: "3 min read",
      sources: 8,
      biasScore: "Empirical Consensus",
      summary:
        "Spectroscopy data from next-gen atmospheric probes detect biosignature precursors on habitable-zone exoplanets.",
    },
    {
      topic: "URBANISM",
      title: "How cities are rethinking the future of human pace.",
      readTime: "2 min read",
      sources: 11,
      biasScore: "Multi-Perspective",
      summary:
        "Architectural decentralization and pedestrian-first corridors replace high-density car congestion models.",
    },
  ];

  return (
    <div className="group rounded-3xl border border-editorial-border bg-canvas-card overflow-hidden hover:border-editorial-accent/30 transition-all duration-500 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 items-center">
        {/* Left: Narrative & Metadata (Cols 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-editorial-accent tracking-widest">
              {project.number}
            </span>
            <span className="h-[1px] w-6 bg-editorial-border" />
            <span className="text-[10px] font-mono tracking-ultrawide uppercase text-fg-subtle">
              NEWS INTELLIGENCE
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg group-hover:text-editorial-accent transition-colors">
              {project.name}
            </h3>
            <p className="editorial-italic text-base sm:text-lg text-fg-muted">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
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

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenCaseStudy}
              className="group/btn inline-flex items-center gap-2 text-xs uppercase font-mono tracking-editorial text-fg hover:text-editorial-accent transition-colors py-1"
            >
              <span className="font-semibold">VIEW CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono tracking-editorial text-fg-subtle hover:text-fg uppercase transition-colors"
            >
              GITHUB ↗
            </a>
          </div>
        </div>

        {/* Right: Layered 3D Perspective Cards Preview (Cols 6-12) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative p-6 sm:p-8 rounded-2xl border border-editorial-border bg-canvas-subtle overflow-hidden">
            {/* Header metadata */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-editorial-border/60 text-xs font-mono">
              <span className="flex items-center gap-2 text-fg">
                <Newspaper className="w-3.5 h-3.5 text-editorial-accent" />
                <span>SYNTHESIZED NARRATIVE DECK</span>
              </span>
              <span className="text-fg-subtle text-[10px]">
                {sampleArticles.length} CLUSTERS DISCOVERED
              </span>
            </div>

            {/* Interactive Fanned Deck */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sampleArticles.map((art, idx) => {
                const isSelected = selectedCard === idx;
                return (
                  <div
                    key={art.title}
                    onClick={() => setSelectedCard(idx)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? "bg-canvas-card border-editorial-accent shadow-md -translate-y-1"
                        : "bg-canvas-card/60 border-editorial-border hover:border-fg-subtle/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-fg-subtle mb-2">
                        <span className="text-editorial-accent">{art.topic}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h4 className="text-xs font-medium text-fg leading-snug">
                        {art.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-editorial-border/50 flex items-center justify-between text-[9px] font-mono text-fg-subtle">
                      <span className="flex items-center gap-1">
                        <Layers className="w-2.5 h-2.5" />
                        <span>{art.sources} outlets</span>
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {art.biasScore}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expanded active article brief */}
            <div className="mt-4 p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-ultrawide text-editorial-accent flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>DEDUPLICATED CONSENSUS BRIEF</span>
                </span>
                <span className="text-[10px] font-mono text-fg-subtle">
                  Zero ads · No clickbait
                </span>
              </div>
              <p className="text-xs text-fg-muted font-light leading-relaxed">
                {sampleArticles[selectedCard].summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

