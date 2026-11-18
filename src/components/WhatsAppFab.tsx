import { WhatsAppLink } from "@/components/ContactLinks";
import { WhatsAppGlyph } from "@/components/SocialIcons";

/** Floating WhatsApp button, bottom right on every page. */
export function WhatsAppFab() {
  return (
    <WhatsAppLink className="wa-fab" label="Chat with Dielcha Digilab on WhatsApp">
      <WhatsAppGlyph className="size-8" />
    </WhatsAppLink>
  );
}
