"use client";

import { useState, useEffect } from "react";

interface MysticalFormProps {
  dictionary: any;
}

export default function AncientClock({ dictionary }: MysticalFormProps) {
  const [time, setTime] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Play time-based ambient sounds
    if (soundEnabled) {
      const hour = time.getHours();
      let soundFile = "";

      if (hour >= 6 && hour < 12) soundFile = "/sounds/morning-birds.mp3";
      else if (hour >= 12 && hour < 18)
        soundFile = "/sounds/afternoon-wind.mp3";
      else if (hour >= 18 && hour < 22)
        soundFile = "/sounds/evening-temple.mp3";
      else soundFile = "/sounds/night-crickets.mp3";

      try {
        const audio = new Audio(soundFile);
        audio.volume = 0.5;
        audio.loop = true;
        audio.play().catch(() => {});
      } catch (error) {
        // Ignore audio errors
      }
    }

    return () => clearInterval(timer);
  }, [mounted, soundEnabled]);

  const getTimeOfDay = () => {
    const hour = time.getHours();
    if (hour >= 6 && hour < 12) return `${dictionary.common.morning} (晨)`;
    if (hour >= 12 && hour < 18) return `${dictionary.common.afternoon} (午)`;
    if (hour >= 18 && hour < 22) return `${dictionary.common.evening} (暮)`;
    return `${dictionary.common.night} (夜)`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getZodiacSymbol = () => {
    const hour = time.getHours();
    const zodiacSymbols = [
      "🐭",
      "🐮",
      "🐯",
      "🐱",
      "🐲",
      "🐍",
      "🐴",
      "🐑",
      "🐵",
      "🐔",
      "🐶",
      "🐷",
    ];
    return zodiacSymbols[Math.floor(hour / 2)];
  };

  if (!mounted) {
    return (
      <div className="ancient-clock w-32 h-32 flex items-center justify-center">
        <div className="text-center">
          <div className="calligraphy-font text-lg text-amber-800">
            --:--:--
          </div>
          <div className="ancient-font text-sm text-amber-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="ancient-clock w-32 h-32 flex items-center justify-center cursor-pointer hover:ancient-glow transition-all duration-300 relative"
      onClick={() => setSoundEnabled(!soundEnabled)}
    >
      <div className="zodiac-ring"></div>
      <div className="text-center">
        <div className="text-2xl mb-1">{getZodiacSymbol()}</div>
        <div className="calligraphy-font text-sm font-bold text-amber-900">
          {formatTime(time)}
        </div>
        <div className="ancient-font text-xs text-amber-700">
          {getTimeOfDay()}
        </div>
        <div className="text-xs mt-1">{soundEnabled ? "🔊" : "🔇"}</div>
      </div>
    </div>
  );
}
