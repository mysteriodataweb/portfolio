import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export interface ScrollPage {
  image?: string | null;
  heading: string;
  subtitle?: string;
  description: React.ReactNode;
}

interface AnimatedScrollProps {
  pages: ScrollPage[];
  backTo?: string;
}

export default function AnimatedScroll({ pages, backTo }: AnimatedScrollProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const numOfPages = pages.length;
  const scrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setCurrentPage((p) => (p < numOfPages - 1 ? p + 1 : p));
  }, [numOfPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => (p > 0 ? p - 1 : p));
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrolling.current) return;
      scrolling.current = true;
      if (e.deltaY > 0) goNext();
      else goPrev();
      setTimeout(() => (scrolling.current = false), 1400);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolling.current) return;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        scrolling.current = true;
        goPrev();
        setTimeout(() => (scrolling.current = false), 1400);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        scrolling.current = true;
        goNext();
        setTimeout(() => (scrolling.current = false), 1400);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrolling.current || touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      scrolling.current = true;
      if (diff > 0) goNext();
      else goPrev();
      setTimeout(() => (scrolling.current = false), 1400);
      touchStart.current = null;
    };

    const el = containerRef.current || window;
    el.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <div ref={containerRef} className="relative overflow-hidden h-screen bg-[#F7F4EE]">
      {pages.map((page, i) => {
        const isActive = i === currentPage;
        const imgOnLeft = i % 2 === 0;

        return (
          <div key={i} className="absolute inset-0">
            {/* Full-screen background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: page.image ? `url(${page.image})` : undefined,
                backgroundColor: page.image ? "#ddd" : "#F7F4EE",
              }}
            >
              <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* Cream panel on text side */}
            <div
              className="absolute top-0 h-full w-1/2 bg-[#F7F4EE]"
              style={{ [imgOnLeft ? "right" : "left"]: 0 }}
            />

            {/* Text content — real selectable text */}
            <div
              className="absolute top-0 h-full w-1/2 flex items-center z-10"
              style={{ [imgOnLeft ? "right" : "left"]: 0 }}
            >
              <div
                className="w-full max-w-md px-8 md:px-12 select-text"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(25px)",
                  transition: "opacity 0.7s ease 0.35s, transform 0.7s cubic-bezier(0.33, 1, 0.68, 1) 0.35s",
                }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 tracking-tight leading-tight">
                  {page.heading}
                </h2>
                {page.subtitle && (
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-px bg-accent" />
                    <p className="text-xs font-semibold text-accent uppercase tracking-widest">
                      {page.subtitle}
                    </p>
                  </div>
                )}
                <p className="text-base md:text-lg text-[#6B6B6B] leading-[1.8]">
                  {page.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Back button */}
      {backTo && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <Link
            to={backTo}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-white text-sm font-semibold hover:bg-foreground/80 transition-colors shadow-lg"
          >
            <ArrowLeft size={16} /> Retour
          </Link>
        </div>
      )}

      {/* Progress dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentPage === i
                ? "bg-accent scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
