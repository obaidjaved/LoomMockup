# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/vanilla JS, no build step. GSAP + ScrollTrigger + Lenis are vendored locally (`/vendor`) rather than loaded from a CDN — a CDN dependency turned out to be a real failure mode (an ad-blocker or firewall silently blocking the scripts kills every animation while the rest of the page renders fine), so the page carries its own copies instead. This is explicit in the client's own brief (Section 2): fastest to spin up, easiest to hand off as a single file or static-host link for review, no framework overhead the mockup doesn't need.

## Users

Two audiences, in sequence:

1. **Immediate reviewer (Phase 1):** the studio's principal/owner (the "client" in the build discussion), reviewing this mockup on both desktop and mobile to approve the pinned-image scale-to-fullscreen motion pattern and overall site feel before anyone touches the real Divi/WordPress build.
2. **Eventual end audience (what the real site, once ported to Divi, is designed to persuade):** prospective residential architecture/interiors clients — people commissioning bespoke homes or renovations — evaluating the studio's portfolio, taste, and credibility.

## Product Purpose

This is a disposable Phase 1 motion/design spec, not the final codebase. Its only job is to let the client see and feel the site's structure and its signature scroll choreography — especially the pinned image → scale-to-fullscreen effect with parallax and staggered text reveal — on both desktop and mobile, before the pattern is committed to the real CMS build.

Phase 2 (explicitly out of scope for this deliverable): the approved GSAP timeline/logic gets ported into a Divi Code Module, with DiviMotion handling simple non-pinned entrance animations elsewhere. Do not build anything Divi-specific here.

## Positioning

Quiet luxury editorial, not SaaS-energetic: huge confident display type, generous whitespace, warm neutral photography, slow and deliberate scroll-driven motion (architecture-magazine spread meets modern portfolio — Kinfolk/Cereal/Snøhetta/Studio McGee register). The mechanism that differentiates it from a generic animated landing page is scroll-scrubbed, pinned GSAP choreography (image scale tied to scroll progress, parallax layering, mid-pin staggered text) rather than simple on-scroll fade-ins.

## Operating Context

- Reviewed by the client directly in a browser, on both desktop and mobile — no server, account, or build step required.
- Must be shareable as a single file or a quick static-host link (Netlify drop, CodePen, etc.).
- Code should stay copy-paste-portable: the GSAP timeline/logic for the pinned effect is expected to move into a Divi Code Module largely as-is in Phase 2, so keep it self-contained rather than deeply entangled with page-specific plumbing.

## Capabilities and Constraints

- Static only — no CMS, no backend, no forms that submit anywhere real.
- Pinned/scrubbed ScrollTrigger effects run on desktop (≥769px). Mobile must NOT use `pin` — pinning is unpredictable with mobile browsers' dynamic viewport/address-bar resizing. Mobile gets a lighter fade/scale reveal instead, gated through a GSAP `matchMedia` split, confirmed via this session's scope decision (see Product Principles).
- Respect `prefers-reduced-motion` — all GSAP calls short-circuit to instant end-states.
- Target Lighthouse performance ≥90 despite the animation load.
- The aesthetic leans low-contrast by design intent; body text must still clear WCAG AA.
- Placeholder copy and testimonials; photography is real (client-supplied stock/reference photos matched to content, not the studio's actual projects — see Evidence on Hand). All of it is swappable before this is a real marketing claim. Do not fabricate real client names, real testimonials, or real project outcomes.
- Studio brand name is a placeholder invented for this build (not the benchmark site's name/assets) — see Brand Commitments.

## Brand Commitments

No real studio identity exists yet. Placeholder brand for this build: **"Loam Atelier"** — a boutique residential architecture/interiors studio, distinct from the benchmark reference's own brand name/assets per the client's explicit instruction not to reuse those. Flagged throughout as swappable.

## Evidence on Hand

Real architectural/interior photography, client-supplied (`Demo website images.zip`, 39 stock/reference photos), now placed by content fit: e.g. an actual courtyard-house exterior for "The Courtyard House," a wood-panelled kitchen for "The Ash Apartment," a linen-bedding bedroom for "The Linen Room," a construction-measuring stock photo for the renovation-planning journal entry, a materials flat-lay for the materials journal entry. None of these depict the real studio's real projects — they are stand-ins chosen for a strong content match, not the studio's own work, and must be swapped for actual project photography before this is a real marketing claim. Project names, quotes, and the studio name itself remain placeholders.

## Product Principles

1. Motion is the product being evaluated, not decoration on top of it — every scroll-triggered section should read as the same choreographic "language" as the pinned test section (confirmed this session: exact same pattern applied everywhere the content allows), not a softer imitation of it.
2. Editorial confidence over density — big type, restraint, whitespace; when in doubt, cut rather than add.
3. Never let the CMS destination leak into Phase 1 — no Divi markup, shortcodes, or WordPress assumptions in this deliverable.
4. Desktop gets the full pinned/scrubbed experience; mobile gets an intentionally designed lighter equivalent, never a broken or disabled one.
5. Everything content-shaped (studio name, project names, quotes) is a labeled placeholder, not a fabricated real-world claim; supplied stock/reference photography is a stand-in for real project photography, not itself a claim about the studio's actual work.

## Accessibility & Inclusion

WCAG AA contrast on all body text (flagged risk given the intentionally low-contrast palette). Full `prefers-reduced-motion` support. Visible focus states on all interactive elements.
