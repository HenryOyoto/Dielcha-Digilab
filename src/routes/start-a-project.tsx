import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ContactCards } from "@/components/ContactCards";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { SectionHead } from "@/components/SectionHead";
import { WhatsAppGlyph } from "@/components/SocialIcons";
import { mailtoUrl, readContact, whatsappUrl } from "@/lib/contact";
import { services } from "@/data/site";

export const Route = createFileRoute("/start-a-project")({
  head: () => ({
    meta: [
      { title: "Start a Project - Dielcha Digilab" },
      { name: "description", content: "Tell Dielcha Digilab about your idea. Send your product or project details by email or WhatsApp." },
    ],
  }),
  component: StartProjectPage,
});

const serviceOptions = [...services.map((s) => ({ value: s.slug, label: s.title })), { value: "other-work", label: "Something else (another discipline or software)" }];
const steps = ["Send us your idea, files or photos", "We read it and agree the scope with you", "We carry on by WhatsApp or email"];

type Method = "whatsapp" | "email";

function StartProjectPage() {
  const search = useSearch({ strict: false }) as { service?: string };
  const [selected, setSelected] = useState(search.service ?? "");
  const [method, setMethod] = useState<Method>("whatsapp");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => ((form.get(k) as string) ?? "").trim();
    const serviceLabel = serviceOptions.find((o) => o.value === selected)?.label || "Not sure yet";
    const lines = [
      "Hello Dielcha Digilab, I would like to start a project.",
      "",
      `Name: ${get("name")}`,
      `Service: ${serviceLabel}`,
      `About the project: ${get("description")}`,
      `What I want to achieve: ${get("objective")}`,
      `Timeline: ${get("timeline")}`,
      `Budget: ${get("budget")}`,
    ];
    // The contact details are only put together here, in the browser, at the moment of sending.
    const contact = readContact();
    if (method === "email") {
      window.location.href = mailtoUrl(contact, `Project enquiry from ${get("name") || "a new client"}`, lines.join("\n"));
    } else {
      window.open(whatsappUrl(contact, lines.join("\n")), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <PageShell>
      <PageHero
        tone="yellow"
        crumbs={[{ label: "Start a project" }]}
        title="Tell us your idea."
        intro="An early idea is plenty. Say hello whichever way you like, or fill in the short form below."
      />

      <section className="section start-contact">
        <div className="container-x">
          <SectionHead title={<>Reach us <span className="mark mark--blue">your way.</span></>} text="We read every message and reply personally." />
          <div className="section__body">
            <ContactCards />
          </div>
        </div>
      </section>

      <section className="section section--tint" id="form">
        <div className="container-x start-grid">
          <aside className="start-aside">
            <div className="card">
              <h2 className="card__title card__title--sm">What happens next</h2>
              <ol className="flow flow--list">
                {steps.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <p className="note">Need a website, dashboard, app or API alongside the hardware? Ask for it here too. Projects from other disciplines are welcome as well.</p>
          </aside>

          <form onSubmit={onSubmit} className="card form">
            <h2 className="card__title">Or send the details here</h2>
            <div className="form__methods" role="group" aria-label="How should we receive it?">
              <button type="button" aria-pressed={method === "whatsapp"} className="form__method" onClick={() => setMethod("whatsapp")}>
                <WhatsAppGlyph className="size-5" /> WhatsApp
              </button>
              <button type="button" aria-pressed={method === "email"} className="form__method" onClick={() => setMethod("email")}>
                <Mail className="size-5" /> Email
              </button>
            </div>

            <div className="field">
              <label htmlFor="service">What do you need?</label>
              <select id="service" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">Not sure yet</option>
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="description">Tell us about it</label>
              <textarea id="description" name="description" required rows={4} placeholder="What are you building, improving or documenting?" />
            </div>
            <div className="field">
              <label htmlFor="objective">What would a good result look like? <span>(optional)</span></label>
              <textarea id="objective" name="objective" rows={2} />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="timeline">Timeline <span>(optional)</span></label>
                <input id="timeline" name="timeline" />
              </div>
              <div className="field">
                <label htmlFor="budget">Budget <span>(optional)</span></label>
                <input id="budget" name="budget" />
              </div>
            </div>
            <button type="submit" className={`btn btn--lg ${method === "whatsapp" ? "btn--wa" : "btn--primary"}`}>
              {method === "whatsapp" ? (
                <>
                  <WhatsAppGlyph className="size-5" /> Continue on WhatsApp
                </>
              ) : (
                <>
                  <Mail className="size-5" /> Continue by email
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
