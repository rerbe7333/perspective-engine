"use client";

import React, { useState, useEffect, useMemo } from "react";

// ============================================================
// THEORY COMPARISON MAP
// RTC positioned against six major theories of consciousness.
// ============================================================

// Qualitative relation classes — replacing the prior numeric percentages.
// Each theory's relation is described categorically with a one-sentence
// justification. Line weight on the radial map derives from these categories.
const RELATION_CLASSES = {
  closely: {
    label: "Closely Aligned",
    weight: 1.0,
    color: "#d4af6a",
  },
  substantial: {
    label: "Substantially Overlapping",
    weight: 0.75,
    color: "#d4af6a",
  },
  partial: {
    label: "Partially Overlapping",
    weight: 0.5,
    color: "#b8b0a0",
  },
  distant: {
    label: "Structurally Distant",
    weight: 0.3,
    color: "#8a8278",
  },
};

const THEORIES = [
  {
    key: "gwt",
    name: "Global Workspace Theory",
    short: "GWT",
    authors: "Baars, Dehaene",
    angle: 0, // top
    relation: "substantial",
    relationNote:
      "GWT and RTC share the structural commitment that consciousness involves coordination across distributed systems, but they describe different stages of the same architecture: GWT names what gets broadcast, RTC names what holds a perspective.",
    captures:
      "How information becomes globally accessible and reportable. The functional architecture of attention and broadcast. Why some processes are conscious and others remain modular.",
    misses:
      "Why broadcast feels like anything. GWT explains access consciousness — what gets selected and shared — but does not address phenomenal consciousness or perspective itself.",
    inherits:
      "The structural insight that consciousness involves coordination across distributed systems, not localized processing. Salience and selection mechanisms. The role of attention.",
    adds:
      "Recursive self-world stabilization. Diachronic continuity. Bounded meta-governance. RTC asks not just what gets broadcast, but what holds a perspective across time.",
  },
  {
    key: "iit",
    name: "Integrated Information Theory",
    short: "IIT",
    authors: "Tononi",
    angle: 60,
    relation: "distant",
    relationNote:
      "RTC and IIT are the most philosophically opposed pair on this map. IIT identifies consciousness with intrinsic structural integration; RTC argues that perspective itself is the explanandum and structural integration alone does not produce it.",
    captures:
      "Intrinsic causal structure. The mathematical claim that consciousness corresponds to integrated, irreducible information (Φ). A bold attempt to identify consciousness with structure itself.",
    misses:
      "Perspectival modeling, salience, and temporal reconstitution. Φ can be high in systems with no apparent perspective. The link from integration to felt experience is asserted rather than mechanized.",
    inherits:
      "The seriousness of the explanandum. The insight that consciousness has formal structure. The commitment to a non-trivial relation between system organization and experience.",
    adds:
      "Functional self-location, salience-weighted distinctions, recursive governance, and continuity across time. RTC moves from intrinsic information to recursively held perspective.",
  },
  {
    key: "predictive",
    name: "Predictive Processing",
    short: "PP",
    authors: "Friston, Clark",
    angle: 120,
    relation: "substantial",
    relationNote:
      "Predictive Processing supplies much of the machinery RTC presupposes — hierarchical generative modeling, uncertainty, active inference. The two are most closely aligned at the level of architecture, most divergent at the level of what they take consciousness to be.",
    captures:
      "How the brain generates and updates models. Prediction-error minimization as a unifying principle for perception, action, and learning. The brain as a hierarchical inferential machine.",
    misses:
      "Why model-updating produces a point of view. Predictive processing explains how the brain works without explaining why anyone is home. The 'dark room problem' for consciousness, not just behavior.",
    inherits:
      "Hierarchical generative modeling. Active inference. The role of uncertainty in shaping cognition. The deep insight that perception is constructive, not given.",
    adds:
      "The recursive self-model as a precondition for perspective. RTC argues that what predictive processing needs to become a theory of consciousness is governed recursion on the self-in-world model — not just minimization of error.",
  },
  {
    key: "hot",
    name: "Higher-Order Thought",
    short: "HOT",
    authors: "Rosenthal",
    angle: 180,
    relation: "partial",
    relationNote:
      "HOT and RTC share the recursive insight that consciousness involves representations of representations, but HOT is largely cognitive and disembodied; RTC embeds recursion in salience, world-involvement, and temporal continuity.",
    captures:
      "The relation between metacognition and consciousness. The claim that a mental state is conscious when it is the object of a higher-order representation. The role of self-reference.",
    misses:
      "Embodiment, salience, world-involvement, and temporal continuity. HOT is largely cognitive — it describes a logical relation without a mechanism, and without grounding in body, emotion, or time.",
    inherits:
      "The recognition that consciousness involves representations of representations. The basic recursive insight at the core of metacognition.",
    adds:
      "Embodied, world-involving, salience-weighted recursion that is governed and reconstituted across time. RTC reframes higher-order thought as one moment of a broader recursive architecture.",
  },
  {
    key: "ast",
    name: "Attention Schema Theory",
    short: "AST",
    authors: "Graziano",
    angle: 240,
    relation: "closely",
    relationNote:
      "AST is structurally the closest theory to RTC on this map — both center the brain modeling itself. The distinction is scope: AST locates consciousness in the brain modeling its own attention; RTC extends self-modeling into a salience-weighted, world-involving, time-extended recursive architecture.",
    captures:
      "The brain models its own attention. Subjective experience as the brain's representation of its own attentional processes. A deflationary, naturalistic, neurologically plausible account.",
    misses:
      "Why modeling attention amounts to having a perspective at all. Salience, embodiment, and the diachronic continuity of self. AST is structurally close to RTC but stops short of the broader self-in-world recursion.",
    inherits:
      "The core insight that consciousness involves self-modeling. The neural plausibility of an attention-related substrate. The deflationary spirit — no extra ingredient required.",
    adds:
      "Self-in-world rather than self-attending-to-attention. Salience weighting, governance against runaway recursion, and reconstitutability across time. RTC treats AST's attention schema as one component of a richer recursive architecture.",
  },
  {
    key: "active",
    name: "Active Inference",
    short: "AI/FEP",
    authors: "Friston",
    angle: 300,
    relation: "closely",
    relationNote:
      "Active Inference shares RTC's commitment to embodied, time-extended agents under uncertainty. The natural relation is layered: RTC sits as a perspective-stabilization layer over an active-inference substrate. They are answering complementary questions, not competing.",
    captures:
      "Action-perception cycles minimizing free energy. The unification of perception, action, and learning under a single variational principle. Perhaps the most ambitious unifying framework in cognitive science.",
    misses:
      "Explicit perspective. Free-energy minimization is consistent with both conscious and unconscious systems. Without the perspective-stabilization layer, active inference describes adaptive behavior, not subjective experience.",
    inherits:
      "Action-oriented embodiment. The deep coupling of agent and environment. The mathematical apparatus for understanding bounded agents under uncertainty.",
    adds:
      "Recursive governance of the self-in-world model as an explicit condition for perspective. RTC sits naturally as a perspective-layer over active inference — what active inference needs to scale from adaptive agency to subjective experience.",
  },
];

// ============================================================
// MAIN
// ============================================================
export default function ComparisonPage() {
  const [selected, setSelected] = useState(null);
  const [hover, setHover] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame;
    let last = performance.now();
    const tick = (now) => {
      setTime((t) => t + (now - last));
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const active = selected || hover;
  const activeTheory = active ? THEORIES.find((t) => t.key === active) : null;

  return (
    <div
      className="mobile-pad"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top, #161310 0%, #0a0907 100%)",
        color: "#e8e3d8",
        fontFamily: "'Inter', sans-serif",
        padding: "32px 28px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header
        style={{
          maxWidth: 1200,
          margin: "0 auto 36px",
          borderBottom: "1px solid #2a2620",
          paddingBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#8a8278",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Comparison — Section 03
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 38,
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Where{" "}
          <em style={{ color: "#d4af6a", fontStyle: "italic" }}>RTC</em> sits
        </h1>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 16,
            fontWeight: 300,
            color: "#b8b0a0",
            maxWidth: 760,
            marginTop: 18,
            marginBottom: 0,
            lineHeight: 1.55,
            fontStyle: "italic",
          }}
        >
          RTC does not replace existing theories of consciousness. It asks
          a different question — not where consciousness lives or what it
          integrates, but what conditions stabilize a perspective. Each
          framework below captures something real. RTC names what they leave
          unaddressed and proposes what fills the gap.
        </p>
      </header>

      {/* Main layout: map on left, panel on right */}
      <main
        className="mobile-stack"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 480px",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* RADIAL MAP */}
        <section>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: "1px solid #2a2620",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Map</span>
            <span style={{ fontSize: 9 }}>click any theory</span>
          </div>
          <div
            style={{
              aspectRatio: "1 / 1",
              position: "relative",
              background:
                "radial-gradient(circle at center, #1a1612 0%, #0d0b09 100%)",
              border: "1px solid #2a2620",
            }}
          >
            <RadialMap
              theories={THEORIES}
              active={active}
              selected={selected}
              hover={hover}
              onSelect={(k) => setSelected(selected === k ? null : k)}
              onHover={setHover}
              time={time}
            />
            <CornerMark position="tl" />
            <CornerMark position="tr" />
            <CornerMark position="bl" />
            <CornerMark position="br" />
          </div>

          {/* Legend below map */}
          <div
            style={{
              marginTop: 16,
              padding: "16px 18px",
              border: "1px dashed #2a2620",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              lineHeight: 1.7,
            }}
          >
            <div style={{ color: "#d4af6a", marginBottom: 8 }}>READ ME</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 12, lineHeight: 1.65 }}>
              Line weight indicates qualitative conceptual relation between
              the theory and RTC — not a numeric overlap measure. The four
              relation classes (Closely Aligned, Substantially Overlapping,
              Partially Overlapping, Structurally Distant) are categorical
              judgments, each justified in the comparison panel.
            </span>
          </div>

          {/* Relation class legend */}
          <div
            style={{
              marginTop: 12,
              padding: "14px 18px",
              border: "1px solid #2a2620",
              background: "rgba(20, 17, 14, 0.4)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 20px",
            }}
          >
            {Object.entries(RELATION_CLASSES).map(([key, cls]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 0,
                    borderTop: `${0.5 + cls.weight * 1.6}px solid ${cls.color}`,
                    opacity: 0.4 + cls.weight * 0.4,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#b8b0a0",
                    letterSpacing: "0.05em",
                  }}
                >
                  {cls.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARISON PANEL */}
        <section style={{ position: "sticky", top: 24 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: "1px solid #2a2620",
            }}
          >
            Comparison
          </div>

          {!activeTheory && <DefaultPanel />}
          {activeTheory && <TheoryPanel theory={activeTheory} />}
        </section>
      </main>
    </div>
  );
}

// ============================================================
// RADIAL MAP
// ============================================================
function RadialMap({
  theories,
  active,
  selected,
  hover,
  onSelect,
  onHover,
  time,
}) {
  const cx = 250;
  const cy = 250;
  const r = 160; // distance from center to theory nodes (was 175)
  const t = time * 0.001;

  return (
    <svg
      viewBox="-100 0 700 500"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <radialGradient id="rtcCenter">
          <stop offset="0%" stopColor="#f0d090" stopOpacity="1" />
          <stop offset="40%" stopColor="#d4af6a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4af6a" stopOpacity="0" />
        </radialGradient>
        <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer reference circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#2a2620"
        strokeWidth={0.5}
        strokeDasharray="2 4"
      />

      {/* Connection lines from RTC to each theory */}
      {theories.map((theory) => {
        const angleRad = ((theory.angle - 90) * Math.PI) / 180;
        const tx = cx + Math.cos(angleRad) * r;
        const ty = cy + Math.sin(angleRad) * r;
        const cls = RELATION_CLASSES[theory.relation];
        const isActive = active === theory.key;
        const lineWeight = 0.4 + cls.weight * 1.6;
        const opacity = active
          ? isActive
            ? 0.95
            : 0.15
          : 0.35 + cls.weight * 0.35;
        return (
          <line
            key={`line-${theory.key}`}
            x1={cx}
            y1={cy}
            x2={tx}
            y2={ty}
            stroke={isActive ? "#d4af6a" : cls.color}
            strokeWidth={isActive ? lineWeight + 0.6 : lineWeight}
            opacity={opacity}
            style={{ transition: "all 0.3s ease" }}
          />
        );
      })}

      {/* Center: RTC */}
      <g>
        {/* Outer halo */}
        <circle cx={cx} cy={cy} r={50} fill="url(#rtcCenter)" opacity={0.6} />
        {/* Recursive rings around RTC center */}
        {[26, 20, 14].map((rr, i) => (
          <circle
            key={`rtc-ring-${i}`}
            cx={cx}
            cy={cy}
            r={rr}
            fill="none"
            stroke="#d4af6a"
            strokeWidth={0.7}
            opacity={0.4 + i * 0.15}
            transform={`rotate(${t * 12 * (i % 2 === 0 ? 1 : -0.7)} ${cx} ${cy})`}
          />
        ))}
        <circle cx={cx} cy={cy} r={6} fill="#f0d090" filter="url(#mapGlow)" />
        <text
          x={cx}
          y={cy + 56}
          textAnchor="middle"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 16,
            fontStyle: "italic",
            fill: "#d4af6a",
            fontWeight: 400,
          }}
        >
          RTC
        </text>
      </g>

      {/* Theory nodes */}
      {theories.map((theory) => {
        const angleRad = ((theory.angle - 90) * Math.PI) / 180;
        const tx = cx + Math.cos(angleRad) * r;
        const ty = cy + Math.sin(angleRad) * r;
        const isActive = active === theory.key;

        // Label positioning — push outward from node
        const labelOffset = 38;
        const lx = cx + Math.cos(angleRad) * (r + labelOffset);
        const ly = cy + Math.sin(angleRad) * (r + labelOffset);

        // Determine text anchor based on angle
        let anchor: "start" | "middle" | "end" = "middle";
        if (Math.cos(angleRad) > 0.3) anchor = "start";
        if (Math.cos(angleRad) < -0.3) anchor = "end";

        return (
          <g
            key={`node-${theory.key}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onHover(theory.key)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(theory.key)}
          >
            {/* Hit area */}
            <circle cx={tx} cy={ty} r={36} fill="transparent" />

            {/* Outer ring on hover */}
            {isActive && (
              <circle
                cx={tx}
                cy={ty}
                r={20}
                fill="none"
                stroke="#d4af6a"
                strokeWidth={0.8}
                opacity={0.5}
              />
            )}

            {/* Node */}
            <circle
              cx={tx}
              cy={ty}
              r={isActive ? 9 : 7}
              fill={isActive ? "#d4af6a" : "#8a8278"}
              opacity={isActive ? 1 : 0.85}
              style={{ transition: "all 0.3s ease" }}
            />
            {isActive && (
              <circle
                cx={tx}
                cy={ty}
                r={3}
                fill="#0a0907"
              />
            )}

            {/* Label group: short on top, full name below */}
            <text
              x={lx}
              y={ly - 6}
              textAnchor={anchor}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fill: isActive ? "#d4af6a" : "#8a8278",
                letterSpacing: "0.1em",
                transition: "fill 0.3s",
              }}
            >
              {theory.short}
            </text>
            <text
              x={lx}
              y={ly + 8}
              textAnchor={anchor}
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 12,
                fill: isActive ? "#e8e3d8" : "#b8b0a0",
                fontStyle: "italic",
                fontWeight: 400,
                transition: "fill 0.3s",
              }}
            >
              {theory.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================
// THEORY PANEL — shown when a theory is hovered or selected
// ============================================================
function TheoryPanel({ theory }) {
  const cls = RELATION_CLASSES[theory.relation];

  return (
    <div
      style={{
        border: "1px solid #2a2620",
        background: "rgba(20, 17, 14, 0.6)",
        padding: "24px 26px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#d4af6a",
          letterSpacing: "0.2em",
          marginBottom: 4,
        }}
      >
        {theory.short} · {theory.authors}
      </div>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28,
          fontWeight: 400,
          margin: "4px 0 20px",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
        }}
      >
        {theory.name}
      </h2>

      {/* Relation class — replaces the prior numeric overlap meter */}
      <div
        style={{
          marginBottom: 24,
          paddingBottom: 20,
          borderBottom: "1px solid #2a2620",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "#8a8278",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span>Relation to RTC</span>
          <span style={{ color: cls.color, fontSize: 10 }}>
            {cls.label}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.55,
            color: "#b8b0a0",
            margin: 0,
          }}
        >
          {theory.relationNote}
        </p>
      </div>

      <Field label="What it captures" body={theory.captures} />
      <Field label="What it leaves unaddressed" body={theory.misses} accent />
      <Field label="What RTC inherits" body={theory.inherits} />
      <Field label="What RTC adds" body={theory.adds} highlight />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Field({ label, body, accent, highlight }: { label: string; body: string; accent?: boolean; highlight?: boolean }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: highlight ? "#d4af6a" : accent ? "#c8a890" : "#8a8278",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          lineHeight: 1.65,
          color: highlight ? "#e8e3d8" : "#b8b0a0",
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ============================================================
// DEFAULT PANEL — shown when nothing selected
// ============================================================
function DefaultPanel() {
  return (
    <div
      style={{
        border: "1px solid #2a2620",
        background: "rgba(20, 17, 14, 0.4)",
        padding: "32px 28px",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#d4af6a",
          letterSpacing: "0.2em",
          marginBottom: 12,
        }}
      >
        At Center · RTC
      </div>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 26,
          fontWeight: 400,
          margin: "0 0 20px",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        The Recurse Theory of Consciousness
      </h2>
      <p style={panelProse}>
        RTC's distinctive claim is that{" "}
        <em style={{ color: "#d4af6a", fontStyle: "italic" }}>
          perspective itself requires recursively governed self-in-world
          continuity
        </em>{" "}
        — not just integration, broadcast, prediction, or higher-order
        representation, but the bounded, governed, salience-weighted,
        diachronic recursion that holds a point of view in place.
      </p>
      <p style={panelProse}>
        Each surrounding theory captures a real condition for consciousness.
        None of them, individually or together, isolates perspective
        stabilization as the central mechanism. RTC names that gap and
        proposes a structure to fill it.
      </p>

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid #2a2620",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#8a8278",
          letterSpacing: "0.15em",
          lineHeight: 1.8,
        }}
      >
        <div style={{ color: "#d4af6a", marginBottom: 8 }}>
          SELECT A THEORY →
        </div>
        Hover any node on the map to see comparison.
        <br />
        Click to lock the panel in place.
      </div>
    </div>
  );
}

const panelProse = {
  fontFamily: "'Fraunces', serif",
  fontSize: 15,
  fontWeight: 300,
  lineHeight: 1.6,
  color: "#b8b0a0",
  margin: "0 0 16px",
};

function CornerMark({ position }) {
  const styles = {
    position: "absolute",
    width: 12,
    height: 12,
    borderColor: "#3a342a",
  };
  const map = {
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
  return <div style={{ ...styles, ...map[position] }} />;
}
