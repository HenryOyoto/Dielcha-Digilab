import { articles, projects, resources, services } from "@/data/site";
import { tool } from "@/data/tools";

/** Which projects illustrate each service (matched on project category). */
export const serviceProjectCategories: Record<string, string[]> = {
  "electronics-systems-pcb-design": ["PCB Design", "Embedded Systems"],
  "embedded-systems-iot": ["IoT & Embedded Systems", "Embedded Systems"],
  "engineering-design-product-cad": ["PCB Design"],
  "engineering-documentation-technical-support": [],
};

export type SearchEntry =
  | { kind: "Page"; label: string; hint: string; to: "/" | "/services" | "/work" | "/lab" | "/about" | "/start-a-project" }
  | { kind: "Service"; label: string; hint: string; slug: string }
  | { kind: "Project"; label: string; hint: string; slug: string }
  | { kind: "Note"; label: string; hint: string; slug: string }
  | { kind: "Resource"; label: string; hint: string; slug: string }
  | { kind: "Tool"; label: string; hint: string; slug: string };

/** One search entry per tool, pointing at the first service that uses it. */
const toolEntries: SearchEntry[] = (() => {
  const seen = new Set<string>();
  const out: SearchEntry[] = [];
  for (const s of services) {
    for (const key of s.tools) {
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ kind: "Tool", label: tool[key].name, hint: `Used in ${s.title}`, slug: s.slug });
    }
  }
  return out;
})();

export const searchEntries: SearchEntry[] = [
  { kind: "Page", label: "Home", hint: "Start here", to: "/" },
  { kind: "Page", label: "Services", hint: "What we do", to: "/services" },
  { kind: "Page", label: "Projects", hint: "Selected work", to: "/work" },
  { kind: "Page", label: "Lab", hint: "Notes and checklists", to: "/lab" },
  { kind: "Page", label: "About", hint: "Who we are", to: "/about" },
  { kind: "Page", label: "Start a project", hint: "Send your idea", to: "/start-a-project" },
  ...services.map((s) => ({ kind: "Service" as const, label: s.title, hint: s.short, slug: s.slug })),
  ...projects.map((p) => ({ kind: "Project" as const, label: p.title, hint: p.category, slug: p.slug })),
  ...articles.map((a) => ({ kind: "Note" as const, label: a.title, hint: a.category, slug: a.slug })),
  ...resources.map((r) => ({ kind: "Resource" as const, label: r.title, hint: r.format, slug: r.slug })),
  ...toolEntries,
];
