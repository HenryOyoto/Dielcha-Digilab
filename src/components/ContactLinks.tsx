import type { MouseEvent, ReactNode } from "react";
import { defaultWhatsappMessage, mailtoUrl, readContact, useContact, whatsappUrl } from "@/lib/contact";

type Props = { className?: string; children: ReactNode; label?: string };

/**
 * Email link. Until the page has loaded in the browser the link points at the enquiry page,
 * so the address is never part of the server-rendered HTML.
 */
export function EmailLink({ className, children, label, subject = "Project enquiry" }: Props & { subject?: string }) {
  const contact = useContact();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (contact) return;
    e.preventDefault();
    window.location.href = mailtoUrl(readContact(), subject);
  };
  return (
    <a href={contact ? mailtoUrl(contact, subject) : "/start-a-project"} onClick={onClick} className={className} aria-label={label}>
      {children}
    </a>
  );
}

/** WhatsApp link, built in the browser in the same way as EmailLink. */
export function WhatsAppLink({ className, children, label, text = defaultWhatsappMessage }: Props & { text?: string }) {
  const contact = useContact();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (contact) return;
    e.preventDefault();
    window.open(whatsappUrl(readContact(), text), "_blank", "noopener,noreferrer");
  };
  return (
    <a
      href={contact ? whatsappUrl(contact, text) : "/start-a-project"}
      target={contact ? "_blank" : undefined}
      rel="noreferrer"
      onClick={onClick}
      className={className}
      aria-label={label}
    >
      {children}
    </a>
  );
}
