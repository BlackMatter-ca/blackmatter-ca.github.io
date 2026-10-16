# Five directions for the BlackMatter home page

Prototypes, not the site. Each is one HTML page that loads the design system as shipped
(`tokens.css`, `bundle.css`), the shared copy in `copy.js`, and the marks in `shared.js`.
Serve the folder and open `index.html`.

## What is fixed by the design system

| Axis | Setting |
|---|---|
| Ground | Blackwater: obsidian page, sloe raised, mulberry sunk. Clearwater: snow, white, blush. |
| Ink | text white, subtext1 powder, subtext0 petal (dark). cocoa, raisin, smoke (light). |
| Accent | berry on dark, raspberry on light. One `btn-accent` per screen. Brand jam is a fill only. |
| Type | Inter only. Headings caps and tracked. Body sentence case at 400. Display is 300. |
| Marks | The wordmark (two berry triangles) and the stone. Stone as watermark, favicon, one bullet list a page. |
| Depth | Flat. Steps on the surface scale, never shadows. Radius 2, 4, 6px. |

So the freedom is layout, the hero, what the stone does, density, and which ground is the default.

## The pitch, in every direction

Advisory first. The reader is a decision maker in a medium or large northern organization.
The problem is the vendor who sells three hundred things to deliver four. The offer is scope,
direction and procurement guidance that rests on twenty years of running systems up here.
The eight service areas are the depth behind the advice, not the headline.

## The five

| | File | Default ground | Hero | The one memorable thing | Why it fits the subject |
|---|---|---|---|---|---|
| 1 | `v1-specification.html` | Clearwater | A document title block | Numbered clauses; the nav is the contents | Clients buy through tenders and specs. The site reads like the document they will get. |
| 2 | `v2-territory.html` | Blackwater | Headline over a node map of NWT communities | Lines drawn out from Yellowknife on load | The record is radio sites and fleets across a territory. Advice from inside it. |
| 3 | `v3-stone.html` | Blackwater | The stone at poster scale, filled with grit | "Scope before spend." under a stone made of dust | The mark is the brand. The grit is the site's own texture. |
| 4 | `v4-record.html` | Blackwater | A table of work, scale and outcome | Proof before pitch; tabs for the rest | Advice is worth what sits behind it. Show that first. |
| 5 | `v5-rail.html` | Both | A fixed dark rail beside light content | Two grounds on one screen; the rail is the contact card | The system has two themes. Use both at once. The way to reach us never scrolls away. |

## Layout sketches

### 1 Specification
```
| wordmark          1 Scope  2 Advisory  3 Experience ...   [theme] |
|                                                                   |
|   STATEMENT OF CAPABILITY                                         |
|   Issuer   BlackMatter, Yellowknife                               |
|   Issued   October 2026                                           |
|                                                                   |
|  1     SCOPE ---------------------------------------------------- |
|  1.1   BlackMatter is an independent ...                          |
|  2     ADVISORY                                                   |
|  2.1   Scope and requirements                                     |
|        ...                                                        |
|  7     CONTACT   hello@blackmatter.ca   [Request a proposal]      |
|                                                   (stone, 6%)     |
```
Left aligned. One text column of 66ch beside an 88px clause column. Numbering is justified: a specification is numbered by nature.

### 2 Territory
```
| stone   Advisory  Experience  Method  Record  Contact    [theme]  |
|                                        .                          |
|                                    .      .   .                   |
|                                  .    .     .                     |
|  ADVICE FROM INSIDE               .  .   .  .                     |
|  THE TERRITORY.                     . *YK  .                      |
|  lede ...                             .  .  .                     |
|  [Request a proposal] [See the record]                            |
|------------------------------------------------------------------ |
|  THE PROBLEM / WHAT THE ADVICE COVERS (3) / EXPERIENCE (8) ...    |
```
Map is real: 31 communities projected from latitude and longitude. No numbers on services. Steps numbered.

### 3 Stone
```
|  wordmark                                             [theme]     |
|                                                                   |
|                        /\                                         |
|                       /  \      (grit texture clipped             |
|                      / /\ \      to the stone silhouette)         |
|                     /_/  \_\                                      |
|                SCOPE BEFORE SPEND.                                |
|                     lede, centred                                 |
|                 [Request a proposal]                              |
|                                                                   |
|   ▲ Scope and requirements   (the one stone-bulleted list)        |
```
Centred. Everything below the poster is quiet and narrow.

### 4 Record
```
|  wordmark                                             [theme]     |
|  THE RECORD                                                       |
|  Advice is worth what sits behind it. This is what sits behind ours.|
|  Record | Advisory | Method | Contact                              |
|  ---------------------------------------------------------------  |
|  WORK                    SCALE                 OUTCOME            |
|  Backup and recovery     80+ servers, 3 prov   Business case to   |
|  Storage area networks   3 environments ...    Designed, built    |
```
A daisyUI table is the hero. Tabs switch panels. Numbers live in cells, never in stat tiles.

### 5 Two grounds
```
| BLACKWATER     | CLEARWATER                                       |
| wordmark       |  WE HELP YOU DECIDE WHAT TO BUY,                 |
|                |  WHAT TO BUILD, AND WHAT TO LEAVE ALONE.         |
| Advisory       |  lede                                            |
| Experience     |                                                  |
| Method         |  ADVISORY        Scope and requirements ...      |
| Record         |                  Direction ...                   |
|                |  EXPERIENCE      (two columns)                   |
| hello@...      |  METHOD          1 Capture ...                   |
| Yellowknife    |  RECORD          ...                             |
| [Request]      |                                                  |
| [theme]        |                                                  |
```
Definition-list layout in the content: the heading on the left, the text on the right.

## Review against the defaults

| Default | Where it would have crept in | What I did instead |
|---|---|---|
| Near-black with one bright accent | The system itself | Spend the accent only on the one button, the triangles, the stone, and the current tab. No pink headings. |
| Caps eyebrow labels above headings | Everywhere | None. Headings are caps because the system says so, and nothing sits above them. |
| Numbered markers 01 / 02 | Services | Only the specification (a numbered document) and the four-step method (a sequence) carry numbers. |
| Big number, small label, stat tiles | Direction 4 | Numbers sit in table cells with their sentence. |
| Fade-up on every section | Directions 2 and 3 | One moment each: the map lines draw out from Yellowknife; the stone settles. Nothing else moves. |
| Hairline broadsheet columns | Direction 1 | One text column, one rule per top-level clause, wide margins. |
| Monospace data labels, middle dots, arrows on links | Chrome | None. Inter only. Buttons say what they do. |
| Identical rounded cards with one shadow | Services grids | Hairline tops on a grid, as the Card card suggests for grids. No shadows anywhere. |

## Notes from building

Checked at 784px and 1280px wide, at 375px, and in both themes. No page scrolls sideways at 375px.

| Direction | Holds up | Weak spot | What I would change if chosen |
|---|---|---|---|
| 1 Specification | The title block and clause grid read as a real document in both grounds. | Dense for a first screen. The nav hides below 900px with no replacement. | A contents button on narrow screens. Fewer sub-clauses in Experience. |
| 2 Territory | The map is real geography, and the draw-out from Yellowknife is the one moment. | Map and headline share the width, so below 1100px the copy is narrow. Labels are small. | Put the map behind the copy at 60% opacity on narrow screens, or stack earlier. |
| 3 Stone | The grit-filled stone is the strongest single image of the five, in both grounds. | Everything below the poster is plain by design, which can read as thin. | Give one section below the fold a shape of its own (the method as a row of four). |
| 4 Record | Proof first is honest and the table reads well on a wide screen. | The table scrolls sideways on a phone. Tabs hide the offer behind a click. | Stack the three columns into a card per row below 700px. Make Advisory the first tab. |
| 5 Two grounds | The rail keeps the way to reach us on screen. The swap toggle is a nice trick. | Two grounds at once is a lot of contrast on a large monitor. On a phone it is just a dark header. | Narrow the rail to 240px and lift its ink to subtext1. |

Things true of all five: Inter at 300 for the display sizes is what makes the caps feel engineered rather than shouted. The browser pane in the desktop app only advances CSS animations while a tool call is running, so the map and the stone were checked with `document.getAnimations().forEach(a => a.finish())`; in a normal browser they run on load.

## The mix: stone and territory (`v6-stone-territory.html`)

Chosen 2026-10-15 from directions 3 and 2, with two corrections: the wordmark must land on the home page, and the pages read as walls of text.

| Change | How the page does it |
|---|---|
| Logo lands | The wordmark is the first element, 78px tall on desktop, uncovered left to right on load. The nav sits under it on a ruled bar. |
| Stone + territory | The stone stands at Yellowknife on the map, and every community link draws out from it. One image, one meaning: from here, the whole territory. |
| Less text | No paragraph longer than two lines. Three bullets instead of a lede. Eight titles with no descriptions. Four steps of one line each. Six record lines with the subject in bold. |
| Something to look at in every section | The map, the three-hundred-dot grid with four in berry, the stone bullets, the ruled grids. |

Weak spots: the map's labels are small at phone width, and the stone hides the communities south-east of Yellowknife. The three-hundred-dot grid needs its caption to be understood, so the heading says the number.
