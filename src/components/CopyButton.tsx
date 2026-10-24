import { useEffect, useState } from "react";

/** Small copy-to-clipboard button that confirms with a toast. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1800);
    return () => clearTimeout(t);
  }, [done]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setDone(true); } catch { /* clipboard unavailable */ }
  };
  return (
    <>
      <button type="button" onClick={copy} aria-label={`Copy ${label}`} title={`Copy ${label}`} className="grid size-6 shrink-0 place-items-center rounded-md text-[#5b6673] hover:bg-white hover:text-[var(--brand-blue)]">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
      </button>
      {done && <span className="toast" role="status">Copied {label}</span>}
    </>
  );
}
