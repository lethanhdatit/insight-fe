"use client";
import { useState } from "react";

export default function Footer({ lang, dictionary }: { lang: string | undefined, dictionary: any }) {
  const [currentLang, setCurrentLang] = useState(lang);
  const [loading, setLoading] = useState(false);

  const t = dictionary.footer;

  const handleLangChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    if (!newLang || newLang === currentLang) return;
    setLoading(true);
    setCurrentLang(newLang);
    const callbackUrl = window.location.href;
    await fetch("/api/lang/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: newLang, callbackUrl }),
    });
    setLoading(false);

    const url = new URL(callbackUrl);
    const segments = url.pathname.split("/");
    if (segments[1] === "vi" || segments[1] === "en") {
      segments[1] = newLang;
      url.pathname = segments.join("/");
      window.location.href = url.toString();
    } else {
      window.location.reload();
    }
  };

  return (
    <footer className="w-full flex justify-between items-center px-6 py-4 bg-[var(--parchment)] border-t-2 border-[var(--ancient-bronze)] ancient-font">
      <div className="flex items-center gap-3">
        <span className="text-[var(--ancient-brown)] text-base">
          {t.language}:{" "}
          {/* <b
            className={
              "ml-1 px-2 py-1 rounded ancient-glow " +
              (currentLang === "vi"
                ? "bg-[var(--ancient-gold)] text-[var(--ink-black)]"
                : "bg-[var(--ancient-bronze)] text-white")
            }
          >
            {currentLang === "vi" ? t.vietnamese : t.english}
          </b> */}
        </span>
        <select
          name="lang"
          value={currentLang}
          onChange={handleLangChange}
          className="ancient-select px-3 py-1 rounded border-2 border-[var(--ancient-bronze)] focus:border-[var(--ancient-gold)] focus:shadow-[0_0_8px_var(--ancient-gold)] transition"
          disabled={loading}
        >
          <option value="vi">{t.vietnamese}</option>
          <option value="en">{t.english}</option>
        </select>
        {loading && (
          <span className="ml-2 text-[var(--ancient-gold)] mystical-text-glow animate-pulse">
            {t.loading}
          </span>
        )}
      </div>
      <div className="text-[var(--ancient-brown)] text-sm opacity-80">
        {t.copyright.replace("{year}", new Date().getFullYear().toString())}
      </div>
    </footer>
  );
}