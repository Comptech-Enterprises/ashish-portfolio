# Ashish Lalwani — Dubai Real Estate Portfolio

Animated portfolio site for Ashish Lalwani, Dubai real estate advisor at Right Homes Real Estate. Light, blue-accented theme with a skyline-drawing preloader, parallax hero and scroll-driven sections.

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- TypeScript
- Plain CSS (`src/app/globals.css`), fonts via `next/font` (Cormorant Garamond, Manrope)
- ESLint

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

The live property search needs an Apify token. Create `.env.local`:

```
APIFY_TOKEN=your_token_here
```

Without it, `/api/properties` returns `Search is not configured.` and the rest of the site works normally.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Pages and Features

- `/` — preloader, parallax skyline hero, marquee, about, animated stats, services, pinned horizontal-scroll areas, process timeline, Instagram community block, contact.
- `/properties` — live UAE listings search (sale or rent, emirate, bedrooms, budget), backed by `GET /api/properties` which calls the Apify Property Finder scraper.
- Effects: custom cursor, magnetic buttons, 3D card tilt, scroll progress bar, reveal-on-scroll, count-up numbers. All motion is disabled under `prefers-reduced-motion`.

## Customising

- Copy, areas, services, stats and process steps: `src/lib/content.ts`
- Theme colors: CSS variables at the top of `src/app/globals.css` (`--bg`, `--text`, `--blue`, `--deep`)
- Portrait: replace `public/assets/ashish.jpg`

## Project Structure

```
src/
  app/
    api/properties/   # Listings search endpoint
    properties/       # Property search page
    layout.tsx        # Fonts and metadata
    page.tsx          # Home page
    globals.css       # Theme and animation styles
  components/         # Section components and effect hooks (Preloader, ScrollFx, PointerFx, Reveal, ...)
  lib/content.ts      # Site content
public/assets/        # Images
legacy/               # Earlier static HTML/CSS/JS version
```

## Deployment

Configured for [Vercel](https://vercel.com). Set `APIFY_TOKEN` in the project environment variables.
