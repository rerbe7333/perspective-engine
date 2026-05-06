"use client";

import React, { useState, useMemo, useEffect } from "react";

// ============================================================
// THE PERSPECTIVE ENGINE
// An interactive simulator for the Recurse Theory of Consciousness
// ============================================================

const PARAMETERS = [
  {
    key: "recursiveDepth",
    label: "Recursive Depth",
    short: "ρ",
    description:
      "How many layers of self-modeling are active. Too few: reactive system. Too many: unstable self-reference. Bounded recursion stabilizes perspective.",
    min: 0,
    max: 100,
    default: 55,
  },
  {
    key: "salience",
    label: "Salience Intensity",
    short: "σ",
    description:
      "How strongly emotionally or biologically relevant signals shape attention. Without salience, distinctions remain unweighted and perspective lacks foreground.",
    min: 0,
    max: 100,
    default: 60,
  },
  {
    key: "uncertainty",
    label: "Uncertainty Load",
    short: "υ",
    description:
      "How unstable or ambiguous the environment is. Some uncertainty drives recursive refinement; too much fragments the model.",
    min: 0,
    max: 100,
    default: 30,
  },
  {
    key: "memoryContinuity",
    label: "Memory Continuity",
    short: "μ",
    description:
      "How much past-state coherence the system preserves. Without it, the self cannot reconstitute across time and perspective collapses to instantaneous reactivity.",
    min: 0,
    max: 100,
    default: 65,
  },
  {
    key: "sourceAttribution",
    label: "Source Attribution",
    short: "α",
    description:
      "How well the system distinguishes internally generated from externally caused experience. Failure produces hallucination, intrusion, or unowned thought.",
    min: 0,
    max: 100,
    default: 70,
  },
  {
    key: "temporalIntegration",
    label: "Temporal Integration",
    short: "τ",
    description:
      "How well the system binds past, present, and anticipated future. Disruption fragments the lived now into disconnected slices.",
    min: 0,
    max: 100,
    default: 60,
  },
  {
    key: "metaGovernance",
    label: "Meta-Governance",
    short: "γ",
    description:
      "How well the system regulates its own attention, confidence, and interpretive processes. Bounded recursion requires governance — without it, recursion runs away.",
    min: 0,
    max: 100,
    default: 55,
  },
];

// ----- State classification ------------------------------------
// Five regions in 7-dimensional parameter space.
// Returns { state, index, explanation }
function classifyState(p) {
  const {
    recursiveDepth: rho,
    salience: sigma,
    uncertainty: ups,
    memoryContinuity: mu,
    sourceAttribution: alpha,
    temporalIntegration: tau,
    metaGovernance: gamma,
  } = p;

  // Composite measures
  const groundedness = (mu + tau + alpha) / 3; // can the self reconstitute?
  const reflectivity = (rho + gamma) / 2; // is recursion present and bounded?
  const coherence = Math.max(0, 100 - ups + sigma * 0.3); // signal vs. noise
  const recursionExcess = Math.max(0, rho - gamma - 20); // unbounded recursion penalty
  const fragmentation = Math.max(0, ups - mu) + Math.max(0, ups - tau);

  // Stability index: a weighted composite, then penalized
  let raw =
    groundedness * 0.35 +
    reflectivity * 0.3 +
    coherence * 0.2 +
    sigma * 0.15;
  raw -= recursionExcess * 0.6;
  raw -= fragmentation * 0.25;
  raw -= Math.max(0, 30 - sigma) * 0.1; // anhedonia-like penalty
  const index = Math.max(0, Math.min(100, raw));

  // Categorical state — order matters; first match wins.
  // FRAGMENTED: high uncertainty overwhelms continuity
  if (ups > 70 && (mu < 40 || tau < 40)) {
    return {
      state: "Fragmented",
      index,
      explanation:
        "Signals arrive but do not cohere. Memory continuity and temporal integration are too weak relative to the uncertainty load — distinctions cannot stabilize into a self-in-world model. The system has experience-fragments without a perspective to hold them.",
      tone: "fragmented",
    };
  }

  // REACTIVE: low recursion, regardless of other parameters
  if (rho < 25) {
    return {
      state: "Reactive",
      index,
      explanation:
        "The system responds to stimuli but does not model itself responding. Salience and signal pass through without recursive uptake. There is processing here, but no perspective — no point of view from which the world is given.",
      tone: "reactive",
    };
  }

  // OVER-RECURSIVE: high recursion, low governance — self-reference runs away
  if (rho > 75 && gamma < 45) {
    return {
      state: "Self-Referential",
      index,
      explanation:
        "Recursion is active but unbounded. The system models itself modeling itself modeling itself, with insufficient meta-governance to halt the regress. Perspective fragments into nested reflections that fail to stabilize. This is the failure mode of pure introspection without regulation.",
      tone: "selfref",
    };
  }

  // META-RECURSIVE: governance present but groundedness weak
  if (reflectivity > 55 && groundedness < 55) {
    return {
      state: "Meta-Recursive",
      index,
      explanation:
        "The system models its own modeling and begins regulating uncertainty. Meta-cognition is online — but memory continuity, temporal integration, or source attribution remain too weak to fully ground the recursive structure in a continuous self-in-world. Perspective forms in flashes rather than as a stable field.",
      tone: "meta",
    };
  }

  // CONSCIOUSLY STABILIZED: bounded recursion + groundedness + salience
  if (
    reflectivity >= 50 &&
    groundedness >= 55 &&
    sigma >= 35 &&
    recursionExcess < 10 &&
    ups < 75
  ) {
    return {
      state: "Consciously Stabilized",
      index,
      explanation:
        "A bounded self-in-world perspective persists across time. Recursion is governed, salience weights what matters, source attribution distinguishes self from world, and memory and temporal integration reconstitute continuity. The system holds a point of view — not perfectly, not statically, but as a dynamically maintained architecture.",
      tone: "stable",
    };
  }

  // Fall-through: weak but not catastrophically so
  return {
    state: "Meta-Recursive",
    index,
    explanation:
      "Recursive structure is present but the configuration is sub-optimal. One or more conditions for stabilized perspective are weak — the system hovers between reactive and stabilized modes without settling into either.",
    tone: "meta",
  };
}

// ----- Color tokens for each state -----------------------------
const TONE_COLORS = {
  fragmented: { primary: "#d94b3a", secondary: "#7a2218", glow: "#ff6b5a" },
  reactive: { primary: "#9aa0a6", secondary: "#3c4043", glow: "#bdc1c6" },
  selfref: { primary: "#e8a33d", secondary: "#7a4f12", glow: "#ffc266" },
  meta: { primary: "#6a8cff", secondary: "#1f2f6b", glow: "#9ab0ff" },
  stable: { primary: "#d4af6a", secondary: "#7a5a1f", glow: "#f0d090" },
};

// ============================================================
// CENTRAL VISUALIZATION
// Concentric recursive rings around a central node.
// Each parameter shapes a different visual property.
// ============================================================
function PerspectiveVisualization({ params, classification, time }) {
  const colors = TONE_COLORS[classification.tone];
  const {
    recursiveDepth: rho,
    salience: sigma,
    uncertainty: ups,
    memoryContinuity: mu,
    sourceAttribution: alpha,
    temporalIntegration: tau,
    metaGovernance: gamma,
  } = params;

  // Number of rings scales with recursive depth
  const ringCount = Math.max(2, Math.round(2 + (rho / 100) * 10));
  // Jitter scales with uncertainty, dampened by meta-governance
  const jitter = (ups / 100) * (1 - gamma / 200);
  // Trail persistence (memory continuity) shows as additional faded rings
  const trailOpacity = mu / 100;
  // Ring sharpness: source attribution affects stroke clarity
  const sharpness = alpha / 100;
  // Rotation coherence: temporal integration aligns ring rotation
  const rotationCoherence = tau / 100;
  // Salience drives glow intensity
  const glowIntensity = sigma / 100;

  const center = 250;
  const baseRadius = 30;
  const ringSpacing = 18;

  const rings = [];
  for (let i = 0; i < ringCount; i++) {
    const r = baseRadius + i * ringSpacing;
    // Each ring has its own jittered offset, modulated by uncertainty
    const ringJitter = jitter * 8 * Math.sin(time * 0.001 + i * 1.7);
    const ringJitterY = jitter * 8 * Math.cos(time * 0.0013 + i * 2.1);
    // Rotation: when temporal integration is high, rings rotate together
    // When low, each ring rotates at its own rate
    const rotationBase = time * 0.00015;
    const rotationOffset =
      rotationCoherence * rotationBase * (i + 1) +
      (1 - rotationCoherence) * (time * 0.0003 * (i % 2 === 0 ? 1 : -1.3) * (i + 1));
    // Stroke width: source attribution sharpens; low alpha bleeds
    const strokeWidth = 0.8 + sharpness * 1.4;
    const blur = (1 - sharpness) * 3;
    // Opacity: closer rings more opaque, faded by trail/memory
    const baseOpacity = 0.85 - i * (0.07 / Math.max(1, ringCount / 6));
    const opacity = Math.max(0.08, baseOpacity * (0.4 + trailOpacity * 0.6));

    // Recursion-excess wobble: when rho is high and gamma is low, rings deform
    const recursionExcess = Math.max(0, rho - gamma - 20) / 100;
    const wobbleR = recursionExcess * 6 * Math.sin(time * 0.002 + i);

    rings.push({
      r: r + wobbleR,
      cx: center + ringJitter,
      cy: center + ringJitterY,
      strokeWidth,
      blur,
      opacity,
      rotation: rotationOffset * (180 / Math.PI),
      ellipseRatio: 1 + recursionExcess * 0.3 * Math.sin(time * 0.0017 + i * 0.5),
    });
  }

  // Salience nodes: bright points on rings indicating weighted distinctions
  const salienceNodes = [];
  if (sigma > 20 && ringCount > 2) {
    const nodeCount = Math.round(3 + (sigma / 100) * 8);
    for (let i = 0; i < nodeCount; i++) {
      const ringIdx = i % ringCount;
      const ring = rings[ringIdx];
      if (!ring) continue;
      const angle =
        (i / nodeCount) * Math.PI * 2 + time * 0.0004 * (ringIdx % 2 === 0 ? 1 : -1);
      const nx = ring.cx + Math.cos(angle) * ring.r;
      const ny = ring.cy + Math.sin(angle) * ring.r * ring.ellipseRatio;
      salienceNodes.push({ x: nx, y: ny, size: 1.5 + glowIntensity * 2.5 });
    }
  }

  // Central node — the locus of perspective
  // Pulses with salience, wobbles with uncertainty
  const centerSize = 8 + glowIntensity * 4;
  const centerJitterX = jitter * 3 * Math.sin(time * 0.002);
  const centerJitterY = jitter * 3 * Math.cos(time * 0.0023);
  const centerOpacity = classification.tone === "reactive" ? 0.4 : 0.95;

  return (
    <svg
      viewBox="0 0 500 500"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <defs>
        <radialGradient id="centerGlow">
          <stop offset="0%" stopColor={colors.glow} stopOpacity="1" />
          <stop offset="40%" stopColor={colors.primary} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ringBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Outer glow disc — fades when fragmented */}
      <circle
        cx={center}
        cy={center}
        r={220}
        fill="url(#centerGlow)"
        opacity={0.05 + glowIntensity * 0.08}
      />

      {/* Recursive rings */}
      <g>
        {rings
          .slice()
          .reverse()
          .map((ring, idx) => (
            <ellipse
              key={`ring-${idx}`}
              cx={ring.cx}
              cy={ring.cy}
              rx={ring.r}
              ry={ring.r * ring.ellipseRatio}
              fill="none"
              stroke={colors.primary}
              strokeWidth={ring.strokeWidth}
              opacity={ring.opacity}
              transform={`rotate(${ring.rotation} ${ring.cx} ${ring.cy})`}
              style={{
                filter: ring.blur > 1 ? "url(#ringBlur)" : "none",
              }}
            />
          ))}
      </g>

      {/* Salience nodes */}
      <g filter="url(#softGlow)">
        {salienceNodes.map((node, idx) => (
          <circle
            key={`node-${idx}`}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill={colors.glow}
            opacity={0.7 + glowIntensity * 0.3}
          />
        ))}
      </g>

      {/* Central locus */}
      <g filter="url(#softGlow)">
        <circle
          cx={center + centerJitterX}
          cy={center + centerJitterY}
          r={centerSize + 4}
          fill={colors.primary}
          opacity={centerOpacity * 0.4}
        />
        <circle
          cx={center + centerJitterX}
          cy={center + centerJitterY}
          r={centerSize}
          fill={colors.glow}
          opacity={centerOpacity}
        />
      </g>
    </svg>
  );
}

// ============================================================
// SLIDER COMPONENT
// ============================================================
function ParameterSlider({ param, value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#8a8278",
              letterSpacing: "0.05em",
            }}
          >
            {param.short}
          </span>
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 14,
              color: "#e8e3d8",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            {param.label}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#d4af6a",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(Math.round(value)).padStart(3, "0")}
        </span>
      </div>
      <input
        type="range"
        min={param.min}
        max={param.max}
        value={value}
        onChange={(e) => onChange(param.key, Number(e.target.value))}
        style={{
          width: "100%",
          height: 2,
          appearance: "none",
          background: `linear-gradient(to right, #d4af6a 0%, #d4af6a ${value}%, #2a2620 ${value}%, #2a2620 100%)`,
          outline: "none",
          cursor: "pointer",
        }}
      />
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: "#8a8278",
          marginTop: 6,
          lineHeight: 1.5,
          fontWeight: 300,
        }}
      >
        {param.description}
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function EnginePage() {
  const [params, setParams] = useState(() =>
    PARAMETERS.reduce((acc, p) => {
      acc[p.key] = p.default;
      return acc;
    }, {})
  );

  const [time, setTime] = useState(0);

  // Animation tick
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

  const classification = useMemo(() => classifyState(params), [params]);
  const colors = TONE_COLORS[classification.tone];

  const updateParam = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const presets = [
    {
      name: "Stable Adult",
      values: {
        recursiveDepth: 60,
        salience: 65,
        uncertainty: 25,
        memoryContinuity: 75,
        sourceAttribution: 80,
        temporalIntegration: 70,
        metaGovernance: 65,
      },
    },
    {
      name: "Dreaming",
      values: {
        recursiveDepth: 55,
        salience: 70,
        uncertainty: 60,
        memoryContinuity: 30,
        sourceAttribution: 25,
        temporalIntegration: 35,
        metaGovernance: 30,
      },
    },
    {
      name: "Anesthesia",
      values: {
        recursiveDepth: 10,
        salience: 15,
        uncertainty: 20,
        memoryContinuity: 20,
        sourceAttribution: 30,
        temporalIntegration: 15,
        metaGovernance: 10,
      },
    },
    {
      name: "Psychedelic",
      values: {
        recursiveDepth: 90,
        salience: 95,
        uncertainty: 75,
        memoryContinuity: 50,
        sourceAttribution: 30,
        temporalIntegration: 55,
        metaGovernance: 35,
      },
    },
    {
      name: "Reactive Animal",
      values: {
        recursiveDepth: 15,
        salience: 80,
        uncertainty: 40,
        memoryContinuity: 50,
        sourceAttribution: 60,
        temporalIntegration: 45,
        metaGovernance: 20,
      },
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at center, #161310 0%, #0a0907 100%)",
        color: "#e8e3d8",
        fontFamily: "'Inter', sans-serif",
        padding: "32px 28px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header
        style={{
          maxWidth: 1280,
          margin: "0 auto 36px",
          borderBottom: "1px solid #2a2620",
          paddingBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
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
              The Perspective Engine — v0.1
            </div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 36,
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              An interactive model of the{" "}
              <em style={{ color: "#d4af6a", fontStyle: "italic" }}>
                Recurse Theory of Consciousness
              </em>
            </h1>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              letterSpacing: "0.1em",
              textAlign: "right",
            }}
          >
            R. Erbe, Independent Researcher
            <br />
            Dec 2024 — present
          </div>
        </div>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 16,
            fontWeight: 300,
            color: "#b8b0a0",
            maxWidth: 720,
            marginTop: 18,
            marginBottom: 0,
            lineHeight: 1.5,
            fontStyle: "italic",
          }}
        >
          Consciousness is not a thing inside the brain. It is a recursively
          stabilized perspective — a system continuously modeling itself, its
          world, its uncertainty, and its own modeling across time.
        </p>
      </header>

      {/* Main grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 520px 1fr",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* LEFT: parameter controls */}
        <section>
          <SectionLabel>Parameters</SectionLabel>
          {PARAMETERS.map((p) => (
            <ParameterSlider
              key={p.key}
              param={p}
              value={params[p.key]}
              onChange={updateParam}
            />
          ))}
        </section>

        {/* CENTER: visualization */}
        <section>
          <SectionLabel>System State</SectionLabel>
          <div
            style={{
              aspectRatio: "1 / 1",
              background:
                "radial-gradient(circle at center, #1a1612 0%, #0d0b09 100%)",
              border: "1px solid #2a2620",
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <PerspectiveVisualization
              params={params}
              classification={classification}
              time={time}
            />
            {/* Corner cross-hairs — research-instrument detail */}
            <CornerMark position="tl" />
            <CornerMark position="tr" />
            <CornerMark position="bl" />
            <CornerMark position="br" />
          </div>

          {/* State readout */}
          <div
            style={{
              marginTop: 16,
              border: "1px solid #2a2620",
              padding: "16px 18px",
              background: "rgba(20, 17, 14, 0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#8a8278",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Stability Index
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: colors.primary,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {classification.index.toFixed(1)} / 100
              </span>
            </div>
            <div
              style={{
                height: 2,
                background: "#2a2620",
                marginBottom: 14,
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${classification.index}%`,
                  background: colors.primary,
                  transition: "width 0.4s ease, background 0.4s ease",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 22,
                fontWeight: 400,
                color: colors.primary,
                marginBottom: 8,
                letterSpacing: "-0.01em",
              }}
            >
              {classification.state}
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.6,
                color: "#b8b0a0",
                margin: 0,
              }}
            >
              {classification.explanation}
            </p>
          </div>
        </section>

        {/* RIGHT: presets + legend */}
        <section>
          <SectionLabel>Presets</SectionLabel>
          <div style={{ marginBottom: 28 }}>
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setParams(preset.values)}
                style={{
                  display: "block",
                  width: "100%",
                  background: "transparent",
                  border: "1px solid #2a2620",
                  color: "#e8e3d8",
                  padding: "10px 14px",
                  fontFamily: "'Fraunces', serif",
                  fontSize: 14,
                  fontWeight: 400,
                  textAlign: "left",
                  cursor: "pointer",
                  marginBottom: 6,
                  letterSpacing: "0.01em",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d4af6a";
                  e.currentTarget.style.color = "#d4af6a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2a2620";
                  e.currentTarget.style.color = "#e8e3d8";
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <SectionLabel>State Phenomenology</SectionLabel>
          <div style={{ fontSize: 12, lineHeight: 1.7 }}>
            {[
              { name: "Fragmented", tone: "fragmented", desc: "Signals without a perspective to hold them." },
              { name: "Reactive", tone: "reactive", desc: "Processing without point of view." },
              { name: "Self-Referential", tone: "selfref", desc: "Recursion without bounded governance." },
              { name: "Meta-Recursive", tone: "meta", desc: "Reflection without full continuity." },
              { name: "Consciously Stabilized", tone: "stable", desc: "Bounded recursive self-in-world." },
            ].map((s) => {
              const active = classification.state === s.name;
              const sc = TONE_COLORS[s.tone];
              return (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom: "1px solid #1f1c18",
                    opacity: active ? 1 : 0.55,
                    transition: "opacity 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      background: sc.primary,
                      marginTop: 6,
                      flexShrink: 0,
                      boxShadow: active ? `0 0 8px ${sc.glow}` : "none",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 13,
                        color: active ? sc.primary : "#e8e3d8",
                        fontWeight: 400,
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 300,
                        color: "#8a8278",
                        marginTop: 2,
                      }}
                    >
                      {s.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "14px 16px",
              border: "1px dashed #2a2620",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              lineHeight: 1.7,
            }}
          >
            <div style={{ color: "#d4af6a", marginBottom: 6 }}>READ ME</div>
            This is a model, not a measurement. Move the parameters and watch how
            the central architecture stabilizes, fragments, or runs away. RTC's
            claim is that perspective requires <em>all</em> of these conditions
            to hold within bounded ranges. Pull any one too far and the system
            stops being a point of view.
          </div>
        </section>
      </div>

      <footer
        style={{
          maxWidth: 1280,
          margin: "60px auto 0",
          paddingTop: 24,
          borderTop: "1px solid #2a2620",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#5a544a",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>RTC / Perspective Engine</span>
        <span>Bounded recursion · Salience · Continuity · Source · Time</span>
      </footer>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
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
      {children}
    </div>
  );
}

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
