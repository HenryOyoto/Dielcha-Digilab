import { useState } from "react";
import { workflowSteps } from "@/data/site";

const tones = ["blue", "green", "yellow", "red", "black"] as const;
const toneColor: Record<(typeof tones)[number], string> = {
  blue: "var(--brand-blue)",
  green: "var(--brand-green)",
  yellow: "var(--brand-yellow)",
  red: "var(--brand-red)",
  black: "#0b0f17",
};

export function ProcessSteps() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : workflowSteps[active];

  return (
    <div>
      <h2 className="display-title text-center">
        Idea <span aria-hidden="true">→</span>
        <span className="sr-only"> to </span> <span className="grad-text">Product</span>
      </h2>

      <div className="steps mt-10">
        {workflowSteps.map((step, i) => {
          const tone = tones[i % tones.length];
          return (
            <button
              key={step.title}
              type="button"
              className={`step step--${tone}`}
              aria-expanded={active === i}
              aria-controls="step-detail"
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className="step__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="step__label">{step.title}</span>
            </button>
          );
        })}
      </div>

      <div id="step-detail" aria-live="polite">
        {current && active !== null && (
          <div key={active} className="step-panel" style={{ borderLeftColor: toneColor[tones[active % tones.length]] }}>
            <p className="font-display text-lg font-extrabold text-[#12344f]">{current.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{current.text}</p>
          </div>
        )}
        {!current && <p className="mt-4 text-center text-xs text-muted-foreground">Tap a step to see what happens.</p>}
      </div>
    </div>
  );
}
