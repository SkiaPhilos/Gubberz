import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type MascotType = "skater" | "yoyo" | "dog";

export function PullToRefreshContainer({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mascot, setMascot] = useState<MascotType>("skater");

  const startYRef = useRef(0);
  const isPullingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const PULL_THRESHOLD = 90;
  const MAX_PULL = 150;

  // Touch event listeners for mobile pull-to-refresh
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY <= 2 && !isRefreshing) {
        startYRef.current = e.touches[0].clientY;
        isPullingRef.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPullingRef.current || isRefreshing) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startYRef.current;
      if (diff > 0 && window.scrollY <= 2) {
        // Apply friction
        const damped = Math.min(MAX_PULL, diff * 0.55);
        setPullDistance(damped);
      } else {
        setPullDistance(0);
      }
    };

    const handleTouchEnd = async () => {
      if (!isPullingRef.current) return;
      isPullingRef.current = false;

      if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
        triggerRefresh();
      } else {
        setPullDistance(0);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance, isRefreshing]);

  const triggerRefresh = async () => {
    setIsRefreshing(true);
    setPullDistance(PULL_THRESHOLD);

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([15, 30, 20]);
    }

    try {
      await Promise.all([
        queryClient.invalidateQueries(),
        new Promise((resolve) => setTimeout(resolve, 1100)),
      ]);
      toast.success("Catalogue & inventory synced!");
    } catch {
      // ignore
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
    }
  };

  const progress = Math.min(1, pullDistance / PULL_THRESHOLD);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* PULL DOWN REVEAL PANEL */}
      <div
        className="pointer-events-none fixed inset-x-0 top-16 z-30 flex flex-col items-center justify-center overflow-hidden transition-all duration-75"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 8 ? 1 : 0,
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Elastic suspension cord */}
          <div
            className="w-0.5 bg-ink/40 origin-top"
            style={{ height: `${Math.max(10, pullDistance * 0.45)}px` }}
          />

          {/* SKATER MASCOT */}
          <div className="relative">
            <SkaterMascot progress={progress} isRefreshing={isRefreshing} />
          </div>

          {/* Status Label */}
          <div className="mt-1 rounded-full bg-background/90 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-xs border">
            {isRefreshing ? (
              <span className="flex items-center gap-1.5 text-primary">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Catching air…
              </span>
            ) : progress >= 1 ? (
              <span className="text-primary font-bold">Release to refresh!</span>
            ) : (
              <span>Pull down to reload</span>
            )}
          </div>
        </div>
      </div>

      {/* Main App Content shifted smoothly when pulling */}
      <div
        style={{
          transform: `translateY(${pullDistance * 0.65}px)`,
          transition: isPullingRef.current ? "none" : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// 1. SKATER MASCOT (Image 1 style little guy on an orange skateboard)
function SkaterMascot({ progress, isRefreshing }: { progress: number; isRefreshing: boolean }) {
  return (
    <motion.div
      animate={
        isRefreshing
          ? {
              rotate: [0, 360, 720],
              y: [-6, 6, -6],
              transition: { duration: 1, repeat: Infinity, ease: "linear" },
            }
          : {
              rotate: progress * 15 - 7.5,
              y: progress * 8,
            }
      }
      className="relative flex flex-col items-center"
    >
      {/* Headphone guy */}
      <svg width="48" height="52" viewBox="0 0 48 52" fill="none" className="overflow-visible">
        {/* Head */}
        <circle cx="24" cy="18" r="11" stroke="#111" strokeWidth="2.4" fill="#ffffff" />
        {/* Eyes */}
        <ellipse cx="21" cy="17" rx="1.5" ry="2.2" fill="#111" />
        <ellipse cx="27" cy="17" rx="1.5" ry="2.2" fill="#111" />
        {/* Smile */}
        <path d="M22 21 Q24 23 26 21" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
        {/* Headphones Headband */}
        <path
          d="M12 18 C12 10 36 10 36 18"
          stroke="#111"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Earcups in vivid orange */}
        <rect x="9" y="14" width="5.5" height="9" rx="2.5" fill="#f97316" stroke="#111" strokeWidth="1.5" />
        <rect x="33.5" y="14" width="5.5" height="9" rx="2.5" fill="#f97316" stroke="#111" strokeWidth="1.5" />
        {/* Body & limbs */}
        <path d="M24 29 L24 41" stroke="#111" strokeWidth="2.4" strokeLinecap="round" />
        {/* Arms outstretched for balance */}
        <path d="M24 33 L14 36" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M24 33 L34 31" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
        {/* Legs bent on board */}
        <path d="M24 41 L17 48" stroke="#111" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M24 41 L31 48" stroke="#111" strokeWidth="2.4" strokeLinecap="round" />
      </svg>

      {/* Skateboard */}
      <motion.div
        animate={
          isRefreshing
            ? { rotate: [0, 180, 360], transition: { duration: 0.6, repeat: Infinity } }
            : {}
        }
        className="relative -mt-1 flex flex-col items-center"
      >
        {/* Deck */}
        <div className="h-2 w-14 rounded-full bg-primary border-2 border-ink shadow-xs" />
        {/* Trucks & Wheels */}
        <div className="flex w-11 justify-between px-1">
          <div className="h-2 w-2 rounded-full bg-ink animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-ink animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// 2. PUNK KID YOYO MASCOT (Image 2 style character with blue hoodie and dropping yoyo)
function YoyoPunkMascot({ progress, isRefreshing }: { progress: number; isRefreshing: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Punk cat/kid character head */}
      <svg width="44" height="40" viewBox="0 0 44 40" fill="none">
        {/* Blue Hoodie */}
        <path d="M8 38 C8 28 36 28 36 38 Z" fill="#3b82f6" stroke="#1e293b" strokeWidth="2" />
        <path d="M20 32 L20 38" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 32 L24 38" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        {/* Head with cat/punk ears */}
        <polygon points="12,18 10,4 20,12" fill="#2d3748" stroke="#111" strokeWidth="1.8" />
        <polygon points="32,18 34,4 24,12" fill="#2d3748" stroke="#111" strokeWidth="1.8" />
        <circle cx="22" cy="18" r="10" fill="#2d3748" stroke="#111" strokeWidth="1.8" />
        {/* Face muzzle */}
        <ellipse cx="22" cy="21" rx="6" ry="4" fill="#f1f5f9" />
        <ellipse cx="22" cy="19" rx="2" ry="1.5" fill="#111" />
        {/* Yellow eyes */}
        <ellipse cx="18" cy="16" rx="2.5" ry="3" fill="#facc15" />
        <circle cx="18.5" cy="16" r="1.5" fill="#111" />
        <ellipse cx="26" cy="16" rx="2.5" ry="3" fill="#facc15" />
        <circle cx="26.5" cy="16" r="1.5" fill="#111" />
      </svg>

      {/* Dropping yoyo string and spinning yoyo */}
      <motion.div
        animate={
          isRefreshing
            ? { y: [0, 20, 0], transition: { duration: 0.5, repeat: Infinity } }
            : { y: progress * 24 }
        }
        className="flex flex-col items-center"
      >
        <div className="h-5 w-0.5 bg-amber-400" />
        <motion.div
          animate={
            isRefreshing
              ? { rotate: 360, transition: { duration: 0.3, repeat: Infinity, ease: "linear" } }
              : { rotate: progress * 180 }
          }
          className="flex h-5 w-5 items-center justify-center rounded-full bg-primary border border-ink shadow-sm"
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// 3. COZY ANIME DOG MASCOT (Anime pup under cozy blanket)
function DogBlanketMascot({ progress, isRefreshing }: { progress: number; isRefreshing: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Dog head */}
      <div className="relative flex flex-col items-center">
        <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
          {/* Floppy ears */}
          <ellipse cx="8" cy="16" rx="5" ry="9" fill="#78350f" transform="rotate(-20 8 16)" />
          <ellipse cx="36" cy="16" rx="5" ry="9" fill="#78350f" transform="rotate(20 36 16)" />
          {/* Face */}
          <circle cx="22" cy="16" r="11" fill="#fef3c7" stroke="#78350f" strokeWidth="1.8" />
          {/* Sleepy blinking eyes */}
          <path d="M17 14 Q19 12 21 14" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M23 14 Q25 12 27 14" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
          {/* Nose */}
          <ellipse cx="22" cy="18" rx="2.5" ry="1.8" fill="#111" />
        </svg>

        {/* Cozy Blanket that gets pulled down */}
        <motion.div
          animate={
            isRefreshing
              ? { y: [0, -8, 0], transition: { duration: 0.6, repeat: Infinity } }
              : { y: progress * 12 }
          }
          className="-mt-3 w-16 h-7 rounded-t-2xl bg-amber-100 border-2 border-amber-900/30 flex items-center justify-center shadow-xs"
        >
          <span className="font-mono text-[9px] text-amber-900/70 font-bold">
            {isRefreshing ? "Zzz…!" : "cozy"}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
