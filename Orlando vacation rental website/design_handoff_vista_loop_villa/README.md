# Handoff: Vista Loop Villa — Vacation Rental Marketing Site

## Overview
A modern, responsive marketing website for a luxury 4-bedroom vacation rental villa in
Davenport, Orlando (Vista Park Resort). The site promotes the property and lets prospective
guests browse photos, check live availability, request to book, explore the area, read
reviews, and contact the hosts. It is a single-property site (not a multi-listing platform).

Seven pages, all client-side navigation (no full page reloads):
**Home, Gallery, Availability, Location, Reviews, About, Contact.**

The Home page ships in **two interchangeable hero directions** ("Editorial" and "Resort"),
toggled by a control and also exposed as a configuration flag.

## About the Design Files
The file in this bundle (`Vista Loop Villa.dc.html`) is a **design reference created in
HTML** — a working prototype that shows the intended look, layout, copy, and behavior. It is
**not production code to copy directly**. The `.dc.html` format is a self-contained prototype
runtime; you should **not** reproduce that runtime.

Your task is to **recreate this design in the target codebase's environment** using its
established patterns and libraries. If there is no existing codebase, the recommended stack is
**Next.js (App Router) + React + TypeScript**, with plain CSS Modules or Tailwind — a simple
static/SSG marketing site. Each "page" below should become a real route. The interactive
availability calendar is the only piece with non-trivial client-side logic.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all
specified. Recreate the UI pixel-faithfully using the codebase's libraries. Exact hex values,
font sizes, and measurements are given in **Design Tokens** and per-component below.

---

## Global Layout & Chrome

### Page shell
- `min-height: 100vh`, vertical flex column: sticky header → `main` (flex:1) → footer.
- Content max width **1180px**, centered, horizontal padding **32px** (drops to **20px**
  at ≤880px via the `[data-pad]` hook).
- Body font **Hanken Grotesk**; display/headings **Cormorant Garamond** (serif, weight 600).
- Page background **#ffffff**; alternating warm-sand section background **#f7f3ec**.

### Header (sticky, z-index 50)
- Height **74px**. Background `rgba(255,255,255,0.86)` with `backdrop-filter: blur(10px)
  saturate(140%)`. Bottom border **1px #ecebe6**.
- Left: logo = a **30×30px** rounded square (radius 8px, background **#bd6a44**) with a white
  serif "V", followed by "Vista Loop Villa" in Cormorant Garamond 20px. Logo click → Home.
- Center nav (desktop): Home, Gallery, Availability, Location, Reviews, About, Contact.
  Links are Hanken 15px, color **#2c2723** (weight 500); the active link is **#bd6a44**
  weight 600 with a **2px solid #bd6a44** bottom border. Gap 28px.
- Right: "Book your stay" pill button — background **#bd6a44**, white, radius 999px,
  padding 11px 22px, 14.5px/600. Click → Availability.
- **Mobile (≤880px):** center nav and the pill hide; a hamburger button appears (three
  22×2px bars, #2c2723). Tapping it opens a full-width dropdown panel below the header with
  the nav items stacked (16px, 11px vertical padding each) plus the "Book your stay" pill.
  Selecting any item closes the menu.

### Footer
- Background **#2a231d** (warm near-black), text **#d8cfc2**, top padding 60px.
- Three+ columns (flex, wrap, `[data-split]` stacks them at ≤880px):
  1. Logo (same lockup, white text) + tagline: "A luxury 4-bedroom villa with a private
     heated pool in Davenport, Orlando, 15 minutes from Disney." (color #a89e90)
  2. "Explore" column — uppercase label #8a8073 12px/0.16em; links (Gallery, Availability,
     Location & area, Reviews) #d8cfc2 14.5px, each navigates client-side.
  3. "Contact" column — same label style; lines: `stay@vistaloopvilla.com`,
     `+1 (407) 555-0148`, `Davenport, FL 33897`.
- Divider (1px #3d342c) then fine print: "© 2026 Vista Loop Villa · Vista Park Resort,
  Davenport, Florida" (#8a8073, 13px).

---

## Screens / Views

### 1. Home
**Purpose:** First impression; sell the property and route to Availability/Gallery.

The hero has **two directions**, selected by a fixed bottom-right pill toggle
("Home style: Editorial / Resort") and by the `homeStyle` flag (`'A'` = Editorial default,
`'B'` = Resort). Everything below the hero is shared between both directions.

**Hero A — Editorial** (max-width container, padding 72px top):
- Two-column flex, gap 56px, stacks at ≤880px (`[data-hero]`).
- Left column:
  - Eyebrow "DAVENPORT · ORLANDO, FLORIDA" — 12.5px, uppercase, letter-spacing 0.22em,
    **#bd6a44**, weight 600.
  - H1 "Your home away from home, minutes from the magic." — Cormorant Garamond 600,
    `clamp(38px, 5vw, 60px)`, line-height 1.04, letter-spacing -0.01em, **#2a231d**.
  - Paragraph (18px/1.6, **#6f655c**, max-width 480px): "A luxury 4-bedroom villa with a
    private heated pool in a gated resort community, just 15 minutes from Walt Disney World.
    Sleeps 8 in airy, light-filled comfort."
  - Two buttons (flex, gap 14px): primary "Check availability" (bg #bd6a44, white, radius
    999px, padding 15px 30px, 15.5px/600 → Availability); secondary "View the gallery"
    (white bg, 1px #ddd2c2 border, #2c2723 → Gallery).
  - Rating line: gold stars `★★★★★` (#c2a36b, letter-spacing 2px) + "**4.9** · 47 guest
    reviews" (14.5px, #6f655c).
- Right column: image placeholder, `aspect-ratio: 4/3`, radius 20px. **In production, replace
  with a real `<img>`** (hero pool/villa exterior). See Assets.

**Hero B — Resort** (immersive full-bleed):
- Full-width band, height `clamp(460px, 68vh, 640px)`, background = the hero photo with a
  dark overlay `linear-gradient(180deg, rgba(42,30,22,.20), rgba(42,30,22,.50))`.
- Centered stack (max-width 760px): eyebrow (#f0e2d6), H1 "Where your Orlando story begins."
  (white, Cormorant 600, `clamp(40px, 6vw, 66px)`), paragraph (#f3ebe2), white "Book your
  stay" button (#2c2723 text).
- A **booking quick-bar** card overlaps the bottom of the hero (margin-top -46px, max-width
  1000px): white, radius 18px, shadow `0 18px 50px -24px rgba(22,43,64,.32)`, with four cells
  — Check in, Check out, Nights (all static display "Select dates" / "Flexible"), and a
  "Check availability" button (#bd6a44) → Availability. Stacks at ≤880px.

**Shared sections below the hero (both directions):**
1. **Stats strip** — 5 items in a flex row, top+bottom 1px #ecebe6 borders, 28px vertical
   padding. Each: big Cormorant number/word (34px, #2a231d) over a 13.5px #6f655c label —
   "4 Bedrooms", "4 Bathrooms", "8 Sleeps", "Heated Private pool", "Gated Community".
2. **Features** (background #f7f3ec, 80px padding): eyebrow "WHY GUESTS LOVE IT" + H2
   "Everything you need for an easy Orlando trip." Then a responsive grid
   (`repeat(auto-fit, minmax(280px, 1fr))`, gap 22px) of 3 white cards (radius 18px,
   1px #ece6da, padding 34px). Each card: a 34×34px rounded swatch (#f0dccd), Cormorant 22px
   title, 15px/1.6 #6f655c body. Titles/copy:
   - "Spacious & private" — "Four en-suite bedrooms and open living spaces give everyone room
     to spread out, perfect for families or two couples traveling together."
   - "Resort-style pool" — "Unwind in your own screened, heated pool after a long day at the
     parks, sunshine without the crowds, lizards, or queues."
   - "Ideal location" — "Fifteen minutes to Disney, close to championship golf, outlet
     shopping, and restaurants, all from a quiet gated street."
3. **Gallery preview** (80px padding): heading row "A PEEK INSIDE" + H2 "Light, airy, and
   made for relaxing." with a "View full gallery →" text button (#bd6a44) → Gallery. Below, a
   **mosaic grid**: `grid-template-columns: repeat(4, 1fr)`, `grid-auto-rows: 200px`, gap
   14px. First tile spans 2 cols × 2 rows; four more 1×1 tiles. Each tile is an image
   placeholder (radius 16px) → real photos in production.
4. **Location preview** (background #f7f3ec, 80px): two-column (`[data-split]`), gap 48px.
   Left = **live Google Map** (see Interactions), `aspect-ratio: 16/11`, radius 18px, 1px
   #ddd3c4 border. Right = eyebrow "PERFECTLY PLACED" + H2 "Close to everything, away from the
   noise." + a 4-row distance list (each row: place name #2c2723 15.5px, time #bd6a44 15px/600,
   1px #e6ddcd divider): Walt Disney World 15 min, ChampionsGate golf 10 min, Universal Orlando
   30 min, Orlando Int'l Airport (MCO) 35 min. Then "Explore the area →" → Location.
5. **Reviews preview** (80px): centered heading "GUEST REVIEWS" + H2 "Loved by families and
   golfers alike." Then `repeat(auto-fit, minmax(290px, 1fr))` grid of 3 white quote cards
   (radius 18px, 1px #ecebe6, padding 30px): gold stars, a Cormorant 18px/1.55 #2b3a4c quote,
   then "**Name** · City, ST". (3 sample reviews — see Reviews page for the full set.)
6. **CTA band** (bottom, 90px padding): a #bd6a44 rounded block (radius 24px, padding
   64px 56px), flex space-between, wraps. Left: white Cormorant H2 "Ready for your Orlando
   getaway?" + #f0ddd0 paragraph "Check the live calendar and send a request, we usually reply
   within a few hours." Right: white "Check availability" button → Availability.

**Floating toggle** (Home only): fixed bottom-right (20px), white pill (radius 999px, shadow),
label "Home style" + two segmented buttons "Editorial" / "Resort". Active button = #bd6a44 bg
white text; inactive = white bg #2c2723 text.

### 2. Gallery
**Purpose:** Browse the property in detail.
- Eyebrow "GALLERY" + H1 "Take the tour" + intro paragraph "Replace these placeholders with
  your professional photos, drop them in and the layout adapts automatically." *(This intro is
  guidance copy for the prototype — replace with real marketing copy in production.)*
- Three labeled groups, each an H3 (Cormorant 24px) over a responsive grid
  (`repeat(auto-fit, minmax(240px, 1fr))`, gap 14px, tiles `aspect-ratio: 4/3`, radius 16px):
  - **Pool & outdoor** — 4 tiles (Heated pool, Screened lanai, Sun loungers, Exterior)
  - **Living & kitchen** — 3 tiles (Living room, Kitchen, Dining table)
  - **Bedrooms & baths** — 4 tiles (Primary suite, Kids' room, Guest room, En-suite bath)
- All tiles are placeholders in the prototype → real photos in production. Consider a lightbox
  on click (not in the prototype, but a natural enhancement).

### 3. Availability
**Purpose:** Show open dates and submit a booking request. **No pricing, no guest count are
shown anywhere** — this was an explicit product decision.
- Eyebrow "AVAILABILITY" + H1 "Check dates & request to book" + intro "Pick your check-in and
  check-out dates below, then send a request, we'll confirm your stay by email, usually within
  a few hours."
- Two columns (`[data-split]`, gap 32px, stacks ≤880px):
  - **Calendar card** (flex 1.3, white, radius 20px, 1px #ecebe6, padding 28px):
    - Header row: prev `‹` / next `›` buttons (38×38px, radius 10px, 1px #e2ddd3) flanking the
      month label (Cormorant 21px, e.g. "July 2026"). Prev is disabled (greyed, no pointer)
      when viewing the current month (June 2026).
    - Weekday header: 7-col grid, "Su Mo Tu We Th Fr Sa" (11.5px/600 #94a0ae).
    - Day grid: 7-col grid, gap 2px. Each cell 42px tall, centered, 14px, radius 10px. States:
      - Available: white bg, #2c2723 text, pointer.
      - Past / booked: greyed (#cdd2d9 / #b3bac3), booked also strike-through on #f1f1ee, no
        pointer.
      - Selected start/end: bg **#bd6a44**, white, weight 600.
      - In-range (nights between start and end): bg **#f3e3d9**, #bd6a44 text, square corners.
    - Legend row (1px #f0eee9 top border): Selected (#bd6a44), Your stay (#f3e3d9), Available
      (white + border), Booked (#f1f1ee).
  - **Summary card** (flex 1, bg #f7f3ec, 1px #ece6da, radius 20px, padding 30px):
    - H3 "Your stay" (Cormorant 24px).
    - A check-in / check-out pair (single bordered pill split in two, 1px #e2ddd3, radius 13px):
      each cell has an uppercase micro-label (#8a96a5) and the chosen date ("Jul 8") or
      "Select" when empty.
    - When both dates chosen: a "Length of stay" row (label #6f655c, value Cormorant 22px, e.g.
      "4 nights"). When not: helper text "Select your check-in and check-out dates on the
      calendar."
    - "Request to book" button (full width, radius 12px, 15.5px/600). Enabled = #bd6a44 white;
      disabled (no full range) = #d3c1b3.
    - On submit with a valid range: a green confirmation block (bg #e7f1ea, 1px #c7e0d2)
      "Request sent ✓ / Thanks! We'll confirm your dates by email within a few hours."
      On submit without a range: error text "Please select both check-in and check-out dates
      first." (#b4564b).

### 4. Location
**Purpose:** Orient guests and show proximity to attractions.
- Eyebrow "LOCATION & AREA" + H1 "Vista Park Resort, Davenport" + intro "A quiet, gated
  community on Vista Loop, central to the parks, golf, and everything Central Florida."
- **Live Google Map** band: radius 20px, 1px #ddd3c4, height `clamp(280px, 42vh, 420px)`
  (see Interactions for the embed).
- **Drive times** H2 + grid (`repeat(auto-fit, minmax(220px, 1fr))`, gap 14px) of 6 white
  cards (radius 16px, 1px #ecebe6, padding 24px): big Cormorant 30px **#bd6a44** time over a
  15px #2c2723 label — 15 min Walt Disney World, 10 min ChampionsGate golf, 30 min Universal
  Orlando, 20 min Outlet shopping, 6 min Publix grocery, 35 min Orlando Int'l (MCO).
- **What's nearby** section (bg #f7f3ec): H2 + grid of 4 white cards (Cormorant 21px title +
  15px/1.6 body): Theme parks, Championship golf, Dining & shopping, Nature & springs (copy in
  the source file).

### 5. Reviews
**Purpose:** Social proof.
- Eyebrow "REVIEWS" + H1 "What guests are saying".
- **Summary band** (bg #f7f3ec, radius 20px, padding 40px, `[data-split]`): left = big "4.9"
  (Cormorant 64px), gold `★★★★★`, "47 verified reviews"; right = five rating bars (rows "5★…1★"
  with a track #e6ddcd and a #bd6a44 fill at 90/8/2/0/0%).
- **Review cards** in a CSS multi-column layout (`columns: 2; column-gap: 22px`; each card
  `break-inside: avoid`, white, radius 18px, 1px #ecebe6, padding 28px): gold stars, Cormorant
  17px/1.55 quote, "**Name** · City, ST · Month Year". Six reviews in the source (Harrisons,
  Mark D., Priya & Sam, Nguyen family, Karen B., James & Olivia).

### 6. About
**Purpose:** Build trust with the hosts' story.
- Eyebrow "YOUR HOSTS" + H1 "Hospitality is personal here." + two-column (`[data-split]`,
  gap 48px): left = square host-portrait placeholder (radius 20px) → real photo; right = a
  Cormorant 19px lead paragraph, two 16px/1.7 #6f655c paragraphs, then a 3-card stat grid
  (#f7f3ec, radius 14px): "< 3 hrs Avg. reply time", "Local Hosts on call", "5 yrs Hosting
  guests". Copy in the source file.

### 7. Contact
**Purpose:** Direct inquiries.
- Eyebrow "CONTACT" + H1 "Questions? Get in touch." + two-column (`[data-split]`, gap 48px):
  - Left = a form (flex column, gap 16px): Name + Email on one row (`[data-split]`),
    Preferred dates (full width, placeholder "e.g. July 10–17"), Message textarea (required),
    and a "Send message" pill (#bd6a44). Inputs: 1px #d9d4ca, radius 11px, padding 13px 15px,
    15px. **Note: there is intentionally NO "Guests" field.** On submit, the form is replaced
    by a green thank-you block "Thanks for reaching out! / We've received your message and will
    reply within a few hours."
  - Right = a #f7f3ec contact-details card (radius 20px, padding 34px): H3 "Reach us directly"
    + Email `stay@vistaloopvilla.com`, Phone/WhatsApp `+1 (407) 555-0148`, Response time
    "Usually within a few hours", Address "Vista Loop, Vista Park Resort / Davenport, FL 33897".

---

## Interactions & Behavior

- **Routing:** single-app client navigation between the 7 views; scroll resets to top on each
  navigation. In a real Next.js build, make each view a real route (`/`, `/gallery`,
  `/availability`, `/location`, `/reviews`, `/about`, `/contact`) for SEO and shareable URLs.
- **Header active state:** the current route's nav link is highlighted (#bd6a44 + underline).
- **Mobile menu:** hamburger toggles a dropdown; selecting an item closes it.
- **Home hero toggle:** switches Editorial ↔ Resort hero instantly; the rest of the page is
  unchanged. Also driven by the `homeStyle` config flag (default Editorial).
- **Availability calendar logic** (the only stateful piece):
  - Month view starts at the next bookable month (July 2026 in the prototype; in production use
    the real current month). Prev/next shift the month; prev is blocked before the current
    month.
  - Click selection: first click sets check-in; a later valid click sets check-out. Clicking
    the same day clears it. Clicking an earlier day restarts from that day. If any **booked**
    night falls between the chosen check-in and a candidate check-out, the range is rejected
    and that click becomes the new check-in instead (you cannot book across a blocked night).
  - Past dates and a hardcoded set of booked dates are non-selectable. In production, **fetch
    real availability** (iCal/PMS/Airbnb/VRBO sync or your own DB) instead of the hardcoded set.
  - Nights = difference in days between check-out and check-in. No pricing is computed or shown.
  - "Request to book" requires a complete range; success shows an inline confirmation. **Wire
    this to a real backend** (email/API) — the prototype only simulates it.
- **Contact form:** required Name, Email, Message; on submit shows an inline thank-you. **Wire
  to a real handler** (email service / form backend); add real validation and spam protection.
- **Google Maps:** embedded via a keyless iframe:
  `https://maps.google.com/maps?q=Vista%20Loop%2C%20Davenport%2C%20FL%2033897&t=&z=14&ie=UTF8&iwloc=&output=embed`
  (`loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`). Used full-width on
  Location and 16:11 on the Home location preview. Swap to the Maps Embed/JS API with a key and
  the exact street address/pin for production.
- **Responsive:** fluid via `clamp()` type and `auto-fit` grids. Two explicit breakpoints at
  **≤880px** (`[data-hero]`, `[data-split]` switch to column; `[data-nav-links]` hide; show
  hamburger; reduce `[data-pad]` to 20px) and minor tweaks. Verify desktop, tablet, and phone.

## State Management
Local UI state only (no global store needed):
- `page` — current route/view.
- `menuOpen` — mobile nav open/closed.
- `homeStyle` / user override — `'A'` (Editorial) | `'B'` (Resort).
- `viewYear`, `viewMonth` — calendar month in view.
- `checkIn`, `checkOut` — selected dates (Date | null).
- `bookingStatus` — idle | sent | error.
- `contactSent` — form submitted flag.
Data needs in production: **availability data** (booked date ranges) for the calendar, and
**endpoints** for the booking request and contact form. Real photos for all image slots.

## Design Tokens

**Colors**
- Primary accent (terracotta): `#bd6a44`; darker hover: `#a4583a`
- Heading ink (warm near-black): `#2a231d`
- Body ink: `#2c2723`
- Secondary text: `#6f655c`; muted/UI label: `#8a96a5`
- Page background: `#ffffff`; warm-sand section bg: `#f7f3ec`; card sand: `#f1e8dc`
- Borders: `#ecebe6` (cool), `#ece6da` / `#e6ddcd` / `#e2ddd3` (warm), `#d9d4ca` (input)
- Footer: bg `#2a231d`, text `#d8cfc2`, muted `#a89e90` / `#8a8073`, divider `#3d342c`
- Gold (stars): `#c2a36b`
- Calendar: selected `#bd6a44`, in-range `#f3e3d9`, booked bg `#f1f1ee`, disabled text `#cdd2d9`
- Feature swatch tint: `#f0dccd`
- Success: bg `#e7f1ea`, border `#c7e0d2`, text `#1f6b46` / `#3a6b53`; error text `#b4564b`
- Placeholder image stripes (replace with photos): terracotta `#efe0d3`/`#e7d2c0`,
  neutral `#eef2f5`/`#e6ebef`

**Typography**
- Display/headings: **Cormorant Garamond** (Google), weights 400/500/600/700, used at 600.
  Sizes: H1 `clamp(34px, 4.6vw, 52px)` (hero up to 60–66px), H2 `clamp(28px, 3.4vw, 40px)`,
  H3 21–24px. Line-heights 1.02–1.1; H1 letter-spacing -0.01em.
- Body/UI: **Hanken Grotesk** (Google), 400/500/600/700. Body 15–18px/1.6; small 13–14.5px;
  micro-labels 10.5–12.5px uppercase, letter-spacing 0.14–0.24em.
- Monospace (placeholder captions only): system monospace.

**Spacing & shape**
- Container max 1180px (About/Contact 1080px), padding 32px (→20px mobile).
- Section vertical padding 80px (hero 72px). Card padding 24–34px.
- Radii: buttons/pills 999px; cards 16–20px; large blocks/CTA 18–24px; inputs 11–13px;
  small swatches 8–10px.
- Shadows: quick-bar `0 18px 50px -24px rgba(22,43,64,.32)`; floating toggle
  `0 10px 30px -12px rgba(22,43,64,.4)`.

## Assets
The prototype uses **no real images** — every photo is a striped placeholder with a monospace
caption naming what belongs there. Provide and wire real assets:
- Hero (pool & villa exterior) — used in both hero directions.
- Gallery: Heated pool, Screened lanai, Sun loungers, Exterior; Living room, Kitchen, Dining
  table; Primary suite, Kids' room, Guest room, En-suite bath.
- Home gallery-preview mosaic: Living room (large), Kitchen, Primary suite, Pool deck, Dining.
- About: host portrait (square).
- Stars are text glyphs (`★`); no icon set is required, though you may swap to an icon library.
- Fonts: Cormorant Garamond + Hanken Grotesk from Google Fonts (or self-host).
- Google Maps embed (keyless in the prototype; use an API key + exact pin in production).

## Screenshots
Reference captures are in `screenshots/` (the live Google Map renders blank in captures — it
works in a browser). Note these are top-of-page captures; scroll the live HTML for full pages.
- `01-home-editorial.png` — Home, Editorial hero (default)
- `02-home-resort.png` — Home, Resort hero variant
- `03-gallery.png` — Gallery
- `04-availability.png` — Availability (calendar + summary)
- `05-location.png` — Location & area
- `06-reviews.png` — Reviews
- `07-about.png` — About the hosts
- `08-contact.png` — Contact

## Files
- `Vista Loop Villa.dc.html` — the full design reference (all 7 views, the calendar logic, the
  two hero directions, and the live map embed). Open it in a browser to see intended behavior.
  Bundled alongside this README.
- `screenshots/` — reference images of each view.
