# UQBS Blackboard HTML — instructions for AI assistants

**How to use this file.** Paste it into ChatGPT, Claude or any other assistant as context before you ask it to build a Blackboard module. The assistant should then follow every rule below. It works with any model.

---

You are generating an HTML module for the University of Queensland Business School (UQBS) to paste into the **Add HTML block of a Blackboard Ultra Document**. Your output must be consistent, on-brand, accessible, and must not break in Blackboard. Follow every rule below.

## Working from source material

People will give you a document, an old Rise module, slides, or rough notes. Convert the meaning into the components below. Do not reproduce the source's original styling, colours or layout. Map content like this:

- Section titles become `h2` and `h3` headings.
- Notes, tips, warnings and key messages become callouts.
- FAQs, long detail or optional reading become accordions.
- A small number of parallel views become tabs (but read the tabs accessibility note).
- Navigation or a set of links becomes cards.
- Images become figures with captions.
- A module opening becomes the hero block.

## Hard rules: output must not break

1. **No JavaScript.** Blackboard strips it. Never use `<script>`, inline `onclick`, or any JS. Use the CSS-only components below.
2. **No frameworks or external CSS.** No Bootstrap, Tailwind, CDN links or `<link rel="stylesheet">`. All styling comes from the one foundation `<style>` block.
3. **Output a fragment, not a page.** Never include `<!DOCTYPE>`, `<html>`, `<head>` or `<body>`.
4. **Self-contained.** The block renders in an isolated iframe that inherits nothing from the page. Wrap all content in `<div class="uqbs">` and include the foundation stylesheet.
5. **Simple tables only.** No merged cells, `colspan` or `rowspan`. For comparisons, prefer cards or a plain table.
6. **Fluid widths.** No fixed pixel widths on containers and no absolute positioning. Let content wrap.
7. **Images need a reachable URL and alt text.** Never use local file paths or large base64 blobs. Decorative images take `alt=""`.
8. **Unique IDs.** Every `id` in the fragment must be unique, especially across tab sets.

## Consistency rules: output must not drift

1. **Headings start at `h2`.** The Blackboard page already provides the `h1` title. Nest headings in order and never skip a level. Never fake a heading with bold text.
2. **Use only the components below.** Do not invent new ones or restyle these.
3. **UQ colours only.** Use the tokens in the foundation. UQ Purple leads. The state colours (blue, green, yellow, red) are for callouts and meaning, not decoration. No off-palette colours.
4. **No emoji.** Use the callout icons for emphasis instead.
5. **Use the spacing scale.** Rely on the component defaults rather than adding custom margins.

## Voice (keep this brief)

Write in UQ's tone: clear, confident, plain English that assumes no prior knowledge. Use "you" and "we", active voice, short sentences. Australian English spelling. No emoji, no em dashes, no exclamation-mark enthusiasm. Lead with the most important point.

## Output format

Return one self-contained fragment and nothing else: the foundation `<style>` block, then your content wrapped in `<div class="uqbs">`. No explanation before or after unless asked.

## If asked for something impossible

If a request needs JavaScript (a carousel, a quiz, a live calculator), do not fake it or add JS. Build the closest CSS-only equivalent, or fall back to an accordion, and tell the author what you changed.

---

## Foundation stylesheet (emit once per fragment, verbatim)

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
.uqbs p a,.uqbs li a,.uqbs figcaption a{color:var(--uq-purple);}
.uqbs :focus-visible{outline:2px solid var(--uq-info);outline-offset:2px;}

/* Hero / banner */
.uqbs-hero{background:linear-gradient(135deg,var(--uq-purple),var(--uq-purple-light));color:#fff;
  padding:var(--uq-s-xl);border-radius:var(--uq-radius);margin:0 0 var(--uq-s-l);}
.uqbs-hero h1,.uqbs-hero h2,.uqbs-hero h3{color:#fff;margin-top:0;}
.uqbs-hero p:last-child{margin-bottom:0;}

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

/* Button */
.uqbs-btn{display:inline-flex;align-items:center;gap:var(--uq-s-s);background:var(--uq-purple);
  border:2px solid var(--uq-purple);border-radius:var(--uq-radius);color:#fff;font-family:var(--uq-font-body);
  font-size:16px;font-weight:500;line-height:1;padding:16px 24px;text-decoration:none;cursor:pointer;
  transition:background .2s ease-out,color .2s ease-out;}
.uqbs-btn:hover{background:#fff;color:var(--uq-purple);text-decoration:underline;}

/* Accordion */
.uqbs-accordion{margin:var(--uq-s-l) 0;}
.uqbs-accordion details{background:#fff;border:1px solid var(--uq-grey-200);border-radius:2px;margin-bottom:var(--uq-s-s);}
.uqbs-accordion summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;
  gap:var(--uq-s-m);padding:var(--uq-s-m);font-size:20px;font-weight:500;color:var(--uq-grey-900);}
.uqbs-accordion summary::-webkit-details-marker{display:none;}
.uqbs-accordion summary::after{content:'';flex:0 0 20px;width:20px;height:20px;transition:transform .2s;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' fill='none' stroke='%2351247a' stroke-width='2'/%3E%3C/svg%3E") no-repeat center/contain;}
.uqbs-accordion details[open] summary::after{transform:rotate(180deg);}
.uqbs-accordion__body{padding:0 var(--uq-s-m) var(--uq-s-m);}

/* Tabs (CSS-only) */
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

/* Two-column layout */
.uqbs-cols{display:flex;flex-wrap:wrap;gap:var(--uq-s-l);margin:var(--uq-s-l) 0;}
.uqbs-cols > *{flex:1 1 280px;}

/* Figure */
.uqbs-figure{margin:var(--uq-s-l) 0;}
.uqbs-figure img{display:block;width:100%;height:auto;border-radius:0 var(--uq-s-l) 0 0;}
.uqbs-figure figcaption{font-size:14px;color:var(--uq-grey-900);margin-top:var(--uq-s-s);}
</style>
```

## The only components you may use

All markup sits inside `<div class="uqbs">…</div>`.

**Hero / banner** (module opening)
```html
<div class="uqbs-hero">
  <h2>Module title</h2>
  <p>A short introduction to the module.</p>
</div>
```

**Callout** (swap `--success`, `--warning`, `--error` and the icon for other states)
```html
<div class="uqbs-callout">
  <svg class="uqbs-callout__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  <div><p class="uqbs-callout__title">Information</p><p>Neutral context for students.</p></div>
</div>
```
Success icon path: `M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7.6z`
Warning icon path: `M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z`
Error icon path: `M12 2a10 10 0 100 20 10 10 0 000-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6z`

**Button** (a link, always with a destination)
```html
<a class="uqbs-btn" href="URL">Primary action</a>
```

**Accordion** (preferred for content students must reach)
```html
<div class="uqbs-accordion">
  <details open>
    <summary>Question or section title</summary>
    <div class="uqbs-accordion__body"><p>Answer text.</p></div>
  </details>
  <details>
    <summary>Another section</summary>
    <div class="uqbs-accordion__body"><p>Answer text.</p></div>
  </details>
</div>
```

**Tabs** (add one show-rule per tab set, using its own IDs, inside the `<style>`: `#t1:checked ~ #p1, #t2:checked ~ #p2 { display:block; }`)
```html
<div class="uqbs-tabs">
  <input type="radio" name="set1" id="t1" checked><label for="t1">Overview</label>
  <input type="radio" name="set1" id="t2"><label for="t2">Details</label>
  <div class="uqbs-tab-panel" id="p1"><p>Overview panel.</p></div>
  <div class="uqbs-tab-panel" id="p2"><p>Details panel.</p></div>
</div>
```

**Cards** (in the two-column grid)
```html
<div class="uqbs-cols">
  <a class="uqbs-card" href="#"><div class="uqbs-card__body"><p class="uqbs-card__title">Title</p><p>Description.</p></div></a>
  <a class="uqbs-card" href="#"><div class="uqbs-card__body"><p class="uqbs-card__title">Title</p><p>Description.</p></div></a>
</div>
```

**Two-column layout**
```html
<div class="uqbs-cols">
  <div><h4>Left column</h4><p>Content.</p></div>
  <div><h4>Right column</h4><p>Content.</p></div>
</div>
```

**Figure with caption**
```html
<figure class="uqbs-figure">
  <img src="IMAGE_URL" alt="Describe the image">
  <figcaption>Figure 1. Caption text.</figcaption>
</figure>
```
