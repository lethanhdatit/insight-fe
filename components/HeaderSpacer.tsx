"use client";
import { useEffect, useRef, useState } from "react";

export default function HeaderSpacer() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById("main-header");
    if (!header) return;
    headerRef.current = header as HTMLElement;

    function updateHeight() {
      setHeight(headerRef.current?.offsetHeight || 0);
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    
    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      // Khi ở top, margin-top = height; khi scroll xuống, giảm dần về 0 (tối đa là height)
      const mt = Math.max(height - scrollY, 0);
      if (main) {
        main.style.marginTop = `${height}px`;
      }
    }

    main.style.transition = "margin-top 0.4s cubic-bezier(.4,0,.2,1)";
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [height]);

  // Không render gì cả, chỉ để đo và set margin
  return null;
}