import { useEffect, useState } from "react";

/**
 * The email address and phone number are never written into the page markup.
 * They are stored here in pieces, put back together in the visitor's browser after
 * the page has loaded, and used only to build mailto: and wa.me links.
 *
 * To change them, replace the encoded pieces below. In a browser console,
 * btoa("new value") gives the encoded text; split it into short pieces if you like.
 */
const EMAIL_PARTS = ["ZGllbGNoYS5k", "aWdpbGFiQGdt", "YWlsLmNvbQ=="];
const PHONE_PARTS = ["MjU0NzE1OTI0", "NDQ4"];

export type Contact = { email: string; phone: string };

const decode = (parts: string[]) => (typeof atob === "function" ? atob(parts.join("")) : "");

export const readContact = (): Contact => ({ email: decode(EMAIL_PARTS), phone: decode(PHONE_PARTS) });

export const defaultWhatsappMessage = "Hello Dielcha Digilab, I would like to talk about a project.";

export const mailtoUrl = (c: Contact, subject = "Project enquiry", body = "") =>
  `mailto:${c.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const whatsappUrl = (c: Contact, text = defaultWhatsappMessage) =>
  `https://wa.me/${c.phone}?text=${encodeURIComponent(text)}`;

/** Returns null on the server and on the first render, so the details never appear in the HTML. */
export function useContact(): Contact | null {
  const [contact, setContact] = useState<Contact | null>(null);
  useEffect(() => setContact(readContact()), []);
  return contact;
}
