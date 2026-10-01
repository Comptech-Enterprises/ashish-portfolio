# Ashish Lalwani — Dubai Real Estate Portfolio

Animated portfolio site for **Ashish Lalwani**, Dubai real estate advisor at **Right Homes Real Estate** ("Always the right investment."). It has a light, blue-accented look, a skyline-drawing preloader, a parallax Dubai skyline hero, scroll-driven sections, and a live UAE property search.

## Table of contents

1. [Tech stack](#tech-stack)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [Scripts](#scripts)
5. [Pages and sections](#pages-and-sections)
6. [Property search](#property-search)
7. [Animation system](#animation-system)
8. [Theming and styling](#theming-and-styling)
9. [Editing content](#editing-content)
10. [Project structure](#project-structure)
11. [Accessibility and performance](#accessibility-and-performance)
12. [Deployment](#deployment)
13. [Known gaps and notes](#known-gaps-and-notes)

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | [React](https://react.dev) 19, TypeScript (strict) |
| Styling | Plain CSS in `src/app/globals.css` using CSS variables (no Tailwind) |
| Fonts | `next/font/google`: Cormorant Garamond (display), Manrope (body) |
| Linting | ESLint 9 with `eslint-config-next` (core-web-vitals + TypeScript) |
| Data | Apify "Property Finder" scraper actor, called from a Next route handler |
| Hosting | Vercel |

No animation library is used. Every effect is hand-written with `IntersectionObserver`, `requestAnimationFrame`, CSS transitions and CSS keyframes.

> Next.js 16 has breaking changes from earlier versions. If you change routing, config or data fetching, check the docs shipped in `node_modules/next/dist/docs/` before relying on older patterns.

## Quick start

Requires Node 20 or newer (developed on Node 26).

```bash
git clone git@github.com-work:Comptech-Enterprises/ashish-portfolio.git
cd ashish-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The preloader plays on first load, then the page unlocks.

## Environment variables

Create `.env.local` in the project root. It is git-ignored.

| Variable | Required | Purpose |
| --- | --- | --- |
| `APIFY_TOKEN` | Only for `/properties` | Token used by `/api/properties` to run the Apify actor |

If `APIFY_TOKEN` is missing, `GET /api/properties` returns `500 {"error":"Search is not configured."}`. The rest of the site works without it.

On Vercel, add `APIFY_TOKEN` under Project Settings, Environment Variables. Never expose it with a `NEXT_PUBLIC_` prefix.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build and type check |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Pages and sections

### `/` Home

Sections render in this order (`src/app/page.tsx`):

| Section | Component | Notes |
| --- | --- | --- |
| Preloader | `Preloader` | Blue skyline outline draws itself, name and progress bar fill, then the screen lifts away |
| Navigation | `Navbar` | Sticky, blurs on scroll, hides when scrolling down, circular-reveal mobile menu |
| Hero | `Hero` | Headline reveals line by line, soft sun glow, twinkling sparkles, three parallax skyline layers plus a tower |
| Marquee | `Marquee` | Tilted looping ticker: Residential, Commercial, Investment, Off-plan, Resale, Rentals. Pauses on hover |
| About | `About` | Arched portrait with 3D tilt, rotating "Dubai Real Estate" badge, bio, value chips |
| Stats | `Stats` | Count-up numbers (43K followers, 323 posts, 6 areas, 3 sectors) |
| Services | `Services` | Residential, Commercial, Investment cards with self-drawing icons and a cursor spotlight |
| Areas | `Areas` | Pinned section where vertical scroll drives a horizontal strip of six Dubai areas |
| Process | `Process` | Four-step timeline with a line that fills as you scroll |
| Community | `Community` | Instagram call-to-action and a phone mockup with floating tiles |
| Contact | `Contact` | Large masked headline, links to Instagram and ashishlalwani.com |
| Footer | `Footer` | Outlined giant "LALWANI" that fills on hover |

### `/properties` Property search

Reuses the preloader, scroll and pointer effects, navbar and footer, and adds the search form and results (`src/components/PropertySearch.tsx`).

## Property search

Flow:

1. The form in `PropertySearch` collects emirate, minimum bedrooms, minimum price and maximum price.
2. It calls `GET /api/properties?mode=forSale&emirate=dubai&...`.
3. The route handler (`src/app/api/properties/route.ts`) validates the input, then calls the Apify actor `crawlerbros~property-finder-scraper` through `run-sync-get-dataset-items` with a 60 second timeout.
4. The response `{ items: PropertyListing[] }` is rendered as cards.

### `GET /api/properties`

| Query param | Values | Default | Validation |
| --- | --- | --- | --- |
| `mode` | `forSale`, `forRent` | `forSale` | Anything else falls back to `forSale` |
| `emirate` | `dubai`, `abu-dhabi`, `sharjah`, `ajman`, `ras-al-khaimah`, `fujairah`, `umm-al-quwain`, or empty | `dubai` | Checked against an allow list |
| `minBedrooms` | Integer 0 or more | not set | Ignored if not an integer |
| `minPrice` / `maxPrice` | Number above 0 | not set | Ignored if not a positive number |

Results are capped at 20 items (`MAX_ITEMS`). Each `PropertyListing` has: `propertyId`, `title`, `description`, `propertyType`, `offeringType`, `price`, `currency`, `bedrooms`, `bathrooms`, `areaSqft`, `furnished`, `fullAddress`, `city`, `community`, `agentName`, `brokerName`, `listingUrl`, `listedDate`.

Error responses:

| Status | When |
| --- | --- |
| 500 | `APIFY_TOKEN` not set |
| 502 | Apify returned a non-OK response |
| 504 | The request failed or timed out |

## Animation system

All motion lives in a few small client components, so the server-rendered sections stay light.

| Piece | File | What it does |
| --- | --- | --- |
| Preloader | `components/Preloader.tsx` | Runs a 2.3 s progress loop, then sets `data-ready` on `<html>`. CSS uses that attribute to lift the loader and start the hero entrance |
| ScrollFx | `components/ScrollFx.tsx` | One throttled scroll handler (via `requestAnimationFrame`) for the progress bar, nav state, sky fade, parallax layers, the pinned horizontal areas strip and the process line |
| PointerFx | `components/PointerFx.tsx` | Lagging custom cursor with labels ("View", "Drag"), magnetic buttons, 3D tilt with spotlight. Only active on devices with hover |
| Reveal | `components/Reveal.tsx` | Fades or slides content in once visible. Variants: `up`, `left`, `right`, `scale`, `mask` |
| CountUp | `components/CountUp.tsx` | Eased number counter that starts when scrolled into view |

Hooks into the DOM are data attributes, so you can add effects to new markup without new JavaScript:

| Attribute | Effect |
| --- | --- |
| `data-parallax="0.2"` | Moves the element with scroll. Positive drifts slower, negative faster |
| `data-magnet` | Button follows the cursor slightly |
| `data-tilt` | 3D tilt and spotlight on hover |
| `data-cursor="Label"` | Enlarges the cursor and shows the label |

Notes for contributors:

- The `mask` reveal clips an inner wrapper. A fully clipped element reports zero intersection, so the observed node must stay unclipped. Keep that structure if you change `Reveal`.
- The hero star positions use a deterministic formula so server and client markup match. Do not replace it with `Math.random()`.
- `ScrollFx` looks up elements by id (`#progress`, `#nav`, `#sky`, `#areasTrack`, `#areasMeter`, `#steps`, `#stepsFill`). Keep those ids if you restructure the markup.

## Theming and styling

Everything is in `src/app/globals.css`. Colors are CSS variables on `:root`:

| Variable | Value | Use |
| --- | --- | --- |
| `--bg` | `#f4f9ff` | Page background |
| `--bg-2` | `#e4efff` | Alternate surface |
| `--surface` | `#ffffff` | Cards and light sections |
| `--text` | `#0b1f44` | Body text |
| `--blue` | `#2563eb` | Primary accent |
| `--blue-2` | `#60a5fa` | Secondary accent |
| `--sky-blue` | `#bcd8ff` | Soft highlights |
| `--deep` | `#0b1f44` | Dark fills, button hover |

Fonts are exposed as `--font-cormorant` and `--font-manrope` by `layout.tsx` and mapped to `--serif` and `--sans`.

To retheme, change the variables, then check the hard-coded blues in the skyline layers (`.layer--1/2/3`, `.tower`), the stats gradient and the area card colors in `lib/content.ts`.

## Editing content

| What | Where |
| --- | --- |
| Name, company, tagline, Instagram and website links | `SITE` in `src/lib/content.ts` |
| Navigation | `NAV` |
| Marquee words | `MARQUEE` |
| Stats | `STATS` |
| Services (title, text, icon path) | `SERVICES` |
| Dubai areas (name, text, two gradient colors, skyline path) | `AREAS` |
| Process steps | `STEPS` |
| Bio text and chips | `src/components/About.tsx` |
| Hero copy | `src/components/Hero.tsx` |
| Instagram figures in the phone mockup | `src/components/Community.tsx` |
| Portrait | Replace `public/assets/ashish.jpg` |
| Page title and social preview | `metadata` in `src/app/layout.tsx` |

Stats and Instagram numbers (43K followers, 323 posts, 1,633 following) were taken from the public Instagram profile and will drift over time. Update them by hand.

## Project structure

```
.
├── public/assets/            # Static images (ashish.jpg)
├── legacy/                   # Earlier static HTML/CSS/JS version, kept for reference
├── src/
│   ├── app/
│   │   ├── api/properties/   # GET handler that queries Apify
│   │   ├── properties/       # Property search page
│   │   ├── globals.css       # Theme, layout and animation styles
│   │   ├── layout.tsx        # Fonts, metadata, root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── Hero, Marquee, About, Stats, Services, Areas,
│   │   │   Process, Community, Contact, Footer, Navbar   # Sections
│   │   ├── Preloader, ScrollFx, PointerFx, Reveal, CountUp # Effects
│   │   └── PropertySearch.tsx                             # Search UI
│   └── lib/content.ts        # All site copy and data
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json             # Path alias: @/* -> src/*
└── vercel.json
```

## Accessibility and performance

- Under `prefers-reduced-motion: reduce`, animations and transitions are turned off, reveals show immediately and the pinned areas strip becomes a normal horizontally scrollable row.
- The custom cursor and hover effects only run on devices that support hover.
- Decorative elements (marquee, rotating badge, preloader) are `aria-hidden`.
- Most sections are server components. Only the effect components and the search form ship client JavaScript.
- Scroll work is batched with `requestAnimationFrame`, and parallax skips elements far outside the viewport.
- Fonts are self-hosted by `next/font` with `display: swap`.

## Deployment

The project is set up for [Vercel](https://vercel.com):

1. Import the GitHub repo.
2. Add `APIFY_TOKEN` in the environment variables.
3. Deploy.

`vercel.json` currently sets `git.deploymentEnabled.main` to `false`, so pushes to `main` do **not** auto-deploy. Remove that setting or deploy manually from the Vercel dashboard or CLI.

## Known gaps and notes

- No contact form, phone number, email or WhatsApp link yet. Contact buttons go to Instagram and ashishlalwani.com.
- Instagram images and reels are not pulled in. The Community section uses a styled mockup.
- The Areas list, service copy and process steps are generic wording, not taken from the client's site. Review them with Ashish.
- The property search UI is fixed to `forSale`. The API already supports `forRent` if you add a toggle.
- Search results come from a third-party scraper, so they can be slow (up to 60 s) and are not guaranteed to be current or complete. Each search runs the actor and may use Apify credits.
- The Apify token is sent to Apify in the request URL from the server. It never reaches the browser.
- There are no automated tests yet. Use `npm run lint` and `npm run build` before pushing.
