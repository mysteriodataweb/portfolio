"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  skills?: { name: string; level: number }[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
  dark?: boolean;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
  dark = true,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    if (dark) {
      switch (status) {
        case "completed":
          return "text-white bg-black border-white";
        case "in-progress":
          return "text-black bg-white border-black";
        case "pending":
          return "text-white bg-black/40 border-white/50";
        default:
          return "text-white bg-black/40 border-white/50";
      }
    }
    switch (status) {
      case "completed":
        return "text-black bg-white border-black";
      case "in-progress":
        return "text-white bg-black border-white";
      case "pending":
        return "text-black bg-black/5 border-black/30";
      default:
        return "text-black bg-black/5 border-black/30";
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden",
        className,
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-accent via-[#3B82F6] to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div
              className={`absolute w-20 h-20 rounded-full border animate-ping opacity-70 ${
                dark ? "border-white/20" : "border-black/10"
              }`}
            ></div>
            <div
              className={`absolute w-24 h-24 rounded-full border animate-ping opacity-50 ${
                dark ? "border-white/10" : "border-black/10"
              }`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className={`w-8 h-8 rounded-full backdrop-blur-md ${
                dark ? "bg-white/80" : "bg-black/70"
              }`}
            ></div>
          </div>

          <div
            className={`absolute w-96 h-96 rounded-full border ${
              dark ? "border-white/10" : "border-black/10"
            }`}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${
                      dark
                        ? "rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%"
                        : "rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%"
                    })`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? dark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isRelated
                        ? dark
                          ? "bg-white/50 text-black"
                          : "bg-black/10 text-black"
                        : dark
                          ? "bg-black text-white"
                          : "bg-white text-black"
                  }
                  border-2
                  ${
                    isExpanded
                      ? dark
                        ? "border-white shadow-lg shadow-white/30"
                        : "border-black shadow-lg shadow-black/20"
                      : isRelated
                        ? dark
                          ? "border-white animate-pulse"
                          : "border-black/30 animate-pulse"
                        : dark
                          ? "border-white/40"
                          : "border-black/20"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12  whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${
                    isExpanded
                      ? dark
                        ? "text-white scale-125"
                        : "text-black scale-125"
                      : dark
                        ? "text-white/70"
                        : "text-black/60"
                  }
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card
                    className={cn(
                      "absolute top-20 left-1/2 -translate-x-1/2 w-64 backdrop-blur-lg shadow-xl overflow-visible",
                      dark
                        ? "bg-black/90 border-white/30 shadow-white/10"
                        : "bg-white/95 border-black/10 shadow-black/10",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3",
                        dark ? "bg-white/50" : "bg-black/20",
                      )}
                    ></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status,
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span
                          className={cn(
                            "text-xs font-mono",
                            dark ? "text-white/50" : "text-black/50",
                          )}
                        >
                          {item.date}
                        </span>
                      </div>
                      <CardTitle
                        className={cn(
                          "text-sm mt-2",
                          dark ? "text-white" : "text-black",
                        )}
                      >
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={cn(
                        "text-xs max-h-[260px] overflow-y-auto",
                        dark ? "text-white/80" : "text-black/80",
                      )}
                    >
                      <p>{item.content}</p>

                      {item.skills && item.skills.length > 0 && (
                        <div
                          className={cn(
                            "mt-4 pt-3 border-t",
                            dark ? "border-white/10" : "border-black/10",
                          )}
                        >
                          <div className="flex items-center mb-2">
                            <BarChart3
                              size={10}
                              className={cn(
                                "mr-1",
                                dark ? "text-white/70" : "text-black/60",
                              )}
                            />
                            <h4
                              className={cn(
                                "text-xs uppercase tracking-wider font-medium",
                                dark ? "text-white/70" : "text-black/60",
                              )}
                            >
                              Niveau
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {item.skills.map((skill) => (
                              <div key={skill.name}>
                                <div className="flex justify-between items-center mb-0.5 gap-2">
                                  <span
                                    className={cn(
                                      "text-[11px]",
                                      dark ? "text-white/80" : "text-black/80",
                                    )}
                                  >
                                    {skill.name}
                                  </span>
                                  <span
                                    className={cn(
                                      "font-mono text-[11px] shrink-0",
                                      dark ? "text-white/50" : "text-black/50",
                                    )}
                                  >
                                    {skill.level}%
                                  </span>
                                </div>
                                <div
                                  className={cn(
                                    "w-full h-1 rounded-full overflow-hidden",
                                    dark ? "bg-white/10" : "bg-black/10",
                                  )}
                                >
                                  <div
                                    className="h-full bg-gradient-to-r from-accent to-purple-500"
                                    style={{ width: `${skill.level}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div
                        className={cn(
                          "mt-4 pt-3 border-t",
                          dark ? "border-white/10" : "border-black/10",
                        )}
                      >
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div
                          className={cn(
                            "w-full h-1 rounded-full overflow-hidden",
                            dark ? "bg-white/10" : "bg-black/10",
                          )}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div
                          className={cn(
                            "mt-4 pt-3 border-t",
                            dark ? "border-white/10" : "border-black/10",
                          )}
                        >
                          <div className="flex items-center mb-2">
                            <Link
                              size={10}
                              className={cn(
                                "mr-1",
                                dark ? "text-white/70" : "text-black/60",
                              )}
                            />
                            <h4
                              className={cn(
                                "text-xs uppercase tracking-wider font-medium",
                                dark ? "text-white/70" : "text-black/60",
                              )}
                            >
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId,
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "flex items-center h-6 px-2 py-0 text-xs rounded-none border bg-transparent transition-all",
                                    dark
                                      ? "border-white/20 hover:bg-white/10 text-white/80 hover:text-white"
                                      : "border-black/15 hover:bg-black/5 text-black/70 hover:text-black",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className={cn(
                                      "ml-1",
                                      dark ? "text-white/60" : "text-black/50",
                                    )}
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
