"use client";

import React from "react";
import AppWindowFrame from "@/components/ui/AppWindowFrame";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface VaaniCardProps {
  project: Project;
  onOpenCaseStudy: () => void;
}

export default function VaaniCard({ project, onOpenCaseStudy }: VaaniCardProps) {
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
              VOICE INTELLIGENCE · HACKATHON
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg group-hover:text-editorial-accent transition-colors">
                {project.name}
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
                HH GOA 2026
              </span>
            </div>
            <p className="editorial-italic text-base sm:text-lg text-fg-muted">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && (
            <div className="space-y-2 pt-1 border-t border-editorial-border/60">
              {project.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-fg-muted font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent shrink-0 mt-1.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
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
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-editorial text-editorial-accent hover:underline uppercase transition-colors"
            >
              <span>HUGGINGFACE SPACE ↗</span>
            </a>

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

        {/* Right: Production App Showcase (Cols 6-12) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AppWindowFrame
            src={project.image}
            alt="Vaani Hindi Voice RAG application on HuggingFace Spaces"
            url="huggingface.co/spaces/oxarjun/vaani"
            badge="HUGGINGFACE SPACE"
            aspect="aspect-[16/9.5]"
          />
        </div>
      </div>
    </div>
  );
}
