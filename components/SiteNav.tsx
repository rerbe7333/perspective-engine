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
  { href: "/observatory", label: "Observatory" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const t = time * 0.001;
  const navOpaque = scrolled || menuOpen;

  return (
    <>
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
          background: navOpaque
            ? "rgba(10, 9, 7, 0.95)"
            : "rgba(10, 9, 7, 0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: navOpaque
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
            minWidth: 0,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: 22, height: 22, flexShrink: 0 }}
          >
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
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            The Perspective Engine
          </span>
        </Link>

        {/* DESKTOP — inline link bar; hidden under 768px by globals.css */}
        <div className="site-nav-desktop" style={{ gap: 24 }}>
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

        {/* MOBILE — hamburger button; hidden above 768px by globals.css */}
        <button
          type="button"
          className="site-nav-mobile-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: "transparent",
            border: "1px solid #2a2620",
            borderRadius: 4,
            padding: 8,
            cursor: "pointer",
            color: "#e8e3d8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: 18, height: 18, display: "block" }}
            aria-hidden="true"
          >
            {menuOpen ? (
              <>
                <line
                  x1="5"
                  y1="5"
                  x2="19"
                  y2="19"
                  stroke="#e8e3d8"
                  strokeWidth="1.5"
                />
                <line
                  x1="19"
                  y1="5"
                  x2="5"
                  y2="19"
                  stroke="#e8e3d8"
                  strokeWidth="1.5"
                />
              </>
            ) : (
              <>
                <line
                  x1="4"
                  y1="7"
                  x2="20"
                  y2="7"
                  stroke="#e8e3d8"
                  strokeWidth="1.5"
                />
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="#e8e3d8"
                  strokeWidth="1.5"
                />
                <line
                  x1="4"
                  y1="17"
                  x2="20"
                  y2="17"
                  stroke="#e8e3d8"
                  strokeWidth="1.5"
                />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* MOBILE DRAWER — full-width panel below the nav bar */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          style={{
            position: "fixed",
            top: 56,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: "rgba(10, 9, 7, 0.98)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            padding: "24px 28px 32px",
            gap: 4,
            overflowY: "auto",
          }}
        >
          {ROUTES.map((route) => {
            const active =
              pathname === route.href ||
              (route.href !== "/" && pathname.startsWith(route.href));
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: active ? "#d4af6a" : "#e8e3d8",
                  textDecoration: "none",
                  padding: "18px 0",
                  borderBottom: "1px solid #1f1c17",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{route.label}</span>
                {active && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#d4af6a",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
