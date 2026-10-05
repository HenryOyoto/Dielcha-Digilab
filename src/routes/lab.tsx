import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { articles, resources } from "@/data/site";
import bgLab from "@/assets/bg-lab.jpg";

export const Route = createFileRoute("/lab")({
  head: () => ({ meta: [{ title: "DIELCHA LAB | Engineering Resources & Technical Notes" }, { name: "description", content: "Engineering checklists, worksheets and technical notes from DIELCHA DIGILAB." }] }),
  component: LabPage,
});

function LabPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero image={bgLab} title="Technical notes and engineering resources" intro="Practical engineering references covering PCB design, hardware and embedded development." tone="green" />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold">Free engineering resources</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Practical checklists and worksheets with their own detailed pages and download buttons.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Link key={resource.slug} to="/lab/resources/$slug" params={{ slug: resource.slug }} className="group rounded-xl border border-border bg-card p-5 shadow-card hover:-translate-y-1 hover:shadow-lift">
                <span className={`text-xs font-semibold ${resource.format === "PDF" ? "text-destructive" : "text-secondary"}`}>{resource.format}</span>
                <h3 className="mt-2 font-display font-semibold">{resource.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Open resource <ArrowRight className="size-4 group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 className="text-3xl font-bold">Technical Notes</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Three focused notes covering PCB workflow, power-rail thinking and ESP32 prototyping.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <Link key={article.slug} to="/lab/articles/$slug" params={{ slug: article.slug }} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card hover:shadow-lift">
                  <div className="aspect-[4/3] overflow-hidden"><img src={article.image} alt={article.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{article.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read note <ArrowRight className="size-4 group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
