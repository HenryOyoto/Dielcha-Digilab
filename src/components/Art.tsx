import type { ReactNode } from "react";

const TRACES = [
  "M0 36 H120 L150 66 H300 L330 36 H520 L550 66 H900",
  "M0 96 H90 L120 126 H260 L290 96 H430 L460 126 H640 L670 96 H900",
  "M0 156 H210 L240 126 H380 L410 156 H700 L730 126 H900",
  "M180 0 V36",
  "M430 0 V96",
  "M640 180 V126",
];
const VIAS: [number, number][] = [[120, 36], [300, 66], [520, 36], [260, 126], [430, 96], [640, 126], [210, 156], [380, 156], [700, 156]];

/** Decorative circuit traces with a current pulse running along them. */
export function TraceArt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 900 180" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      {TRACES.map((d) => <path key={`t-${d}`} className="trace" d={d} />)}
      {TRACES.map((d) => <path key={`f-${d}`} className="trace-flow" d={d} />)}
      {VIAS.map(([x, y]) => <circle key={`${x}-${y}`} className="via" cx={x} cy={y} r="5" />)}
    </svg>
  );
}

const B = "var(--brand-blue)", G = "var(--brand-green)", Y = "var(--brand-yellow)", R = "var(--brand-red)";
const label = { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, fill: "#2b3948" } as const;

function PcbStack() {
  const layers: [string, number, number, string][] = [
    ["Top signal", 36, 12, "#e0a800"], ["Dielectric", 48, 22, "#3d9a63"], ["Ground plane", 70, 8, "#b87333"],
    ["Core", 78, 30, "#2f7d4f"], ["Power plane", 108, 8, "#b87333"], ["Dielectric", 116, 22, "#3d9a63"], ["Bottom signal", 138, 12, "#e0a800"],
  ];
  return (
    <>
      {layers.map(([name, y, h, fill]) => (
        <g key={`${name}-${y}`}>
          <rect x="18" y={y} width="196" height={h} rx="2" fill={fill} />
          <text x="226" y={y + h / 2 + 4} style={label}>{name}</text>
        </g>
      ))}
      <rect x="110" y="36" width="12" height="114" fill="none" stroke="#1b1b1b" strokeWidth="2" strokeDasharray="3 3" />
      <rect x="112" y="36" width="8" height="114" fill="#b87333" opacity=".85" />
      <text x="18" y="176" style={label}>4-layer stack-up with plated via</text>
    </>
  );
}

function BlockChain() {
  const boxes = [["Sensor", G, 12], ["MCU", B, 92], ["Radio", Y, 172], ["Cloud", R, 252]] as const;
  return (
    <>
      {boxes.map(([t, c, x]) => (
        <g key={t}>
          <rect x={x} y="64" width="62" height="52" rx="10" fill="#fff" stroke={c} strokeWidth="2.5" />
          <rect x={x} y="64" width="62" height="10" rx="5" fill={c} />
          <text x={x + 31} y="100" textAnchor="middle" style={{ ...label, fontSize: 12 }}>{t}</text>
        </g>
      ))}
      {[74, 154, 234].map((x) => <path key={x} className="anat-edge" d={`M${x} 90 H${x + 18}`} />)}
      <rect x="92" y="146" width="62" height="28" rx="8" fill="#fff" stroke={B} strokeWidth="2" strokeDasharray="4 3" />
      <text x="123" y="164" textAnchor="middle" style={label}>Power</text>
      <path className="anat-edge" d="M123 146 V116" />
      <text x="12" y="30" style={{ ...label, fontSize: 12 }}>Sense → decide → connect → report</text>
    </>
  );
}

function Exploded() {
  const layer = (y: number, h: number, top: string, front: string, side: string) => (
    <g key={y}>
      <polygon points={`70,${y} 250,${y} 220,${y + 30} 40,${y + 30}`} fill={top} />
      <polygon points={`40,${y + 30} 220,${y + 30} 220,${y + 30 + h} 40,${y + 30 + h}`} fill={front} />
      <polygon points={`220,${y + 30} 250,${y} 250,${y + h} 220,${y + 30 + h}`} fill={side} />
    </g>
  );
  return (
    <>
      <path d="M40 64 V112 M220 64 V112 M40 118 V160 M220 118 V160" stroke="#8fa3b6" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      {layer(130, 22, "#9ec3ea", B, "#08407a")}
      {layer(82, 6, "#4fb37e", G, "#0b5f33")}
      <rect x="110" y="96" width="14" height="8" fill="#1b1b1b" /><rect x="146" y="100" width="10" height="8" fill="#1b1b1b" /><rect x="178" y="94" width="12" height="8" fill="#1b1b1b" />
      {layer(24, 10, "#ffe27a", Y, "#b88f00")}
      <text x="262" y="48" style={label}>Lid</text><text x="262" y="100" style={label}>PCB</text><text x="262" y="156" style={label}>Base</text>
    </>
  );
}

function DocStack() {
  return (
    <>
      <rect x="44" y="14" width="170" height="150" rx="8" fill="#eef3f8" stroke="#c7d3df" />
      <rect x="32" y="26" width="170" height="150" rx="8" fill="#f7f9fc" stroke="#c7d3df" />
      <rect x="20" y="38" width="170" height="146" rx="8" fill="#fff" stroke="#9db3c8" strokeWidth="1.5" />
      <rect x="20" y="38" width="170" height="22" rx="8" fill={R} />
      <text x="32" y="53" style={{ ...label, fill: "#fff" }}>Schematic · Rev A</text>
      <path d="M36 96 H60 L66 82 L78 110 L90 82 L102 110 L108 96 H134" fill="none" stroke={B} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="36" cy="96" r="3.5" fill={B} /><circle cx="134" cy="96" r="3.5" fill={B} />
      <path d="M36 128 H174 M36 142 H174 M36 156 H140 M92 122 V164" stroke="#9db3c8" strokeWidth="1.2" fill="none" />
      <text x="228" y="76" style={label}>BOM</text><text x="228" y="100" style={label}>Diagrams</text><text x="228" y="124" style={label}>Test notes</text>
      <path d="M200 76 H222 M200 100 H222 M200 124 H222" stroke="#9db3c8" strokeWidth="1.5" />
    </>
  );
}

const arts: ReactNode[] = [<PcbStack key="a" />, <BlockChain key="b" />, <Exploded key="c" />, <DocStack key="d" />];

/** Custom diagram for each service, replacing repeated photographs on the detail pages. */
export function ServiceArt({ index, className = "" }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 320 190" className={className} role="img" aria-label="Service diagram">
      {arts[index % arts.length]}
    </svg>
  );
}
