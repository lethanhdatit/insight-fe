"use client";

import { useState, useEffect } from "react";

interface MysticalFormProps {
  dictionary: any;
  className?: string;
}

export default function AncientClock({ dictionary, className }: MysticalFormProps) {
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

    return () => clearInterval(timer);
  }, [mounted]);

  const getTimeOfDay = () => {
    const hour = time.getHours();
    if (hour >= 6 && hour < 12) return `${dictionary.clock.morning} (晨)`;
    if (hour >= 12 && hour < 18) return `${dictionary.clock.afternoon} (午)`;
    if (hour >= 18 && hour < 22) return `${dictionary.clock.evening} (暮)`;
    return `${dictionary.clock.night} (夜)`;
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

  // Đảm bảo hình tròn, cân đối, responsive
  let cln = `ancient-clock flex flex-col items-center justify-center aspect-square rounded-full overflow-hidden ${className || ""}`;

  if (!mounted) {
    return (
      <div className={cln}>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="calligraphy-font text-base md:text-lg text-amber-800">
            --:--:--
          </div>
          <div className="ancient-font text-xs md:text-sm text-amber-600">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cln}
      onClick={() => setSoundEnabled(!soundEnabled)}
      style={{ cursor: "pointer" }}
    >
      <div className="zodiac-ring"></div>
      <div className="flex flex-col items-center justify-center w-full h-full px-1">
        {/* Zodiac icon */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-0.5 leading-none">
          {getZodiacSymbol()}
        </div>
        {/* Time */}
        <div className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-amber-900 leading-tight">
          {formatTime(time)}
        </div>
        {/* Time of day */}
        <div className="ancient-font text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-amber-700 leading-tight text-center max-w-full truncate">
          {getTimeOfDay()}
        </div>
        {/* Sound icon */}
        <div className="text-[10px] sm:text-xs mt-0.5 leading-none">
          {soundEnabled ? "🔊" : "🔇"}
        </div>
      </div>
    </div>
  );
}
