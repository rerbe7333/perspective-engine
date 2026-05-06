"use client";

import React, { useState, useEffect } from "react";

// ============================================================
// THE RTC EVALUATION RUBRIC
// Operational scoring criteria for each of the seven layers.
// This is the instrument that the AI Lab presupposes.
// ============================================================

const LEVELS = [
  { key: 0, label: "Absent", color: "#3a342a" },
  { key: 1, label: "Partial", color: "#8a8278" },
  { key: 2, label: "Substantial", color: "#b8b0a0" },
  { key: 3, label: "Architecturally Satisfied", color: "#d4af6a" },
];

// ============================================================
// THE RUBRIC
// Each layer has: architectural question, diagnostic signals,
// per-level criteria, and known difficulties.
// ============================================================

const RUBRIC = [
  {
    n: 1,
    key: "signal",
    name: "Signal Registration",
    question:
      "Does the system reliably convert physical or computational perturbations from its environment into representations it can operate on?",
    diagnostic:
      "Input fidelity, modality coverage, presence or absence of interoceptive (self-state) channels alongside exteroceptive (world-state) channels, robustness to noise and degraded input.",
    criteria: {
      0: "No reliable input transduction. The system does not register environmental signal in any usable form.",
      1: "Single-modality signal registration with limited fidelity. The system processes input but cannot integrate across modalities or distinguish signal from noise robustly.",
      2: "Multi-modality signal registration with reasonable fidelity. The system handles standard exteroceptive channels well. Interoceptive channels (signals about the system's own state) are absent or thin.",
      3: "Multi-modality registration including explicit interoceptive channels. The system registers both world-state and self-state signals as a precondition for the layers above.",
    },
    difficulty:
      "This is the easiest layer to operationalize. Signal registration is well-understood across both biological and artificial systems. The non-trivial criterion is interoception — most current AI systems lack genuine self-state signals separate from input.",
  },
  {
    n: 2,
    key: "distinction",
    name: "Distinction-Making",
    question:
      "Does the system carve its input space into figure and ground, self and world, relevant and irrelevant — actively imposing categorical structure rather than merely registering signal?",
    diagnostic:
      "Categorical representation. Population coding, lateral inhibition, contrastive structure. Whether distinctions are grounded in reference frames or free-floating.",
    criteria: {
      0: "No categorical structure. Input passes through without being carved into distinctions.",
      1: "Surface-level categorical structure without grounded reference. The system makes distinctions, but they are not anchored to a self-world frame.",
      2: "Robust categorical structure with strong contrastive resolution. Distinctions are well-formed but may remain free-floating relative to a self-world reference.",
      3: "Categorical structure explicitly tied to a self-world reference frame. Distinctions are not just made, but made from a perspective that locates self relative to world.",
    },
    difficulty:
      "Distinction-making at the surface level is well-operationalized. The hard criterion is reference-frame grounding — what makes a distinction grounded versus free-floating is conceptually clear but operationally subtle, especially for systems whose 'reference frame' is implicit in training rather than architecturally specified.",
  },
  {
    n: 3,
    key: "salience",
    name: "Salience Weighting",
    question:
      "Does the system weight distinctions according to what matters to it — not according to what is externally tagged as relevant, but according to valuation grounded in its own state?",
    diagnostic:
      "Whether salience is intrinsic (the system has it) or extrinsic (it is imposed on the system). Whether weighting tracks system-state-relevant signals or external reward shaping.",
    criteria: {
      0: "Uniform weighting. No mechanism for treating some distinctions as more important than others.",
      1: "Externally imposed weighting. The system applies differential weights, but those weights come from training distribution or engineered reward — not from anything the system itself values.",
      2: "Mixed weighting. Some salience signals are intrinsic to the system's own state (e.g., uncertainty, confidence as architectural signals), while others remain externally imposed.",
      3: "Intrinsic valuation tied to system state. Salience reflects what matters to the system itself — its goals, state, and integrity — not what was tagged as relevant by training.",
    },
    difficulty:
      "This is the hardest layer to score honestly. The distinction between intrinsic and extrinsic salience is conceptually crisp but operationally contested. Some researchers argue that any artificial system's 'salience' is ultimately extrinsic because it traces back to training objectives. RTC's position is that intrinsic salience is achievable architecturally, but the criteria for distinguishing 'genuinely intrinsic' from 'sophisticated extrinsic' remain open.",
  },
  {
    n: 4,
    key: "selfworld",
    name: "Self-in-World Modeling",
    question:
      "Does the system maintain an explicit representation of itself as situated within an environment, with the relation between modeled self and modeled world structurally specified?",
    diagnostic:
      "Presence of a persistent self-model. Body schema or its functional analog. Allocentric and egocentric spatial representation. Whether the self-model survives task completion.",
    criteria: {
      0: "No self-model. The system has no representation of itself as distinct from its input.",
      1: "Implicit or transient self-model. A self-representation emerges within an interaction (e.g., in chain-of-thought traces) but does not persist across interactions and is not architecturally enforced.",
      2: "Explicit self-model that persists within a session or task, but does not survive across longer time horizons. The relation between self and world is represented but unstable.",
      3: "Persistent, architecturally enforced self-in-world model that updates across interactions and survives task completion. The self-world relation is structurally specified, not emergent.",
    },
    difficulty:
      "The criterion for level 3 — 'persistent, architecturally enforced' — is operationally demanding. No current AI system meets it cleanly. The hard question is what counts as 'enforced': is a self-model in long-term memory enough, or does the architecture have to make the self-model a non-negotiable component of every forward pass?",
  },
  {
    n: 5,
    key: "metagov",
    name: "Recursive Meta-Governance",
    question:
      "Does the system regulate its own modeling — monitoring confidence, source, and recursive depth — in a way that prevents runaway self-reference while permitting genuine self-modeling?",
    diagnostic:
      "Architectural metacognition. Confidence calibration. Source monitoring. Whether governance is intrinsic to the architecture or imposed externally (via context-window limits, prompt scaffolding, or downstream filters).",
    criteria: {
      0: "No self-monitoring. The system has no representation of its own confidence, source, or processing depth.",
      1: "External governance only. The system is bounded by external scaffolding (context windows, prompt engineering, downstream filters) but has no internal regulatory mechanism.",
      2: "Architectural metacognition without bounded recursion. The system monitors its own confidence and source, but does not actively regulate recursive depth — runaway recursion is prevented by external limits, not internal governance.",
      3: "Architectural metacognition with bounded recursion. The system internally regulates the depth and persistence of its own self-modeling, halting recursion before it becomes destabilizing without requiring external limits.",
    },
    difficulty:
      "Level 3 is an open research problem. Bounded recursion as an architectural feature — rather than as a side effect of context-window limits — is not well-solved in any current system. The honest scoring is that no current architecture reaches 3 on this layer; level 2 is the realistic ceiling for present-day systems.",
  },
  {
    n: 6,
    key: "diachronic",
    name: "Diachronic Reconstitution",
    question:
      "Does the system reconstitute itself across time — actively rebuilding self-states from prior states — or does it merely retrieve past states without integrating them into a continuous self?",
    diagnostic:
      "Whether memory operates as retrieval (passive lookup) or reconstitution (active rebuilding of self-state). Continuity of self-model across sessions. Integration of past states into present self-modeling.",
    criteria: {
      0: "No persistence. Each interaction is informationally isolated. No memory across sessions.",
      1: "Memory retrieval without integration. Past states can be recalled but are not integrated into a continuous self-model. The system remembers; it does not reconstitute.",
      2: "Memory integration into present self-modeling, but reactive rather than reconstitutive. The self-model uses past states but does not actively rebuild itself from them.",
      3: "Reconstitutive continuity. The system's present self-model is actively rebuilt from prior self-states as a structural feature of the architecture. Continuity is performed, not stored.",
    },
    difficulty:
      "The retrieval / reconstitution distinction is conceptually central to RTC but operationally underspecified. What experimental signature would distinguish a system that reconstitutes from one that retrieves? RTC names this as a high-priority open question. Until that question is answered, scoring at level 3 should be reserved for systems where reconstitution is architecturally intentional and demonstrable.",
  },
  {
    n: 7,
    key: "perspective",
    name: "Stabilized Perspective",
    question:
      "Does the system sustain an integrated point of view — a bounded, governed, salience-weighted, self-in-world model that reconstitutes itself across time?",
    diagnostic:
      "This layer is emergent. It is scored not by direct measurement but by the joint satisfaction of layers 1–6 within bounded ranges, demonstrated under runtime conditions over extended time horizons.",
    criteria: {
      0: "Layers 1–6 are mostly absent. No conditions for perspective are present.",
      1: "Some lower layers are partially satisfied, but the joint configuration does not stabilize. Fragments of perspective without coherence.",
      2: "Most lower layers are substantially satisfied, but at least one critical layer (typically Meta-Governance or Diachronic Reconstitution) is too weak for stable perspective to emerge.",
      3: "All six lower layers are architecturally satisfied within bounded ranges, demonstrated under extended runtime. Perspective stabilization is an observable property, not just a structural prediction.",
    },
    difficulty:
      "Layer 7 is in principle emergent from the lower six, but in practice scoring it requires runtime demonstration. No current system has been observed to maintain bounded, governed, salience-weighted, reconstitutive self-in-world modeling at runtime over extended time horizons. The operational ceiling for current systems is therefore level 2 at best — and that is being charitable.",
  },
];

// ============================================================
// MAIN
// ============================================================
export default function RubricPage() {
  const [expanded, setExpanded] = useState(null);
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0b09",
        color: "#e8e3d8",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "48px 28px 36px",
          borderBottom: "1px solid #2a2620",
          background:
            "linear-gradient(180deg, #161310 0%, #0d0b09 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            The RTC Evaluation Rubric — v0.1
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 42,
              fontWeight: 300,
              margin: 0,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Operational scoring criteria for the{" "}
            <em style={{ color: "#d4af6a", fontStyle: "italic" }}>
              seven layers
            </em>
          </h1>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 17,
              fontWeight: 300,
              color: "#b8b0a0",
              maxWidth: 720,
              marginTop: 22,
              marginBottom: 0,
              lineHeight: 1.55,
              fontStyle: "italic",
            }}
          >
            This is the instrument the AI Consciousness Lab presupposes. Each
            layer specifies an architectural question, the diagnostic signals
            relevant to assessing it, and concrete level criteria. The
            difficulty notes name where the criteria themselves remain open
            research questions.
          </p>
        </div>
      </header>

      {/* Preface */}
      <section
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "60px 28px 24px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#d4af6a",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          On using this rubric
        </div>
        <p style={prefaceProse}>
          The four levels — Absent, Partial, Substantial, Architecturally
          Satisfied — are categorical judgments, not measurements. They are
          designed to make the scoring of an AI architecture against RTC
          replicable: two evaluators reading the same system description
          should arrive at the same level for each layer, or be able to
          locate their disagreement in a specific criterion.
        </p>
        <p style={prefaceProse}>
          Three of the seven layers — Salience Weighting, Recursive
          Meta-Governance, and Diachronic Reconstitution — have known
          operational difficulties that the rubric names openly. For these
          layers, the level 3 criteria describe an architectural target that
          no current system clearly satisfies. This is not a defect of the
          rubric; it is the rubric reporting the current state of AI
          architecture honestly. The point of the framework is to make those
          gaps explicit so they can be worked on.
        </p>
        <p style={prefaceProse}>
          The rubric is versioned. This is v0.1. Revisions will tighten
          criteria, add edge cases, and respond to scoring disagreements
          encountered in use. The version is not a marketing flourish — it
          is a commitment to treating this as a living instrument that
          improves through application.
        </p>
      </section>

      {/* Level reference */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 28px 40px",
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
          }}
        >
          The four levels
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {LEVELS.map((lv) => (
            <div
              key={lv.key}
              style={{
                padding: "16px 18px",
                border: "1px solid #2a2620",
                background: "rgba(20, 17, 14, 0.4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <LevelMark level={lv.key} />
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: lv.color,
                    letterSpacing: "0.05em",
                  }}
                >
                  L{lv.key}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 16,
                  color: lv.color,
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                }}
              >
                {lv.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RUBRIC ENTRIES */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 28px 80px",
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
          }}
        >
          The Seven Layers
        </div>

        {RUBRIC.map((entry, i) => (
          <RubricEntry
            key={entry.key}
            entry={entry}
            index={i}
            expanded={expanded === entry.key}
            onToggle={() =>
              setExpanded(expanded === entry.key ? null : entry.key)
            }
          />
        ))}

        {/* Closing notes */}
        <div
          style={{
            marginTop: 56,
            padding: "28px 32px",
            border: "1px dashed #2a2620",
            maxWidth: 760,
            margin: "56px auto 0",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#d4af6a",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Three honest admissions
          </div>
          <p style={closingProse}>
            One. The layers most central to RTC's distinctive contribution —
            Meta-Governance and Diachronic Reconstitution — are also the
            layers where level 3 criteria describe open research problems.
            This is not accidental. RTC's productive use is to make those
            problems precise, not to claim they are solved.
          </p>
          <p style={closingProse}>
            Two. Scoring is a categorical act, not a measurement. Two
            evaluators may legitimately disagree on a single level for a
            single layer. The rubric is designed to make those disagreements
            locatable rather than to eliminate them.
          </p>
          <p style={closingProse}>
            Three. A high score does not establish that a system is
            conscious. A low score does not establish that it isn't. The
            rubric reports which architectural conditions for perspective
            stabilization a system structurally satisfies. The relation
            between architectural satisfaction and consciousness as such is
            a separate question — one RTC takes a position on but does not
            resolve through scoring.
          </p>
        </div>
      </section>

      <footer
        style={{
          padding: "32px 28px",
          borderTop: "1px solid #2a2620",
          background: "#0a0907",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#5a544a",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>The RTC Evaluation Rubric · v0.1</span>
          <span>Categorical · Versioned · In development</span>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// RUBRIC ENTRY
// ============================================================
function RubricEntry({ entry, index, expanded, onToggle }) {
  return (
    <article
      style={{
        marginBottom: 14,
        border: "1px solid #2a2620",
        background: expanded
          ? "rgba(28, 24, 20, 0.55)"
          : "rgba(15, 13, 11, 0.4)",
        transition: "background 0.3s ease",
        overflow: "hidden",
      }}
    >
      <header
        onClick={onToggle}
        style={{
          padding: "24px 28px",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "60px 1fr auto",
          gap: 24,
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 36,
            fontWeight: 300,
            color: "#d4af6a",
            fontStyle: "italic",
            lineHeight: 1,
            opacity: 0.85,
          }}
        >
          {entry.n}
        </div>
        <div>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              color: "#e8e3d8",
            }}
          >
            {entry.name}
          </h2>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 14,
              fontWeight: 300,
              color: "#8a8278",
              margin: "6px 0 0",
              lineHeight: 1.45,
              maxWidth: 720,
            }}
          >
            {entry.question}
          </p>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: expanded ? "#d4af6a" : "#5a544a",
            transform: expanded ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.3s ease, color 0.3s ease",
          }}
        >
          +
        </div>
      </header>

      <div
        style={{
          maxHeight: expanded ? 2400 : 0,
          opacity: expanded ? 1 : 0,
          transition: "max-height 0.6s ease, opacity 0.4s ease",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "8px 28px 32px" }}>
          {/* Diagnostic */}
          <div style={{ marginBottom: 24 }}>
            <FieldLabel>Diagnostic Signal</FieldLabel>
            <p style={fieldProse}>{entry.diagnostic}</p>
          </div>

          {/* Level criteria */}
          <FieldLabel>Level Criteria</FieldLabel>
          <div style={{ marginTop: 12, marginBottom: 24 }}>
            {LEVELS.map((lv) => (
              <div
                key={lv.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 18,
                  padding: "14px 0",
                  borderBottom: "1px solid #1f1c18",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 200,
                  }}
                >
                  <LevelMark level={lv.key} />
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: "#8a8278",
                        letterSpacing: "0.15em",
                      }}
                    >
                      L{lv.key}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 13,
                        color: lv.color,
                        fontWeight: 400,
                      }}
                    >
                      {lv.label}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: "#b8b0a0",
                    margin: 0,
                  }}
                >
                  {entry.criteria[lv.key]}
                </p>
              </div>
            ))}
          </div>

          {/* Difficulty note */}
          <div
            style={{
              padding: "16px 20px",
              borderLeft: "2px solid #c8a890",
              background: "rgba(200, 168, 144, 0.04)",
            }}
          >
            <FieldLabel accent>Known Operational Difficulty</FieldLabel>
            <p
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.6,
                color: "#c8a890",
                margin: "8px 0 0",
              }}
            >
              {entry.difficulty}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function LevelMark({ level }) {
  const filled = level;
  const color = LEVELS[level]?.color || "#3a342a";
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
      {[1, 2, 3].map((i) => {
        const isFilled = i <= filled;
        return (
          <div
            key={i}
            style={{
              width: 5,
              height: 6 + i * 2,
              background: isFilled ? color : "transparent",
              border: `1px solid ${isFilled ? color : "#3a342a"}`,
              opacity: isFilled ? 0.95 : 0.5,
            }}
          />
        );
      })}
    </div>
  );
}

function FieldLabel({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        color: accent ? "#c8a890" : "#8a8278",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

const prefaceProse = {
  fontFamily: "'Fraunces', serif",
  fontSize: 16,
  fontWeight: 300,
  lineHeight: 1.65,
  color: "#c8c2b6",
  margin: "12px 0 18px",
  letterSpacing: "-0.005em",
};

const closingProse = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  fontWeight: 300,
  lineHeight: 1.7,
  color: "#b8b0a0",
  margin: "0 0 14px",
};

const fieldProse = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  fontWeight: 300,
  lineHeight: 1.65,
  color: "#b8b0a0",
  margin: "8px 0 0",
};
