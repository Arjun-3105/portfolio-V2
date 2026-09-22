"use client";

import React, { useState, useEffect } from "react";

interface Chapter {
  id: string;
  num: string;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { id: "hero", num: "01", title: "A CURIOUS MIND" },
  { id: "experience", num: "02", title: "EXPERIENCE" },
  { id: "work", num: "03", title: "THINGS I'VE BUILT" },
  { id: "about", num: "04", title: "BEYOND CODE" },
  { id: "writing", num: "05", title: "DISPATCHES" },
  { id: "contact", num: "06", title: "LET'S BUILD" },
];

export default function ChapterProgress() {
  const [activeChapter, setActiveChapter] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveChapter(CHAPTERS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Story chapter progression"
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 select-none"
    >
      <div className="flex flex-col gap-3">
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              className="group flex items-center justify-end gap-3 text-right text-xs py-1 transition-all"
              aria-label={`Jump to chapter ${ch.num}: ${ch.title}`}
            >
              <span
                className={`text-[10px] font-mono tracking-editorial transition-all duration-300 ${
                  isActive
                    ? "opacity-100 translate-x-0 text-editorial-accent font-semibold"
                    : "opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-fg-subtle"
                }`}
              >
                {ch.num} / {ch.title}
              </span>

              <span
                className={`h-[1px] transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-8 bg-editorial-accent"
                    : "w-3 bg-fg-subtle/30 group-hover:w-5 group-hover:bg-fg-muted"
                }`}
              />

              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "scale-125 bg-editorial-accent shadow-[0_0_8px_var(--accent)]"
                    : "bg-fg-subtle/40 group-hover:bg-fg-muted"
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}

