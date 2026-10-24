import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { searchEntries, type SearchEntry } from "@/data/content";

function Entry({ e, active, go }: { e: SearchEntry; active: boolean; go: () => void }) {
  const common = { className: "spal__item", "data-active": active, onClick: go } as const;
  const inner = (<><span className="spal__kind">{e.kind}</span><span className="truncate font-semibold">{e.label}</span><span className="spal__hint">{e.hint}</span></>);
  switch (e.kind) {
    case "Page": return <Link to={e.to} {...common}>{inner}</Link>;
    case "Service": return <Link to="/services/$slug" params={{ slug: e.slug }} {...common}>{inner}</Link>;
    case "Project": return <Link to="/work/$slug" params={{ slug: e.slug }} {...common}>{inner}</Link>;
    case "Note": return <Link to="/lab/articles/$slug" params={{ slug: e.slug }} {...common}>{inner}</Link>;
    case "Resource": return <Link to="/lab/resources/$slug" params={{ slug: e.slug }} {...common}>{inner}</Link>;
  }
}

/** Ctrl/⌘ + K site search across pages, services, projects, notes and resources. */
export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-search", onOpen); };
  }, []);

  useEffect(() => { if (open) { setQ(""); setActive(0); } }, [open]);
  useEffect(() => setActive(0), [q]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return searchEntries.slice(0, 9);
    return searchEntries.filter((e) => `${e.label} ${e.hint} ${e.kind}`.toLowerCase().includes(t)).slice(0, 10);
  }, [q]);

  if (!open) return null;
  const close = () => setOpen(false);
  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); list.current?.querySelectorAll<HTMLAnchorElement>("a")[active]?.click(); }
  };

  return (
    <div className="spal" role="dialog" aria-modal="true" aria-label="Search the site" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="spal__box" onKeyDown={onKeyDown}>
        <input autoFocus className="spal__input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, projects, notes…" aria-label="Search" />
        <div className="spal__list" ref={list}>
          {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-muted-foreground">Nothing found. Try “PCB”, “ESP32” or “checklist”.</p>}
          {results.map((e, i) => <Entry key={`${e.kind}-${e.label}`} e={e} active={i === active} go={close} />)}
        </div>
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2 text-xs text-muted-foreground">
          <span><kbd>↑</kbd> <kbd>↓</kbd> move · <kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
