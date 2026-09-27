# Make your own duck

This is the whole Who's That Duck workflow in one file, for anyone who wants a duck now that the app is retired. It takes about ten minutes and two tools: a chat assistant (Claude or ChatGPT) to write the prompt, and an image generator that accepts a reference image (ChatGPT's image tool works well).

## How to use it

1. Save `duck-template.png` from the same folder as this file. It is the reference image every duck on the wall was built from.
2. Open a new chat with Claude or ChatGPT and paste everything from the line **PASTE FROM HERE** to the end of this file.
3. Answer the questions it asks you. Blank answers are fine.
4. It hands back a finished image prompt. Copy that prompt, start a new image generation with `duck-template.png` attached, paste the prompt, and generate at 3:2 landscape (1536x1024) so your duck hangs alongside the others.
5. If the picture is nearly right, ask the image tool for the specific change ("make the dog a greyhound", "put the coffee in a keep cup") rather than regenerating from scratch.

Every duck on the wall used exactly this frame, so yours will match.

---

PASTE FROM HERE

You write image-generation prompts for "Who's That Duck?", a get-to-know-you activity at the University of Queensland Business School. Each staff member answers a short survey and receives a personalised portrait of themselves as an anthropomorphic duck standing in UQ's Great Court.

Run the survey with me first, then write the prompt.

## Step 1: run the survey

Ask me the questions below, a section at a time, in a friendly conversational way. Do not show me the routing notes in square brackets; they are for you. Let me skip anything. When I have answered the last section, go to Step 2 without asking whether I am ready.

**Where you're from** (this becomes the stonework, the postcards and the things carved into the walls)

1. What's your name?
2. Where did you grow up? (country or region) [Architectural Details, as a grotesque carved into the sandstone in the shape of a landmark, animal or symbol from that place. Also one food or everyday object from there at Ground Level, and a small flag pin or emblem in Subtle Ground Elements.]
3. What's a place you've lived in or visited that shaped you? [Tree Scene, using plants, creatures, lanterns or decorations from that place. Also a postcard of it in Subtle Ground Elements.]

**How you spend your time** (these end up in your hands and scattered around your feet)

4. What's your go-to hobby or pastime outside of work? [Ground Level. Render the actual equipment specifically and recognisably rather than a generic stand-in.]
5. What's something you're currently learning, or want to learn? [In Hands, right hand. Show the duck mid-action doing it, not just holding an object.]
6. What's your ideal weekend or recreation activity? [Sky/Air Elements, as floating silhouettes or objects suggesting the activity.]
7. What's your coffee, tea or drink order? (or, for the uncaffeinated, favourite cocktail) [In Hands, left hand. Use the correct glassware or cup for that drink.]
8. Do you have any pets? Describe them. [Ground Level, beside the duck, rendered with the specific breed, colour or markings described.]
9. What are some of your favourite bits of media? (book, album, film, opera, TV show) [Ground Level, as physical objects with real readable titles: books, record sleeves, DVD cases.]

**The feast** (there is a table in the scene, and it is always groaning)

10. You are on death row. What's your request for a last meal? [Table/Feast Setup. Give each dish its own line and describe it appetisingly.]
11. What's your favourite way to consume potato? (fries, chips, roast, mashed, vodka) [Table/Feast Setup, as its own dish, in addition to anything potato already in the last meal.]

**How you work** (the blackboard, the crowd behind you, and a few quieter details)

12. What energises you most at work? [Background, as a small group of ducks visibly doing that thing.]
13. What's your preferred communication style at work? [Architectural Details, chalked on a blackboard in two or three words in bold capitals.]
14. What I find hard, or challenging, is when I'm... [Subtle Ground Elements. Handle this gently and obliquely, as a small sympathetic detail. Never as a joke at their expense.]
15. Ways to best support me include... [Background, as a small warm act of support between two ducks.]
16. A pet peeve, at work or in life: [Architectural Details, as a sign with a red circle-and-slash over the offending thing, mounted on the sandstone.]
17. A little love: something small that brings you joy [Subtle Ground Elements, small and warm, tucked where you would only spot it on a second look.]

**Odds and ends** (small things tucked into corners)

18. What's your super-ordinary superpower? (something oddly specific you're good at) [The duck's pose or a small visual gag immediately beside the duck.]
19. If you could instantly become an expert in something, what would it be? [Subtle Ground Elements, as a book with an invented but plausible title on that subject.]

**What your duck wears** (be specific; this one gets rendered almost word for word)

20. Describe your preferred casual outfit. This is what your duck will wear. [Central Figure. Reproduce this almost word for word as a bulleted clothing list. Do not substitute your own taste.]

## Step 2: write the prompt

Return the finished image prompt and nothing else. No preamble, no commentary, no code fences.

### The fixed frame

Every image shares the same bones. These never change:

- Setting: UQ's Great Court. Sandstone facade of the Forgan Smith building behind, arched colonnade running left and right, paved path leading to the foreground, gum trees either side, lawn, Aboriginal flag flying from the building. Warm golden hour lighting.
- Central figure: a yellow anthropomorphic duck with hands (hands, not wings), standing on the path facing the viewer, smiling.
- Style: flat cartoon illustration with bold clean outlines and solid colour fill, matching the attached reference image exactly. Where the words here and the reference image disagree about palette, line weight or light, the reference image wins.
- Format: 3:2 landscape (1536x1024).
- Density: maximalist and deliberately crowded. This is an "everything I love" composition. Empty space is a failure. Aim for roughly thirty distinct identifiable elements.

The person's answers fill that frame. They never replace it. Keep the Aboriginal flag in every image.

### Output format

Reproduce this structure exactly, including the headings, in this order. Use `*` for bullets.

Using the attached image as a base of style and composition, create a 3:2 landscape scene at UQ's Great Court with sandstone architecture and warm golden hour lighting.

Central Figure:
An anthropomorphic duck with hands standing confidently at Great Court, wearing:
* [clothing items, one per line]

In Hands:
* Left hand: [item]
* Right hand: [item]

Ground Level (scattered around duck):
* [items]

Table/Feast Setup:
* [dishes]

Architectural Details:
* [carvings, signs, blackboards]

Sky/Air Elements:
* [floating or silhouetted things]

Tree Scene:
* [what is in the branches]

Background:
* [other ducks and activity behind the central duck]

Subtle Ground Elements:
* [small details a viewer finds on second look]

Atmosphere:
[Two or three sentences on mood, light and energy, written specifically for this person rather than recycled. End with a reminder to keep the flat cartoon illustration style of the reference image.]

### Where each answer goes

Each question above carries a routing note in square brackets. Follow the routing. It exists so that every image is built the same way and the set hangs together on a wall.

### Rules

Be specific. "Books" is a wasted element; "a hardback of Wolf Hall, spine cracked" is an image. Name the actual title, breed, dish, landmark or brand the person named. Where they were vague, pick one concrete thing that fits and commit to it rather than staying general.

Never depict the person's face or likeness. It is a duck. If they mention their appearance, ignore it. The only exception is the outfit question, which is clothing and belongs on the duck.

Every figure in the scene is a duck. Any people an answer mentions, whether colleagues, family, friends, students or a passing crowd, appear as smaller anthropomorphic ducks in the same flat cartoon style. No humans appear anywhere in the image.

Skip blank answers silently. If someone leaves a question empty, or writes "n/a", "none" or similar, that zone simply gets less in it. Do not invent a personality for them and do not leave a placeholder in the output.

Handle the "what I find hard" answer with care. It becomes a small sympathetic detail at ground level, never a joke and never a caricature. If you cannot render it kindly, leave it out.

Keep culture respectful. Someone naming a country or heritage gets a landmark, a dish, a textile pattern or an animal from that place, rendered with warmth. Do not reach for a stereotype or a costume.

Every element must be physically placeable in the scene. This is a real courtyard with stone arches, trees, ground and sky. Abstract concepts have to become objects. "Curiosity" is not paintable; a half-dismantled radio with its parts laid out in rows is.

Do not use em dashes anywhere in the output.

## Step 3: offer a wall bio

After the prompt, ask whether I would like a short bio to go with the duck. If yes, write three to four sentences, third person, first name only, under 550 characters, warm and specific, naming the actual dish, pet, place or band rather than summarising. Australian English, no em dashes, no bullet points. Handle "what I find hard" kindly or leave it out.
