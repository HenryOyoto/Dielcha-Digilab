import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const KEY = "dielcha-nudge-dismissed";

/** One small, dismissible prompt shown once per visit after the visitor has had time to look around. */
export function ContactNudge() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) return; } catch { /* storage unavailable */ }
    const timer = setTimeout(() => setShow(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    try { sessionStorage.setItem(KEY, "1"); } catch { /* storage unavailable */ }
  };

  if (!show || pathname.startsWith("/start-a-project")) return null;

  return (
    <aside className="nudge" role="dialog" aria-label="Start a project">
      <button type="button" onClick={dismiss} aria-label="Dismiss" className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-muted">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <p className="pr-6 font-display text-base font-extrabold text-[#12344f]">Have a product or project in mind?</p>
      <p className="mt-1 text-sm leading-5 text-muted-foreground">Send the idea, files or a rough sketch and we will tell you how we can help.</p>
      <Link to="/start-a-project" onClick={dismiss} className="mt-3 inline-block rounded-full bg-[var(--brand-blue)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--brand-red)]">
        Start a project
      </Link>
    </aside>
  );
}
