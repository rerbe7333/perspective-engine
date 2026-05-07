"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================
// FALSIFIABLE PREDICTIONS
// Five core empirical predictions of RTC, each with a
// visualized predicted signature.
// ============================================================

const PREDICTIONS = [
  {
    n: 1,
    key: "metad",
    title: "Metacognition collapses before perception",
    layer: "Meta-Governance · Layer 5",
    claim:
      "When the recursive meta-governance layer is disrupted, metacognitive accuracy (meta-d′) should degrade before basic perceptual sensitivity (d′) collapses. The system can still see — but it loses the capacity to know what it sees.",
    design:
      "TMS or pharmacological disruption of dorsolateral and frontopolar prefrontal cortex during a perceptual decision task. Measure d′ (perceptual sensitivity) and meta-d′ (metacognitive accuracy) across increasing disruption levels.",
    signature:
      "Two divergent curves. Perceptual sensitivity (d′) holds nearly flat as disruption increases. Metacognitive accuracy (meta-d′) drops earlier and steeper. The dissociation is the signature.",
    falsifies:
      "If d′ and meta-d′ degrade at the same rate, or if meta-d′ remains intact while d′ collapses, the bounded-recursion hypothesis is in trouble. The claim is that meta-governance is a separable, prior layer — not just a downstream consequence of perception.",
    viz: "metaD",
  },
  {
    n: 2,
    key: "temporal",
    title: "Disrupting temporal binding fragments perspective",
    layer: "Diachronic Reconstitution · Layer 6",
    claim:
      "Disruption of temporal integration (via ketamine, certain seizure types, or experimental binding manipulations) should produce subjective fragmentation of the lived now — discrete episodic slices rather than continuous perspective — while moment-to-moment perception remains intact.",
    design:
      "Pharmacological challenge with sub-anesthetic ketamine combined with first-person reports and continuous-flash suppression timing tasks. Measure subjective continuity of experience alongside objective temporal-binding window width.",
    signature:
      "Temporal binding window widens or fragments. Subjective reports show 'time slices' or discontinuity. Critically: this should occur even when single-moment perceptual accuracy is preserved. Continuity collapses without perception collapsing.",
    falsifies:
      "If temporal-binding disruption produces no subjective discontinuity — or if subjective continuity is preserved purely by intact moment-to-moment perception — RTC's claim that perspective requires diachronic reconstitution is weakened.",
    viz: "temporal",
  },
  {
    n: 3,
    key: "salience",
    title: "Salience modulates what becomes recursively stable",
    layer: "Salience · Layer 3",
    claim:
      "Emotionally and biologically salient stimuli should preferentially enter recursive stabilization — they become the contents that persist as conscious distinctions — independent of objective stimulus strength. Salience does not just amplify; it gates what the recursive architecture takes up.",
    design:
      "Continuous-flash suppression or attentional-blink paradigm with stimuli matched on physical properties but varying in personal/emotional salience. Measure breakthrough rate, dwell time in conscious access, and post-experiment recall.",
    signature:
      "Salience-weighted stimuli cross conscious access threshold faster and persist longer, with the gap widening at low signal strength. The interaction term — salience × signal strength — is where RTC predicts the strongest effect.",
    falsifies:
      "If breakthrough and dwell are determined entirely by physical signal strength with no salience modulation, or if salience effects are uniform rather than gating, the claim that salience structures recursive uptake fails.",
    viz: "salience",
  },
  {
    n: 4,
    key: "selfworld",
    title: "Without self-world recursion, no genuine perspective",
    layer: "Self-in-World · Layer 4",
    claim:
      "Systems with sophisticated signal processing but no recursive self-in-world model will fail behavioral and neural markers of perspective — even when their task performance is high. This is the predictive bridge from human consciousness to AI evaluation.",
    design:
      "Battery of perspective-dependent tasks (rubber-hand illusion analogues, perspective-taking, source-monitoring, self-other distinction) administered to candidate systems: large language models, agentic models, memory-augmented systems, and embodied robotic agents with explicit self-world models. Compare against human baselines and against task-only performance metrics.",
    signature:
      "Strong dissociation between raw task performance and perspective-dependent measures. Systems without explicit self-world recursion fail perspective markers regardless of how well they perform on the underlying tasks. Performance and perspective decouple.",
    falsifies:
      "If systems without self-world recursion pass perspective markers, or if perspective markers reduce to task performance, the architectural claim that self-in-world modeling is necessary for perspective is undermined.",
    viz: "selfworld",
  },
  {
    n: 5,
    key: "bounded",
    title: "Bounded recursion stabilizes; unbounded recursion does not",
    layer: "The Whole Architecture",
    claim:
      "Conscious perspective requires recursion to operate within bounded ranges. Too little recursive depth produces reactivity without reflection. Too much recursion without governance produces unstable self-reference. Stability lives in a middle band — and this should be measurable as a U-shaped relationship between recursive depth and perspective integrity.",
    design:
      "Cross-state and cross-population study: meditators (variable recursive depth), psychedelic states (high recursion), dissociative states (disrupted governance), depressive rumination (recursion without bounded termination), and waking baseline. Measure recursive depth (via prefrontal-DMN coupling and neurophenomenological report), governance markers, and perspective stability.",
    signature:
      "An inverted-U curve. Perspective stability peaks at intermediate recursive depth with intact governance. It falls off on the low end (reactive) and the high end (over-recursive). The signature is the curvature itself — not a monotonic relationship.",
    falsifies:
      "If perspective stability is monotonic with recursive depth (more is always better, or less is always better), the bounded-recursion claim — arguably RTC's central architectural commitment — is wrong. This is the prediction RTC most stakes its identity on.",
    viz: "bounded",
  },
];

// ============================================================
// MAIN
// ============================================================
export default function PredictionsPage() {
  const [time, setTime] = useState(0);
  const [expanded, setExpanded] = useState(null);

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
          Predictions — Section 04
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
          What would{" "}
          <em style={{ color: "#d4af6a", fontStyle: "italic" }}>break</em> the
          theory
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
          A theory that cannot be falsified is not a theory of anything. RTC
          makes five core predictions, each with an experimental design, a
          predicted empirical signature, and a clear condition under which the
          theory fails. These are the bets — the places RTC stakes its
          credibility.
        </p>
      </header>

      {/* Predictions list */}
      <main style={{ maxWidth: 1200, margin: "0 auto" }}>
        {PREDICTIONS.map((pred, i) => (
          <PredictionCard
            key={pred.key}
            prediction={pred}
            index={i}
            time={time}
            expanded={expanded === pred.key}
            onToggle={() =>
              setExpanded(expanded === pred.key ? null : pred.key)
            }
          />
        ))}

        {/* Closing note */}
        <div
          style={{
            marginTop: 56,
            padding: "24px 28px",
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
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            On the status of these predictions
          </div>
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
            Several of these predictions have partial empirical support from
            existing literature — meta-d′ dissociations, ketamine-induced
            temporal fragmentation, attentional salience effects on conscious
            access. RTC's contribution is not the individual predictions but
            the architectural frame that ties them together: each is a test of
            a specific layer in the recursive structure, and the bounded-
            recursion hypothesis (Prediction 5) is the integrative claim
            that organizes the rest. Falsifying any one weakens the
            architecture. Falsifying Prediction 5 would require RTC to be
            substantially rebuilt.
          </p>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// PREDICTION CARD
// ============================================================
function PredictionCard({ prediction, index, time, expanded, onToggle }) {
  return (
    <article
      style={{
        marginBottom: 16,
        border: "1px solid #2a2620",
        background: expanded
          ? "rgba(28, 24, 20, 0.55)"
          : "rgba(15, 13, 11, 0.4)",
        transition: "background 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Collapsed header — always visible */}
      <header
        onClick={onToggle}
        style={{
          padding: "28px 32px",
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
            fontSize: 44,
            fontWeight: 300,
            color: "#d4af6a",
            fontStyle: "italic",
            lineHeight: 1,
            opacity: 0.85,
          }}
        >
          0{prediction.n}
        </div>
        <div>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 24,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              color: "#e8e3d8",
            }}
          >
            {prediction.title}
          </h2>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            {prediction.layer}
          </div>
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

      {/* Expanded content */}
      <div
        style={{
          maxHeight: expanded ? 2000 : 0,
          opacity: expanded ? 1 : 0,
          transition: "max-height 0.6s ease, opacity 0.4s ease",
          overflow: "hidden",
        }}
      >
        <div
          className="mobile-stack"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 36,
            padding: "8px 32px 36px",
          }}
        >
          {/* LEFT — text content */}
          <div>
            <Field label="The Claim" body={prediction.claim} highlight />
            <Field label="Experimental Design" body={prediction.design} />
            <Field
              label="Predicted Signature"
              body={prediction.signature}
            />
            <Field
              label="Falsification Condition"
              body={prediction.falsifies}
              accent
            />
          </div>

          {/* RIGHT — visualization */}
          <div>
            <FieldLabel>Predicted Data Shape</FieldLabel>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 300,
                color: "#5a544a",
                fontStyle: "italic",
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              Conceptual — illustrating the predicted shape, not simulated data.
            </div>
            <div
              style={{
                aspectRatio: "1 / 1",
                background:
                  "radial-gradient(circle at center, #1a1612 0%, #0d0b09 100%)",
                border: "1px solid #2a2620",
                position: "relative",
                marginTop: 8,
              }}
            >
              <PredictionViz type={prediction.viz} time={time} />
              <CornerMark position="tl" />
              <CornerMark position="tr" />
              <CornerMark position="bl" />
              <CornerMark position="br" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Field({ label, body, highlight, accent }: { label: string; body: string; highlight?: boolean; accent?: boolean }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <FieldLabel accent={accent} highlight={highlight}>
        {label}
      </FieldLabel>
      <p
        style={{
          fontFamily: highlight ? "'Fraunces', serif" : "'Inter', sans-serif",
          fontSize: highlight ? 16 : 13,
          fontWeight: 300,
          lineHeight: highlight ? 1.55 : 1.65,
          color: highlight ? "#e8e3d8" : accent ? "#c8a890" : "#b8b0a0",
          margin: "6px 0 0",
          fontStyle: highlight ? "italic" : "normal",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function FieldLabel({ children, accent, highlight }: { children: React.ReactNode; accent?: boolean; highlight?: boolean }) {
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
// PREDICTION VISUALIZATIONS
// Each prediction gets a custom data-shape diagram.
// ============================================================
function PredictionViz({ type, time }) {
  return (
    <svg
      viewBox="0 0 400 400"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <filter id="vizGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {type === "metaD" && <MetaDViz time={time} />}
      {type === "temporal" && <TemporalViz time={time} />}
      {type === "salience" && <SalienceViz time={time} />}
      {type === "selfworld" && <SelfWorldViz time={time} />}
      {type === "bounded" && <BoundedViz time={time} />}
    </svg>
  );
}

// ----- VIZ 1: meta-d′ dissociation curve -----
function MetaDViz({ time }) {
  // X axis: disruption level. Y axis: sensitivity.
  // Two curves — d′ stays high, meta-d′ drops earlier.
  const t = time * 0.0008;
  const xs = Array.from({ length: 50 }, (_, i) => i / 49);

  // d′ curve: holds flat, drops only at very high disruption
  const dPrime = xs.map((x) => 1 - Math.max(0, x - 0.7) * 2.2);
  // meta-d′ curve: drops earlier and steeper
  const metaD = xs.map((x) => 1 - Math.max(0, x - 0.15) * 1.0);

  const toX = (i) => 50 + i * (300 / 49);
  const toY = (v) => 320 - v * 240;

  // Animated current-disruption marker
  const markerX = (Math.sin(t) + 1) / 2;

  return (
    <g>
      <Axes
        xLabel="Disruption Level"
        yLabel="Sensitivity"
        yMaxLabel="High"
        yMinLabel="Low"
      />

      {/* d′ curve */}
      <path
        d={dPrime
          .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
          .join(" ")}
        fill="none"
        stroke="#8a8278"
        strokeWidth={1.6}
        opacity={0.9}
      />
      {/* meta-d′ curve */}
      <path
        d={metaD
          .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
          .join(" ")}
        fill="none"
        stroke="#d4af6a"
        strokeWidth={1.8}
        opacity={1}
        filter="url(#vizGlow)"
      />

      {/* Current marker */}
      <line
        x1={50 + markerX * 300}
        y1={70}
        x2={50 + markerX * 300}
        y2={320}
        stroke="#d4af6a"
        strokeWidth={0.5}
        opacity={0.3}
        strokeDasharray="2 3"
      />

      {/* Legend */}
      <g transform="translate(60, 90)">
        <line x1={0} y1={0} x2={20} y2={0} stroke="#d4af6a" strokeWidth={1.8} />
        <text
          x={26}
          y={3}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fill: "#d4af6a",
            letterSpacing: "0.05em",
          }}
        >
          meta-d′
        </text>
        <line x1={0} y1={16} x2={20} y2={16} stroke="#8a8278" strokeWidth={1.6} />
        <text
          x={26}
          y={19}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fill: "#8a8278",
            letterSpacing: "0.05em",
          }}
        >
          d′ (perception)
        </text>
      </g>

      {/* Annotation */}
      <text
        x={350}
        y={250}
        textAnchor="end"
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: 11,
          fill: "#b8b0a0",
        }}
      >
        the gap is the signature
      </text>
    </g>
  );
}

// ----- VIZ 2: temporal fragmentation -----
function TemporalViz({ time }) {
  // Two timelines: continuous (top) vs. fragmented (bottom)
  const t = time * 0.001;
  const continuousY = 130;
  const fragmentedY = 270;

  return (
    <g>
      {/* Title row labels */}
      <text
        x={50}
        y={80}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fill: "#8a8278",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Baseline
      </text>
      <text
        x={50}
        y={220}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fill: "#d4af6a",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Disrupted Temporal Binding
      </text>

      {/* Continuous timeline — smooth wave */}
      <path
        d={(() => {
          const points = [];
          for (let i = 0; i <= 60; i++) {
            const x = 50 + (i / 60) * 300;
            const y = continuousY + Math.sin(i * 0.3 + t) * 8;
            points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
          }
          return points.join(" ");
        })()}
        fill="none"
        stroke="#8a8278"
        strokeWidth={1.5}
      />

      {/* Continuity dots — densely packed */}
      {Array.from({ length: 30 }, (_, i) => {
        const x = 50 + (i / 29) * 300;
        const y = continuousY + Math.sin(i * 0.6 + t) * 8;
        return (
          <circle
            key={`c-${i}`}
            cx={x}
            cy={y}
            r={1.5}
            fill="#8a8278"
            opacity={0.9}
          />
        );
      })}

      {/* Fragmented timeline — broken into discrete slices */}
      {(() => {
        const slices = [];
        const sliceCount = 6;
        for (let s = 0; s < sliceCount; s++) {
          const startX = 50 + (s / sliceCount) * 300 + 8;
          const endX = 50 + ((s + 1) / sliceCount) * 300 - 8;
          const yOffset = Math.sin(s * 1.7 + t * 0.5) * 6;
          slices.push(
            <g key={`slice-${s}`}>
              <line
                x1={startX}
                y1={fragmentedY + yOffset}
                x2={endX}
                y2={fragmentedY + yOffset}
                stroke="#d4af6a"
                strokeWidth={1.8}
                opacity={0.95}
                filter="url(#vizGlow)"
              />
              {/* Slice endpoint markers */}
              <circle
                cx={startX}
                cy={fragmentedY + yOffset}
                r={2.5}
                fill="#d4af6a"
              />
              <circle
                cx={endX}
                cy={fragmentedY + yOffset}
                r={2.5}
                fill="#d4af6a"
              />
            </g>
          );
        }
        return slices;
      })()}

      {/* Time axis */}
      <line
        x1={50}
        y1={330}
        x2={350}
        y2={330}
        stroke="#3a342a"
        strokeWidth={0.5}
      />
      <text
        x={200}
        y={355}
        textAnchor="middle"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fill: "#5a544a",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Time →
      </text>

      {/* Annotation */}
      <text
        x={200}
        y={180}
        textAnchor="middle"
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: 11,
          fill: "#b8b0a0",
        }}
      >
        continuity gives way to discrete slices
      </text>
    </g>
  );
}

// ----- VIZ 3: salience gating breakthrough -----
function SalienceViz({ time }) {
  const t = time * 0.0008;
  // Two curves: high-salience and low-salience breakthrough as f(signal strength)
  const xs = Array.from({ length: 40 }, (_, i) => i / 39);

  // Low salience: sigmoid centered at 0.55, requires more signal
  const lowSal = xs.map((x) => 1 / (1 + Math.exp(-(x - 0.55) * 12)));
  // High salience: sigmoid shifted left, breaks through earlier
  const highSal = xs.map((x) => 1 / (1 + Math.exp(-(x - 0.25) * 12)));

  const toX = (i) => 50 + i * (300 / 39);
  const toY = (v) => 320 - v * 240;

  return (
    <g>
      <Axes
        xLabel="Signal Strength"
        yLabel="Conscious Access"
        yMaxLabel="P=1"
        yMinLabel="P=0"
      />

      {/* Low salience curve */}
      <path
        d={lowSal
          .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
          .join(" ")}
        fill="none"
        stroke="#8a8278"
        strokeWidth={1.6}
      />
      {/* High salience curve */}
      <path
        d={highSal
          .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
          .join(" ")}
        fill="none"
        stroke="#d4af6a"
        strokeWidth={1.8}
        filter="url(#vizGlow)"
      />

      {/* Shaded gap between curves — the salience effect */}
      <path
        d={`${highSal
          .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
          .join(" ")} L ${toX(39)} ${toY(lowSal[39])} ${lowSal
          .map((v, i) => `L ${toX(39 - i)} ${toY(lowSal[39 - i])}`)
          .reverse()
          .join(" ")} Z`}
        fill="#d4af6a"
        opacity={0.08}
      />

      {/* Threshold line */}
      <line
        x1={50}
        y1={toY(0.5)}
        x2={350}
        y2={toY(0.5)}
        stroke="#5a544a"
        strokeWidth={0.5}
        strokeDasharray="3 4"
      />
      <text
        x={355}
        y={toY(0.5) + 3}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          fill: "#5a544a",
          letterSpacing: "0.05em",
        }}
      >
        thresh
      </text>

      {/* Legend */}
      <g transform="translate(220, 90)">
        <line x1={0} y1={0} x2={20} y2={0} stroke="#d4af6a" strokeWidth={1.8} />
        <text
          x={26}
          y={3}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fill: "#d4af6a",
          }}
        >
          high salience
        </text>
        <line x1={0} y1={16} x2={20} y2={16} stroke="#8a8278" strokeWidth={1.6} />
        <text
          x={26}
          y={19}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fill: "#8a8278",
          }}
        >
          low salience
        </text>
      </g>
    </g>
  );
}

// ----- VIZ 4: self-world dissociation —
// scatter plot, task performance vs. perspective markers
function SelfWorldViz({ time }) {
  const t = time * 0.0008;

  // Two clusters: "with self-world recursion" (gold) and "without" (gray)
  // Both can score high on task performance (X axis)
  // Only the "with" cluster scores high on perspective markers (Y axis)
  const withRec = [];
  const withoutRec = [];

  for (let i = 0; i < 14; i++) {
    const seed = i * 1.7;
    withRec.push({
      x: 0.5 + Math.sin(seed) * 0.3,
      y: 0.6 + Math.cos(seed * 1.3) * 0.25 + 0.05 * Math.sin(t + seed),
    });
    withoutRec.push({
      x: 0.4 + Math.sin(seed * 1.4) * 0.4,
      y: 0.15 + Math.cos(seed * 0.9) * 0.12 + 0.04 * Math.cos(t + seed),
    });
  }

  const toX = (v) => 50 + v * 300;
  const toY = (v) => 320 - v * 240;

  return (
    <g>
      <Axes
        xLabel="Task Performance"
        yLabel="Perspective Markers"
        yMaxLabel="High"
        yMinLabel="Low"
      />

      {/* Cluster: with self-world recursion (gold, top) */}
      <ellipse
        cx={toX(0.55)}
        cy={toY(0.65)}
        rx={70}
        ry={45}
        fill="#d4af6a"
        opacity={0.06}
        stroke="#d4af6a"
        strokeWidth={0.5}
        strokeDasharray="3 3"
      />
      {withRec.map((p, i) => (
        <circle
          key={`with-${i}`}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r={3}
          fill="#d4af6a"
          opacity={0.95}
        />
      ))}

      {/* Cluster: without self-world recursion (gray, bottom) */}
      <ellipse
        cx={toX(0.45)}
        cy={toY(0.18)}
        rx={85}
        ry={28}
        fill="#8a8278"
        opacity={0.05}
        stroke="#8a8278"
        strokeWidth={0.5}
        strokeDasharray="3 3"
      />
      {withoutRec.map((p, i) => (
        <circle
          key={`without-${i}`}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r={2.6}
          fill="#8a8278"
          opacity={0.85}
        />
      ))}

      {/* Cluster labels */}
      <text
        x={toX(0.55)}
        y={toY(0.65) - 50}
        textAnchor="middle"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fill: "#d4af6a",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        with self-world recursion
      </text>
      <text
        x={toX(0.45)}
        y={toY(0.18) + 42}
        textAnchor="middle"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fill: "#8a8278",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        without
      </text>

      {/* Annotation arrow */}
      <text
        x={345}
        y={210}
        textAnchor="end"
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: 11,
          fill: "#b8b0a0",
        }}
      >
        performance and
      </text>
      <text
        x={345}
        y={226}
        textAnchor="end"
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: 11,
          fill: "#b8b0a0",
        }}
      >
        perspective decouple
      </text>
    </g>
  );
}

// ----- VIZ 5: bounded recursion U-curve -----
function BoundedViz({ time }) {
  const t = time * 0.001;
  const xs = Array.from({ length: 60 }, (_, i) => i / 59);

  // Inverted U: peak at intermediate recursion
  const stability = xs.map((x) => {
    const center = 0.55;
    const width = 0.35;
    return Math.exp(-Math.pow((x - center) / width, 2));
  });

  const toX = (i) => 50 + i * (300 / 59);
  const toY = (v) => 320 - v * 240;

  // Animated marker traveling along the curve
  const tt = (Math.sin(t * 0.4) + 1) / 2;
  const tIdx = Math.floor(tt * 59);
  const markerX = toX(tIdx);
  const markerY = toY(stability[tIdx]);

  // Region labels
  const regions = [
    { label: "Reactive", x: 0.1, color: "#8a8278" },
    { label: "Stable", x: 0.55, color: "#d4af6a" },
    { label: "Unbounded", x: 0.92, color: "#c8a890" },
  ];

  return (
    <g>
      <Axes
        xLabel="Recursive Depth"
        yLabel="Perspective Stability"
        yMaxLabel="High"
        yMinLabel="Low"
      />

      {/* Filled curve */}
      <path
        d={`${stability
          .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
          .join(" ")} L ${toX(59)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`}
        fill="#d4af6a"
        opacity={0.08}
      />

      {/* Curve line */}
      <path
        d={stability
          .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
          .join(" ")}
        fill="none"
        stroke="#d4af6a"
        strokeWidth={1.8}
        filter="url(#vizGlow)"
      />

      {/* Region zones */}
      {regions.map((r, i) => (
        <g key={`region-${i}`}>
          <line
            x1={toX(r.x * 59)}
            y1={toY(stability[Math.floor(r.x * 59)])}
            x2={toX(r.x * 59)}
            y2={335}
            stroke={r.color}
            strokeWidth={0.4}
            strokeDasharray="2 3"
            opacity={0.5}
          />
          <text
            x={toX(r.x * 59)}
            y={355}
            textAnchor="middle"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fill: r.color,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {r.label}
          </text>
        </g>
      ))}

      {/* Animated marker */}
      <circle
        cx={markerX}
        cy={markerY}
        r={5}
        fill="#f0d090"
        filter="url(#vizGlow)"
      />
      <circle
        cx={markerX}
        cy={markerY}
        r={10}
        fill="none"
        stroke="#f0d090"
        strokeWidth={0.6}
        opacity={0.4}
      />

      {/* Annotation */}
      <text
        x={200}
        y={110}
        textAnchor="middle"
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: 11,
          fill: "#d4af6a",
        }}
      >
        stability requires bounded recursion
      </text>
    </g>
  );
}

// ----- shared axes component for the line/scatter plots -----
function Axes({ xLabel, yLabel, yMaxLabel, yMinLabel }) {
  return (
    <g>
      {/* Y axis */}
      <line
        x1={50}
        y1={70}
        x2={50}
        y2={335}
        stroke="#3a342a"
        strokeWidth={0.6}
      />
      {/* X axis */}
      <line
        x1={50}
        y1={335}
        x2={365}
        y2={335}
        stroke="#3a342a"
        strokeWidth={0.6}
      />

      {/* Y labels */}
      <text
        x={42}
        y={75}
        textAnchor="end"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          fill: "#5a544a",
          letterSpacing: "0.05em",
        }}
      >
        {yMaxLabel}
      </text>
      <text
        x={42}
        y={325}
        textAnchor="end"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          fill: "#5a544a",
          letterSpacing: "0.05em",
        }}
      >
        {yMinLabel}
      </text>

      {/* Axis labels */}
      <text
        x={205}
        y={375}
        textAnchor="middle"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fill: "#8a8278",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {xLabel} →
      </text>
      <text
        x={20}
        y={205}
        textAnchor="middle"
        transform="rotate(-90 20 205)"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fill: "#8a8278",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {yLabel} →
      </text>
    </g>
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
