# Dielcha Digilab

The website for Dielcha Digilab: electronics and PCB design, embedded systems and IoT, product CAD and
technical documentation, plus free tutorials on [YouTube](https://www.youtube.com/@DielchaDigilab).

## Development

You need Node.js or Bun installed.

```sh
bun install
bun run dev
```

Other scripts: `bun run build`, `bun run preview`, `bun run lint`, `bun run format`.

## Built with

- TanStack Start (React, file-based routing)
- TypeScript
- Tailwind CSS 4

## Where things live

| What | Where |
| --- | --- |
| Pages | `src/routes` (one file per page) |
| Reusable pieces (header, footer, hero, cards) | `src/components` |
| Page text: services, case studies, notes, checklists | `src/data/site.ts` |
| Every image used on the site | `src/data/images.ts` (files are in `src/assets`, grouped by purpose) |
| Tool logos and the toolbox groups | `src/data/tools.ts` and `src/assets/tools` |
| Colours, spacing and component styles | `src/styles.css` |
| Downloads for the Lab | `public/resources` |

## Contact details

The email address and phone number are **not written anywhere in the page markup**. They are stored in
pieces in `src/lib/contact.ts`, put back together in the visitor's browser after the page loads, and used
only for the Email and WhatsApp buttons. To change them, replace the encoded pieces in that file (in a
browser console, `btoa("new value")` gives the encoded text).

## Tool logos

To add a tool, drop its logo into `src/assets/tools`, add an entry in `src/data/tools.ts`, and add its key
to a group in `toolGroups` (and to a service's `tools` list in `src/data/site.ts` if it belongs there).
