"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ROUTES = [
  { href: "/engine", label: "Engine" },
  { href: "/architecture", label: "Architecture" },
  { href: "/comparison", label: "Comparison" },
  { href: "/predictions", label: "Predictions" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/rubric", label: "Rubric" },
  { href: "/manuscript", label: "Manuscript" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const t = time * 0.001;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10, 9, 7, 0.85)" : "rgba(10, 9, 7, 0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: scrolled
          ? "1px solid #2a2620"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }}>
          <circle
            cx={12}
            cy={12}
            r={10}
            fill="none"
            stroke="#d4af6a"
            strokeWidth={0.7}
            opacity={0.4}
          />
          <circle
            cx={12}
            cy={12}
            r={6.5}
            fill="none"
            stroke="#d4af6a"
            strokeWidth={0.8}
            opacity={0.7}
            transform={`rotate(${t * 30} 12 12)`}
          />
          <circle cx={12} cy={12} r={2.5} fill="#d4af6a" />
        </svg>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#e8e3d8",
          }}
        >
          The Perspective Engine
        </span>
      </Link>

      <div style={{ display: "flex", gap: 24 }}>
        {ROUTES.map((route) => {
          const active =
            pathname === route.href ||
            (route.href !== "/" && pathname.startsWith(route.href));
          return (
            <Link
              key={route.href}
              href={route.href}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: active ? "#d4af6a" : "#8a8278",
                textDecoration: "none",
                transition: "color 0.2s",
                position: "relative",
                paddingBottom: 4,
              }}
            >
              {route.label}
              {active && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    background: "#d4af6a",
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
