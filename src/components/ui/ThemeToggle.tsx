"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="group relative flex items-center gap-2 px-2.5 py-1 rounded-full border border-editorial-border hover:border-fg-muted transition-all duration-300 text-xs tracking-editorial"
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span
          className={`absolute inline-flex h-full w-full rounded-full transition-opacity duration-300 ${
            theme === "dark" ? "bg-amber-400 opacity-75 animate-ping" : "bg-stone-800 opacity-0"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-1.5 w-1.5 transition-colors duration-300 ${
            theme === "dark" ? "bg-amber-400" : "bg-stone-800"
          }`}
        />
      </span>
      <span className="text-[11px] font-mono uppercase tracking-wider text-fg-muted group-hover:text-fg transition-colors">
        {theme === "dark" ? "DARK" : "LIGHT"}
      </span>
      <div className="relative w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
        {theme === "dark" ? (
          <Moon className="w-3.5 h-3.5 text-amber-300/80 transition-transform duration-300 rotate-0 group-hover:scale-110" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-stone-700 transition-transform duration-300 rotate-0 group-hover:rotate-45" />
        )}
      </div>
    </button>
  );
}

