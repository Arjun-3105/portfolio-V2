"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";

interface AppWindowFrameProps {
  src: string;
  alt: string;
  url?: string;
  badge?: string;
  aspect?: string;
}

export default function AppWindowFrame({
  src,
  alt,
  url,
  badge,
  aspect = "aspect-[16/10]",
}: AppWindowFrameProps) {
  return (
    <div className="group/window relative rounded-2xl border border-editorial-border bg-canvas-card overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-editorial-accent/40">
      {/* Editorial Window Header */}
      <div className="px-4 py-2.5 bg-canvas-subtle/80 backdrop-blur-md border-b border-editorial-border flex items-center justify-between">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
        </div>

        {/* Center URL chip */}
        {url && (
          <a
            href={url.startsWith("http") ? url : `https://${url}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-canvas/60 border border-editorial-border text-[10px] font-mono text-fg-muted hover:text-fg hover:border-editorial-accent transition-colors"
          >
            <span className="truncate max-w-[200px] sm:max-w-[320px]">{url.replace(/^https?:\/\//, "")}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        )}

        {/* Right Badge */}
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-fg-subtle uppercase tracking-wider">
          <Sparkles className="w-2.5 h-2.5 text-editorial-accent" />
          <span className="hidden sm:inline">{badge || "PRODUCTION"}</span>
        </div>
      </div>

      {/* Pure App Screenshot Area */}
      <div className={`relative w-full ${aspect} bg-canvas overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover/window:scale-[1.015]"
        />
        {/* Subtle interior edge highlight */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-b-2xl" />
      </div>
    </div>
  );
}

