import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { brand } from "@/data/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy | ${brand.name}` },
      { name: "description", content: `Privacy policy for ${brand.name}.` },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-9 sm:px-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          DIELCHA DIGILAB collects the information you provide through the enquiry form: name,
          email, phone number, project description and any uploaded files, solely to respond to
          and evaluate your enquiry.
        </p>
        <p className="mt-4 text-muted-foreground">
          We do not sell, share or publish your information. Project files are treated as
          confidential. You can request deletion of your information at any time by contacting{" "}
          {brand.email}.
        </p>
        <p className="mt-4 text-muted-foreground">
          This policy is kept intentionally short. If you have questions about how your data is
          handled, contact us directly.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
