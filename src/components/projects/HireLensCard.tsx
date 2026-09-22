"use client";

import React from "react";
import AppWindowFrame from "@/components/ui/AppWindowFrame";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface HireLensCardProps {
  project: Project;
  onOpenCaseStudy: () => void;
}

export default function HireLensCard({ project, onOpenCaseStudy }: HireLensCardProps) {
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
              DEVELOPER INTELLIGENCE
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
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-editorial text-editorial-accent hover:underline uppercase transition-colors"
            >
              <span>LIVE DEMO ↗</span>
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
            alt="HireLens AI application interface"
            url="github-profile-analyzer-lime.vercel.app"
            badge="LIVE WEB APP"
            aspect="aspect-[16/9.5]"
          />
        </div>
      </div>
    </div>
  );
}

