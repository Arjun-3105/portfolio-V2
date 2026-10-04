"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { projects } from "@/data/projects";
import {
  Search,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  ArrowRight,
  FolderGit2,
  Compass,
  FileText,
  CornerDownLeft,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Socials";
  label: string;
  desc?: string;
  icon: React.ElementType;
  badge?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudy: (projectId: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenCaseStudy,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playKey, playClick, playSuccess } = useSound();

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("arjun.chaudhary3105@gmail.com");
    playSuccess();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  // Commands Registry
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      category: "Navigation",
      label: "Jump to Hero",
      desc: "Chapter 01 · Introduction & Bio",
      icon: Compass,
      action: () => {
        playClick();
        scrollTo("hero");
      },
    },
    {
      id: "nav-experience",
      category: "Navigation",
      label: "Jump to Experience",
      desc: "Chapter 02 · WhatBytes & Stealth Internships",
      icon: Compass,
      action: () => {
        playClick();
        scrollTo("experience");
      },
    },
    {
      id: "nav-work",
      category: "Navigation",
      label: "Jump to Projects",
      desc: "Chapter 03 · 3D Spatial Carousel (08 Repos)",
      icon: FolderGit2,
      action: () => {
        playClick();
        scrollTo("work");
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      label: "Jump to About",
      desc: "Chapter 04 · Background & Interactive CLI",
      icon: Terminal,
      action: () => {
        playClick();
        scrollTo("about");
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      label: "Jump to Contact",
      desc: "Chapter 05 · Get in touch & socials",
      icon: Compass,
      action: () => {
        playClick();
        scrollTo("contact");
      },
    },

    // Projects deep dives
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      category: "Projects" as const,
      label: `${p.number} / ${p.name}`,
      desc: p.tagline,
      icon: FileText,
      badge: p.tags[0],
      action: () => {
        playClick();
        onClose();
        setTimeout(() => onOpenCaseStudy(p.id), 120);
      },
    })),

    // Actions & Tools
    {
      id: "act-copy-email",
      category: "Actions",
      label: copied ? "Copied Email!" : "Copy Email Address",
      desc: "arjun.chaudhary3105@gmail.com",
      icon: copied ? Check : Copy,
      badge: "CLIPBOARD",
      action: copyEmail,
    },
    {
      id: "act-theme",
      category: "Actions",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      desc: `Currently in ${theme} mode`,
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        playClick();
        toggleTheme();
      },
    },
    {
      id: "act-sound",
      category: "Actions",
      label: soundEnabled ? "Disable UI Sound Effects" : "Enable Tactile UI Sound",
      desc: soundEnabled ? "Mute Web Audio synthesized clicks" : "Turn on mechanical click feedback",
      icon: soundEnabled ? VolumeX : Volume2,
      badge: soundEnabled ? "ON" : "OFF",
      action: () => {
        toggleSound();
      },
    },

    // External Socials
    {
      id: "soc-github",
      category: "Socials",
      label: "Open GitHub Profile",
      desc: "github.com/Arjun-3105",
      icon: ExternalLink,
      badge: "EXTERNAL",
      action: () => {
        playClick();
        window.open("https://github.com/Arjun-3105", "_blank");
        onClose();
      },
    },
    {
      id: "soc-linkedin",
      category: "Socials",
      label: "Open LinkedIn Profile",
      desc: "linkedin.com/in/0xarjun1",
      icon: ExternalLink,
      badge: "EXTERNAL",
      action: () => {
        playClick();
        window.open("https://linkedin.com/in/0xarjun1", "_blank");
        onClose();
      },
    },
    {
      id: "soc-leetcode",
      category: "Socials",
      label: "Open LeetCode Profile",
      desc: "leetcode.com/0xarjun (400+ Solved)",
      icon: ExternalLink,
      badge: "EXTERNAL",
      action: () => {
        playClick();
        window.open("https://leetcode.com/0xarjun", "_blank");
        onClose();
      },
    },
  ];

  // Filter commands by query
  const filtered = commands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(q) ||
      (cmd.desc && cmd.desc.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Keep index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation within palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      playKey();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playKey();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* CLI Palette Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-2xl border border-editorial-border bg-canvas-card shadow-2xl overflow-hidden z-10 font-sans"
          >
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-2.5 bg-canvas-subtle/80 border-b border-editorial-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-[11px] font-mono text-fg-subtle">
                  arjun@cli:~$ command-palette
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-fg-subtle">
                <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">ESC</kbd>
                <span>to close</span>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="p-4 border-b border-editorial-border/60 flex items-center gap-3 bg-canvas/40">
              <span className="text-emerald-500 font-bold font-mono text-sm">➜</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  playKey();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, project, or section name..."
                aria-label="Command search"
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-fg placeholder:text-fg-subtle/60"
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-[10px] font-mono text-fg-subtle hover:text-fg"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 select-none">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-fg-subtle space-y-1">
                  <p>No commands or projects matching &ldquo;{query}&rdquo;</p>
                  <p className="text-[11px] text-fg-subtle/70">Try searching &ldquo;Vaani&rdquo;, &ldquo;Email&rdquo;, or &ldquo;Experience&rdquo;</p>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-canvas-subtle border border-editorial-accent/30 text-fg shadow-xs"
                          : "text-fg-muted hover:bg-canvas-subtle/60 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-editorial-accent/15 text-editorial-accent"
                              : "bg-canvas border border-editorial-border text-fg-subtle"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        <div className="min-w-0">
                          <p className={`text-xs font-medium truncate ${isSelected ? "text-fg" : "text-fg-muted"}`}>
                            {item.label}
                          </p>
                          {item.desc && (
                            <p className="text-[11px] text-fg-subtle truncate font-light">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {item.badge && (
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-canvas border border-editorial-border text-fg-subtle">
                            {item.badge}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-mono transition-opacity ${
                            isSelected ? "opacity-100 text-editorial-accent" : "opacity-0"
                          }`}
                        >
                          ↵
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2.5 bg-canvas-subtle/60 border-t border-editorial-border flex items-center justify-between text-[10px] font-mono text-fg-subtle">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span className="text-editorial-accent">CLI COMMAND PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
