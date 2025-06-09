"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface AncientResultDisplayProps {
  result: any;
  dictionary: any;
}

export default function AncientResultDisplay({
  result,
  dictionary,
}: AncientResultDisplayProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentSection, setCurrentSection] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showAllSections, setShowAllSections] = useState(false);

  // Create a ref to store the audio object
  const audioPenWritingRef = useRef<HTMLAudioElement | null>(null);

  const sections = [
    {
      key: "detail",
      title: dictionary.results.detail,
      data: result.explanation.detail || [],
    },
    {
      key: "warning",
      title: dictionary.results.warning,
      data: result.explanation.warning || [],
    },
    {
      key: "advice",
      title: dictionary.results.advice,
      data: result.explanation.advice || [],
    },
    {
      key: "summary",
      title: dictionary.results.summary,
      data: result.explanation.summary || [],
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (audioPenWritingRef.current) {
        audioPenWritingRef.current.pause();
        audioPenWritingRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      if (!audioPenWritingRef.current) {
        audioPenWritingRef.current = new Audio("/sounds/pen-writing.mp3");
        audioPenWritingRef.current.volume = 0.15;
        audioPenWritingRef.current.loop = true;
      }
      // Play the audio
      audioPenWritingRef.current?.play().catch(() => {});
    } else {
      if (audioPenWritingRef.current) {
        audioPenWritingRef.current.pause();
        audioPenWritingRef.current.currentTime = 0;
      }
    }
  }, [isTyping]);

  useEffect(() => {
    if (!mounted || showAllSections) return;

    if (currentSection < sections.length) {
      const section = sections[currentSection];
      let fullText = `${section.title}\n\n`;

      section.data.forEach((item: any) => {
        if (item && item.title && item.content) {
          fullText += `${item.title}\n${item.content}\n\n`;
        }
      });

      let index = 0;
      const typeWriter = () => {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
          setTimeout(typeWriter, 30);
        } else {
          setTimeout(() => {
            setCurrentSection((prev) => prev + 1);
            setDisplayedText("");
          }, 2000);
        }
      };

      typeWriter();
    } else {
      setIsTyping(false);
      setShowAllSections(true);
    }
  }, [currentSection, mounted, showAllSections]);

  const handleSkipAnimation = () => {
    setShowAllSections(true);
    setIsTyping(false);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (
    !result ||
    !result.numbers ||
    !result.explanation
  ) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="ancient-book rounded-lg p-8">
          <div className="parchment rounded-lg p-8 text-center">
            <div className="text-red-600 ancient-font text-lg">              
              {dictionary.results.error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="ancient-book rounded-lg p-8">
          <div className="parchment rounded-lg p-8 text-center">
            <div className="text-amber-800 ancient-font text-lg">              
              {dictionary.results.loading}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Ancient Book Result Display */}
      <div className="ancient-book rounded-lg p-8 book-spine scroll-unfurl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Page - Lucky Numbers */}
          <div className="parchment rounded-lg p-6">
            <div className="text-center border-b-2 border-amber-600 pb-4 mb-6">
              <h2 className="calligraphy-font text-3xl text-amber-800 font-bold">
                {dictionary.results.yourNumbers}
              </h2>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-6 min-h-64">
              {result.numbers.map((number: number, index: number) => (
                <div
                  key={index}
                  className="ancient-number w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold floating-ancient"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {number}
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <div className="text-6xl mb-4">🔮</div>
              <p className="ancient-font text-amber-700 text-lg">                
                {dictionary.results.numberTitle}
              </p>
            </div>
          </div>

          {/* Right Page - Interpretation */}
          <div className="parchment rounded-lg p-6">
            <div className="text-center border-b-2 border-amber-600 pb-4 mb-6">
              <h2 className="calligraphy-font text-3xl text-amber-800 font-bold">                
                {dictionary.results.numberSubTitle}
              </h2>
            </div>

            {/* Control Buttons */}
            {!showAllSections && isTyping && (
              <div className="text-center mb-4">
                <Button
                  onClick={handleSkipAnimation}
                  className="ancient-button ancient-font text-sm py-2 px-4"
                >
                  {dictionary.results.skipDraw}
                </Button>
              </div>
            )}

            {/* Typewriter Effect */}
            {!showAllSections && (
              <div className="min-h-96 relative">
                <pre className="whitespace-pre-wrap ancient-font text-lg leading-relaxed text-amber-900">
                  {displayedText}
                  {isTyping && (
                    <span className="brush-cursor inline-block ml-1">🖌️</span>
                  )}
                </pre>
              </div>
            )}

            {/* All Sections Display */}
            {showAllSections && (
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {sections.map((section, sectionIndex) => (
                  <div
                    key={section.key}
                    className="border-l-4 border-amber-600 pl-4"
                  >
                    <h3 className="calligraphy-font text-xl font-bold text-amber-800 mb-3">
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.data.map((item: any, itemIndex: number) => (
                        <div key={itemIndex} className="mb-4">
                          <h4 className="ancient-font font-bold text-amber-700 mb-1">
                            {item.title}
                          </h4>
                          <p className="ancient-font text-amber-900 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Restart Button */}
        {showAllSections && (
          <div className="text-center pt-8">
            <Button
              onClick={handleRestart}
              className="ancient-button ancient-font text-xl py-4 px-12 rounded-lg"
            >              
              🔮 {dictionary.results.reSubmitButton} 🔮
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
