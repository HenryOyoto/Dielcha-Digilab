import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, type CSSProperties, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { WhatsAppGlyph } from "@/components/SocialIcons";
import { Avatar } from "@/components/Avatars";
import { services, brand, WHATSAPP_NUMBER } from "@/data/site";

export const Route = createFileRoute("/start-a-project")({
  head: () => ({ meta: [{ title: "Start a Project | Dielcha Digilab" }, { name: "description", content: "Send your product or project requirements to Dielcha Digilab and continue on WhatsApp or by phone." }] }),
  component: StartProjectPage,
});

const inputClass = "w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "mb-1 block text-[0.8rem] font-bold text-[#12344f]";
const serviceOptions = [...services.map((s) => ({ value: s.slug, label: s.title })), { value: "other-work", label: "Something else (other discipline or software)" }];
const steps = ["Share requirements, files or photographs", "We review and agree the scope", "Continue on WhatsApp or by phone"];

function StartProjectPage() {
  const search = useSearch({ strict: false }) as { service?: string };
  const [selected, setSelected] = useState(search.service ?? "");
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "call">("whatsapp");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => ((form.get(k) as string) ?? "").trim();
    if (contactMethod === "call") { window.location.href = `tel:${brand.phone}`; return; }
    const serviceLabel = serviceOptions.find((o) => o.value === selected)?.label || "Not specified";
    const lines = [
      "Hello Dielcha, I'd like to start a project.", "",
      `Name: ${get("name")}`, `Phone: ${get("phone")}`, `Service: ${serviceLabel}`,
      `Project Description: ${get("description")}`, `Objective: ${get("objective")}`, `Timeline: ${get("timeline")}`, `Budget: ${get("budget")}`,
    ];
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="green" crumbs={[{ label: "Start a project" }]} title="Start a project" intro="Tell us what you are building, improving or documenting. An early idea is enough to start." />
        <section className="mx-auto max-w-5xl px-4 section sm:px-6">
          <div className="grid gap-4 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-5">
            <aside className="min-w-0 space-y-4 md:sticky md:top-20 md:self-start">
              <div className="card-s p-4">
                <div className="flex items-center gap-2.5">
                  <Avatar kind="engineer" size={40} label="" />
                  <p className="font-display text-base font-extrabold leading-tight text-[#12344f]">What happens next</p>
                </div>
                <ol className="flow mt-3" style={{ "--tone": "var(--brand-green)" } as CSSProperties}>
                  {steps.map((t) => <li key={t} className="!text-[0.82rem]">{t}</li>)}
                </ol>
              </div>
              <p className="rounded-xl bg-[var(--paper)] px-3.5 py-3 text-[0.8rem] leading-5 text-[#4a5866]">Need a website, dashboard, app or API alongside hardware? Ask for it here too. Projects from other disciplines are welcome.</p>
            </aside>

            <form onSubmit={onSubmit} className="card-s min-w-0 space-y-3.5 p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setContactMethod("whatsapp")} className={`rounded-lg border px-3 py-2 text-sm font-bold ${contactMethod === "whatsapp" ? "border-secondary bg-secondary/10 text-secondary" : "border-input text-muted-foreground"}`}><WhatsAppGlyph className="mr-1.5 inline size-4" />WhatsApp</button>
                <button type="button" onClick={() => setContactMethod("call")} className={`rounded-lg border px-3 py-2 text-sm font-bold ${contactMethod === "call" ? "border-primary bg-primary/10 text-primary" : "border-input text-muted-foreground"}`}><Phone className="mr-1.5 inline size-4" />Phone</button>
              </div>
              <div>
                <label htmlFor="service" className={labelClass}>Service</label>
                <select id="service" value={selected} onChange={(e) => setSelected(e.target.value)} className={inputClass}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div><label htmlFor="name" className={labelClass}>Name</label><input id="name" name="name" required className={inputClass} /></div>
                <div><label htmlFor="phone" className={labelClass}>Phone</label><input id="phone" name="phone" required className={inputClass} /></div>
              </div>
              <div><label htmlFor="description" className={labelClass}>Project description</label><textarea id="description" name="description" required rows={3} className={inputClass} /></div>
              <div><label htmlFor="objective" className={labelClass}>Objective <span className="font-normal text-muted-foreground">(optional)</span></label><textarea id="objective" name="objective" rows={2} className={inputClass} /></div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div><label htmlFor="timeline" className={labelClass}>Timeline</label><input id="timeline" name="timeline" className={inputClass} /></div>
                <div><label htmlFor="budget" className={labelClass}>Budget</label><input id="budget" name="budget" className={inputClass} /></div>
              </div>
              <button type="submit" className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold ${contactMethod === "whatsapp" ? "bg-secondary text-white" : "bg-primary text-primary-foreground"}`}>
                {contactMethod === "whatsapp" ? <><WhatsAppGlyph className="size-4" />Continue on WhatsApp</> : <><Phone className="size-4" />Call us now</>}
              </button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
