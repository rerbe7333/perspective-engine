"use client";

import { useEffect, useState } from "react";

/**
 * Returns time in milliseconds since component mount,
 * updated on requestAnimationFrame.
 *
 * Used across the project for SVG animations.
 */
export function useAnimationTime(): number {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      setTime((t) => t + (now - last));
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return time;
}
