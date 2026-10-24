import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { anatomyNodes } from "@/data/content";
import { services } from "@/data/site";

const COLORS = ["var(--brand-blue)", "var(--brand-green)", "var(--brand-yellow)", "var(--brand-red)"];
const SHORT = ["Electronics & PCB", "Embedded & IoT", "Product CAD", "Documentation"];
const DOT_CLASS = ["", "", "legend-btn--yellow", ""];

const POS: Record<string, { x: number; y: number; w: number; h: number }> = {
  sensors: { x: 20, y: 64, w: 168, h: 58 },
  power: { x: 20, y: 148, w: 168, h: 58 },
  board: { x: 238, y: 84, w: 200, h: 104 },
  radio: { x: 548, y: 56, w: 190, h: 58 },
  cloud: { x: 548, y: 148, w: 190, h: 58 },
  docs: { x: 8, y: 262, w: 744, h: 54 },
};

const EDGES = [
  "M188 93 C213 93 213 120 238 120",
  "M188 177 C213 177 213 152 238 152",
  "M438 120 C493 120 493 85 548 85",
  "M438 152 C493 152 493 177 548 177",
  "M643 114 V148",
];

/** Interactive block diagram of a connected product, colour-coded by the service that covers each block. */
export function ProductAnatomy() {
  const [picked, setPicked] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? picked;
  const lit = (svc: readonly number[]) => shown === null || svc.includes(shown);
  const toggle = (i: number) => setPicked((p) => (p === i ? null : i));
  const key = (i: number) => (e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); }
  };

  return (
    <div>
      <div className="anat-wrap">
        <svg className="anat" viewBox="0 0 760 322" role="group" aria-label="Diagram of a connected product and the Dielcha service that covers each part" style={{ minWidth: 620 }}>
          {/* enclosure outline */}
          <g
            className={`anat-node ${lit([2]) ? "" : "anat-dim"}`} tabIndex={0} role="button" aria-label="Enclosure and mounting"
            aria-pressed={picked === 2} onClick={() => toggle(2)} onKeyDown={key(2)}
            onMouseEnter={() => setHover(2)} onMouseLeave={() => setHover(null)}
          >
            <rect x="8" y="14" width="500" height="232" rx="22" fill="rgba(240,192,0,0.07)" stroke={COLORS[2]} strokeWidth="2.5" strokeDasharray="9 6" />
            <text x="26" y="38" className="anat-label" style={{ fill: "#8a6a00" }}>Enclosure &amp; mounting</text>
          </g>

          {EDGES.map((d) => <path key={d} d={d} className={`anat-edge ${shown !== null && ![0, 1].includes(shown) ? "anat-dim" : ""}`} />)}

          {anatomyNodes.filter((n) => n.id !== "case").map((n) => {
            const p = POS[n.id];
            const color = COLORS[n.svc[0]];
            const isBoard = n.id === "board";
            const isDocs = n.id === "docs";
            return (
              <g
                key={n.id} className={`anat-node ${lit(n.svc) ? "" : "anat-dim"}`} tabIndex={0} role="button"
                aria-label={`${n.label}: ${services[n.svc[0]].title}`} aria-pressed={picked !== null && n.svc.includes(picked)}
                onClick={() => toggle(n.svc[0])} onKeyDown={key(n.svc[0])}
                onMouseEnter={() => setHover(n.svc[0])} onMouseLeave={() => setHover(null)}
              >
                <rect className="box" x={p.x} y={p.y} width={p.w} height={p.h} rx={isDocs ? 14 : 14} stroke={color} style={isDocs ? { fill: "rgba(208,32,32,0.06)" } : undefined} />
                {isBoard ? (
                  <>
                    <rect x={p.x} y={p.y} width={p.w / 2} height="8" rx="4" fill={COLORS[n.svc[0]]} />
                    <rect x={p.x + p.w / 2} y={p.y} width={p.w / 2} height="8" rx="4" fill={COLORS[n.svc[1]]} />
                  </>
                ) : (
                  <rect x={p.x} y={p.y} width={p.w} height="8" rx="4" fill={color} />
                )}
                <text x={p.x + 14} y={p.y + (isDocs ? 30 : 30)} className="anat-label">{n.label}</text>
                <text x={p.x + 14} y={p.y + (isDocs ? 46 : 46)} className="anat-sub">{n.sub}</text>
                {isBoard && (
                  <g>
                    <rect x={p.x + 14} y={p.y + 58} width="172" height="30" rx="5" fill="#12344f" />
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={p.x + 24 + i * 19} y={p.y + 52} width="5" height="6" fill="#9db3c8" />)}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={`b${i}`} x={p.x + 24 + i * 19} y={p.y + 88} width="5" height="6" fill="#9db3c8" />)}
                    <text x={p.x + 100} y={p.y + 77} textAnchor="middle" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, fill: "#fff" }}>ESP32</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Highlight by service">
        {SHORT.map((label, i) => (
          <button key={label} type="button" aria-pressed={picked === i} onClick={() => toggle(i)} className={`legend-btn ${DOT_CLASS[i]}`} style={{ "--dot": COLORS[i] } as CSSProperties}>
            <i />{label}
          </button>
        ))}
      </div>

      <div className="card-s mt-3 px-4 py-3 text-sm" aria-live="polite">
        {shown === null ? (
          <p className="text-muted-foreground">Tap a block or a service above to see who builds it.</p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p><span className="font-display font-extrabold text-[#12344f]">{services[shown].title}.</span> <span className="text-muted-foreground">{services[shown].short}</span></p>
            <Link to="/services/$slug" params={{ slug: services[shown].slug }} className="font-bold text-[var(--brand-blue)] hover:text-[var(--brand-red)]">Open service →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
