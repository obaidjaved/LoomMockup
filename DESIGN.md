---
name: Loam Atelier
description: Quiet-luxury editorial architecture studio site built around one scroll-scrubbed signature moment
colors:
  bone: "#F5F2EC"
  ink: "#161412"
  charcoal-olive: "#2A2A24"
  acid-olive: "#B8C05A"
  stone: "#8C877D"
  stone-text: "#6E685D"
  muted-on-dark: "rgba(245,242,236,0.72)"
  hairline: "rgba(22,20,18,0.12)"
  hairline-on-dark: "rgba(245,242,236,0.16)"
typography:
  display:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(3rem, 8.4vw, 8.75rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.125rem, 5.4vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  eyebrow:
    fontFamily: "Archivo, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.15em"
  body:
    fontFamily: "Archivo, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "4px"
  md: "10px"
  lg: "20px"
  full: "50%"
spacing:
  outer-margin: "clamp(24px, 6vw, 120px)"
  section-pad: "clamp(72px, 14vw, 200px)"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "currentColor"
    typography: "{typography.label}"
  carousel-arrow:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.full}"
    size: "44px"
  carousel-arrow-hover:
    backgroundColor: "{colors.acid-olive}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "44px"
---

# Design System: Loam Atelier

## Overview

**Creative North Star: "The Slow Reveal"**

Loam Atelier is an editorial-magazine reading experience wearing a website's clothes: huge confident Anton display type, generous bone-colored whitespace, and warm material tones standing in for photography, paced by one deliberate cinematic mechanism rather than a library of small hover effects. The system exists to prove a single motion idea — a small, contained image scaling into full-bleed while pinned, cross-fading through content with staggered text keyed to scroll progress — and then to apply that same unhurried, scrubbed choreography everywhere the content allows (the Projects showcase and the Approach steps both pin and scrub; everything else breathes with the same eased, staggered reveal at a gentler amplitude).

This is explicitly a brief-pinned world: every color, face, and spacing value below was specified by the client's own brief and cross-checked against a live reference site rather than invented here. Confirmed visual rejections: no bouncy SaaS energy, no default AI-slop palette (warm-cream-plus-terracotta was avoided in favor of the brief's own bone/ink/acid-olive system), no icon-font or emoji glyphs (arrows are authored inline SVG).

**Key Characteristics:**
- One authored signature motion (pin → scale → parallax → staggered text), reused as the site's motion grammar rather than a one-off
- Numbered indices and eyebrow labels as a deliberate, pervasive wayfinding device (client-specified, not a default reach)
- Dark charcoal-olive sections punctuate bone sections at content-driven intervals, never by category habit
- Acid-olive spent sparingly: active-state accents, one hover fill, never a background field

## Colors

Warm, low-saturation, editorial — five roles doing all the work, deliberately without a bright "brand blue" anywhere in the system.

### Primary
- **Acid Olive** (#B8C05A): The system's only saturated color. Used for active-state accents only — the current Approach step's number, nav-hover underlines, the carousel arrow's hover fill, small "index" numerals inside the pinned showcase. Never a background field, never more than a few square inches of any viewport.

### Neutral
- **Bone** (#F5F2EC): The default page ground. Warm off-white, never pure white.
- **Ink** (#161412): Primary text and the footer's background. Warm near-black, never pure black.
- **Charcoal Olive** (#2A2A24): Secondary dark-section background (Projects showcase, Approach's pinned stage, Testimonials, menu overlay).
- **Stone** (#8C877D): Decorative/large-text-only warm gray — ghost numerals, borders-adjacent accents, anything ≥24px or already bold. At ~3.2:1 on bone it clears WCAG's 3:1 large-text floor but not the 4.5:1 body-text floor.
- **Stone Text** (#6E685D): The AA-safe body-copy variant of Stone for use on bone backgrounds (eyebrows, captions, paragraph text, meta lines) — same warm-gray character, darkened until it clears 4.5:1.
- **Muted on Dark** (rgba(245,242,236,.72)): The equivalent AA-safe muted text color for anything sitting on Ink or Charcoal Olive (footer links, testimonial attribution, carousel counter).

### Named Rules
**The Stone Split Rule.** Raw `--stone` never sets the color of actual body copy. It is reserved for elements at large-text scale (≥24px) or purely decorative marks; every paragraph, label, or caption uses `--stone-text` (on light) or `--muted-on-dark` (on dark) instead.

**The One Voice Rule.** Acid-olive marks state (active, hover, "you are here"). It never decorates a static element — a static olive accent would dilute what the color is for.

## Typography

**Display Font:** Anton (with Arial Narrow, sans-serif fallback)
**Body Font:** Archivo (with -apple-system, Segoe UI fallback)

**Character:** A condensed, all-caps, black-weight display face paired with a plain geometric grotesque body face — the pairing is deliberately asymmetric: the display face shouts once per section, the body face stays quiet and gets out of the way.

### Hierarchy
- **Display** (400, clamp(48px, 8.4vw, 140px), line-height 0.92): Hero headline only. Uppercase, tight tracking (-0.01em), split into per-line masked spans for the load-in reveal.
- **Headline** (400, clamp(34px, 5.4vw, 72px), line-height ~1.0): Section titles (Studio, Approach, Testimonials, About, Journal, CTA). Same face, one step down.
- **Statement** (400, clamp(30px, 5.4vw, 72px), line-height 1.1, centered, `--charcoal`): The Studio Intro's one-sentence claim only — matched to the real reference site's actual treatment (uniform heavy Anton, centered, dark olive), not a mixed-weight/italic split. Reserve this centered-statement pattern for a single load-bearing sentence, not general body copy.
- **Eyebrow/Label** (600, 12–13px, letter-spacing 0.15em, uppercase): The index-numbered tagline pattern used throughout — "The Studio," "Approach," "Words" — always paired with a heading, never standing alone.
- **Body** (400, 16–18px, line-height 1.6, max-width ~60ch): Paragraph copy. Archivo Regular.
- **Numbers/Index** (Anton, oversized or small-tracked): Project indices (001/002/003), approach step numerals (01–04), testimonial and pin-showcase counters ("01/03"). A graphic device, not incidental labeling.

### Named Rules
**The Split-Line Rule.** Any headline that animates on load or scroll splits per line (not per word) into an overflow-masked span, so the reveal reads as a curtain lifting rather than a typewriter.

## Layout

12-column implied grid via generous outer margins rather than an explicit grid container: `clamp(24px, 6vw, 120px)` outer margin scales from 24px on mobile to 120px on large desktop. Section vertical rhythm uses `clamp(72px, 14vw, 200px)` top/bottom padding. Content stays asymmetric by construction — text blocks and images are never centered against each other (About splits 1:1 but offset by the image's own aspect ratio; Journal is a plain 3-up grid; the pinned showcase's caption sits lower-left, never centered).

Breakpoints: mobile <768px, tablet 768–1024px (nav collapses to hamburger at 1024px), desktop ≥1025px. Below 769px every pinned/scrubbed effect is replaced by a plain fade/rise reveal — this is a stated product constraint (pinning is unpredictable against mobile browser chrome resizing), not a missing feature.

## Elevation & Depth

Flat by default — most surfaces carry no shadow at all. The one exception is the pinned showcase's image frame, which carries a soft, deep, blurred shadow (`0 40px 80px -20px rgba(0,0,0,.5)`) to sell it as a floating object during the scale-up; nothing else in the system uses a shadow this heavy.

### Shadow Vocabulary
- **pin-frame** (`box-shadow: 0 40px 80px -20px rgba(0,0,0,.5)`): The pinned/scaling showcase image only.
- **header-solid** (`backdrop-filter: blur(6px)` + `background: rgba(245,242,236,.92)`): A functional frosted transition for the header as it moves from transparent-over-photo to solid-over-content, not decorative glass.

### Named Rules
**The Flat-Unless-Floating Rule.** A surface earns a shadow only when it is meant to read as physically lifted off the page (the one pinned image). Cards, buttons, and containers stay flat.

## Shapes

Mostly square: buttons, hairline dividers, and grid cards carry no radius. The two exceptions are the pinned showcase's image frame (20px, easing to 0 as it fills the screen) and standard image containers (project rows, journal cards, about image — 4–10px), which stay just soft enough to read as a photograph's card rather than a UI panel corner.

## Components

### Buttons
- **Shape:** Square corners (0px), 1px solid border in `currentColor`.
- **Primary ("Start your project"):** Transparent fill, ink text/border; on hover, fills solid ink with bone text (`.header-cta:hover`).
- **Secondary (text links):** No button chrome at all — an underline in `currentColor` plus an inline SVG arrow that translates 6px on hover (`.text-link`, `.link-arrow`).

### Navigation
- **Style:** Uppercase Archivo label type, 15px, letter-spacing 0.08em (wordmark 22px). Default state uses `currentColor` (bone over the transparent hero, ink once the header solidifies) — the header's own `color` now flips explicitly between the two states rather than relying on child elements to each pick a light/dark variant, since an unset default meant nav text rendered dark-on-dark over the hero photo.
- **Hover:** A two-layer flip — the visible label translates up and out while an acid-olive duplicate (`::before`, `content: attr(data-flip-text)`) slides up into its place. Not a plain underline-wipe.
- **Mobile (<1025px):** Desktop nav links and the CTA/email hide; a two-bar hamburger opens a full-viewport charcoal-olive overlay with a numbered link list (01–06), each item staggering in on open (`y:40→0`, 0.06s stagger).

### Cards / Containers
- **Corner Style:** 4–10px depending on component (see Shapes).
- **Background:** The `.plate` gradient system — layered CSS gradients in the extended clay/sand/walnut/moss palette plus a subtle SVG-turbulence overlay at low opacity, standing in for photography until real project imagery replaces them.
- **Shadow Strategy:** None, except the pinned frame (see Elevation).

### Signature Component: The Pinned Showcase
A `position:fixed`-feeling (ScrollTrigger-pinned) stage that: (1) scales a small, centered, rounded image frame to full-bleed as the section pins; (2) cross-fades through three stacked `.plate` layers behind it, each tied to a scroll-progress window; (3) staggers in an index/title/description/link caption block per image, timed to start partway through that window rather than at its edge; (4) drives a subtle independent parallax layer behind the frame; (5) reports position via a small "01/03"-style counter. The Approach section reuses the same pin-and-scrub mechanic at a smaller scale (a fixed-height spotlight window swapping one step at a time) rather than inventing a second motion language.

## Do's and Don'ts

### Do:
- **Do** reuse the pin → scale/scrub → staggered-text recipe (or a fixed-window variant of it) for any future sequential content; it is the system's one authored signature, not a one-off.
- **Do** keep acid-olive to active/hover state only.
- **Do** use `--stone-text` / `--muted-on-dark`, never raw `--stone`, for any text below 24px.
- **Do** give a pinned/scrubbed section a fixed-height "spotlight" window when its content is a sequence (steps, projects) so no state can end up scrolled out of the pinned frame.

### Don't:
- **Don't** introduce a second saturated accent color; the One Voice Rule depends on there being exactly one.
- **Don't** add icon-font glyphs or emoji; every icon (arrows, the hamburger, the menu close) is CSS lines or authored inline SVG.
- **Don't** pin or scrub anything on a viewport under 769px; replace with the plain fade/rise reveal instead.
- **Don't** give a card or button a shadow "for depth" — this system conveys depth through scale and layering, not elevation, and reserves shadow for the one genuinely floating element.
