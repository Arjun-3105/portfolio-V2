"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playKey: () => void;
  playTick: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playKey: () => {},
  playTick: () => {},
  playSuccess: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_sound_enabled");
    if (saved === "true") {
      setSoundEnabled(true);
    }
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("portfolio_sound_enabled", String(next));
    if (next) {
      // Play a confirmation sound
      setTimeout(() => playSuccessSound(), 50);
    }
  };

  // Pure Web Audio API synthesized sounds (zero network requests, zero file loading)

  // 1. Soft mechanical click
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(360, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  // 2. Tactile keystroke sound for CLI terminal
  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(600 + Math.random() * 80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // AudioContext unavailable
    }
  };

  // 3. Subtle tick for carousel rotation
  const playTickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // AudioContext unavailable
    }
  };

  // 4. Soft success chime
  const playSuccessSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Note 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.13);

      // Note 2
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain2.gain.setValueAtTime(0.08, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.23);
    } catch {
      // AudioContext unavailable
    }
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick: playClickSound,
        playKey: playKeySound,
        playTick: playTickSound,
        playSuccess: playSuccessSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
