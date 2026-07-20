# UQBS Blackboard Ultra: HTML Aesthetics Guide

*A house style and component library for HTML content in Blackboard Ultra, built on the UQ Design System and rebuilt to run without JavaScript. Pairs with the Functions Reference.*

## How this works

Everything here lives in one place: the **Add HTML block inside an Ultra Document**. That's the only surface in Blackboard Ultra that renders custom HTML and CSS (the Functions Reference covers why). Announcements, discussions and basic items give you the toolbar and nothing more, so they can't use any of this.

Five rules govern the whole system:

1. Build rich content as an Ultra Document, then add an HTML block.
2. Each HTML block is its own isolated iframe. It inherits nothing from the page or from other blocks, so paste the foundation stylesheet once at the top of every block that uses these components.
3. Wrap your content in `<div class="uqbs">…</div>` so the tokens and base styles apply.
4. No JavaScript. It's unreliable: it sometimes runs and sometimes doesn't, and can stop after a course copy. Every component here is CSS-only for that reason, so nothing depends on a script.
5. Purple leads. The state colours (blue, green, yellow, red) carry meaning in callouts; they aren't decoration.

**A note on JavaScript.** You may see JavaScript work inside a Blackboard HTML block; it can run there. But it doesn't run reliably. Whether it survives depends on the block, the browser and how the content was added, and it can stop after a course copy. So nothing here depends on it, and you shouldn't build anything that does. If something must be interactive, make sure it still reads as complete content when the script doesn't run. Some authors work around this by hosting a script elsewhere and calling it from the block. We don't recommend it: it moves the fragile part off UQ servers and breaks the self-contained rule that keeps this content alive across course copies. If you genuinely need interactivity, talk to Learning Design.

A note on the fonts, since someone will ask. The print brand guide names Gotham for headings, but Gotham is licensed and won't load on the open web. UQ's own Design System uses Montserrat as the web stand-in for Gotham, with Roboto for body. This guide follows the Design System, so the type matches UQ's actual websites rather than the print specification.

## The foundation stylesheet

Paste this once at the top of each Add HTML block, then add any components below it. It defines the UQ tokens, the base type, and every component class.

```html
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap');

.uqbs{
  /* Brand */
  --uq-purple:#51247a; --uq-purple-50:#eee9f2; --uq-purple-light:#962a8b;
  /* Neutrals */
  --uq-grey-900:#3b383e; --uq-grey-200:#dcdcdd; --uq-grey-50:#f3f3f4;
  --uq-white:#fff; --uq-black:#19151c;
  /* Semantic state colours (UQ Design System) */
  --uq-info:#0d6dcd;    --uq-info-50:#e7f0fa;
  --uq-success:#4aa74e; --uq-success-50:#edf6ed;
  --uq-warning:#f7ba1e; --uq-warning-50:#fef8e8;
  --uq-error:#d62929;   --uq-error-50:#fbeaea;
  /* Type */
  --uq-font-body:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
  --uq-font-head:'Montserrat',Helvetica,Arial,sans-serif;
  /* Spacing (8px system) */
  --uq-s-xs:4px; --uq-s-s:8px; --uq-s-m:16px; --uq-s-l:24px; --uq-s-xl:32px;
  --uq-radius:4px;
  font-family:var(--uq-font-body); font-size:16px; line-height:1.6; color:var(--uq-grey-900);
}
.uqbs *{box-sizing:border-box;}
.uqbs h2,.uqbs h3,.uqbs h4{font-family:var(--uq-font-head);color:var(--uq-purple);line-height:1.2;margin:0 0 var(--uq-s-m);}
.uqbs h2{font-size:32px;} .uqbs h3{font-size:24px;margin-top:var(--uq-s-xl);} .uqbs h4{font-size:20px;}
.uqbs p{margin:0 0 var(--uq-s-m);}
.uqbs p a,.uqbs li a,.uqbs figcaption a{color:var(--uq-purple);}
.uqbs :focus-visible{outline:2px solid var(--uq-info);outline-offset:2px;}

/* Callout / alert */
.uqbs-callout{display:flex;gap:var(--uq-s-m);padding:var(--uq-s-l);border-radius:var(--uq-radius);
  border-left:4px solid var(--uq-info);background:var(--uq-info-50);margin:var(--uq-s-l) 0;color:var(--uq-grey-900);}
.uqbs-callout__icon{flex:0 0 24px;width:24px;height:24px;margin-top:2px;color:var(--uq-info);}
.uqbs-callout__title{font-family:var(--uq-font-head);font-weight:600;font-size:18px;margin:0 0 var(--uq-s-s);}
.uqbs-callout p:last-child{margin-bottom:0;}
.uqbs-callout--success{border-left-color:var(--uq-success);background:var(--uq-success-50);}
.uqbs-callout--success .uqbs-callout__icon{color:var(--uq-success);}
.uqbs-callout--warning{border-left-color:var(--uq-warning);background:var(--uq-warning-50);}
.uqbs-callout--warning .uqbs-callout__icon{color:var(--uq-warning);}
.uqbs-callout--error{border-left-color:var(--uq-error);background:var(--uq-error-50);}
.uqbs-callout--error .uqbs-callout__icon{color:var(--uq-error);}

/* Button (link styled as UQ button) */
.uqbs-btn{display:inline-flex;align-items:center;gap:var(--uq-s-s);background:var(--uq-purple);
  border:2px solid var(--uq-purple);border-radius:var(--uq-radius);color:#fff;font-family:var(--uq-font-body);
  font-size:16px;font-weight:500;line-height:1;padding:16px 24px;text-decoration:none;cursor:pointer;
  transition:background .2s ease-out,color .2s ease-out;}
.uqbs-btn:hover{background:#fff;color:var(--uq-purple);text-decoration:underline;}

/* Accordion (native details/summary) */
.uqbs-accordion{margin:var(--uq-s-l) 0;}
.uqbs-accordion details{background:#fff;border:1px solid var(--uq-grey-200);border-radius:2px;margin-bottom:var(--uq-s-s);}
.uqbs-accordion summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;
  gap:var(--uq-s-m);padding:var(--uq-s-m);font-size:20px;font-weight:500;color:var(--uq-grey-900);}
.uqbs-accordion summary::-webkit-details-marker{display:none;}
.uqbs-accordion summary::after{content:'';flex:0 0 20px;width:20px;height:20px;transition:transform .2s;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' fill='none' stroke='%2351247a' stroke-width='2'/%3E%3C/svg%3E") no-repeat center/contain;}
.uqbs-accordion details[open] summary::after{transform:rotate(180deg);}
.uqbs-accordion__body{padding:0 var(--uq-s-m) var(--uq-s-m);}

/* Tabs (CSS-only, radio + :checked) */
.uqbs-tabs{margin:var(--uq-s-l) 0;}
.uqbs-tabs input{position:absolute;width:1px;height:1px;opacity:0;}
.uqbs-tabs label{display:inline-block;padding:12px 16px;cursor:pointer;background:var(--uq-grey-50);
  color:var(--uq-purple);border-radius:4px 4px 0 0;margin-right:4px;font-weight:500;}
.uqbs-tabs input:checked + label{background:var(--uq-purple);color:#fff;}
.uqbs-tabs input:focus-visible + label{outline:2px solid var(--uq-info);outline-offset:2px;}
.uqbs-tab-panel{display:none;padding:var(--uq-s-l);border:2px solid var(--uq-purple);border-radius:0 4px 4px 4px;}

/* Card */
.uqbs-card{display:block;background:#fff;border:1px solid var(--uq-grey-200);border-radius:var(--uq-radius);
  overflow:hidden;text-decoration:none;color:inherit;transition:box-shadow .2s,transform .2s;}
.uqbs-card:hover{box-shadow:0 6px 18px rgba(25,21,28,.12);transform:translateY(-2px);}
.uqbs-card img{display:block;width:100%;height:auto;}
.uqbs-card__body{padding:var(--uq-s-l);}
.uqbs-card__title{font-family:var(--uq-font-head);color:var(--uq-purple);font-size:20px;margin:0 0 var(--uq-s-s);}
.uqbs-card__body p{margin:0;color:var(--uq-grey-900);}

/* Two-column layout (wraps to single column on narrow screens) */
.uqbs-cols{display:flex;flex-wrap:wrap;gap:var(--uq-s-l);margin:var(--uq-s-l) 0;}
.uqbs-cols > *{flex:1 1 280px;}

/* Figure with caption (one rounded corner, per UQ image style) */
.uqbs-figure{margin:var(--uq-s-l) 0;}
.uqbs-figure img{display:block;width:100%;height:auto;border-radius:0 var(--uq-s-l) 0 0;}
.uqbs-figure figcaption{font-size:14px;color:var(--uq-grey-900);margin-top:var(--uq-s-s);}
</style>
```

## Components

All markup below assumes it sits inside `<div class="uqbs">…</div>` with the foundation stylesheet pasted above it.

### Callouts

Four states for the four kinds of message: neutral information, a positive confirmation, a caution, and a critical note. Each one carries an icon and a title as well as its colour, so meaning never depends on colour alone. Swap the modifier class (`--success`, `--warning`, `--error`) and the icon to change the state.

```html
<div class="uqbs-callout">
  <svg class="uqbs-callout__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  <div><p class="uqbs-callout__title">Information</p><p>Neutral context for students.</p></div>
</div>

<div class="uqbs-callout uqbs-callout--success">
  <svg class="uqbs-callout__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7.6z"/></svg>
  <div><p class="uqbs-callout__title">Success</p><p>A positive note or completed step.</p></div>
</div>

<div class="uqbs-callout uqbs-callout--warning">
  <svg class="uqbs-callout__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
  <div><p class="uqbs-callout__title">Warning</p><p>Something to be careful about.</p></div>
</div>

<div class="uqbs-callout uqbs-callout--error">
  <svg class="uqbs-callout__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6z"/></svg>
  <div><p class="uqbs-callout__title">Important</p><p>A critical message students must not miss.</p></div>
</div>
```

### Button

A link styled as the UQ button. It's an anchor, not a JavaScript control, so it goes somewhere. Solid purple by default, inverting to white with a purple border on hover.

```html
<a class="uqbs-btn" href="https://example.uq.edu.au">Primary action</a>
```

### Accordion

Native `details` and `summary`, so it expands and collapses with no JavaScript and is keyboard operable out of the box. Add `open` to the first item if you want it expanded on load. This is the accessible choice for content students must reach.

```html
<div class="uqbs-accordion">
  <details open>
    <summary>What is covered in this module?</summary>
    <div class="uqbs-accordion__body"><p>Answer text.</p></div>
  </details>
  <details>
    <summary>How is the assessment weighted?</summary>
    <div class="uqbs-accordion__body"><p>Answer text.</p></div>
  </details>
</div>
```

### Tabs

CSS-only tabs built on radio buttons. Read the accessibility note before using these for anything critical. Each tabbed block needs unique IDs and one matching show-rule. For a block using `t1/t2/t3` and `p1/p2/p3`, add this line inside the `<style>`:

```css
#t1:checked ~ #p1, #t2:checked ~ #p2, #t3:checked ~ #p3 { display:block; }
```

```html
<div class="uqbs-tabs">
  <input type="radio" name="set1" id="t1" checked><label for="t1">Overview</label>
  <input type="radio" name="set1" id="t2"><label for="t2">Details</label>
  <input type="radio" name="set1" id="t3"><label for="t3">Assessment</label>
  <div class="uqbs-tab-panel" id="p1"><p>Overview panel.</p></div>
  <div class="uqbs-tab-panel" id="p2"><p>Details panel.</p></div>
  <div class="uqbs-tab-panel" id="p3"><p>Assessment panel.</p></div>
</div>
```

### Cards

A card is a single link wrapping an optional image and a body. Drop several into the two-column layout and they form a responsive grid. Add an `<img>` above the body if you want a banner.

```html
<div class="uqbs-cols">
  <a class="uqbs-card" href="#">
    <div class="uqbs-card__body"><p class="uqbs-card__title">Module one</p><p>Short description.</p></div>
  </a>
  <a class="uqbs-card" href="#">
    <div class="uqbs-card__body"><p class="uqbs-card__title">Module two</p><p>Short description.</p></div>
  </a>
  <a class="uqbs-card" href="#">
    <div class="uqbs-card__body"><p class="uqbs-card__title">Module three</p><p>Short description.</p></div>
  </a>
</div>
```

### Two-column layout

A flexible row that wraps to a single column on narrow screens without a media query. Put any two blocks of content inside it.

```html
<div class="uqbs-cols">
  <div><h4>Left column</h4><p>Content.</p></div>
  <div><h4>Right column</h4><p>Content.</p></div>
</div>
```

### Figure with caption

A captioned image with one rounded corner, following UQ's image style. Always give the image meaningful `alt` text, or `alt=""` if it's purely decorative.

```html
<figure class="uqbs-figure">
  <img src="IMAGE_URL" alt="Describe the image here">
  <figcaption>Figure 1. Caption text.</figcaption>
</figure>
```

## Colour reference

UQ Purple leads every page. The state colours are for callouts and meaning. Light purple is a sparing accent and should never lead.

| Token | Hex | Background tint | Use |
|---|---|---|---|
| UQ Purple | `#51247A` | `#EEE9F2` | Headings, buttons, primary accents |
| Light purple | `#962A8B` | — | Sparing accent only |
| Grey 900 | `#3B383E` | — | Body text |
| Grey 200 | `#DCDCDD` | — | Borders |
| Grey 50 | `#F3F3F4` | — | Subtle backgrounds |
| Info (blue) | `#0D6DCD` | `#E7F0FA` | Information callouts |
| Success (green) | `#4AA74E` | `#EDF6ED` | Success callouts |
| Warning (yellow) | `#F7BA1E` | `#FEF8E8` | Warning callouts |
| Error (red) | `#D62929` | `#FBEAEA` | Critical callouts |

## Type reference

| Role | Font | Size |
|---|---|---|
| Headings | Montserrat (500–700) | H2 32px, H3 24px, H4 20px |
| Body | Roboto (400/500) | 16px, line height 1.6 |
| Small print | Roboto | 14px |

Both fonts load from Google Fonts through the `@import` in the foundation stylesheet, which the Add HTML block supports.

## Accessibility checklist

Universities carry a legal obligation here, so treat this as a floor, not a nice-to-have.

- **Contrast.** UQ purple on white, white on UQ purple, and grey-900 body text on white all pass WCAG AA, as do the tinted callout backgrounds with grey-900 text. Don't put white text on the yellow warning colour; it fails.
- **Never rely on colour alone.** The callouts pair an icon and a title with the colour, so the meaning survives for someone who can't distinguish the hue.
- **Real headings, in order.** Use `h2`, then `h3`, then `h4`. Don't skip levels and don't fake a heading with bold body text.
- **Visible focus.** The foundation puts a blue focus ring on every interactive element. Keep it.
- **Alt text.** Every meaningful image needs a description. Decorative images take `alt=""`.
- **Link text.** Describe the destination. Avoid "click here".
- **Tabs versus accordions.** The CSS-only tabs are keyboard operable, but a screen reader announces them as radio buttons rather than as a tab set, because proper tab semantics need JavaScript, which isn't reliable in Blackboard. For content a student must not miss, use an accordion, which is natively accessible.

## Status

The house style and component library are drafted and validated in the sandbox. Next is the AI-generation standard, a prompt or skill that hands these rules to an assistant so anyone in UQBS can produce on-brand, Blackboard-safe HTML without learning the system by hand. After that, the Functions Reference and this guide fold into a single super guide, ideally built as an Ultra Document so it demonstrates the components it documents.
