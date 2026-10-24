import { useState, type FormEvent } from "react";
import { WHATSAPP_NUMBER } from "@/data/site";
import { WhatsAppGlyph } from "@/components/SocialIcons";

/** One-line enquiry that opens WhatsApp with the message pre-filled. */
export function QuickEnquiry() {
  const [text, setText] = useState("");
  const send = (e: FormEvent) => {
    e.preventDefault();
    const msg = text.trim() ? `Hello Dielcha Digilab, I would like to discuss: ${text.trim()}` : "Hello Dielcha Digilab, I would like to discuss a project.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };
  return (
    <form onSubmit={send} className="mx-auto flex w-full max-w-xl items-center gap-1.5 rounded-full bg-white p-1.5 shadow-lift">
      <label htmlFor="quick-idea" className="sr-only">Describe your idea</label>
      <input
        id="quick-idea" value={text} onChange={(e) => setText(e.target.value)} placeholder="Describe your idea in one line…"
        className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-[#12344f] outline-none placeholder:text-[#7b8794]"
      />
      <button type="submit" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#128c4a] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--brand-blue)]">
        <WhatsAppGlyph className="size-4" /> Send
      </button>
    </form>
  );
}
