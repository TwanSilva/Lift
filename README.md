# LIFT — Performance and Fitness

Website for LIFT, a personal & group training studio in Esposende, Portugal.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS v4, run with Bun.

## Develop

```bash
bun install
bun dev
```

Opens at `http://localhost:5173`.

## Build

```bash
bun run build
```

## Project structure

- `src/routes/index.tsx` — the homepage. All sections (`Header`, `Hero`, `Team`,
  `Services`, `Reviews`, `Visit`, `ContactSection`, `FinalCta`, `Footer`,
  `MobileCallBar`) live here as local components, along with the business
  constants (phone, address, hours, team, services, testimonials) at the top
  of the file.
- `src/lib/i18n.tsx` — the `pt`/`en` dictionary and `LanguageProvider` /
  `useLang()` hook. Language choice persists in `localStorage`.
- `src/components/icons.tsx` — shared inline SVG icons.
- `src/hooks/useReveal.ts` — scroll-reveal animation hook.

## Reusing this as a template

Swap `BUSINESS_NAME`, `PHONE_DISPLAY`/`PHONE_TEL`, `ADDRESS_LINE`,
`INSTAGRAM_*`, `GOOGLE_*`, `HOURS`, `SERVICES`, `TEAM`, and `TESTIMONIALS` in
`src/routes/index.tsx`, plus the `t` dictionary in `src/lib/i18n.tsx`, to
re-theme this for a different fitness client.
