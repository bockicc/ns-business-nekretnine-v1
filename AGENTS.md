# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

NS Nekretnine — real-estate front-end for NS Business Consulting (Novi Sad).
TanStack Start + React 19 + TypeScript strict + Tailwind v4 + TanStack Query + Radix.
Package manager: **Bun**.

## Commands

```bash
bun install
bun run dev         # http://localhost:3000
bun run build
bun run typecheck   # tsc --noEmit — must pass before any hand-off
bun run lint        # eslint — must pass
bun run format
```

## Hard rules

1. **Never edit `src/routeTree.gen.ts`.** It is generated from `src/routes/` by the Vite plugin.
2. **No code comments.** Code is self-documenting; Serbian copy strings carry domain meaning.
3. **Design tokens only.** Colors/fonts/shadows come from `@theme` in `src/styles.css`
   (primary navy scale, gold scale, neutral scale, shadow-card/card-hover/sticky-nav/modal/focus-ring).
   Never hard-code hex values in components except the sanctioned WhatsApp `#25D366`
   and Viber `#7360F2` action buttons.
4. **Typography contract:** Fraunces = display headings/prices (`font-display`),
   Inter = everything else (`font-body`). Eyebrows are `text-xs uppercase tracking-[0.08em] font-semibold`.
5. **Radius discipline:** rounded-md (6px inputs/buttons), rounded-lg (8px cards/images),
   rounded-xl (modals only), rounded-full (badges/pills/avatar). Never 2xl/3xl cards.
6. **Copy is Serbian Latin (sr-RS).** Brand facts (phone, email, MB/PIB, account, socials)
   come exclusively from `src/data/site.ts`.
7. **Routing:** file-based under `src/routes/`; filters sync through URL search params
   validated by `filterSearchSchema` on the `/nekretnine` layout route.
8. **Data:** mock layer in `src/data/` surfaced through server functions in `src/server.ts`
   and `queryOptions` factories in `src/lib/propertyQueryOptions.ts`. No fetch to external APIs.
9. **Accessibility:** focus-visible ring everywhere, aria-invalid/describedby on form errors,
   aria-live for form status, alt text pattern `{title} — {scene}`, badges pair color + label.
10. `verbatimModuleSyntax` is on — use `import type` for type-only imports.
