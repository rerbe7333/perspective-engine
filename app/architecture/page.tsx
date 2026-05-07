"use client";

import React, { useState, useEffect, useMemo } from "react";

// ============================================================
// RTC ARCHITECTURE
// Seven-layer interactive stack. Six generative layers + one emergent.
// ============================================================

const LAYERS = [
  {
    n: 1,
    key: "signal",
    name: "Signal Registration",
    short: "The system receives input.",
    plain:
      "Before anything else, something has to arrive. Photons hit the retina, pressure deforms the skin, a memory fires. This is the raw material — but raw signal alone is not consciousness. A thermostat registers signals.",
    technical:
      "Sensory transduction and afferent integration. Distributed cortical and subcortical nuclei convert physical perturbations into neural representations. Includes interoceptive signaling from the viscera and somatosensory periphery, not only exteroception.",
    neuro:
      "Thalamic relay nuclei, primary sensory cortices (V1, S1, A1), nucleus tractus solitarius, insular cortex for interoception.",
    breaks:
      "When signal fails entirely: coma, deep anesthesia, total sensory deprivation. Without input, the recursive machinery has nothing to work on.",
    role: "Raw input",
  },
  {
    n: 2,
    key: "distinction",
    name: "Distinction-Making",
    short: "Figure separates from ground.",
    plain:
      "The system doesn't just register signals — it carves them. Red versus not-red. Self versus not-self. Threat versus not-threat. Perception begins where difference is drawn. Without distinction-making, signal is undifferentiated noise.",
    technical:
      "Categorical and contrastive representation. The brain implements distinction through population coding, lateral inhibition, and contrastive predictive structure. Distinctions are not given by the signal — they are imposed by the system.",
    neuro:
      "Ventral visual stream for object distinctions, fusiform face area, temporal lobe for categorical perception, basal ganglia for action-distinction selection.",
    breaks:
      "When distinction-making fails: agnosia, prosopagnosia, undifferentiated perceptual fields. Some forms of advanced dementia. The signal is there, but nothing stands out from anything.",
    role: "Difference",
  },
  {
    n: 3,
    key: "salience",
    name: "Salience Weighting",
    short: "What matters becomes foregrounded.",
    plain:
      "Not every distinction matters equally. The system weights some as more important — emotionally, biologically, motivationally. Salience is what makes the field of perspective have a foreground at all. Without it, everything is the same gray weight.",
    technical:
      "Affective and motivational valuation. Distinctions are tagged with valence and arousal through limbic and neuromodulatory systems. Salience is what RTC means when it says consciousness is not merely information processing — it is information processing weighted by what matters to the organism.",
    neuro:
      "Amygdala, ventral striatum, anterior insula, orbitofrontal cortex, dopaminergic and noradrenergic neuromodulation, salience network (anterior insula + dorsal anterior cingulate).",
    breaks:
      "When salience fails: anhedonia, depersonalization, schizophrenic aberrant salience (everything feels meaningful but the wrong things), Capgras delusion (recognition without affect). The world flattens or distorts.",
    role: "Mattering",
  },
  {
    n: 4,
    key: "selfworld",
    name: "Self-in-World Modeling",
    short: "A located self appears.",
    plain:
      "The system models itself as situated within an environment. It is here, the world is there, and the relation between them is what perspective is made of. This is the structural core of RTC: perspective is not a thing the brain has, it is a relation the brain models.",
    technical:
      "Body schema, peripersonal space, allocentric and egocentric spatial representation, social self-modeling. The self-in-world model is a continuously updated structural representation that includes the agent's location, orientation, capacities, and projected trajectories within an environment.",
    neuro:
      "Posterior parietal cortex, temporo-parietal junction, retrosplenial cortex, hippocampal place cells and grid cells, default mode network for narrative self-modeling.",
    breaks:
      "When self-in-world modeling fails: out-of-body experience, dissociation, derealization, depersonalization, certain forms of psychosis. The relation between self and world becomes unstable, ambiguous, or absent.",
    role: "Located perspective",
  },
  {
    n: 5,
    key: "metagov",
    name: "Recursive Meta-Governance",
    short: "The system regulates its own modeling.",
    plain:
      "The system doesn't just model itself in the world — it monitors and governs its own modeling. It can ask whether it's confident, where its experience is coming from, whether its attention is well-directed. Without governance, recursion runs away into unbounded self-reference.",
    technical:
      "Metacognition, source monitoring, confidence calibration, executive control over recursive depth. Governance is what keeps recursion bounded. RTC's central claim: consciousness requires recursion that is governed, not infinite. Too little: reactive. Too much: unstable. Bounded: stable perspective.",
    neuro:
      "Lateral prefrontal cortex, frontopolar cortex, anterior cingulate for monitoring, dorsolateral prefrontal for control, the cortical metacognitive system tracked by meta-d′.",
    breaks:
      "When meta-governance fails: rumination, intrusive thought, OCD-style recursive loops, hallucinations attributed to external sources, loss of confidence calibration. The recursion is present but unbounded.",
    role: "Bounded recursion",
  },
  {
    n: 6,
    key: "diachronic",
    name: "Diachronic Reconstitution",
    short: "The self persists across time.",
    plain:
      "The self is not a thing that exists at an instant — it is something the system reconstitutes across time. Memory continuity, narrative integration, anticipated future, all bind the now to a past and a possible. Without reconstitution, perspective collapses to an instant and dissolves.",
    technical:
      "Episodic memory, prospection, narrative self-construction, temporal binding. The self is a recoverable structure rather than a static identity — what RTC means by diachronic reconstitution is that selfhood is maintained through the ongoing capacity to reconstitute continuity, not by any persistent substrate.",
    neuro:
      "Hippocampus and medial temporal lobe for episodic memory, medial prefrontal cortex for self-narrative, default mode network for autobiographical projection, posterior cingulate for temporal integration.",
    breaks:
      "When diachronic reconstitution fails: severe amnesia (the self present-tense only), ketamine dissociation, certain dream states, terminal lucidity reversed — the present moment is intact but uncoupled from past and future.",
    role: "Continuity",
  },
];

const EMERGENT = {
  n: 7,
  key: "perspective",
  name: "Stabilized Perspective",
  short: "A point of view persists.",
  plain:
    "The system sustains an integrated point of view — a bounded, recursively governed, salience-weighted, self-in-world model that reconstitutes itself across time. This is what RTC means by consciousness. Not a substance, not a location, not a computation. A dynamically maintained architecture of perspective.",
  technical:
    "The emergent stabilized state of the six generative conditions holding within bounded ranges. Stabilized perspective is not an additional mechanism but the lived coherence of the lower six. RTC's claim: this is the explanandum of consciousness science — what theories of consciousness ought to explain — and the six layers below are the explanans.",
  neuro:
    "No single locus. The whole-brain dynamic state in which thalamocortical, default mode, salience, and frontoparietal networks maintain coordinated activity within bounded parameters.",
  breaks:
    "When stabilized perspective fails: this is what we mean by 'losing consciousness.' Anesthesia, dreamless sleep, vegetative state, severe psychotic break. The lower architecture has destabilized past the basin of attraction in which a point of view can hold.",
  role: "Emergent",
};

// ============================================================
// LAYER ROW
// ============================================================
function LayerRow({ layer, index, expanded, onToggle, total, isEmergent, time }: { layer: any; index: number; expanded: boolean; onToggle: () => void; total: number; isEmergent?: boolean; time: number }) {
  // Visual: each layer has an SVG band on the left visualizing its function.
  // Lower layers = simpler. Higher layers = more complex/bounded structure.
  const heightCollapsed = 92;

  // Color: emergent layer in gold; others in ascending warmth from cool gray
  const layerColor = isEmergent
    ? "#d4af6a"
    : `hsl(${30 + (layer.n - 1) * 4}, ${10 + layer.n * 4}%, ${45 + layer.n * 3}%)`;

  return (
    <div
      onClick={onToggle}
      style={{
        position: "relative",
        cursor: "pointer",
        borderTop: index === 0 ? "1px solid #2a2620" : "none",
        borderBottom: "1px solid #2a2620",
        background: expanded
          ? "rgba(28, 24, 20, 0.6)"
          : "rgba(15, 13, 11, 0.4)",
        transition: "background 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!expanded) {
          e.currentTarget.style.background = "rgba(22, 19, 16, 0.6)";
        }
      }}
      onMouseLeave={(e) => {
        if (!expanded) {
          e.currentTarget.style.background = "rgba(15, 13, 11, 0.4)";
        }
      }}
    >
      {/* Collapsed row */}
      <div
        className="arch-row-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr auto",
          alignItems: "center",
          gap: 24,
          padding: "20px 28px",
          minHeight: heightCollapsed,
        }}
      >
        {/* Visualization cell */}
        <LayerGlyph layer={layer} isEmergent={isEmergent} time={time} expanded={expanded} />

        {/* Title cell */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: isEmergent ? "#d4af6a" : "#8a8278",
                letterSpacing: "0.1em",
              }}
            >
              {String(layer.n).padStart(2, "0")}
            </span>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 22,
                fontWeight: 400,
                color: isEmergent ? "#d4af6a" : "#e8e3d8",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {layer.name}
              {isEmergent && (
                <em
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontStyle: "normal",
                    fontSize: 10,
                    color: "#8a8278",
                    marginLeft: 12,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Emergent
                </em>
              )}
            </h3>
          </div>
          <div
            className="arch-row-short"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 14,
              fontWeight: 300,
              color: "#b8b0a0",
            }}
          >
            {layer.short}
          </div>
        </div>

        {/* Toggle indicator */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: expanded ? "#d4af6a" : "#5a544a",
            transform: expanded ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.3s ease, color 0.3s ease",
            paddingRight: 4,
          }}
        >
          +
        </div>
      </div>

      {/* Expanded panel */}
      <div
        style={{
          maxHeight: expanded ? 800 : 0,
          opacity: expanded ? 1 : 0,
          transition: "max-height 0.5s ease, opacity 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div
          className="mobile-stack mobile-pad-tight"
          style={{
            padding: "0 28px 32px 172px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div>
            <FieldLabel>Plain Language</FieldLabel>
            <p style={prose}>{layer.plain}</p>

            <FieldLabel>Technical Frame</FieldLabel>
            <p style={prose}>{layer.technical}</p>
          </div>
          <div>
            <FieldLabel>Neural Substrate</FieldLabel>
            <p style={prose}>{layer.neuro}</p>

            <FieldLabel>Failure Mode</FieldLabel>
            <p style={{ ...prose, color: "#c8a890" }}>{layer.breaks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const prose = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  fontWeight: 300,
  lineHeight: 1.65,
  color: "#b8b0a0",
  marginTop: 4,
  marginBottom: 22,
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        color: "#8a8278",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// LAYER GLYPH
// Each layer gets a small SVG that visualizes its function.
// They form a progression that mirrors the recursive build-up.
// ============================================================
function LayerGlyph({ layer, isEmergent, time, expanded }) {
  const t = time * 0.001;
  const color = isEmergent ? "#d4af6a" : "#8a8278";
  const activeColor = expanded ? (isEmergent ? "#f0d090" : "#b8b0a0") : color;

  return (
    <svg viewBox="0 0 80 80" style={{ width: 80, height: 80 }}>
      <defs>
        <filter id={`glow-${layer.key}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>
      {layer.key === "signal" && <SignalGlyph t={t} color={activeColor} />}
      {layer.key === "distinction" && <DistinctionGlyph t={t} color={activeColor} />}
      {layer.key === "salience" && <SalienceGlyph t={t} color={activeColor} />}
      {layer.key === "selfworld" && <SelfWorldGlyph t={t} color={activeColor} />}
      {layer.key === "metagov" && <MetaGovGlyph t={t} color={activeColor} />}
      {layer.key === "diachronic" && <DiachronicGlyph t={t} color={activeColor} />}
      {layer.key === "perspective" && <PerspectiveGlyph t={t} color={activeColor} expanded={expanded} />}
    </svg>
  );
}

// Glyph 1: scattered points — undifferentiated signal
function SignalGlyph({ t, color }) {
  const points = [];
  for (let i = 0; i < 14; i++) {
    const angle = i * 1.7 + t * 0.3;
    const r = 8 + ((i * 7) % 22);
    points.push({
      x: 40 + Math.cos(angle) * r,
      y: 40 + Math.sin(angle * 1.3) * r,
    });
  }
  return (
    <g>
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.2} fill={color} opacity={0.6} />
      ))}
    </g>
  );
}

// Glyph 2: figure / ground split
function DistinctionGlyph({ t, color }) {
  return (
    <g>
      <circle cx={40} cy={40} r={22} fill="none" stroke={color} strokeWidth={0.6} opacity={0.3} />
      <path
        d={`M 40 18 A 22 22 0 0 1 40 62 Z`}
        fill={color}
        opacity={0.25}
      />
      <line x1={40} y1={18} x2={40} y2={62} stroke={color} strokeWidth={1} />
    </g>
  );
}

// Glyph 3: weighted nodes — some bigger than others
function SalienceGlyph({ t, color }) {
  const nodes = [
    { a: 0, w: 1 },
    { a: 1.05, w: 0.4 },
    { a: 2.1, w: 0.6 },
    { a: 3.14, w: 1.6 },
    { a: 4.19, w: 0.5 },
    { a: 5.24, w: 0.8 },
  ];
  return (
    <g>
      <circle cx={40} cy={40} r={22} fill="none" stroke={color} strokeWidth={0.4} opacity={0.3} />
      {nodes.map((n, i) => {
        const pulse = 1 + 0.15 * Math.sin(t + i);
        return (
          <circle
            key={i}
            cx={40 + Math.cos(n.a) * 22}
            cy={40 + Math.sin(n.a) * 22}
            r={1.2 + n.w * 2.5 * pulse}
            fill={color}
            opacity={0.5 + n.w * 0.3}
          />
        );
      })}
    </g>
  );
}

// Glyph 4: small figure inside larger world ring
function SelfWorldGlyph({ t, color }) {
  return (
    <g>
      <circle cx={40} cy={40} r={28} fill="none" stroke={color} strokeWidth={0.5} opacity={0.4} />
      <circle cx={40} cy={40} r={20} fill="none" stroke={color} strokeWidth={0.5} opacity={0.5} />
      <circle cx={40} cy={40} r={12} fill="none" stroke={color} strokeWidth={0.7} opacity={0.7} />
      {/* Self at center */}
      <circle cx={40} cy={40} r={3.5} fill={color} />
      {/* World marker — a point on the outer ring */}
      <circle
        cx={40 + Math.cos(t * 0.3) * 28}
        cy={40 + Math.sin(t * 0.3) * 28}
        r={2}
        fill={color}
        opacity={0.6}
      />
    </g>
  );
}

// Glyph 5: recursive loop with feedback
function MetaGovGlyph({ t, color }) {
  // Two interlocked loops — recursion + governance
  return (
    <g>
      <ellipse
        cx={32}
        cy={40}
        rx={18}
        ry={12}
        fill="none"
        stroke={color}
        strokeWidth={0.8}
        opacity={0.7}
        transform={`rotate(${20 + Math.sin(t * 0.5) * 5} 32 40)`}
      />
      <ellipse
        cx={48}
        cy={40}
        rx={18}
        ry={12}
        fill="none"
        stroke={color}
        strokeWidth={0.8}
        opacity={0.7}
        transform={`rotate(${-20 - Math.sin(t * 0.5) * 5} 48 40)`}
      />
      <circle cx={40} cy={40} r={2} fill={color} />
    </g>
  );
}

// Glyph 6: sequential dots forming a temporal trail
function DiachronicGlyph({ t, color }) {
  const trail = [];
  for (let i = 0; i < 7; i++) {
    const phase = t * 0.4 + i * 0.5;
    trail.push({
      x: 14 + i * 9,
      y: 40 + Math.sin(phase) * 6,
      opacity: 0.2 + (i / 7) * 0.6,
    });
  }
  return (
    <g>
      {trail.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.2} fill={color} opacity={p.opacity} />
      ))}
      {/* Connection line */}
      <path
        d={`M ${trail.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
        fill="none"
        stroke={color}
        strokeWidth={0.4}
        opacity={0.4}
      />
    </g>
  );
}

// Glyph 7: emergent — full recursive ring stack with center node
function PerspectiveGlyph({ t, color, expanded }) {
  const rings = [10, 17, 24, 31];
  return (
    <g>
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={40}
          cy={40}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={0.7}
          opacity={0.3 + (rings.length - i) * 0.12}
          transform={`rotate(${t * 8 * (i % 2 === 0 ? 1 : -0.7)} 40 40)`}
        />
      ))}
      <circle cx={40} cy={40} r={4} fill={color} opacity={0.95}>
        <animate
          attributeName="r"
          values="3.5;4.5;3.5"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function ArchitecturePage() {
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
          maxWidth: 1100,
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
          Architecture — Section 02
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
          Six mechanisms generate the seventh{" "}
          <em style={{ color: "#d4af6a", fontStyle: "italic" }}>
            phenomenon
          </em>
        </h1>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 16,
            fontWeight: 300,
            color: "#b8b0a0",
            maxWidth: 720,
            marginTop: 18,
            marginBottom: 0,
            lineHeight: 1.55,
            fontStyle: "italic",
          }}
        >
          RTC organizes consciousness into seven layers. The first six are
          generative conditions — each a mechanism the system performs. The
          seventh is what they produce when they hold within bounded ranges:
          a stabilized point of view.
        </p>
      </header>

      {/* Layer stack */}
      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Generative layers */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#8a8278",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span>Generative Layers</span>
          <span style={{ fontStyle: "normal", fontSize: 9 }}>
            click to expand
          </span>
        </div>
        <div>
          {LAYERS.map((layer, i) => (
            <LayerRow
              key={layer.key}
              layer={layer}
              index={i}
              total={LAYERS.length}
              expanded={expanded === layer.key}
              onToggle={() =>
                setExpanded(expanded === layer.key ? null : layer.key)
              }
              time={time}
            />
          ))}
        </div>

        {/* Bridge from 6 to 7 */}
        <div
          style={{
            margin: "24px 0",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: "#8a8278",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "0 16px",
              background: "rgba(15, 13, 11, 1)",
              position: "relative",
              zIndex: 2,
            }}
          >
            ↓ when held within bounded ranges, emerges as ↓
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(to right, transparent, #2a2620, transparent)",
              zIndex: 1,
            }}
          />
        </div>

        {/* Emergent layer */}
        <div
          style={{
            border: "1px solid #d4af6a",
            background:
              "linear-gradient(180deg, rgba(212, 175, 106, 0.05) 0%, rgba(212, 175, 106, 0) 100%)",
          }}
        >
          <LayerRow
            layer={EMERGENT}
            index={0}
            total={1}
            expanded={expanded === EMERGENT.key}
            onToggle={() =>
              setExpanded(expanded === EMERGENT.key ? null : EMERGENT.key)
            }
            isEmergent={true}
            time={time}
          />
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: 48,
            padding: "20px 24px",
            border: "1px dashed #2a2620",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#8a8278",
            lineHeight: 1.7,
            maxWidth: 720,
            margin: "48px auto 0",
          }}
        >
          <div
            style={{
              color: "#d4af6a",
              marginBottom: 8,
              letterSpacing: "0.2em",
              fontSize: 10,
            }}
          >
            STRUCTURAL NOTE
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.65, color: "#b8b0a0" }}>
            The six generative layers do not run in strict sequence — they
            operate concurrently and recursively, each one feeding back into
            the others. The numbering reflects logical dependence, not
            temporal order. A layer above presupposes the work of the layers
            below, but in any given moment of conscious experience all six
            are active simultaneously.
          </div>
        </div>
      </main>
    </div>
  );
}
