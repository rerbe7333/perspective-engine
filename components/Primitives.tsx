"use client";

import { CSSProperties } from "react";

// ============================================================
// CornerMark — small bracket marks at the corners of framed content
// Used on every visualization frame to give the instrument feel
// ============================================================
export function CornerMark({
  position,
  size = 12,
}: {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
}) {
  const base: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: "#3a342a",
  };
  const map: Record<string, CSSProperties> = {
    tl: { top: 8, left: 8, borderTop: "1px solid", borderLeft: "1px solid" },
    tr: { top: 8, right: 8, borderTop: "1px solid", borderRight: "1px solid" },
    bl: {
      bottom: 8,
      left: 8,
      borderBottom: "1px solid",
      borderLeft: "1px solid",
    },
    br: {
      bottom: 8,
      right: 8,
      borderBottom: "1px solid",
      borderRight: "1px solid",
    },
  };
  return <div style={{ ...base, ...map[position] }} />;
}

// ============================================================
// FourCornerMarks — convenience wrapper
// ============================================================
export function FourCornerMarks({ size = 12 }: { size?: number }) {
  return (
    <>
      <CornerMark position="tl" size={size} />
      <CornerMark position="tr" size={size} />
      <CornerMark position="bl" size={size} />
      <CornerMark position="br" size={size} />
    </>
  );
}

// ============================================================
// SectionTag — small mono uppercase label, the project's signature
// ============================================================
export function SectionTag({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: highlight ? "#d4af6a" : "#8a8278",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// FieldLabel — for sub-section headers inside cards/panels
// ============================================================
export function FieldLabel({
  children,
  accent = false,
  highlight = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        color: highlight ? "#d4af6a" : accent ? "#c8a890" : "#8a8278",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// PageHeader — consistent header across all routes
// ============================================================
export function PageHeader({
  section,
  title,
  highlight,
  subtitle,
  maxWidth = 1200,
}: {
  section: string;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  subtitle?: string;
  maxWidth?: number;
}) {
  return (
    <header
      style={{
        maxWidth,
        margin: "0 auto 36px",
        borderBottom: "1px solid #2a2620",
        paddingBottom: 24,
      }}
    >
      <SectionTag>{section}</SectionTag>
      <h1
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(26px, 6vw, 38px)",
          fontWeight: 400,
          margin: "8px 0 0",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <em style={{ color: "#d4af6a", fontStyle: "italic" }}>
              {highlight}
            </em>
          </>
        )}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(14px, 3.6vw, 16px)",
            fontWeight: 300,
            color: "#b8b0a0",
            maxWidth: 760,
            marginTop: 18,
            marginBottom: 0,
            lineHeight: 1.55,
            fontStyle: "italic",
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
