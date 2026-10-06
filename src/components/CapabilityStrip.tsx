import { CircuitBoard, Cpu, Wifi, Box, FileText } from "lucide-react";
import { capabilities } from "@/data/site";
const icons = { circuit: CircuitBoard, cpu: Cpu, wifi: Wifi, box: Box, file: FileText } as const;
const iconColors = ["text-primary", "text-accent", "text-secondary", "text-destructive", "text-primary"] as const;
export function CapabilityStrip() { return <section className="border-y border-border bg-muted"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-6 sm:px-6 md:grid-cols-5">{capabilities.map((c, index) => { const Icon = icons[c.icon]; return <div key={c.label} className="flex flex-col items-center gap-2 px-2 py-3 text-center"><Icon className={`size-6 ${iconColors[index % iconColors.length]}`}/><span className="font-display text-xs font-semibold leading-tight">{c.label}</span></div>; })}</div></section>; }
