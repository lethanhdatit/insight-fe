"use client";
import { useState } from "react";
import { Locale } from '@/lib/i18n/locales';

export default function LanguageSelectPopup({
  onSelected,
  currentLang,
  dictionary,
}: {
  onSelected?: () => void;
  currentLang: Locale | undefined;
  dictionary: any;
}) {
  const [loading, setLoading] = useState(false);

  const t = dictionary.languagePopup;

  const handleSelect = async (lang: string) => {
    if (lang === currentLang) return;
    setLoading(true);
    const callbackUrl = window.location.href;
    await fetch("/api/lang/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, callbackUrl }),
    });
    setLoading(false);
    if (onSelected) onSelected();
    const url = new URL(callbackUrl);
    const segments = url.pathname.split("/");
    if (segments[1] === "vi" || segments[1] === "en") {
      segments[1] = lang;
      url.pathname = segments.join("/");
      window.location.href = url.toString();
    } else {
      window.location.reload();
    }
  };

  const langs = [
    { code: "vi", label: t.vietnamese },
    { code: "en", label: t.english },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-start justify-center pt-20">
      <div className="bg-[var(--parchment)] rounded-lg shadow-xl px-8 py-6 w-full max-w-md flex flex-col items-center border-2 border-[var(--ancient-bronze)]">
        <h2 className="text-xl font-bold mb-4 mystical-font">
          {t.title}
        </h2>
        <div className="flex flex-col gap-3 w-full">
          {langs.map((l) => (
            <button
              key={l.code}
              className={
                `ancient-button w-full py-2 text-lg transition-all duration-200` +
                (currentLang === l.code
                  ? " border-4 border-[var(--ancient-gold)] bg-[var(--ancient-cream)] text-[var(--ancient-red)] font-bold ancient-glow"
                  : " border-2 border-[var(--ancient-bronze)] opacity-80 hover:opacity-100")
              }
              style={
                currentLang === l.code
                  ? { boxShadow: "0 0 16px var(--ancient-gold), 0 0 4px var(--ancient-bronze)" }
                  : {}
              }
              onClick={() => handleSelect(l.code)}
              disabled={loading || currentLang === l.code}
              aria-current={currentLang === l.code ? "true" : undefined}
            >
              {l.label}
              {currentLang === l.code && (
                <span className="ml-2 ancient-text-glow text-[var(--ancient-gold)]">
                  {t.selectedMark}
                </span>
              )}
            </button>
          ))}
        </div>
        {loading && (
          <div className="mt-4 text-[var(--ancient-gold)] mystical-text-glow">
            {t.saving}
          </div>
        )}
      </div>
    </div>
  );
}