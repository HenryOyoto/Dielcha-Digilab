import { ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { EmailLink, WhatsAppLink } from "@/components/ContactLinks";
import { GitHubGlyph, WhatsAppGlyph, YouTubeGlyph } from "@/components/SocialIcons";
import { githubLink, youtubeLink } from "@/data/site";

function Card({ icon, title, text, tone }: { icon: ReactNode; title: string; text: string; tone: string }) {
  return (
    <>
      <span className={`ccard__icon ccard__icon--${tone}`}>{icon}</span>
      <span className="ccard__text">
        <strong>{title}</strong>
        <span>{text}</span>
      </span>
      <ArrowUpRight className="ccard__go size-5" aria-hidden="true" />
    </>
  );
}

/**
 * Ways to get in touch. The email address and phone number are not shown anywhere:
 * the Email and WhatsApp cards build their links in the browser (see src/lib/contact.ts).
 */
export function ContactCards({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className={`ccards ${onDark ? "ccards--dark" : ""}`}>
      <EmailLink className="ccard ccard--wide" subject="Project enquiry">
        <Card tone="blue" icon={<Mail className="size-6" />} title="Write us an email" text="Send the details, files or questions whenever it suits you." />
      </EmailLink>
      <WhatsAppLink className="ccard">
        <Card tone="green" icon={<WhatsAppGlyph className="size-6" />} title="Chat on WhatsApp" text="Quick questions and quick answers." />
      </WhatsAppLink>
      <a className="ccard" href={youtubeLink} target="_blank" rel="noreferrer">
        <Card tone="red" icon={<YouTubeGlyph className="size-6" />} title="Watch on YouTube" text="Free tutorials made for learning." />
      </a>
      <a className="ccard ccard--wide" href={githubLink} target="_blank" rel="noreferrer">
        <Card tone="ink" icon={<GitHubGlyph className="size-6" />} title="See our code" text="Open projects and source files on GitHub." />
      </a>
    </div>
  );
}
