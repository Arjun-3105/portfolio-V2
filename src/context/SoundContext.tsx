"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playKey: () => void;
  playTick: () => void;
  playScrollTick: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playKey: () => {},
  playTick: () => {},
  playScrollTick: () => {},
  playSuccess: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Unlock AudioContext on first user interaction (critical for iOS Safari & Android Chrome)
  useEffect(() => {
    const unlockAudio = () => {
      const ctx = getAudioContext();
      if (ctx) {
        if (ctx.state === "suspended") {
          ctx.resume().catch(() => {});
        }
        try {
          const buffer = ctx.createBuffer(1, 1, 22050);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(0);
        } catch {}
      }
    };

    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("touchend", unlockAudio, { passive: true });
    window.addEventListener("click", unlockAudio, { passive: true });

    return () => {
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
      window.removeEventListener("click", unlockAudio);
    };
  }, [getAudioContext]);

  // Load user preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_sound_enabled");
    if (saved === "true") {
      setSoundEnabled(true);
    }
  }, []);

  // 1. Soft mechanical click for buttons & links
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }, [getAudioContext, soundEnabled]);

  // 2. Punchy tactile keystroke sound for CLI terminal & Command Palette
  const playKeySound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(640 + Math.random() * 80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.024);

      gain.gain.setValueAtTime(0.20, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.024);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.028);
    } catch {}
  }, [getAudioContext, soundEnabled]);

  // 3. Punchy tactile mechanical tick for project carousel
  const playTickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(580 + Math.random() * 60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.024);

      gain.gain.setValueAtTime(0.20, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.024);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.028);
    } catch {}
  }, [getAudioContext, soundEnabled]);

  // 4. Very subtle micro-notch for page scroll (soft & non-intrusive)
  const playScrollTickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(420 + Math.random() * 40, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.014);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.014);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.018);
    } catch {}
  }, [getAudioContext, soundEnabled]);

  // Subtle tactile ratchet feedback on page scroll (desktop & mobile)
  useEffect(() => {
    if (!soundEnabled) return;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let lastTickTime = 0;
    const threshold = 220; // 220px per micro-tick

    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) >= threshold && now - lastTickTime > 120) {
        playScrollTickSound();
        lastScrollY = currentScrollY;
        lastTickTime = now;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [soundEnabled, playScrollTickSound]);

  // 5. Soft success chime (e.g. copied email, toggled audio)
  const playSuccessSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      // Note 1 (C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.13);

      // Note 2 (E5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now + 0.08);
      gain2.gain.setValueAtTime(0.12, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.23);
    } catch {}
  }, [getAudioContext]);

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("portfolio_sound_enabled", String(next));
    if (next) {
      setTimeout(() => {
        playSuccessSound();
      }, 50);
    }
  }, [playSuccessSound, soundEnabled]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick: playClickSound,
        playKey: playKeySound,
        playTick: playTickSound,
        playScrollTick: playScrollTickSound,
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
