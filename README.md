# GDG on Campus — CITech Website

Light-themed React + Vite website for GDG on Campus at Cambridge Institute of Technology.

## Run locally

1. Install Node.js (LTS).
2. From this folder, run `npm install`.
3. Run `npm run dev`.
4. Open the localhost URL printed in the terminal.

## Current sections

- Home and About
- Five domain pages, each prepared for one lead and three team members
- Core leadership cards, future domain-lead placeholders, and an Advisors section with Faculty Advisor (to be confirmed) and Student Counselor
- Events and workshops: select an event card to open a detailed view with overview, date, venue, highlights, topics, requirements and available photos
- ZYNEX partner section with clickable sponsor logos and links to official websites
- Sponsor-friendly Contact Us section with a Gmail web-compose enquiry flow for sponsorship, events, workshops and general enquiries
- Community call to action and footer

## Updating event content

Event content is currently stored in the `eventItems` array in `src/App.jsx`. Each event has fields for title, type, date, time, venue, description, highlights, topics, and optional photos. Add or update gallery paths in the `images` array.

Photos used by event galleries live in `public/events/zynex/`, `public/events/pulsex/` and `public/events/embedded-systems/`. The KubeAce workshop speaker photo is in `public/events/kubernetes/`. Cover artwork for events without a photo gallery lives in `public/event-covers/`. Keep each image path rooted at `/`, e.g. `/events/pulsex/img-1.jpg`.

The event dates and information were brought forward from the previous website and should be checked by the club before a public launch. The Cloud Study Jam and Flutter Forward cover artwork has been adjusted so the titles do not overlap the illustrations. Sponsor logos were extracted from the ZYNEX poster supplied by the club; replace these with high-resolution brand assets if the partners provide them. Sponsor cards link to the corresponding organization websites.

The Contact Us email card opens Gmail in a new tab with `gdsc@cambridge.edu.in` as the recipient. The form validates required fields, then opens Gmail Compose with the subject and form details pre-filled. If the browser blocks a new tab, it falls back to opening Gmail in the current tab. Visitors must review and send the draft themselves; the website does not send or store form data. Direct website submission would require a hosted form service or backend.

## Project checks

- `npm run dev` — local development
- `npm run build` — production build
- `npm run lint` — ESLint

Do not commit `.env` files, API keys, access tokens, or other secrets.

## Visual polish layers

- `src/styles/visual-polish.css` adds subtle Google-colour dividers, low-contrast background geometry, faint dot patterns, and very slow floating-ring details.
- `src/styles/next-pass.css` refines the hero underline, adds the compact community ribbon beneath the hero, and makes About, Leadership and Advisors use full-width section bands with a consistent centered content grid.
- Mobile layout adjustments keep the hero illustration and ribbon readable at narrow widths. The navigation includes a keyboard-accessible skip link and the mobile menu is wired to its navigation region.

The design intentionally avoids a mascot, heavy 3D effects, and constant movement. CSS animations and transitions respect `prefers-reduced-motion`.

## Final local checks

Before deployment, run `npm run build` and `npm run lint` on your machine. Confirm the site at desktop width and narrow mobile widths (320–390 px), including the menu, domain detail pages, event detail modal, sponsor links, and Contact Us form.


## Updated logo

The uploaded updated GDG mark is used in the navigation, hero visual, footer, and browser favicon. Navigation/footer pair the symbol with a compact text lockup so the brand remains clear without stretching the mark. Sponsor logos and event photos are intentionally unchanged.

## Hero artwork refresh

The right-hand hero illustration now uses a compact “community canvas” composition instead of floating cards arranged on orbital rings. It combines a lightweight branded panel, GDG-colour motifs, and small technology tiles; the new composition does not use orbital rings. The effect is CSS/SVG/icon-based rather than a large video or 3D scene, and mobile breakpoints plus reduced-motion preferences are accounted for.

## Latest logo update

- `public/favicon.png` uses the uploaded standalone GDG mark and is linked with a cache-busting query in `index.html`.
- `public/gdg-cit-wordmark.png` uses the uploaded horizontal “Google Developer Groups / Cambridge Institute of Technology” wordmark in the top-left navigation.
- `public/gdg-cit-logo.png` uses the uploaded standalone mark for mark-only placements (such as the hero visual and footer).
