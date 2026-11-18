import type { ReactNode } from "react";

/** Section title with an optional short paragraph and a link or button on the right. */
export function SectionHead({ title, text, action, center = false }: { title: ReactNode; text?: ReactNode; action?: ReactNode; center?: boolean }) {
  return (
    <div className={`sec-head ${center ? "sec-head--center" : ""}`}>
      <div className="sec-head__text">
        <h2 className="h2">{title}</h2>
        {text && <p className="lead">{text}</p>}
      </div>
      {action}
    </div>
  );
}
