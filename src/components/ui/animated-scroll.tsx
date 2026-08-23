import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export interface ScrollPage {
  leftBgImage?: string | null;
  rightBgImage?: string | null;
  leftContent?: {
    heading: string;
    subtitle?: string;
    description: React.ReactNode;
  } | null;
  rightContent?: {
    heading: string;
    subtitle?: string;
    description: React.ReactNode;
  } | null;
}

interface AnimatedScrollProps {
  pages: ScrollPage[];
  backTo?: string;
}

export default function AnimatedScroll({ pages, backTo }: AnimatedScrollProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const scrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const navigateUp = useCallback(() => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  const navigateDown = useCallback(() => {
    setCurrentPage((p) => (p < numOfPages ? p + 1 : p));
  }, [numOfPages]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrolling.current) return;
      scrolling.current = true;
      if (e.deltaY > 0) {
        navigateDown();
      } else {
        navigateUp();
      }
      setTimeout(() => (scrolling.current = false), 1400);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolling.current) return;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        scrolling.current = true;
        navigateUp();
        setTimeout(() => (scrolling.current = false), 1400);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        scrolling.current = true;
        navigateDown();
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
      if (diff > 0) {
        navigateDown();
      } else {
        navigateUp();
      }
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
  }, [navigateDown, navigateUp]);

  return (
    <div ref={containerRef} className="relative overflow-hidden h-screen">
      {pages.map((page, i) => {
        const idx = i + 1;
        const isActive = currentPage === idx;
        const isPrev = currentPage > idx;
        const isNext = currentPage < idx;

        return (
          <div key={idx} className="absolute inset-0">
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full"
              style={{
                transform: isActive
                  ? "translateY(0)"
                  : isPrev
                  ? "translateY(-100%)"
                  : "translateY(100%)",
                transition: isActive
                  ? "transform 1s cubic-bezier(0.77, 0, 0.175, 1) 0.15s, opacity 0.8s ease 0.15s"
                  : "transform 1s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.6s ease",
                opacity: isActive ? 1 : 0,
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: page.leftBgImage
                    ? `url(${page.leftBgImage})`
                    : undefined,
                  backgroundColor: page.leftBgImage ? undefined : "#F7F4EE",
                }}
              >
                {page.leftBgImage && (
                  <div className="absolute inset-0 bg-black/20" />
                )}
                <div className="relative flex flex-col items-center justify-center h-full p-8 md:p-12">
                  {page.leftContent && (
                    <div
                      className="text-center max-w-md"
                      style={{
                        transform: isActive ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
                        transition: "transform 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.4s, opacity 0.6s ease 0.4s",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <h2
                        className={`text-3xl md:text-4xl uppercase mb-3 tracking-wide font-heading font-bold ${
                          page.leftBgImage ? "text-white" : "text-foreground"
                        }`}
                      >
                        {page.leftContent.heading}
                      </h2>
                      {page.leftContent.subtitle && (
                        <p
                          className={`text-sm mb-4 font-medium ${
                            page.leftBgImage ? "text-white/70" : "text-accent"
                          }`}
                        >
                          {page.leftContent.subtitle}
                        </p>
                      )}
                      <div
                        className={`text-base md:text-lg leading-relaxed ${
                          page.leftBgImage ? "text-white/90" : "text-[#6B6B6B]"
                        }`}
                      >
                        {page.leftContent.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full"
              style={{
                transform: isActive
                  ? "translateY(0)"
                  : isPrev
                  ? "translateY(-100%)"
                  : "translateY(100%)",
                transition: isActive
                  ? "transform 1s cubic-bezier(0.77, 0, 0.175, 1) 0.3s, opacity 0.8s ease 0.3s"
                  : "transform 1s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.6s ease",
                opacity: isActive ? 1 : 0,
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: page.rightBgImage
                    ? `url(${page.rightBgImage})`
                    : undefined,
                  backgroundColor: page.rightBgImage ? undefined : "#F7F4EE",
                }}
              >
                {page.rightBgImage && (
                  <div className="absolute inset-0 bg-black/20" />
                )}
                <div className="relative flex flex-col items-center justify-center h-full p-8 md:p-12">
                  {page.rightContent && (
                    <div
                      className="text-center max-w-md"
                      style={{
                        transform: isActive ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
                        transition: "transform 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.55s, opacity 0.6s ease 0.55s",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <h2
                        className={`text-3xl md:text-4xl uppercase mb-3 tracking-wide font-heading font-bold ${
                          page.rightBgImage ? "text-white" : "text-foreground"
                        }`}
                      >
                        {page.rightContent.heading}
                      </h2>
                      {page.rightContent.subtitle && (
                        <p
                          className={`text-sm mb-4 font-medium ${
                            page.rightBgImage ? "text-white/70" : "text-accent"
                          }`}
                        >
                          {page.rightContent.subtitle}
                        </p>
                      )}
                      <div
                        className={`text-base md:text-lg leading-relaxed ${
                          page.rightBgImage ? "text-white/90" : "text-[#6B6B6B]"
                        }`}
                      >
                        {page.rightContent.description}
                      </div>
                    </div>
                  )}
                </div>
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
            onClick={() => setCurrentPage(i + 1)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentPage === i + 1
                ? "bg-accent scale-125"
                : "bg-foreground/20 hover:bg-foreground/40"
            }`}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
