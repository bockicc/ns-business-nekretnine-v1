# NS Nekretnine — Implementation Plan

## Identity
- Brand: NS Business Consulting (Nikola Bibovski PR Konsalting Usluge, Novi Sad)
- Real-estate vertical nickname: "Carstvo nekretnina" — crown glyph ♛ + Freedom Bridge motif
- Direction: Editorial Navy & Bridge Gold — deep navy #061A30 base, restrained gold #B08D3F accent,
  Fraunces display serif + Inter UI, square-to-subtle corners, shallow navy-tinted shadows.
  Explicitly NOT: generic AI aesthetics, glassmorphism, blue-600 gradients, pill-shaped cards.

## Routes
| Route | File | Purpose |
| --- | --- | --- |
| `/` | routes/index.tsx | Hero + QuickSearch dock, value proposition band, featured properties, agency trust |
| `/nekretnine` | routes/nekretnine.tsx (layout) + nekretnine.index.tsx | Catalog with URL-synced filters |
| `/nekretnine/:slug` | routes/nekretnine.$slug.tsx | Detail view: gallery, spec matrix, map, agent card, related |
| `/oglasite-nekretninu` | routes/oglasite-nekretninu.tsx | 3-step submission wizard (5.000 RSD / 30 dana) |
| `/kontakt` | routes/kontakt.tsx | Contact matrix, lazy map, lead form |

## Milestones
1. Tokens + domain model + mock data (18 listings, Novi Sad neighborhoods)
2. UI primitives styled against the token system
3. Layout shell (header/drawer/footer/back-to-top)
4. Catalog pipeline (filter state ↔ URL sync ↔ React Query)
5. Detail view (gallery/lightbox/spec matrix/lazy map/sticky agent card)
6. Lead capture + submission wizard (validation in Serbian)
7. Assets (bridge hero, map preview, crown/empty-state SVGs, favicon)
