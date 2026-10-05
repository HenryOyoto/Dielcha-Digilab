# DIELCHA DIGILAB website

## Tasks
- [x] Design system in src/styles.css (light, colourful, engineering)
- [x] Shared layout: header nav, footer, page hero with background image
- [x] Home: 4-image sliding hero, services, selected work, about, CTA
- [x] Services overview + 4 service detail pages
- [x] Work index (6 placeholder projects) + project detail template
- [x] About, Lab (6 placeholder cards), Start a Project form
- [x] Privacy Policy + Terms of Service
- [x] Logo (double-D with PCB traces, 3 pads), favicon, contact details, social links
- [x] Per-route head metadata

## Reorganization (complete)
- [x] Central content rewrite in src/data/site.ts (resources, tech strip, flows, chooser)
- [x] MERGE: 5 services → 4 cards. PCB Review/DFM is now a sub-service of Service 01 (Electronic Systems Design & PCB Engineering)
- [x] New components: ServiceAccordion, ServiceChooser, CapabilityStrip, SocialIcons, WhatsAppFab
- [x] Rewritten routes: services.index, services.$slug, work.index, work.$slug
- [x] Rewrite: index, about, lab, start-a-project
- [x] Header/Footer: WhatsApp CTA, SVG social icons; root: floating WhatsApp button

## Notes
- All project/article/resource entries are placeholders, flagged in src/data/site.ts
- Replaceable content lives in src/data/site.ts
