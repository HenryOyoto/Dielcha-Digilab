import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { brand } from "@/data/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy - ${brand.name}` },
      { name: "description", content: `Privacy policy for ${brand.name}.` },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero tone="blue" title="Privacy Policy" intro="Short, plain and honest." />
      <section className="section">
        <div className="container-x legal">
          <p>
            {brand.name} receives the information you choose to send us, for example through the form on the Start a project page, by email or on WhatsApp. That can include your name, your message,
            project details and any files you share. We use it only to reply to you and to understand what you need.
          </p>
          <p>
            We do not sell, share or publish your information, and project files are treated as confidential. You can ask us to delete your information at any time by getting in touch through any of
            the contact options on the Start a project page.
          </p>
          <p>This policy is kept short on purpose. If you have questions about how your information is handled, just ask.</p>
        </div>
      </section>
    </PageShell>
  );
}
