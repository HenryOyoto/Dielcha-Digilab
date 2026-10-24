import { faqs } from "@/data/content";

export function Faq() {
  return (
    <div className="grid gap-2.5 md:grid-cols-2 md:items-start">
      {faqs.map((f) => (
        <details key={f.q} className="faq">
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
