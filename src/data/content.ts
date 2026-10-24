import { articles, projects, resources, services } from "@/data/site";

/** Short answers, all drawn from what the site already states about how work is done. */
export const faqs = [
  {
    q: "Can the work be done remotely?",
    a: "Yes. Most design, firmware and documentation work is done remotely from drawings, design files, measurements, photographs and live discussion. Physical hardware is only needed when testing requires it.",
  },
  {
    q: "What should I send first?",
    a: "Requirements, existing files, drawings, measurements or photographs. A short description of the idea is enough to start the conversation.",
  },
  {
    q: "How are scope and cost agreed?",
    a: "Approach, deliverables, timeline and cost are discussed and agreed before any work begins, so there are no surprises.",
  },
  {
    q: "Is it only for electronics projects?",
    a: "Electronics, embedded systems, product design and documentation are the core. Related software such as dashboards, websites and automation can be added, and projects from other disciplines are welcome. Send the details and we will say honestly whether we are the right fit.",
  },
  {
    q: "Are my files kept private?",
    a: "Project files are treated as confidential and are used only to respond to and carry out your project. See the privacy policy for details.",
  },
  {
    q: "Where are you based?",
    a: "Juja, Kenya. Remote collaboration works with clients elsewhere, and WhatsApp is the quickest way to reach us.",
  },
] as const;

export const personas = [
  { avatar: "founder" as const, title: "Founders & startups", need: "Turn a product idea into a working, buildable prototype.", service: "embedded-systems-iot" },
  { avatar: "engineer" as const, title: "Product teams", need: "Extra hands for PCB layout, firmware, CAD and design review.", service: "electronics-systems-pcb-design" },
  { avatar: "maker" as const, title: "Builders & makers", need: "Get a project designed, enclosed, reviewed or properly documented.", service: "engineering-design-product-cad" },
  { avatar: "institution" as const, title: "Businesses & institutions", need: "Improve, replace or document existing hardware and systems.", service: "engineering-documentation-technical-support" },
];

export const intents = [
  { label: "Design a circuit board", slug: "electronics-systems-pcb-design" },
  { label: "Build a connected device", slug: "embedded-systems-iot" },
  { label: "Make an enclosure or 3D model", slug: "engineering-design-product-cad" },
  { label: "Document or review hardware", slug: "engineering-documentation-technical-support" },
] as const;

/** Which projects illustrate each service (matched on project category). */
export const serviceProjectCategories: Record<string, string[]> = {
  "electronics-systems-pcb-design": ["PCB Design", "Embedded Hardware", "Design Review"],
  "embedded-systems-iot": ["IoT & Embedded Systems", "Embedded Hardware", "Robotics"],
  "engineering-design-product-cad": ["PCB Design", "Robotics"],
  "engineering-documentation-technical-support": ["Design Review", "Python Projects"],
};

/** Blocks of the "product anatomy" diagram; `svc` indexes into services[]. */
export const anatomyNodes = [
  { id: "sensors", label: "Sensors & actuators", sub: "Measure and move", svc: [1] },
  { id: "power", label: "Power & protection", sub: "Regulators, batteries", svc: [0] },
  { id: "board", label: "Circuit board", sub: "PCB · ESP32 · firmware", svc: [0, 1] },
  { id: "radio", label: "Wi-Fi · Bluetooth", sub: "Connectivity", svc: [1] },
  { id: "cloud", label: "Dashboard & data", sub: "Cloud, app, API", svc: [1] },
  { id: "case", label: "Enclosure & mounting", sub: "", svc: [2] },
  { id: "docs", label: "Documentation", sub: "Schematics · BOM · diagrams · test notes", svc: [3] },
] as const;

export type SearchEntry =
  | { kind: "Page"; label: string; hint: string; to: "/" | "/services" | "/work" | "/lab" | "/about" | "/start-a-project" }
  | { kind: "Service"; label: string; hint: string; slug: string }
  | { kind: "Project"; label: string; hint: string; slug: string }
  | { kind: "Note"; label: string; hint: string; slug: string }
  | { kind: "Resource"; label: string; hint: string; slug: string };

export const searchEntries: SearchEntry[] = [
  { kind: "Page", label: "Home", hint: "Start here", to: "/" },
  { kind: "Page", label: "Services", hint: "What we build", to: "/services" },
  { kind: "Page", label: "Projects", hint: "Selected work", to: "/work" },
  { kind: "Page", label: "Lab", hint: "Notes and checklists", to: "/lab" },
  { kind: "Page", label: "About", hint: "Who we are", to: "/about" },
  { kind: "Page", label: "Start a project", hint: "Send your idea", to: "/start-a-project" },
  ...services.map((s) => ({ kind: "Service" as const, label: s.title, hint: s.short, slug: s.slug })),
  ...projects.map((p) => ({ kind: "Project" as const, label: p.title, hint: p.category, slug: p.slug })),
  ...articles.map((a) => ({ kind: "Note" as const, label: a.title, hint: a.category, slug: a.slug })),
  ...resources.map((r) => ({ kind: "Resource" as const, label: r.title, hint: r.format, slug: r.slug })),
];
