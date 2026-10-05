import { whatsappLink } from "@/data/site";
import { WhatsAppGlyph } from "@/components/SocialIcons";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-13 items-center justify-center rounded-full bg-secondary text-white shadow-lift transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      style={{ width: "3.25rem", height: "3.25rem" }}
    >
      <WhatsAppGlyph className="size-7" />
    </a>
  );
}

export function WhatsAppButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] ${className}`}
    >
      <WhatsAppGlyph className="size-4.5" />
      Chat on WhatsApp
    </a>
  );
}
