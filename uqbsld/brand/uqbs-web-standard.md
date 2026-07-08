# UQBS Web Standard

*The house style for standalone HTML pages published to the school GitHub and served from `teach.business.uq.edu.au`. Version 1. This is the companion to the UQBS Blackboard HTML Standard: same brand, different delivery. The Blackboard standard governs fragments pasted into an Add HTML block; this one governs whole pages we host ourselves.*

## What this covers, and what it shares

A standalone page owns everything a Blackboard fragment never could: the document head, the masthead, the footer, and its own asset strategy. Those are what this standard defines. The content layer, the components, colours, type, spacing and accessibility floor, is shared with the Blackboard system and is deliberately not duplicated here: the component set, its markup and its rules live in the UQBS Blackboard HTML Standard and the component library file, and every `uqbs-` class works identically on a standalone page. One brand, one component set, two delivery modes.

That sharing is enforced mechanically, not by good intentions. The shared stylesheet and script are generated from the same canonical CSS and JavaScript as the Blackboard foundation and interaction pack. A fix to a component lands in both systems from one source. The practical rule that follows: never edit component rules directly in `uqbs.css`; change the canonical files and regenerate. Additions to the web layer are new classes, never edits to existing ones, because a shared stylesheet that fixes every page at once also breaks every page at once.

## Architecture: shared files plus a survival core

Every page links two shared files from fixed, course-independent URLs on the school server:

```html
<link rel="stylesheet" href="https://teach.business.uq.edu.au/ld/uqbs/uqbs.css">
<script src="https://teach.business.uq.edu.au/ld/uqbs/uqbs.js" defer></script>
```

The URLs are canonical and unversioned, which is the point: one push updates every page. The layout is settled and the files never move: `uqbs.css`, `uqbs.js` and the page template live at the root of `/ld/uqbs/`. The `/ld/uqbs/brand/` folder is reserved for official UQ artwork if and when the DAM supplies it; nothing brand-owned ships until then, so pages carry no logo lockup and no favicon.

Every page also carries a small embedded style block, the survival core, in its own head. It holds the tokens, base typography, links, focus styles and a minimal page shell, with the same values as the shared stylesheet, so it changes nothing when both load. Its job is the day something goes wrong: if the shared stylesheet is ever unreachable, the page stays legible and recognisably UQ in type and colour. Components lose their polish; the content reads. Keep the core small and resist growing it into a second stylesheet, because two stylesheets is how drift starts.

The interactive layer inherits its survival story from the pack itself: every interactive component degrades to readable static content when the script never runs, so a missing `uqbs.js` quietens the page rather than breaking it.

`uqbs.css` has three sections in one file: web page furniture (`uqweb-` classes, defined only here), then the canonical foundation, then the canonical interaction pack styles. `uqbs.js` is byte-identical to the canonical pack script.

## Page anatomy

The template (`uqbs-web-template.html`) is the reference; copy it to start any new page. Its shape, top to bottom:

**Head.** `lang="en-AU"` on the html element. One unique `<title>` per page, most specific part first, ending in "UQ Business School". A one-sentence meta description. The shared stylesheet link, then the survival core. No favicon is set, since no approved shield artwork ships (see Masthead).

**Skip link.** The first element in the body, visually hidden until focused, jumping to `#main`.

**Masthead.** A white bar with a purple keel: on the left, a text wordmark reading "UQ Business School" that links to uq.edu.au; beside it, the site or module name linking to the site's own home. The wordmark is styled text, not artwork, so it sits under the same survival rule as everything else (styled text cannot 404) and holds up with or without the shared stylesheet. No logo lockup and no favicon are used. This is deliberate: approved UQ artwork comes only through the UQ DAM, and a self-extracted, redrawn or approximated lockup is not an acceptable substitute, however carefully made. The masthead stays on the text wordmark until DAM-supplied files are obtained; the `/ld/uqbs/brand/` folder is reserved for that artwork when it arrives. The permanent rule stands: only official DAM artwork, never redrawn, never recoloured, never cropped, never approximated, and until there is any, none.

**Main content.** A `<main id="main">` landmark holding the content card, wrapped in `<div class="uqbs">` so the shared components apply. Standalone pages own their `h1`, which goes in the page hero; headings below it nest in order. This differs from Blackboard fragments, which start at `h2` because Blackboard supplies the page title. Long pages take the on-page table of contents.

**Footer.** Purple, white text, three parts in fixed order. First the Acknowledgement of Country in UQ's published form: "The University of Queensland (UQ) acknowledges the Traditional Owners and their custodianship of the lands on which UQ operates. We pay our respects to their Ancestors and their descendants, who continue cultural and spiritual connections to Country." Then the provider line: copyright, CRICOS Provider 00025B, TEQSA Provider PRV12080. Then links: UQ's central terms of use and privacy pages, and a contact address for the owning team. The compliance elements are not optional and not editable per page; they are what makes an official-looking UQ page actually official.

## Third-party requests

None, with one named exception. No analytics, no tracking tags, no CDN scripts, no external libraries, regardless of how convenient. A tracking property on a university page is a privacy and governance question, and it gets a named approval before it gets a script tag. The one exception carried over from the Blackboard system is the Google Fonts import inside the shared stylesheet, kept for parity across both systems; the survival core's font stack falls back to Helvetica and Arial regardless, and self-hosting the font files on the school server is the sensible future step if that exception ever needs closing.

## Multi-page sites

A module with several pages keeps everything under one folder, with `index.html` as the entry, relative links between pages, and media in a `media` subfolder. Every page carries the full anatomy above; there are no partial pages that borrow a masthead from somewhere else. The masthead's site name links to the folder's index on every page, so students always have a way back.

## Accessibility

The shared floor applies as it does in Blackboard: contrast as specified in the component standard, meaning never resting on colour alone, real headings in order, visible focus, meaningful alt text, descriptive links, keyboard-operable interactive components. Full pages add their own obligations: the skip link, the `header`, `main` and `footer` landmarks, the language attribute, one `h1` per page, and a unique title per page. All of it is in the template already; the work is not removing it.

## Publishing checklist

Before pushing to the school GitHub: swap every REPLACE comment in the template, including the contact address. Open the page locally and check it renders. Temporarily block or rename the stylesheet link and check the page still reads on the survival core alone, then restore it. Click every link, including the footer's. If the page has interactive components, work each one by keyboard. Push, then confirm the live page on `teach.business.uq.edu.au`, since the mirror is the version students get.

## Status

The masthead uses a text wordmark; no logo lockup or favicon is included, and none will be until the DAM supplies approved artwork (see Masthead). The accent values are confirmed against the UQ Brand Guidelines, January 2026 (gold PMS 465 #BB9D65; aqua PMS 7703 #00A2C7), but confirmed against the guidelines is not the same as signed off by Marketing for external display, which is still needed before the accents appear on a public page. On deployment: nothing is live yet. The shared-file layout is decided (`/ld/uqbs/` for the shared files), but `uqbs.css` and `uqbs.js` are not on the server, so any page linking them currently runs on its survival core alone; standing up `/ld/uqbs/` with the shared files is the first deployment step. Per page, set the contact address in the footer. The first page due against this standard is the rebuild of the assessment guidelines site.
