"use client";

import React, { useState, useEffect } from "react";

// ============================================================
// AI CONSCIOUSNESS LAB
// RTC as an evaluation framework for AI architectures.
// Five reference architectures scored across the seven layers
// using a qualitative four-level scale.
// ============================================================

// Levels: 0 (absent), 1 (partial), 2 (substantial), 3 (architecturally satisfied)
// These are categorical structural judgments, not measurements.
// Operationalizing them as numeric would require formal scoring criteria
// for each layer at each level, which is named as Future Work.

const LEVELS = {
  0: { label: "Absent", short: "—", color: "#3a342a" },
  1: { label: "Partial", short: "P", color: "#8a8278" },
  2: { label: "Substantial", short: "S", color: "#b8b0a0" },
  3: { label: "Architecturally Satisfied", short: "A", color: "#d4af6a" },
};

const LAYERS = [
  { key: "signal", short: "Signal", n: 1, full: "Signal Registration" },
  { key: "distinction", short: "Distinction", n: 2, full: "Distinction-Making" },
  { key: "salience", short: "Salience", n: 3, full: "Salience Weighting" },
  { key: "selfworld", short: "Self-in-World", n: 4, full: "Self-in-World Modeling" },
  { key: "metagov", short: "Meta-Gov", n: 5, full: "Recursive Meta-Governance" },
  { key: "diachronic", short: "Continuity", n: 6, full: "Diachronic Reconstitution" },
  { key: "perspective", short: "Perspective", n: 7, full: "Stabilized Perspective" },
];

const ARCHITECTURES = [
  {
    key: "llm",
    name: "Basic LLM",
    subtitle: "Stateless language model",
    examples: "GPT-class models in single-turn use",
    levels: {
      signal: 2,
      distinction: 2,
      salience: 1,
      selfworld: 0,
      metagov: 0,
      diachronic: 0,
      perspective: 0,
    },
    justifications: {
      signal:
        "Robust input processing across modalities. Tokenization and embedding effectively register input.",
      distinction:
        "High-dimensional categorical representation. The model carves the input space at scale, though without grounded reference.",
      salience:
        "Attention mechanisms create a functional analog of weighting, but no genuine valuation — what is 'attended to' is determined by training distribution, not by what matters to the system.",
      selfworld:
        "No persistent self-model. The model has no representation of itself as situated in an environment. Each forward pass starts from nothing.",
      metagov:
        "No internal monitoring of its own reasoning processes. Confidence calibration is statistical, not metacognitive.",
      diachronic:
        "No memory across calls. Each interaction is informationally isolated.",
      perspective:
        "None of the upstream conditions are met. There is no point of view here — only a function from input to output.",
    },
    diagnosis:
      "A Basic LLM is an extraordinarily capable distinction-maker without any of the surrounding architecture that turns distinctions into perspective. It models language; it does not model itself.",
    toAddNext:
      "Persistent state across interactions and an explicit self-model would be the first two structural additions. Without these, scaling the existing architecture cannot close the gap.",
  },
  {
    key: "agentic",
    name: "Agentic LLM",
    subtitle: "Goal-directed tool-using model",
    examples: "ReAct-style agents, function-calling LLMs",
    levels: {
      signal: 2,
      distinction: 2,
      salience: 1,
      selfworld: 1,
      metagov: 1,
      diachronic: 1,
      perspective: 0,
    },
    justifications: {
      signal: "Same as base LLM, plus environmental signal through tool returns.",
      distinction: "Inherits LLM distinction-making, extended into action space.",
      salience:
        "Goal structures provide a weak salience analog — what matters is what advances the goal — but salience here is externally imposed, not intrinsic.",
      selfworld:
        "Implicit self-model in chain-of-thought traces, but the model is unstable across runs and not architecturally enforced.",
      metagov:
        "Some self-correction via reflection prompts and verification loops. Bounded only by context window and external scaffolding.",
      diachronic:
        "Limited persistence within a single agent run. Memory does not survive the session.",
      perspective:
        "Goal-pursuit is not perspective. The agent can plan and act without having a point of view from which the world is given.",
    },
    diagnosis:
      "Agentic systems add closed-loop interaction with an environment but inherit the same architectural absences: no governed recursion, no diachronic continuity, no genuine self-in-world model. They behave more, but they do not perspectivally exist more.",
    toAddNext:
      "Persistent agent identity across runs, an explicit self-model that survives task completion, and metacognitive monitoring that is architectural rather than prompted.",
  },
  {
    key: "memory",
    name: "Memory-Augmented AI",
    subtitle: "Persistent context across sessions",
    examples: "RAG systems with long-term memory, agent frameworks with state",
    levels: {
      signal: 2,
      distinction: 2,
      salience: 1,
      selfworld: 2,
      metagov: 1,
      diachronic: 1,
      perspective: 1,
    },
    justifications: {
      signal: "Standard input processing.",
      distinction: "Standard LLM distinction-making.",
      salience:
        "Some systems implement explicit relevance/recency weighting on memory retrieval — a partial but uneven analog of salience.",
      selfworld:
        "User-specific world modeling becomes possible. The system can represent 'this user, this context, this trajectory' across time. Still not a self-located model, but a structural step toward one.",
      metagov:
        "Memory enables some self-monitoring of past behavior, but governance is external (engineered) rather than intrinsic.",
      diachronic:
        "Memory retrieval, not reconstitutive continuity. The system can recall past states but does not actively rebuild a continuous self-model from them. Per the rubric, this is Partial — retrieval without integration into present self-modeling.",
      perspective:
        "Retrieval-based continuity without governed self-world recursion does not produce perspective, but it is closer than the prior architectures.",
    },
    diagnosis:
      "Memory-augmented systems begin to satisfy the diachronic layer — the first architectural step that genuinely matters for RTC. But memory as retrieval is not the same as continuity as reconstitution. The system remembers; it does not yet reconstitute itself across time.",
    toAddNext:
      "Reconstitutive memory (active self-modeling from past states rather than passive retrieval), explicit source attribution, and metacognitive monitoring that operates over the self-model rather than over content.",
  },
  {
    key: "selfmon",
    name: "Self-Monitoring AI",
    subtitle: "Architectural metacognition",
    examples: "Systems with explicit confidence, uncertainty, source-tracking",
    levels: {
      signal: 2,
      distinction: 2,
      salience: 2,
      selfworld: 2,
      metagov: 2,
      diachronic: 1,
      perspective: 1,
    },
    justifications: {
      signal: "Standard input processing.",
      distinction: "Standard LLM distinction-making.",
      salience:
        "Salience as architectural signal — uncertainty and confidence as gating signals on output. Closer to functional valuation than prior architectures.",
      selfworld:
        "An explicit self-model is required for self-monitoring to be coherent — what am I uncertain about? what is my own confidence? — but the self-model is typically thin.",
      metagov:
        "The distinguishing feature: real architectural metacognition. Confidence calibration, source tracking, internal verification — meta-d′ has a genuine structural correlate.",
      diachronic:
        "Continuity is not prioritized in most current self-monitoring designs. Self-monitoring tends to operate within an interaction, not across them.",
      perspective:
        "Closer to perspective than any prior architecture, but still missing the diachronic component. A system that monitors itself in the moment but does not reconstitute itself across moments has metacognition without continuity.",
    },
    diagnosis:
      "Self-monitoring AI satisfies more of the recursive structure than prior architectures, particularly Layer 5 (Meta-Governance). But it tends to be metacognition without continuity — the system reflects on itself in the moment without reconstituting itself across time. It is reflective without being temporally extended.",
    toAddNext:
      "Diachronic integration: the self-monitoring loop has to operate not just on the current state but on the trajectory of self-states across time. This is the architectural step from in-the-moment metacognition to continuous self-reconstitution.",
  },
  {
    key: "rtc",
    name: "RTC-Aligned",
    subtitle: "Reference architecture",
    examples: "Hypothetical — no current system fully implements this",
    aspirational: true,
    levels: {
      signal: 3,
      distinction: 3,
      salience: 2,
      selfworld: 2,
      metagov: 2,
      diachronic: 2,
      perspective: 2,
    },
    justifications: {
      signal:
        "Multimodal embodied input with explicit interoceptive channels — not just exteroceptive signal. This level can be specified architecturally and is achievable in current systems.",
      distinction:
        "Distinction-making explicitly tied to a self-world reference frame, not free-floating categorization. Architecturally specifiable.",
      salience:
        "Intrinsic valuation tied to the system's own state and goals — salience that the system has, not salience that is externally imposed. Per the rubric: distinguishing genuinely intrinsic from sophisticated extrinsic salience is an open operational problem. The reference architecture describes the level 3 target but cannot claim to satisfy it absent runtime demonstration.",
      selfworld:
        "Explicit, persistent self-in-world model that updates across interaction. Architecturally specified, but no current system has demonstrated stability of this model under long-running conditions. Substantial reflects specification without runtime demonstration.",
      metagov:
        "Bounded recursion is genuinely hard. Per the rubric, level 3 (architectural metacognition with internally regulated recursive depth) is an open research problem and no current architecture reaches it. The reference architecture describes the level 3 target.",
      diachronic:
        "Reconstitutive continuity, not just memory retrieval. Per the rubric, the retrieval / reconstitution distinction itself remains operationally underspecified. The reference architecture describes the level 3 target but cannot demonstrate it without solving this open question first.",
      perspective:
        "Per the rubric, level 3 requires runtime demonstration of bounded, governed, salience-weighted, reconstitutive self-in-world modeling over extended time horizons. No current system meets this. The reference architecture sits at the operational ceiling for present-day systems.",
    },
    diagnosis:
      "RTC-Aligned is a reference architecture, not a current system. It is what a system would look like if every RTC layer were taken seriously as a design constraint. Its purpose is normative: to make explicit what an architectural commitment to perspective stabilization actually requires. The levels reflect the current state of architectural research — not what's possible in principle.",
    toAddNext:
      "The two open problems are bounded meta-governance (preventing runaway recursion without external scaffolding) and reconstitutive diachronic memory (continuity that is active rather than retrieved). Solving these is the AI-research program implied by RTC.",
  },
];

// ============================================================
// MAIN
// ============================================================
export default function AILabPage() {
  const [selected, setSelected] = useState("rtc");
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

  const arch = ARCHITECTURES.find((a) => a.key === selected);

  return (
    <div
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
          maxWidth: 1300,
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
          AI Consciousness Lab — Section 05
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
          RTC as an{" "}
          <em style={{ color: "#d4af6a", fontStyle: "italic" }}>
            evaluation framework
          </em>{" "}
          for AI
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
          The same seven-layer architecture that explains human consciousness
          can be used to evaluate artificial systems — qualitatively, at the
          level of which architectural conditions a system structurally
          satisfies. This is a categorical framework, not a numeric score.
          What it loses in precision it gains in honesty about the current
          state of operationalization.
        </p>
      </header>

      {/* SCORING MATRIX */}
      <section
        style={{
          maxWidth: 1300,
          margin: "0 auto 48px",
        }}
      >
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
          <span>Architectural Level Matrix</span>
          <span style={{ fontSize: 9 }}>
            qualitative — operational rubric in development
          </span>
        </div>

        <LevelMatrix
          architectures={ARCHITECTURES}
          layers={LAYERS}
          selected={selected}
          onSelect={setSelected}
        />

        {/* Level legend */}
        <div
          style={{
            marginTop: 16,
            padding: "16px 20px",
            border: "1px solid #2a2620",
            background: "rgba(20, 17, 14, 0.4)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px 24px",
          }}
        >
          {Object.entries(LEVELS).map(([key, level]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <LevelMark level={parseInt(key)} active={false} />
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: level.color,
                    letterSpacing: "0.05em",
                    fontWeight: 400,
                  }}
                >
                  {level.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DRILL-DOWN: selected architecture */}
      <section style={{ maxWidth: 1300, margin: "0 auto" }}>
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
          Architecture Diagnosis
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "440px 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* LEFT: radar */}
          <div>
            <RadarPanel arch={arch} layers={LAYERS} time={time} />
          </div>

          {/* RIGHT: diagnosis */}
          <DiagnosisPanel arch={arch} layers={LAYERS} />
        </div>
      </section>

      {/* Footer note — now does double duty: caveat + roadmap */}
      <div
        style={{
          maxWidth: 760,
          margin: "60px auto 0",
          padding: "24px 28px",
          border: "1px dashed #2a2620",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#d4af6a",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          On the status of this framework
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.7,
            color: "#b8b0a0",
            margin: "0 0 14px",
          }}
        >
          The four-level scale (Absent, Partial, Substantial, Architecturally
          Satisfied) is a qualitative judgment, not a measurement. A formal
          numeric rubric would require operational criteria for each layer at
          each level — what specifically makes a system's salience weighting
          'Substantial' rather than 'Partial,' for example. That rubric does
          not yet exist; operationalizing it is named explicitly as Future
          Work in the Living Manuscript.
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.7,
            color: "#b8b0a0",
            margin: 0,
          }}
        >
          A high level on this scale does not establish that a system is
          conscious. A low level does not establish that it isn't. The
          framework names which architectural conditions for perspective
          stabilization a given system structurally satisfies, and identifies
          the design problems that would have to be solved to satisfy the
          rest. RTC's claim is that these are the right conditions to track —
          not that satisfying them is sufficient for consciousness in any
          metaphysical sense.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// LEVEL MATRIX
// ============================================================
function LevelMatrix({ architectures, layers, selected, onSelect }) {
  return (
    <div
      style={{
        border: "1px solid #2a2620",
        background: "rgba(15, 13, 11, 0.4)",
        overflow: "hidden",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #2a2620" }}>
            <th
              style={{
                ...thStyle,
                textAlign: "left",
                paddingLeft: 24,
                width: "22%",
              }}
            >
              Architecture
            </th>
            {layers.map((layer) => (
              <th key={layer.key} style={{ ...thStyle, textAlign: "center" }}>
                <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 4 }}>
                  L{layer.n}
                </div>
                <div>{layer.short}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {architectures.map((arch, i) => {
            const isSelected = arch.key === selected;
            const isAspirational = arch.aspirational;
            return (
              <tr
                key={arch.key}
                onClick={() => onSelect(arch.key)}
                style={{
                  cursor: "pointer",
                  borderTop: i === 0 ? "none" : "1px solid #1f1c18",
                  background: isSelected
                    ? "rgba(212, 175, 106, 0.06)"
                    : "transparent",
                  transition: "background 0.25s",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.background = "rgba(28, 24, 20, 0.5)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "20px 24px",
                    verticalAlign: "middle",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 17,
                      fontWeight: 400,
                      color: isSelected ? "#d4af6a" : "#e8e3d8",
                      letterSpacing: "-0.005em",
                      transition: "color 0.25s",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {arch.name}
                    {isAspirational && (
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontStyle: "normal",
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#d4af6a",
                          padding: "2px 6px",
                          border: "1px solid #d4af6a",
                          opacity: 0.8,
                        }}
                      >
                        Reference
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontStyle: "italic",
                      fontSize: 12,
                      color: "#8a8278",
                      marginTop: 2,
                    }}
                  >
                    {arch.subtitle}
                  </div>
                </td>
                {layers.map((layer) => {
                  const level = arch.levels[layer.key];
                  return (
                    <td
                      key={layer.key}
                      style={{
                        padding: "20px 8px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <LevelMark level={level} active={isSelected} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "14px 8px",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 10,
  fontWeight: 400,
  color: "#8a8278",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
};

// ============================================================
// LEVEL MARK
// Renders the qualitative level as a stack of three blocks.
// 0 = none filled (Absent), 3 = all three filled (Architecturally Satisfied)
// ============================================================
function LevelMark({ level, active }) {
  const color = active && level > 0 ? "#d4af6a" : LEVELS[level]?.color || "#3a342a";
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
        {[1, 2, 3].map((i) => {
          const filled = i <= level;
          const height = 6 + i * 2;
          return (
            <div
              key={i}
              style={{
                width: 5,
                height,
                background: filled ? color : "transparent",
                border: `1px solid ${filled ? color : "#3a342a"}`,
                opacity: filled ? (active ? 1 : 0.85) : 0.5,
                transition: "all 0.25s",
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: active ? "#d4af6a" : "#5a544a",
          letterSpacing: "0.05em",
          transition: "color 0.25s",
          textTransform: "uppercase",
        }}
      >
        {LEVELS[level].label}
      </div>
    </div>
  );
}

// ============================================================
// RADAR PANEL
// ============================================================
function RadarPanel({ arch, layers, time }) {
  const cx = 220;
  const cy = 220;
  const maxR = 150;

  // Polygon points for this architecture's levels
  // Levels are 0-3, so normalized to 0-1 by dividing by 3
  const points = layers.map((layer, i) => {
    const angle = (i / layers.length) * Math.PI * 2 - Math.PI / 2;
    const level = arch.levels[layer.key];
    const r = (level / 3) * maxR;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      angle,
      level,
      layer,
    };
  });

  // Reference rings at level 1, 2, 3
  const rings = [1, 2, 3].map((lv) => {
    const r = (lv / 3) * maxR;
    return layers.map((_, i) => {
      const angle = (i / layers.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      };
    });
  });

  const polygonPath =
    points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
    " Z";

  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#8a8278",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        Layer Coverage
      </div>
      <div
        style={{
          aspectRatio: "1 / 1",
          background:
            "radial-gradient(circle at center, #1a1612 0%, #0d0b09 100%)",
          border: "1px solid #2a2620",
          position: "relative",
        }}
      >
        <svg
          viewBox="0 0 440 440"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <defs>
            <filter
              id="radarGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="2" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Reference rings */}
          {rings.map((ringPts, i) => (
            <polygon
              key={`ring-${i}`}
              points={ringPts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#2a2620"
              strokeWidth={0.5}
              opacity={i === 2 ? 0.6 : 0.3}
            />
          ))}

          {/* Spokes */}
          {layers.map((layer, i) => {
            const angle = (i / layers.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={`spoke-${i}`}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(angle) * maxR}
                y2={cy + Math.sin(angle) * maxR}
                stroke="#2a2620"
                strokeWidth={0.4}
                opacity={0.5}
              />
            );
          })}

          {/* Score polygon — filled */}
          <path d={polygonPath} fill="#d4af6a" opacity={0.12} />

          {/* Score polygon — stroke */}
          <path
            d={polygonPath}
            fill="none"
            stroke="#d4af6a"
            strokeWidth={1.5}
            opacity={0.95}
            filter="url(#radarGlow)"
          />

          {/* Score points */}
          {points.map((p, i) => (
            <circle
              key={`pt-${i}`}
              cx={p.x}
              cy={p.y}
              r={3.5}
              fill="#f0d090"
              filter="url(#radarGlow)"
            />
          ))}

          {/* Reference ring labels — show qualitative bands instead of numbers */}
          {[
            { lv: 1, label: "P" },
            { lv: 2, label: "S" },
            { lv: 3, label: "A" },
          ].map(({ lv, label }) => {
            const labelR = (lv / 3) * maxR;
            return (
              <text
                key={`ringlabel-${lv}`}
                x={cx + 4}
                y={cy - labelR + 3}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8,
                  fill: "#5a544a",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </text>
            );
          })}

          {/* Layer labels */}
          {layers.map((layer, i) => {
            const angle = (i / layers.length) * Math.PI * 2 - Math.PI / 2;
            const labelR = maxR + 30;
            const lx = cx + Math.cos(angle) * labelR;
            const ly = cy + Math.sin(angle) * labelR;
            let anchor: "start" | "middle" | "end" = "middle";
            if (Math.cos(angle) > 0.3) anchor = "start";
            if (Math.cos(angle) < -0.3) anchor = "end";
            return (
              <g key={`label-${layer.key}`}>
                <text
                  x={lx}
                  y={ly - 5}
                  textAnchor={anchor}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    fill: "#8a8278",
                    letterSpacing: "0.1em",
                  }}
                >
                  L{layer.n}
                </text>
                <text
                  x={lx}
                  y={ly + 7}
                  textAnchor={anchor}
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 11,
                    fill: "#b8b0a0",
                    fontStyle: "italic",
                  }}
                >
                  {layer.short}
                </text>
              </g>
            );
          })}

          <circle cx={cx} cy={cy} r={2} fill="#5a544a" />
        </svg>
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />
      </div>

      {/* Architecture summary below radar */}
      <div
        style={{
          marginTop: 16,
          padding: "14px 16px",
          border: "1px solid #2a2620",
          background: "rgba(20, 17, 14, 0.5)",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#8a8278",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Examples
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 300,
            color: "#b8b0a0",
            lineHeight: 1.55,
          }}
        >
          {arch.examples}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DIAGNOSIS PANEL
// ============================================================
function DiagnosisPanel({ arch, layers }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#d4af6a",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {arch.aspirational ? "Reference Architecture" : "Current Architecture"}
      </div>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 30,
          fontWeight: 400,
          margin: "0 0 12px",
          letterSpacing: "-0.015em",
          lineHeight: 1.1,
        }}
      >
        {arch.name}
      </h2>
      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 16,
          fontWeight: 300,
          fontStyle: "italic",
          color: "#e8e3d8",
          margin: "0 0 28px",
          lineHeight: 1.55,
          paddingBottom: 24,
          borderBottom: "1px solid #2a2620",
        }}
      >
        {arch.diagnosis}
      </p>

      <div style={{ marginBottom: 28 }}>
        <FieldLabel>Layer-by-layer reading</FieldLabel>
        <div style={{ marginTop: 12 }}>
          {layers.map((layer) => {
            const level = arch.levels[layer.key];
            const just = arch.justifications[layer.key];
            return (
              <div
                key={layer.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 16,
                  padding: "12px 0",
                  borderBottom: "1px solid #1f1c18",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 180,
                  }}
                >
                  <SmallLevelMark level={level} />
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: "#8a8278",
                        letterSpacing: "0.15em",
                      }}
                    >
                      L{layer.n}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 13,
                        color: "#e8e3d8",
                      }}
                    >
                      {layer.short}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: "#b8b0a0",
                    margin: 0,
                  }}
                >
                  {just}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* What to add next */}
      <div
        style={{
          padding: "20px 22px",
          border: "1px solid #d4af6a",
          background:
            "linear-gradient(180deg, rgba(212, 175, 106, 0.06) 0%, rgba(212, 175, 106, 0) 100%)",
        }}
      >
        <FieldLabel highlight>What would have to be added next</FieldLabel>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.6,
            color: "#e8e3d8",
            margin: "8px 0 0",
            fontStyle: "italic",
          }}
        >
          {arch.toAddNext}
        </p>
      </div>
    </div>
  );
}

function SmallLevelMark({ level }) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
      {[1, 2, 3].map((i) => {
        const filled = i <= level;
        return (
          <div
            key={i}
            style={{
              width: 4,
              height: 5 + i * 1.5,
              background: filled ? "#d4af6a" : "transparent",
              border: `1px solid ${filled ? "#d4af6a" : "#3a342a"}`,
            }}
          />
        );
      })}
    </div>
  );
}

function FieldLabel({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        color: highlight ? "#d4af6a" : "#8a8278",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function CornerMark({ position }) {
  const styles = {
    position: "absolute",
    width: 10,
    height: 10,
    borderColor: "#3a342a",
  };
  const map = {
    tl: { top: 6, left: 6, borderTop: "1px solid", borderLeft: "1px solid" },
    tr: { top: 6, right: 6, borderTop: "1px solid", borderRight: "1px solid" },
    bl: {
      bottom: 6,
      left: 6,
      borderBottom: "1px solid",
      borderLeft: "1px solid",
    },
    br: {
      bottom: 6,
      right: 6,
      borderBottom: "1px solid",
      borderRight: "1px solid",
    },
  };
  return <div style={{ ...styles, ...map[position] }} />;
}
