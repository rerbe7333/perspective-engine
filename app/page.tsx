"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAnimationTime } from "@/lib/useAnimationTime";
import { SectionTag } from "@/components/Primitives";

export default function HomePage() {
  const time = useAnimationTime();
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          minHeight: "calc(100vh - 56px)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 32px",
          background:
            "radial-gradient(ellipse at 50% 40%, #1a1612 0%, #0a0907 70%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.7,
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: "transform 0.05s linear",
          }}
        >
          <HeroVisualization time={time} mouse={mouse} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(10, 9, 7, 0.6) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 32,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0,
              animation: "fadeUp 0.8s ease 0.2s forwards",
            }}
          >
            The Recurse Theory of Consciousness · v0.1
          </div>

          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(40px, 7vw, 88px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: 1000,
            }}
          >
            <span
              style={{
                display: "block",
                opacity: 0,
                animation: "fadeUp 1s ease 0.4s forwards",
              }}
            >
              Consciousness is not a thing
            </span>
            <span
              style={{
                display: "block",
                opacity: 0,
                animation: "fadeUp 1s ease 0.7s forwards",
              }}
            >
              inside the brain.
            </span>
            <span
              style={{
                display: "block",
                color: "#d4af6a",
                fontStyle: "italic",
                fontWeight: 300,
                opacity: 0,
                animation: "fadeUp 1.2s ease 1.1s forwards",
                marginTop: 8,
              }}
            >
              It is a recursively stabilized perspective.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(16px, 1.6vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.55,
              color: "#b8b0a0",
              maxWidth: 640,
              fontStyle: "italic",
              margin: 0,
              opacity: 0,
              animation: "fadeUp 1s ease 1.5s forwards",
            }}
          >
            A theory proposing that conscious experience emerges when a system
            recursively models itself, its world, and its own modeling across
            time — under conditions of uncertainty, salience, and bounded
            control.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 16,
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeUp 1s ease 1.9s forwards",
            }}
          >
            <Link href="/engine" style={primaryButton}>
              <span>Enter the Perspective Engine</span>
              <span style={{ marginLeft: 12, opacity: 0.7 }}>→</span>
            </Link>
            <Link href="/manuscript" style={secondaryButton}>
              Read the theory
            </Link>
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section
        style={{
          padding: "120px 32px",
          maxWidth: 1200,
          margin: "0 auto",
          borderTop: "1px solid #2a2620",
        }}
      >
        <SectionTag>The Claim</SectionTag>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "16px 0 64px",
            maxWidth: 900,
          }}
        >
          Most theories of consciousness ask{" "}
          <em style={{ color: "#8a8278", fontStyle: "italic" }}>
            where it lives
          </em>{" "}
          or{" "}
          <em style={{ color: "#8a8278", fontStyle: "italic" }}>
            what it integrates
          </em>
          .{" "}
          <span style={{ color: "#d4af6a" }}>RTC asks how it stabilizes.</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
          }}
        >
          {[
            {
              label: "Not a thing",
              text: "Consciousness is not a substance, location, or computational output. It is not produced by any single brain area or any specific quantity of integrated information.",
            },
            {
              label: "Not a process",
              text: "Consciousness is not a single process either. It is a dynamically maintained architecture — many processes coordinated within bounded ranges to sustain a point of view.",
            },
            {
              label: "A perspective",
              text: "What stabilizes is perspective itself: a system continuously modeling its own relation to a world, governed against runaway recursion, reconstituted across time.",
            },
          ].map((col, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#d4af6a",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: "1px solid #2a2620",
                }}
              >
                {String(i + 1).padStart(2, "0")} · {col.label}
              </div>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 17,
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: "#b8b0a0",
                  margin: 0,
                }}
              >
                {col.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ROUTING CARDS */}
      <section
        style={{
          padding: "80px 32px 120px",
          maxWidth: 1200,
          margin: "0 auto",
          borderTop: "1px solid #2a2620",
        }}
      >
        <SectionTag>Explore</SectionTag>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "16px 0 16px",
          }}
        >
          Seven ways into the theory.
        </h2>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 15,
            fontWeight: 300,
            fontStyle: "italic",
            color: "#8a8278",
            maxWidth: 720,
            margin: "0 0 56px",
            lineHeight: 1.55,
          }}
        >
          If you only have a few minutes, start with the Engine. If you want to
          read, start with the Manuscript. The other sections can be visited in
          any order.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          <RouteCard
            number="01"
            href="/engine"
            title="The Perspective Engine"
            subtitle="Interactive simulator"
            description="Move seven parameters and watch a recursive architecture stabilize, fragment, or run away. The five stability states emerge from interactions, not thresholds. The fastest way to feel the shape of the theory."
            cta="Open the engine"
            time={time}
            glyph="engine"
          />
          <RouteCard
            number="02"
            href="/architecture"
            title="The Seven-Layer Architecture"
            subtitle="Click into the structure"
            description="Six generative layers — Signal, Distinction, Salience, Self-in-World, Meta-Governance, Diachronic Reconstitution — produce the seventh: Stabilized Perspective. Each layer expands into plain language, technical frame, neural substrate, and failure mode."
            cta="Open the architecture"
            time={time}
            glyph="architecture"
          />
          <RouteCard
            number="03"
            href="/comparison"
            title="Theory Comparison"
            subtitle="Where RTC sits"
            description="A positional map of RTC against Global Workspace, Integrated Information, Predictive Processing, Higher-Order Thought, Attention Schema, and Active Inference. What each captures, what each leaves unaddressed, what RTC adds."
            cta="See the comparison"
            time={time}
            glyph="comparison"
          />
          <RouteCard
            number="04"
            href="/predictions"
            title="Falsifiable Predictions"
            subtitle="What would break the theory"
            description="Five predictions with experimental designs and visualized data shapes: meta-cognitive dissociation, temporal fragmentation, salience gating, self-world dissociation, and the bounded-recursion U-curve. Designed to be falsified."
            cta="See the predictions"
            time={time}
            glyph="predictions"
          />
          <RouteCard
            number="05"
            href="/ai-lab"
            title="AI Consciousness Lab"
            subtitle="RTC as evaluation framework"
            description="Five reference architectures — Basic LLM, Agentic LLM, Memory-Augmented, Self-Monitoring, and a hypothetical RTC-Aligned system — scored qualitatively across the seven layers. Where current AI sits, and what would have to be added next."
            cta="Open the lab"
            time={time}
            glyph="ai-lab"
          />
          <RouteCard
            number="06"
            href="/rubric"
            title="The Evaluation Rubric"
            subtitle="Operational scoring criteria"
            description="The instrument the AI Lab presupposes. Each of the seven layers specifies an architectural question, diagnostic signals, and concrete level criteria — including admissions of where the criteria themselves remain open research questions."
            cta="See the rubric"
            time={time}
            glyph="rubric"
          />
          <RouteCard
            number="07"
            href="/manuscript"
            title="The Living Manuscript"
            subtitle="Read the theory"
            description="The theory in long form: origin, core thesis, definitions, architecture, neuroscience alignment, AI implications, thermodynamic constraints, predictions, open questions, future work. With timeline."
            cta="Read the manuscript"
            time={time}
            glyph="manuscript"
            wide
          />
        </div>
      </section>

      {/* AUTHORSHIP */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1100,
          margin: "0 auto",
          borderTop: "1px solid #2a2620",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 64,
          }}
        >
          <div>
            <SectionTag>Authorship</SectionTag>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 26,
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                marginTop: 16,
                marginBottom: 12,
              }}
            >
              Ryan Erbe
            </h3>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#8a8278",
                letterSpacing: "0.05em",
                lineHeight: 1.7,
              }}
            >
              Independent researcher
              <br />
              December 2024 — present
            </div>
          </div>

          <div>
            <p style={aboutProse}>
              The Recurse Theory of Consciousness began in December 2024 as an
              attempt to explain conscious experience through recursive
              self-reference, emotional salience, and the stabilization of
              distinctions. Through 2025 it expanded — first into recursive
              self-in-world modeling, then into questions of human-AI
              relational emergence, then into thermodynamic and temporal
              constraints on bounded recursion.
            </p>
            <p style={aboutProse}>
              This site is the theory&apos;s translation into something
              explorable. It does not replace the manuscript. It is a second
              surface — a way to feel the shape of an idea that has mostly
              lived in essays, sketches, and conversations.
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              {[
                "Neuroscience",
                "Philosophy of mind",
                "AI architecture",
                "Thermodynamics",
                "Recursion theory",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#8a8278",
                    padding: "5px 10px",
                    border: "1px solid #2a2620",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: "32px",
          borderTop: "1px solid #2a2620",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#5a544a",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span>The Perspective Engine</span>
        <span>
          RTC v0.1 · Bounded recursion · Salience · Continuity · Source · Time
        </span>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// HERO VISUALIZATION
// ============================================================
function HeroVisualization({
  time,
  mouse,
}: {
  time: number;
  mouse: { x: number; y: number };
}) {
  const t = time * 0.001;
  const cx = 700;
  const cy = 450;

  const mx = (mouse.x - 0.5) * 30;
  const my = (mouse.y - 0.5) * 30;

  const rings: any[] = [];
  for (let i = 0; i < 9; i++) {
    const baseR = 50 + i * 38;
    const rotation =
      t * 8 * (i % 2 === 0 ? 1 : -0.7) * (0.3 + i * 0.05);
    const ellipseRatio = 1 + Math.sin(t * 0.4 + i * 0.5) * 0.04;
    const opacity = Math.max(0.08, 0.55 - i * 0.045);
    rings.push({
      r: baseR,
      rotation,
      ellipseRatio,
      opacity,
      strokeWidth: 0.7 + (8 - i) * 0.08,
    });
  }

  const nodes: any[] = [];
  for (let i = 0; i < 14; i++) {
    const ringIdx = i % 6;
    const ring = rings[ringIdx + 1];
    if (!ring) continue;
    const angle =
      (i / 14) * Math.PI * 2 + t * 0.25 * (ringIdx % 2 === 0 ? 1 : -1);
    nodes.push({
      x: cx + Math.cos(angle) * ring.r,
      y: cy + Math.sin(angle) * ring.r * ring.ellipseRatio,
      size: 1.5 + Math.sin(t + i) * 0.5,
    });
  }

  return (
    <svg
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <radialGradient id="heroCenter">
          <stop offset="0%" stopColor="#f0d090" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#d4af6a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d4af6a" stopOpacity="0" />
        </radialGradient>
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="ringSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      <circle
        cx={cx + mx * 0.5}
        cy={cy + my * 0.5}
        r={500}
        fill="url(#heroCenter)"
        opacity={0.4}
      />

      <g transform={`translate(${mx} ${my})`}>
        {rings
          .slice()
          .reverse()
          .map((ring, idx) => (
            <ellipse
              key={idx}
              cx={cx}
              cy={cy}
              rx={ring.r}
              ry={ring.r * ring.ellipseRatio}
              fill="none"
              stroke="#d4af6a"
              strokeWidth={ring.strokeWidth}
              opacity={ring.opacity}
              transform={`rotate(${ring.rotation} ${cx} ${cy})`}
              style={{ filter: "url(#ringSoft)" }}
            />
          ))}
      </g>

      <g
        filter="url(#heroGlow)"
        transform={`translate(${mx * 0.7} ${my * 0.7})`}
      >
        {nodes.map((node, idx) => (
          <circle
            key={idx}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="#f0d090"
            opacity={0.7}
          />
        ))}
      </g>

      <g
        filter="url(#heroGlow)"
        transform={`translate(${mx * 0.4} ${my * 0.4})`}
      >
        <circle cx={cx} cy={cy} r={16} fill="#d4af6a" opacity={0.4} />
        <circle cx={cx} cy={cy} r={10} fill="#f0d090" opacity={0.95} />
      </g>
    </svg>
  );
}

// ============================================================
// ROUTE CARD
// ============================================================
function RouteCard({
  number,
  href,
  title,
  subtitle,
  description,
  cta,
  time,
  glyph,
  wide = false,
}: {
  number: string;
  href: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  time: number;
  glyph: string;
  wide?: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: wide ? "1 / -1" : undefined,
        display: "block",
        padding: "32px 32px 28px",
        border: "1px solid #2a2620",
        background: hover ? "rgba(28, 24, 20, 0.6)" : "rgba(15, 13, 11, 0.4)",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#d4af6a",
              letterSpacing: "0.2em",
              marginBottom: 12,
            }}
          >
            {number}
          </div>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              margin: 0,
              color: hover ? "#d4af6a" : "#e8e3d8",
              transition: "color 0.3s",
            }}
          >
            {title}
          </h3>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 14,
              color: "#8a8278",
              marginTop: 4,
            }}
          >
            {subtitle}
          </div>
        </div>
        <CardGlyph type={glyph} time={time} hover={hover} />
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          lineHeight: 1.65,
          color: "#b8b0a0",
          margin: "0 0 24px",
          maxWidth: wide ? 760 : "none",
        }}
      >
        {description}
      </p>

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: hover ? "#d4af6a" : "#8a8278",
          transition: "color 0.3s",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {cta}
        <span
          style={{
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s",
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}

function CardGlyph({
  type,
  time,
  hover,
}: {
  type: string;
  time: number;
  hover: boolean;
}) {
  const t = time * 0.001;
  const color = hover ? "#d4af6a" : "#5a544a";
  return (
    <svg
      viewBox="0 0 64 64"
      style={{ width: 64, height: 64, opacity: 0.9 }}
    >
      {type === "engine" && (
        <g>
          {[28, 22, 16, 10].map((r, i) => (
            <circle
              key={i}
              cx={32}
              cy={32}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={0.6}
              opacity={0.4 + i * 0.15}
              transform={`rotate(${t * 15 * (i % 2 === 0 ? 1 : -0.7)} 32 32)`}
            />
          ))}
          <circle cx={32} cy={32} r={3} fill={color} />
        </g>
      )}
      {type === "architecture" && (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={i}
              x1={12}
              x2={52}
              y1={10 + i * 7}
              y2={10 + i * 7}
              stroke={color}
              strokeWidth={i === 6 ? 1.4 : 0.6}
              opacity={i === 6 ? 1 : 0.3 + i * 0.07}
            />
          ))}
        </g>
      )}
      {type === "predictions" && (
        <g>
          {[0, 1, 2, 3].map((i) => {
            const y = 12 + i * 14;
            return (
              <g key={i}>
                <rect
                  x={10}
                  y={y}
                  width={44}
                  height={2}
                  fill={color}
                  opacity={0.25}
                />
                <rect
                  x={10}
                  y={y}
                  width={20 + Math.sin(t + i) * 8}
                  height={2}
                  fill={color}
                  opacity={0.7}
                />
              </g>
            );
          })}
        </g>
      )}
      {type === "comparison" && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={32}
                y1={32}
                x2={32 + Math.cos(angle) * 22}
                y2={32 + Math.sin(angle) * 22}
                stroke={color}
                strokeWidth={0.5}
                opacity={0.4}
              />
            );
          })}
          <circle
            cx={32}
            cy={32}
            r={22}
            fill="none"
            stroke={color}
            strokeWidth={0.5}
            opacity={0.4}
          />
          <circle cx={32} cy={32} r={3.5} fill={color} />
        </g>
      )}
      {type === "ai-lab" && (
        <g>
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4, 5, 6].map((col) => {
              const filled = (row + col) % 3 !== 0 && row + col < 8;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={10 + col * 6.5}
                  y={14 + row * 7}
                  width={4}
                  height={4}
                  fill={filled ? color : "transparent"}
                  stroke={color}
                  strokeWidth={0.5}
                  opacity={filled ? 0.85 : 0.25}
                />
              );
            })
          )}
        </g>
      )}
      {type === "rubric" && (
        <g>
          {[0, 1, 2, 3].map((i) => {
            const y = 14 + i * 11;
            const filled = 3 - i;
            return (
              <g key={i}>
                {[0, 1, 2].map((j) => (
                  <rect
                    key={j}
                    x={10 + j * 5}
                    y={y}
                    width={3}
                    height={3 + j * 1.5}
                    fill={j < filled ? color : "transparent"}
                    stroke={color}
                    strokeWidth={0.4}
                    opacity={j < filled ? 0.9 : 0.3}
                  />
                ))}
                <line
                  x1={32}
                  y1={y + 2}
                  x2={54}
                  y2={y + 2}
                  stroke={color}
                  strokeWidth={0.4}
                  opacity={0.4}
                />
              </g>
            );
          })}
        </g>
      )}
      {type === "manuscript" && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1={14}
              x2={i === 5 ? 38 : 50}
              y1={14 + i * 7}
              y2={14 + i * 7}
              stroke={color}
              strokeWidth={0.6}
              opacity={0.3 + i * 0.1}
            />
          ))}
          <circle
            cx={50}
            cy={50}
            r={3}
            fill={color}
            opacity={0.8}
          />
        </g>
      )}
    </svg>
  );
}

// ============================================================
// STYLES
// ============================================================
const aboutProse = {
  fontFamily: "'Fraunces', serif",
  fontSize: 17,
  fontWeight: 300,
  lineHeight: 1.6,
  color: "#b8b0a0",
  margin: "0 0 20px",
};

const primaryButton = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "#0a0907",
  background: "#d4af6a",
  padding: "16px 24px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #d4af6a",
  transition: "all 0.2s",
};

const secondaryButton = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "#e8e3d8",
  background: "transparent",
  padding: "16px 24px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #2a2620",
  transition: "all 0.2s",
};
