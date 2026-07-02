---
name: uqbs-blackboard-html
description: Generate or convert HTML content for University of Queensland Business School (UQBS) Blackboard Ultra courses. Use whenever Sean asks to build, write, reimagine, restyle, or clean up HTML for a Blackboard page, module, week overview, or learning content, or to convert a document, slide deck, or existing Rise/HTML module into Blackboard-ready HTML. Produces CSS-only, on-brand, accessible HTML fragments for the Add HTML block inside an Ultra Document.
---

# UQBS Blackboard HTML

When this skill applies, you are producing an HTML module for the UQ Business School to paste into the **Add HTML block of a Blackboard Ultra Document**. Output a single self-contained fragment that is consistent, on-brand, accessible, and will not break in Blackboard.

## Working from source material

When converting a document, slide deck, old Rise module or notes, map the meaning onto the components below. Do not carry over the source's original styling, colours or layout.

- Section titles become `h2` and `h3`.
- Notes, tips, warnings and key messages become callouts.
- FAQs, long detail or optional reading become accordions.
- A small number of parallel views become tabs (mind the accessibility note).
- Navigation or sets of links become cards.
- Images become figures with captions.
- A module opening becomes the hero block.

## Hard rules: must not break

1. **No JavaScript.** Blackboard strips it. No `<script>`, no inline `onclick`. Use the CSS-only components.
2. **No frameworks or external CSS.** No Bootstrap, Tailwind, CDN links or `<link rel="stylesheet">`. All styling comes from the foundation `<style>` block.
3. **Fragment, not a page.** Never emit `<!DOCTYPE>`, `<html>`, `<head>` or `<body>`.
4. **Self-contained.** The block is an isolated iframe that inherits nothing. Wrap content in `<div class="uqbs">` and include the foundation stylesheet.
5. **Simple tables only.** No merged cells, `colspan` or `rowspan`.
6. **Fluid widths.** No fixed pixel container widths, no absolute positioning.
7. **Images need a reachable URL and alt text.** No local paths or large base64 blobs. Decorative images take `alt=""`.
8. **Unique IDs**, especially across tab sets.

## Consistency rules: must not drift

1. **Headings start at `h2`** (the page supplies the `h1`). Nest in order, never skip a level, never fake a heading with bold text.
2. **Use only the components below.** Don't invent or restyle them.
3. **UQ colours only.** Purple leads. State colours are for callouts and meaning, not decoration. No off-palette colours.
4. **No emoji.** Use the callout icons.
5. **Restraint over boxing.** Use a callout only where there is a real signal. Let everything else be clean headings and text.

## Voice (brief)

Clear, confident, plain English that assumes no prior knowledge. Use "you" and "we", active voice, short sentences. Australian English spelling. No emoji, no em dashes, no exclamation-mark enthusiasm. Lead with the most important point.

## Output

Return one self-contained fragment: the foundation `<style>`, then content in `<div class="uqbs">`. Nothing before or after unless asked. If a request needs JavaScript (carousel, scored quiz, live calculator), build the closest CSS-only equivalent or fall back to an accordion, and say what you changed. If genuine interactivity is essential, recommend hosting it as a separate HTML file or embedding it as an iframe, since the Add HTML block cannot run scripts.

## Foundation stylesheet (emit once, verbatim)

```html
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap');

.uqbs{
  --uq-purple:#51247a; --uq-purple-50:#eee9f2; --uq-purple-light:#962a8b;
  --uq-grey-900:#3b383e; --uq-grey-200:#dcdcdd; --uq-grey-50:#f3f3f4;
  --uq-white:#fff; --uq-black:#19151c;
  --uq-info:#0d6dcd;    --uq-info-50:#e7f0fa;
  --uq-success:#4aa74e; --uq-success-50:#edf6ed;
  --uq-warning:#f7ba1e; --uq-warning-50:#fef8e8;
  --uq-error:#d62929;   --uq-error-50:#fbeaea;
  --uq-font-body:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
  --uq-font-head:'Montserrat',Helvetica,Arial,sans-serif;
  --uq-s-xs:4px; --uq-s-s:8px; --uq-s-m:16px; --uq-s-l:24px; --uq-s-xl:32px;
  --uq-radius:4px;
  font-family:var(--uq-font-body); font-size:16px; line-height:1.6; color:var(--uq-grey-900);
}
.uqbs *{box-sizing:border-box;}
.uqbs h2,.uqbs h3,.uqbs h4{font-family:var(--uq-font-head);color:var(--uq-purple);line-height:1.2;margin:0 0 var(--uq-s-m);}
.uqbs h2{font-size:32px;} .uqbs h3{font-size:24px;margin-top:var(--uq-s-xl);} .uqbs h4{font-size:20px;}
.uqbs p{margin:0 0 var(--uq-s-m);}
.uqbs ul{margin:0 0 var(--uq-s-m);padding-left:1.2em;}
.uqbs p a,.uqbs li a,.uqbs figcaption a{color:var(--uq-purple);}
.uqbs :focus-visible{outline:2px solid var(--uq-info);outline-offset:2px;}

.uqbs-hero{background:linear-gradient(135deg,var(--uq-purple),var(--uq-purple-light));color:#fff;
  padding:var(--uq-s-xl);border-radius:var(--uq-radius);margin:0 0 var(--uq-s-l);}
.uqbs-hero h1,.uqbs-hero h2,.uqbs-hero h3{color:#fff;margin-top:0;}
.uqbs-hero p:last-child{margin-bottom:0;}

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

.uqbs-btn{display:inline-flex;align-items:center;gap:var(--uq-s-s);background:var(--uq-purple);
  border:2px solid var(--uq-purple);border-radius:var(--uq-radius);color:#fff;font-family:var(--uq-font-body);
  font-size:16px;font-weight:500;line-height:1;padding:16px 24px;text-decoration:none;cursor:pointer;
  transition:background .2s ease-out,color .2s ease-out;}
.uqbs-btn:hover{background:#fff;color:var(--uq-purple);text-decoration:underline;}

.uqbs-accordion{margin:var(--uq-s-l) 0;}
.uqbs-accordion details{background:#fff;border:1px solid var(--uq-grey-200);border-radius:2px;margin-bottom:var(--uq-s-s);}
.uqbs-accordion summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;
  gap:var(--uq-s-m);padding:var(--uq-s-m);font-size:20px;font-weight:500;color:var(--uq-grey-900);}
.uqbs-accordion summary::-webkit-details-marker{display:none;}
.uqbs-accordion summary::after{content:'';flex:0 0 20px;width:20px;height:20px;transition:transform .2s;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' fill='none' stroke='%2351247a' stroke-width='2'/%3E%3C/svg%3E") no-repeat center/contain;}
.uqbs-accordion details[open] summary::after{transform:rotate(180deg);}
.uqbs-accordion__body{padding:0 var(--uq-s-m) var(--uq-s-m);}

.uqbs-tabs{margin:var(--uq-s-l) 0;}
.uqbs-tabs input{position:absolute;width:1px;height:1px;opacity:0;}
.uqbs-tabs label{display:inline-block;padding:12px 16px;cursor:pointer;background:var(--uq-grey-50);
  color:var(--uq-purple);border-radius:4px 4px 0 0;margin-right:4px;font-weight:500;}
.uqbs-tabs input:checked + label{background:var(--uq-purple);color:#fff;}
.uqbs-tabs input:focus-visible + label{outline:2px solid var(--uq-info);outline-offset:2px;}
.uqbs-tab-panel{display:none;padding:var(--uq-s-l);border:2px solid var(--uq-purple);border-radius:0 4px 4px 4px;}

.uqbs-card{display:block;background:#fff;border:1px solid var(--uq-grey-200);border-radius:var(--uq-radius);
  overflow:hidden;text-decoration:none;color:inherit;transition:box-shadow .2s,transform .2s;}
.uqbs-card:hover{box-shadow:0 6px 18px rgba(25,21,28,.12);transform:translateY(-2px);}
.uqbs-card img{display:block;width:100%;height:auto;}
.uqbs-card__body{padding:var(--uq-s-l);}
.uqbs-card__title{font-family:var(--uq-font-head);color:var(--uq-purple);font-size:20px;margin:0 0 var(--uq-s-s);}
.uqbs-card__body p{margin:0;color:var(--uq-grey-900);}

.uqbs-cols{display:flex;flex-wrap:wrap;gap:var(--uq-s-l);margin:var(--uq-s-l) 0;}
.uqbs-cols > *{flex:1 1 280px;}

.uqbs-figure{margin:var(--uq-s-l) 0;}
.uqbs-figure img{display:block;width:100%;height:auto;border-radius:0 var(--uq-s-l) 0 0;}
.uqbs-figure figcaption{font-size:14px;color:var(--uq-grey-900);margin-top:var(--uq-s-s);}
</style>
```

## Component markup

All markup sits inside `<div class="uqbs">`.

**Hero / banner**
```html
<div class="uqbs-hero"><h2>Module title</h2><p>Short introduction.</p></div>
```

**Callout** (swap `--success`, `--warning`, `--error` and the icon path)
```html
<div class="uqbs-callout">
  <svg class="uqbs-callout__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  <div><p class="uqbs-callout__title">Information</p><p>Message text.</p></div>
</div>
```
Icon paths — success: `M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7.6z` · warning: `M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z` · error: `M12 2a10 10 0 100 20 10 10 0 000-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6z`

**Button**
```html
<a class="uqbs-btn" href="URL">Primary action</a>
```

**Accordion** (preferred for content students must reach)
```html
<div class="uqbs-accordion">
  <details open><summary>Title</summary><div class="uqbs-accordion__body"><p>Body.</p></div></details>
  <details><summary>Title</summary><div class="uqbs-accordion__body"><p>Body.</p></div></details>
</div>
```

**Tabs** (add one show-rule per set inside the `<style>`: `#t1:checked ~ #p1, #t2:checked ~ #p2 { display:block; }`). A screen reader announces these as radio buttons; for critical content use an accordion instead.
```html
<div class="uqbs-tabs">
  <input type="radio" name="set1" id="t1" checked><label for="t1">One</label>
  <input type="radio" name="set1" id="t2"><label for="t2">Two</label>
  <div class="uqbs-tab-panel" id="p1"><p>Panel one.</p></div>
  <div class="uqbs-tab-panel" id="p2"><p>Panel two.</p></div>
</div>
```

**Cards** (in the column grid)
```html
<div class="uqbs-cols">
  <a class="uqbs-card" href="#"><div class="uqbs-card__body"><p class="uqbs-card__title">Title</p><p>Description.</p></div></a>
  <a class="uqbs-card" href="#"><div class="uqbs-card__body"><p class="uqbs-card__title">Title</p><p>Description.</p></div></a>
</div>
```

**Two-column layout**
```html
<div class="uqbs-cols">
  <div><h4>Left</h4><p>Content.</p></div>
  <div><h4>Right</h4><p>Content.</p></div>
</div>
```

**Figure**
```html
<figure class="uqbs-figure"><img src="URL" alt="Description"><figcaption>Figure 1. Caption.</figcaption></figure>
```

## Accessibility floor

Contrast passes for purple on white, white on purple, and grey-900 body text on white, and for the tinted callout backgrounds. Never put white text on the yellow warning colour. Pair colour with an icon and a label so meaning never rests on colour alone. Use real headings in order, keep the focus ring, give images meaningful alt text, and write descriptive link text.
