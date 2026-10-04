"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

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

// Harmonic chord progression mapped across portfolio chapters (Warm pentatonic / ambient pad)
const CHORD_PROGRESSION = [
  // 1. Hero: C add9 (Warm, inviting, open)
  { osc1: 130.81, osc2: 196.00, osc3: 293.66 }, // C3, G3, D4
  // 2. Experience: Am7 (Reflective, deep, focused)
  { osc1: 110.00, osc2: 164.81, osc3: 261.63 }, // A2, E3, C4
  // 3. Projects: Fmaj7 (Expansive, craft, creative)
  { osc1: 174.61, osc2: 261.63, osc3: 329.63 }, // F3, C4, E4
  // 4. About: G sus2 (Technical, resolved)
  { osc1: 146.83, osc2: 220.00, osc3: 293.66 }, // D3, A3, D4
  // 5. Contact: C maj (Warm harmonic return)
  { osc1: 130.81, osc2: 196.00, osc3: 329.63 }, // C3, G3, E4
];

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Ambient Pad Nodes
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientFilterRef = useRef<BiquadFilterNode | null>(null);
  const ambientOscsRef = useRef<OscillatorNode[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const stopAmbientPad = useCallback(() => {
    try {
      const ctx = audioCtxRef.current;
      const gain = ambientGainRef.current;
      const oscs = [...ambientOscsRef.current];

      if (gain && ctx) {
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
        setTimeout(() => {
          oscs.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
        }, 700);
      } else {
        oscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
      }

      ambientOscsRef.current = [];
      ambientFilterRef.current = null;
      ambientGainRef.current = null;
    } catch {}
  }, []);

  const startAmbientPad = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      stopAmbientPad();

      const now = ctx.currentTime;

      // Filter: warm velvety low-pass filter (cuts harsh highs, warm analog tape aesthetic)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(340, now);
      filter.Q.setValueAtTime(1.8, now);

      // Gain: very gentle, non-intrusive background atmospheric breath
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 1.8);

      // 3 detuned oscillators creating a lush, organic chord pad
      const chord = CHORD_PROGRESSION[0];
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(chord.osc1, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(chord.osc2, now);
      osc2.detune.setValueAtTime(3, now); // +3 cents subtle chorus

      osc3.type = "triangle";
      osc3.frequency.setValueAtTime(chord.osc3, now);
      osc3.detune.setValueAtTime(-4, now); // -4 cents subtle chorus

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      ambientOscsRef.current = [osc1, osc2, osc3];
      ambientFilterRef.current = filter;
      ambientGainRef.current = gain;
    } catch {
      // AudioContext unavailable or blocked
    }
  }, [getAudioContext, stopAmbientPad]);

  // Load user preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_sound_enabled");
    if (saved === "true") {
      setSoundEnabled(true);
      // Modern browsers require 1 interaction before playing audio
      const handleFirstInteraction = () => {
        startAmbientPad();
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
      };
      window.addEventListener("click", handleFirstInteraction, { once: true });
      window.addEventListener("keydown", handleFirstInteraction, { once: true });
    }
  }, [startAmbientPad]);

  // Scroll modulation: shifts harmonic chords and slightly breathes filter on scroll motion
  useEffect(() => {
    if (!soundEnabled) return;

    const handleScroll = () => {
      const ctx = audioCtxRef.current;
      const filter = ambientFilterRef.current;
      if (!ctx || !filter || ambientOscsRef.current.length < 3) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      // Select chord based on page progression
      const chordIndex = Math.min(
        CHORD_PROGRESSION.length - 1,
        Math.floor(progress * CHORD_PROGRESSION.length)
      );
      const chord = CHORD_PROGRESSION[chordIndex];

      const now = ctx.currentTime;
      // Gently glide oscillator frequencies to match chapter chord
      ambientOscsRef.current[0].frequency.setTargetAtTime(chord.osc1, now, 0.9);
      ambientOscsRef.current[1].frequency.setTargetAtTime(chord.osc2, now, 0.9);
      ambientOscsRef.current[2].frequency.setTargetAtTime(chord.osc3, now, 0.9);

      // Gently open low-pass filter during scroll motion (subtle acoustic breath)
      filter.frequency.setTargetAtTime(460, now, 0.2);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (ambientFilterRef.current && audioCtxRef.current) {
          // Settle back to warm resting frequency
          ambientFilterRef.current.frequency.setTargetAtTime(
            340,
            audioCtxRef.current.currentTime,
            0.7
          );
        }
      }, 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [soundEnabled]);

  // Tab visibility management: auto-mute when tab is backgrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (ambientGainRef.current && audioCtxRef.current) {
          ambientGainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.2);
        }
      } else {
        if (soundEnabled && ambientGainRef.current && audioCtxRef.current) {
          ambientGainRef.current.gain.setTargetAtTime(0.025, audioCtxRef.current.currentTime, 0.8);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [soundEnabled]);

  // 1. Soft mechanical click
  const playClickSound = useCallback(() => {
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
    } catch {}
  }, [getAudioContext, soundEnabled]);

  // 2. Tactile keystroke sound for CLI terminal
  const playKeySound = useCallback(() => {
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
    } catch {}
  }, [getAudioContext, soundEnabled]);

  // 3. Subtle tactical tick for carousel / scroll rotation
  const playTickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(560 + Math.random() * 60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.025);
    } catch {}
  }, [getAudioContext, soundEnabled]);


  // 4. Soft success chime
  const playSuccessSound = useCallback(() => {
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
    } catch {}
  }, [getAudioContext]);

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("portfolio_sound_enabled", String(next));
    if (next) {
      setTimeout(() => {
        playSuccessSound();
        startAmbientPad();
      }, 50);
    } else {
      stopAmbientPad();
    }
  }, [playSuccessSound, soundEnabled, startAmbientPad, stopAmbientPad]);

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
