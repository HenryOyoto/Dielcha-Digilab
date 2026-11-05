import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { ServiceCards } from "@/components/ServiceCards";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [{ title: "Services - Dielcha Digilab" }, { name: "description", content: "Electronics and PCB design, embedded systems and IoT, product CAD and technical documentation from Dielcha Digilab." }] }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="green" crumbs={[{ label: "Services" }]} title="Services" intro="PCB design, embedded systems, product CAD and documentation." />
        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <ServiceCards />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
