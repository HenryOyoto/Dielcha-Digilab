import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { services } from "@/data/site";

export function ServiceAccordion({ initial = null }: { initial?: string | null }) {
  const [open, setOpen] = useState<string | null>(initial);

  return (
    <div className="space-y-4">
      {services.map((s) => {
        const expanded = open === s.slug;
        return (
          <article
            key={s.slug}
            className={`overflow-hidden rounded-xl border bg-card shadow-card transition-colors ${
              expanded ? "border-primary" : "border-border"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : s.slug)}
              aria-expanded={expanded}
              className="flex w-full items-center gap-4 p-4 text-left sm:gap-6 sm:p-5"
            >
              <img
                src={s.image}
                alt=""
                aria-hidden
                loading="lazy"
                width={160}
                height={160}
                className="hidden size-20 shrink-0 rounded-lg object-cover sm:block"
              />
              <span className="min-w-0 flex-1">
                <span className="label-mono text-accent">{s.number}</span>
                <span className="mt-1 block font-display text-base font-semibold leading-snug sm:text-lg">
                  {s.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{s.short}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
                <span className="hidden lg:inline">{expanded ? "Close" : "View Details"}</span>
                {expanded ? <Minus className="size-5" /> : <Plus className="size-5" />}
              </span>
            </button>

            {expanded && (
              <div className="border-t border-border bg-muted/50 p-5 sm:p-6">
                {/* Tag labels hidden on the website:
<div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="label-mono rounded-md border border-border bg-card px-2 py-1 text-[0.65rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
*/}

                <p className="mt-5 text-sm text-muted-foreground">{s.overview}</p>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="label-mono text-primary">What we do</h4>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {s.capabilities.slice(0, 6).map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="label-mono text-primary">Typical deliverables</h4>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="label-mono text-primary">Who it is for</h4>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {s.audience.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-muted-foreground">{s.requirement}</p>
                  </div>
                </div>

                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="mt-6 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
                >
                  {s.ctaLabel}
                </Link>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
