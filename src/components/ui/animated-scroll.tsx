import React, { useState, useEffect, useRef } from "react";

export interface ScrollPage {
  leftBgImage?: string | null;
  rightBgImage?: string | null;
  leftContent?: {
    heading: string;
    description: React.ReactNode;
  } | null;
  rightContent?: {
    heading: string;
    description: React.ReactNode;
  } | null;
}

interface AnimatedScrollProps {
  pages: ScrollPage[];
}

export default function AnimatedScroll({ pages }: AnimatedScrollProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const animTime = 1000;
  const scrolling = useRef(false);

  const navigateUp = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const navigateDown = () => {
    if (currentPage < numOfPages) setCurrentPage((p) => p + 1);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrolling.current) return;
      scrolling.current = true;
      if (e.deltaY > 0) {
        navigateDown();
      } else {
        navigateUp();
      }
      setTimeout(() => (scrolling.current = false), animTime);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolling.current) return;
      if (e.key === "ArrowUp") {
        scrolling.current = true;
        navigateUp();
        setTimeout(() => (scrolling.current = false), animTime);
      } else if (e.key === "ArrowDown") {
        scrolling.current = true;
        navigateDown();
        setTimeout(() => (scrolling.current = false), animTime);
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, numOfPages]);

  return (
    <div className="relative overflow-hidden h-screen bg-black">
      {pages.map((page, i) => {
        const idx = i + 1;
        const isActive = currentPage === idx;
        const downOff = "translateY(100%)";

        return (
          <div key={idx} className="absolute inset-0">
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1000ms]"
              style={{ transform: isActive ? "translateY(0)" : downOff }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: page.leftBgImage
                    ? `url(${page.leftBgImage})`
                    : undefined,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full text-white p-8">
                  {page.leftContent && (
                    <>
                      <h2 className="text-2xl uppercase mb-4 text-center">
                        {page.leftContent.heading}
                      </h2>
                      <p className="text-lg text-center max-w-sm">
                        {page.leftContent.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-[1000ms]"
              style={{ transform: isActive ? "translateY(0)" : downOff }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: page.rightBgImage
                    ? `url(${page.rightBgImage})`
                    : undefined,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full text-white p-8">
                  {page.rightContent && (
                    <>
                      <h2 className="text-2xl uppercase mb-4 text-center">
                        {page.rightContent.heading}
                      </h2>
                      {typeof page.rightContent.description === "string" ? (
                        <p className="text-lg text-center max-w-sm">
                          {page.rightContent.description}
                        </p>
                      ) : (
                        <div className="text-lg text-center max-w-sm">
                          {page.rightContent.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
