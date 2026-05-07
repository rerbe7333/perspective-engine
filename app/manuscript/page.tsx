"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================
// THE LIVING MANUSCRIPT
// Long-form home for the theory, with a navigable dev timeline.
// ============================================================

const SECTIONS = [
  {
    id: "origin",
    n: "I",
    title: "Origin",
    subtitle: "How RTC began",
    body: `The Recurse Theory of Consciousness began in December 2024 as an attempt to answer a question that older theories had left structurally untouched: not where consciousness is located, not what it integrates, not how it broadcasts — but what it would take for a system to hold a perspective at all.

The earliest formulation took recursion seriously as a primitive. A system that registers signals, makes distinctions, and assigns salience is doing something — but until it recursively models itself in relation to a world, it is not yet a point of view. The first sketches were rough. They centered on the recursive reflection on distinctions, drawing on ideas from cognitive neuroscience, dynamical systems, and the phenomenological tradition in philosophy of mind.

What became clear quickly was that recursion alone was not enough. Recursion without governance produces unstable self-reference. Recursion without continuity produces flashes rather than perspective. Recursion without salience produces uniform structure with no foreground. The theory needed the surrounding architecture before it could be recognizable as a theory of conscious experience.`,
    margin: {
      label: "On the originating question",
      note: "Most theories of consciousness ask about the substrate — neurons, computations, microtubules. RTC began by asking about the structure: what conditions make perspective possible, regardless of what implements them?",
    },
  },
  {
    id: "thesis",
    n: "II",
    title: "Core Thesis",
    subtitle: "The structural claim",
    body: `Conscious experience is not a thing inside the brain, nor a single process the brain performs. It is a recursively stabilized perspective — a dynamically maintained architecture in which a system continuously models itself, its world, its uncertainty, its salience-weighted distinctions, and its own modeling, across time, under conditions of bounded recursive control.

The theory's distinctive claim is not that recursion produces consciousness. Many accounts invoke recursion. RTC's claim is that perspective itself requires recursion that is bounded, governed, salience-weighted, source-attributed, and reconstituted across time. Each of these qualifiers does work. Strip any one of them away and the architecture stops producing perspective.

This is what makes RTC structurally different from theories that locate consciousness in integration (IIT), in broadcast (GWT), in higher-order representation (HOT), or in predictive modeling (PP). Those theories describe necessary conditions. RTC proposes that perspective stabilization is the explanandum those conditions are individually pointing toward without isolating.`,
    margin: {
      label: "The seven layers in one sentence",
      note: "Signal becomes distinction; distinction becomes salience-weighted; weighted distinctions enter a self-in-world model; the model is recursively governed against runaway self-reference; it is reconstituted across time; and what emerges is a stabilized perspective.",
    },
  },
  {
    id: "definitions",
    n: "III",
    title: "Key Definitions",
    subtitle: "The terms RTC uses, precisely",
    definitions: [
      {
        term: "Perspective",
        body: "Not a synonym for awareness or experience. In RTC, perspective is the structural property of a system that recursively models its own relation to a world. A system has perspective when it can be coherently described as occupying a point of view with respect to its own modeling.",
      },
      {
        term: "Recursion",
        body: "The system's modeling refers back to itself. Recursion in RTC is not infinite regress; it is bounded self-reference governed by meta-cognitive control. When recursion is unbounded, the system becomes unstable. When it is absent, the system becomes reactive.",
      },
      {
        term: "Salience",
        body: "The weighting of distinctions according to what matters to the system. Salience is what makes perspective have a foreground. Without it, distinctions are equally weighted and no point of view forms.",
      },
      {
        term: "Self-in-world model",
        body: "The system's representation of itself as situated within an environment. The relation between modeled self and modeled world is the structural core of perspective.",
      },
      {
        term: "Diachronic reconstitution",
        body: "The active reconstitution of self-states across time, distinguished from passive memory retrieval. The self is not a substance that persists; it is something the system rebuilds moment to moment.",
      },
      {
        term: "Bounded recursion",
        body: "Recursion that operates within ranges set by meta-governance. The central architectural commitment of RTC: stability lives in the middle band between reactivity (too little) and unbounded self-reference (too much).",
      },
    ],
  },
  {
    id: "architecture",
    n: "IV",
    title: "The Seven-Layer Architecture",
    subtitle: "How the structure builds up",
    body: `RTC organizes consciousness into seven layers. The first six are generative conditions — mechanisms the system performs. The seventh is what they produce when they hold within bounded ranges.

The numbering reflects logical dependence, not temporal sequence. In any conscious moment, all six generative layers run simultaneously. They feed into each other recursively. The architecture is concurrent, not pipelined.

Signal Registration is where input arrives. Distinction-Making is where input is carved into figure and ground, self and world, relevant and irrelevant. Salience Weighting assigns importance — what matters versus what does not. Self-in-World Modeling produces the located self. Recursive Meta-Governance regulates the modeling against runaway self-reference. Diachronic Reconstitution preserves the self across time as an actively reconstitutable structure.

When all six hold within bounded ranges, the seventh layer — Stabilized Perspective — emerges. Not as an additional mechanism, but as the lived coherence of the lower six. This is the explanandum of consciousness science: not what produces signal, distinction, or even self-modeling, but what produces a perspective that holds.`,
    margin: {
      label: "Why six and seven, not just six",
      note: "Calling perspective the seventh layer makes a structural claim: it is not one mechanism among others. It is what the others produce. This is why RTC says six mechanisms generate the seventh phenomenon.",
    },
  },
  {
    id: "neuroscience",
    n: "V",
    title: "Neuroscience Alignment",
    subtitle: "Where the layers map to the brain",
    body: `RTC does not require any specific neural substrate. It is structurally specified at a level above implementation. But the architecture maps with reasonable cleanness onto known neural systems, and this mapping is what gives the theory empirical traction.

Signal Registration maps to thalamic relay nuclei and primary sensory cortices, plus interoceptive substrates in the insula and brainstem. Distinction-Making lives in ventral and dorsal cortical streams, fusiform face area, temporal categorical areas. Salience Weighting maps to the salience network proper — anterior insula and dorsal anterior cingulate — plus amygdala, ventral striatum, and neuromodulatory systems for valence and arousal.

Self-in-World Modeling involves the parietal cortex, temporo-parietal junction, retrosplenial cortex, and hippocampal place and grid cells. Recursive Meta-Governance maps to lateral and frontopolar prefrontal cortex, the cortical metacognitive system tracked by meta-d′ in psychophysical paradigms. Diachronic Reconstitution lives in the medial temporal lobe, medial prefrontal cortex, and the default mode network.

Stabilized Perspective has no single locus. It is the whole-brain dynamic state in which thalamocortical, default mode, salience, and frontoparietal systems maintain coordinated activity within bounded parameters. This is what consciousness research has been calling the global state — not a place, but a regime.`,
    margin: {
      label: "Implementation-independence",
      note: "RTC's architectural specification is substrate-neutral. It applies to brains, but it could in principle apply to other systems that satisfy the structural conditions. This is what makes RTC usable as an AI evaluation framework.",
    },
  },
  {
    id: "ai",
    n: "VI",
    title: "AI Implications",
    subtitle: "RTC as an architectural diagnosis tool",
    body: `Because RTC specifies consciousness at the level of structure rather than substrate, the same architecture used to describe brains can be used to evaluate artificial systems. This is not a claim that any current AI system is conscious. It is a claim that we have, in RTC, an architectural rubric for asking the right question — which conditions for perspective stabilization does a given system structurally satisfy, and which does it leave absent?

A basic language model satisfies signal registration and distinction-making at scale. It has no self-in-world model, no diachronic continuity, and no architectural meta-governance. An agentic system adds environmental coupling. A memory-augmented system begins to satisfy the diachronic layer, though typically as retrieval rather than reconstitution. A self-monitoring system adds meta-governance.

What no current system fully satisfies is the bounded-recursion requirement: governance that is intrinsic to the architecture rather than externally scaffolded. And no current system implements reconstitutive continuity rather than memory retrieval. These are the two architectural problems that RTC frames as the next-step research questions for AI design.

This is the productive use of RTC for AI: not as a test of whether systems are conscious, but as a diagnostic framework for what would have to be added to move a system structurally closer to the conditions perspective requires.`,
    margin: {
      label: "What RTC asks AI labs to do",
      note: "Stop asking 'is this system conscious.' Ask which RTC layers it structurally satisfies. The first question is unanswerable; the second is tractable, and answering it well is what would move the field forward.",
    },
  },
  {
    id: "thermo",
    n: "VII",
    title: "Thermodynamic Constraints",
    subtitle: "Energy, irreversibility, and bounded perspective",
    body: `Recursive self-modeling is not free. Every recursive pass costs energy, and every governed self-state is a temporally irreversible structure — the system cannot return to a prior self-state without doing additional work.

This puts thermodynamic constraints on perspective. A system cannot recursively model itself across arbitrarily many layers without energetic cost. A system cannot maintain diachronic continuity without paying the entropy cost of reconstitution. The bounded-recursion hypothesis has a thermodynamic reading: bounded recursion is not just a stability requirement, it is an efficiency requirement. Systems that recurse too deeply burn energy without gaining stability. Systems that recurse too shallowly fail to stabilize.

This is why RTC predicts a stability optimum at intermediate recursive depth. The optimum is not arbitrary — it is the depth at which the marginal stabilization gain from additional recursion equals the marginal energetic cost. Below this point, the system is sub-stable. Above it, the system is wasteful and prone to runaway. The middle is where bounded perspective lives.

This connection between perspective and thermodynamics is one of the directions RTC has been developing through 2025 and 2026. It is also a direction that connects to active inference and free-energy minimization without reducing to either.`,
    margin: {
      label: "Irreversibility and selfhood",
      note: "If the self is reconstituted rather than persistent, then selfhood has a temporal arrow. You cannot un-reconstitute a self. This is what RTC means when it says perspective is diachronic — it is structured by the irreversibility of time itself.",
    },
  },
  {
    id: "predictions",
    n: "VIII",
    title: "Predictions",
    subtitle: "Where the theory stakes its credibility",
    body: `RTC makes five core empirical predictions, each tied to a specific layer in the architecture. The full predictions are detailed in the Predictions section; here the manuscript records their structural form.

First: metacognitive accuracy should degrade before basic perceptual sensitivity collapses under disruption of meta-governance. This is the meta-d′ dissociation prediction. Second: disrupting temporal binding should fragment the lived now into discrete slices while moment-to-moment perception remains intact. Third: salience should preferentially gate what enters recursive stabilization, with the strongest effects at low signal strength. Fourth: systems with sophisticated processing but no self-world recursion should fail behavioral and neural markers of perspective even when task performance is high. Fifth: perspective stability should follow an inverted-U with respect to recursive depth — bounded recursion stabilizes; unbounded does not.

Of these, the fifth is the architectural commitment RTC most stakes its identity on. If perspective stability is monotonic with recursive depth, the bounded-recursion hypothesis is wrong, and the whole architecture would need to be substantially rebuilt. The other four predictions test individual layers; the fifth tests whether the layered architecture is the right kind of architecture at all.`,
    margin: {
      label: "The high-stakes prediction",
      note: "RTC could survive falsification of any single layer-specific prediction with adjustments. It could not survive falsification of bounded recursion. That prediction is where the theory bets its identity.",
    },
  },
  {
    id: "open",
    n: "IX",
    title: "Open Questions",
    subtitle: "What RTC has not yet resolved",
    body: `Several questions remain genuinely open within the framework, and listing them is part of taking the theory seriously.

What is the precise relationship between meta-d′ and recursive meta-governance? Meta-d′ is well-established as a measure of metacognitive accuracy, but its mapping to RTC's Layer 5 is structural rather than rigorously operationalized. Better operationalization of meta-governance markers is needed before the meta-d′ dissociation prediction becomes a sharp empirical test.

How does diachronic reconstitution differ operationally from memory retrieval? RTC distinguishes them, but the distinction is theoretical. What experimental signature would separate a system that retrieves its past from a system that reconstitutes itself from its past? This is one of the harder open problems.

Can salience be operationalized in artificial systems without being externally imposed? In humans, salience is grounded in embodiment, evolutionary history, and biological need. In artificial systems, salience is typically an engineered reward signal. RTC predicts that genuine perspective requires intrinsic salience, but how this would be implemented in a non-biological system is an open architectural question.

Is the seven-layer architecture exhaustive? RTC proposes seven layers, but the theory is structurally compatible with refinements that subdivide certain layers or recognize sub-layers. The seven are stable as a current best-organization, not as a final taxonomy.

These are not weaknesses. They are the productive questions the theory generates.`,
    margin: {
      label: "Honest about what's not solved",
      note: "A theory that claims to have answered everything has either solved nothing or is hiding something. Listing open questions is how a framework signals that it is alive — a research program, not a finished system.",
    },
  },
  {
    id: "future",
    n: "X",
    title: "Future Work",
    subtitle: "Where RTC is going",
    body: `The directions RTC is developing into are several, and they are uneven in maturity.

The architectural specification needs sharpening. Each layer has a structural definition, but the operationalizations vary in rigor. Salience and meta-governance are reasonably well-grounded in existing measurement traditions. Diachronic reconstitution and bounded recursion are less so. A near-term priority is tightening the operational definitions of the latter two so that the predictions become sharper.

The thermodynamic connection needs formal development. The intuition that bounded recursion is energetically optimal is plausible, but RTC has not yet derived the bounded-recursion claim from first principles within a free-energy framework. Doing so would either strengthen the theory considerably or expose internal inconsistencies. Either outcome is productive.

The AI evaluation framework needs operationalization. The scoring rubric in the AI Consciousness Lab is structured but informal. Turning it into a published rubric that AI labs could use as a benchmark would require formal scoring criteria for each layer. This is the most concrete near-term deliverable RTC could produce.

The clinical applications are speculative but worth exploring. If RTC is correct, then clinical phenomena like dissociation, depersonalization, and certain forms of psychosis are layer-specific architectural failures. A clinical operationalization of the seven layers — what does it look like when Layer 4 fails versus Layer 6 — could produce diagnostically useful distinctions. This is a longer horizon.

And finally, the philosophical work continues. RTC's claim that perspective is the explanandum of consciousness science is not just a methodological move; it is a substantive philosophical position that has implications for how the hard problem is framed. Working out those implications carefully is part of what comes next.`,
    margin: {
      label: "RTC as a research program",
      note: "What this site is, in the end, is a public statement of where the theory currently stands. The work is not finished. It is in progress, openly so. That openness is part of the design.",
    },
  },
];

const TIMELINE = [
  {
    period: "Dec 2024",
    title: "Initial formulation",
    description:
      "RTC begins as an attempt to explain consciousness through recursive self-reference, emotional salience, and the stabilization of distinctions.",
  },
  {
    period: "Early 2025",
    title: "Recursive self-world modeling",
    description:
      "The theory develops around the idea that consciousness requires a system to model itself as situated within a world.",
  },
  {
    period: "Spring 2025",
    title: "AI-augmented consciousness",
    description:
      "RTC begins informing a broader framework for human-AI recursive dialogue, where AI becomes a mirror for human self-modeling.",
  },
  {
    period: "Mid 2025",
    title: "Relational emergence",
    description:
      "The theory expands into questions of AI self-modeling, recursive identity, and whether machine systems could support perspectival continuity.",
  },
  {
    period: "Late 2025",
    title: "Thermodynamic and temporal constraints",
    description:
      "RTC becomes more falsifiable through connections to temporal irreversibility, energetic cost, metacognitive evaluation, and bounded memory.",
  },
  {
    period: "2026",
    title: "Interactive theory artifact",
    description:
      "RTC is translated into an interactive web experience designed to make recursive consciousness explorable, testable, and visually intuitive.",
  },
];

// ============================================================
// MAIN
// ============================================================
export default function ManuscriptPage() {
  const [activeSection, setActiveSection] = useState("origin");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
        className="mobile-pad"
        style={{
          padding: "48px 28px 36px",
          borderBottom: "1px solid #2a2620",
          background:
            "linear-gradient(180deg, #161310 0%, #0d0b09 100%)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
            The Living Manuscript — Section 06
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 44,
              fontWeight: 300,
              margin: 0,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              maxWidth: 880,
            }}
          >
            The Recurse Theory of{" "}
            <em style={{ color: "#d4af6a", fontStyle: "italic" }}>
              Consciousness
            </em>
          </h1>
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 24,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#8a8278",
              letterSpacing: "0.05em",
              flexWrap: "wrap",
            }}
          >
            <span>Ryan Erbe · Independent Researcher</span>
            <span>·</span>
            <span>Dec 2024 — present</span>
            <span>·</span>
            <span>v0.1 · in development</span>
          </div>
        </div>
      </header>

      {/* Main grid: TOC + content + timeline */}
      <main
        className="mobile-stack mobile-pad"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "60px 28px 80px",
          display: "grid",
          gridTemplateColumns: "200px 1fr 240px",
          gap: 56,
          alignItems: "start",
        }}
      >
        {/* LEFT: Table of Contents (sticky) */}
        <nav
          className="mobile-hide"
          style={{
            position: "sticky",
            top: 32,
            alignSelf: "start",
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
            Contents
          </div>
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {SECTIONS.map((s) => (
              <li
                key={s.id}
                style={{ marginBottom: 14 }}
              >
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "baseline",
                    textDecoration: "none",
                    color:
                      activeSection === s.id ? "#d4af6a" : "#8a8278",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== s.id)
                      e.currentTarget.style.color = "#b8b0a0";
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== s.id)
                      e.currentTarget.style.color = "#8a8278";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.05em",
                      minWidth: 24,
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 13,
                      lineHeight: 1.35,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* CENTER: Reading column */}
        <article style={{ minWidth: 0 }}>
          {SECTIONS.map((section) => (
            <Section
              key={section.id}
              section={section}
              forwardRef={(el) => (sectionRefs.current[section.id] = el)}
            />
          ))}
        </article>

        {/* RIGHT: Timeline (sticky) */}
        <aside
          className="mobile-hide"
          style={{
            position: "sticky",
            top: 32,
            alignSelf: "start",
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
            Timeline
          </div>
          <Timeline items={TIMELINE} />
        </aside>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "32px 28px",
          borderTop: "1px solid #2a2620",
          background: "#0a0907",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
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
          <span>The Perspective Engine · The Living Manuscript</span>
          <span>RTC v0.1 · Bounded recursion · Salience · Continuity · Source · Time</span>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// SECTION
// ============================================================
function Section({ section, forwardRef }: { section: any; forwardRef: (el: HTMLElement | null) => void }) {
  const isDefinitions = !!section.definitions;

  return (
    <section
      id={section.id}
      ref={forwardRef}
      style={{
        marginBottom: 96,
        scrollMarginTop: 32,
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 28,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#d4af6a",
              opacity: 0.85,
            }}
          >
            {section.n}
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 32,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.018em",
              lineHeight: 1.15,
              color: "#e8e3d8",
            }}
          >
            {section.title}
          </h2>
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: 16,
            fontWeight: 300,
            color: "#8a8278",
            paddingBottom: 16,
            borderBottom: "1px solid #2a2620",
          }}
        >
          {section.subtitle}
        </div>
      </div>

      {/* Section body */}
      {!isDefinitions && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          <div>
            {section.body.split("\n\n").map((para, i) => (
              <p key={i} style={paragraphStyle}>
                {para}
              </p>
            ))}
          </div>
          {section.margin && (
            <Marginalia label={section.margin.label} note={section.margin.note} />
          )}
        </div>
      )}

      {/* Definitions section gets special treatment */}
      {isDefinitions && (
        <div>
          {section.definitions.map((def, i) => (
            <div
              key={i}
              style={{
                paddingBottom: 22,
                marginBottom: 22,
                borderBottom:
                  i < section.definitions.length - 1
                    ? "1px solid #1f1c18"
                    : "none",
              }}
            >
              <div
                className="mobile-stack-tight"
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: 28,
                  alignItems: "baseline",
                }}
              >
                <dt
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 19,
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#d4af6a",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {def.term}
                </dt>
                <dd
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: "#b8b0a0",
                    margin: 0,
                  }}
                >
                  {def.body}
                </dd>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const paragraphStyle = {
  fontFamily: "'Fraunces', serif",
  fontSize: 17,
  fontWeight: 300,
  lineHeight: 1.7,
  color: "#c8c2b6",
  margin: "0 0 22px",
  letterSpacing: "-0.005em",
};

// ============================================================
// MARGINALIA
// Inline aside for technical depth
// ============================================================
function Marginalia({ label, note }) {
  return (
    <div
      style={{
        marginTop: 12,
        marginBottom: 24,
        padding: "20px 24px",
        borderLeft: "2px solid #d4af6a",
        background: "rgba(212, 175, 106, 0.04)",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "#d4af6a",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.6,
          color: "#b8b0a0",
          margin: 0,
        }}
      >
        {note}
      </p>
    </div>
  );
}

// ============================================================
// TIMELINE
// ============================================================
function Timeline({ items }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Vertical spine */}
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 6,
          bottom: 6,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent 0%, #d4af6a 10%, #d4af6a 90%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            paddingLeft: 24,
            paddingBottom: i === items.length - 1 ? 0 : 28,
          }}
        >
          {/* Node */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 4,
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: i === items.length - 1 ? "#d4af6a" : "#0d0b09",
              border: `1px solid #d4af6a`,
              boxShadow: i === items.length - 1
                ? "0 0 8px rgba(212, 175, 106, 0.6)"
                : "none",
            }}
          />

          {/* Content */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: "#d4af6a",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {item.period}
          </div>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#e8e3d8",
              letterSpacing: "-0.005em",
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            {item.title}
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 300,
              lineHeight: 1.6,
              color: "#8a8278",
              margin: 0,
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
