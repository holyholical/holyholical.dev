---
name: holyholical.dev
description: A garden-center seed rack where every packet is a live GitHub repository.
colors:
  rack-green: "#1c5e3a"
  rack-green-deep: "#123f27"
  rack-green-lit: "#2b7a4f"
  wire: "#a6d9ba"
  packet-paper: "#f6f1e4"
  packet-paper-shade: "#e6dfcc"
  ink: "#12261a"
  ink-soft: "#3f5a4a"
  stamp-red: "#b7321f"
  tag-white: "#ffffff"
  band-typescript: "#2a63a6"
  band-cpp: "#f34b7d"
  band-c: "#555555"
  band-python: "#3572a5"
  band-kraft: "#b58a55"
  card-rule: "#cfe0f3"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', 'Archivo Narrow', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bricolage Grotesque', 'Archivo Narrow', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Bricolage Grotesque', 'Archivo Narrow', 'Arial Narrow', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "'Schibsted Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Schibsted Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
  small:
    fontFamily: "'Schibsted Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  instruction:
    fontFamily: "'Schibsted Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: "'Schibsted Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
  stamp:
    fontFamily: "'Courier Prime', 'Courier New', monospace"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.04em"
  stamp-small:
    fontFamily: "'Courier Prime', 'Courier New', monospace"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.12em"
  stamp-date:
    fontFamily: "'Courier Prime', 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.04em"
  price-count:
    fontFamily: "'Bricolage Grotesque', 'Archivo Narrow', 'Arial Narrow', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1
rounded:
  none: "0px"
  sign: "2px"
  packet: "3px"
  clip: "4px"
  tag: "6px"
  hook: "8px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  packet:
    backgroundColor: "{colors.packet-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.packet}"
    padding: "0"
  shelf-tag:
    backgroundColor: "{colors.tag-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "20px 22px 18px"
  aisle-link:
    backgroundColor: "{colors.rack-green-deep}"
    textColor: "{colors.packet-paper}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
  aisle-link-active:
    backgroundColor: "{colors.packet-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.stamp-red}"
    rounded: "{rounded.packet}"
    padding: "3px 6px 2px"
---

# Design System: holyholical.dev

## Overview

**Creative North Star: "The Seed Rack"**

The whole site is one object: a powder-coated wire seed rack standing in a garden center, in daylight. Every GitHub repository is a printed seed packet standing in a slot. The packet's front is the repo's face (a two-color botanical print, the variety name, a language band); its back is the sowing instructions (the description, the packed-for date, the link). The rack's saturated green owns the page; paper, white tags and ink sit on it as objects, never as page chrome. Liveness is physical: the packets most recently pushed lean forward out of their slots.

Density is that of a real rack: many small printed objects, each legible on its own, read in rows. Personality comes from print detail (registration, stamps, tab cuts, hand-written shelf tags) rather than from motion; the one authored motion is packets sliding into their slots when the feed lands. Confirmed anti-references: the dark terminal portfolio (black ground, monospace body, neon), and the startup landing page (hero, three feature cards, CTA row).

**Key Characteristics:**
- Committed color: rack green carries the page ground and most of the surface.
- Print grammar: two-color packet illustrations, stamped dates, condensed grotesque variety names.
- Objects on a rack, not cards on a canvas: every element is a thing that could physically hang there.
- One orchestrated motion; still at rest.
- Daylight, not lamplight: a light, saturated scene.

## Colors

A saturated garden-center green carrying paper, white plastic and printed ink.

### Primary
- **Rack Green** (#1c5e3a): the page ground, the rack's powder coat. Owns every region not occupied by an object.
- **Rack Green Deep** (#123f27): shadowed rack surfaces, inactive aisle links, the base plate.
- **Rack Green Lit** (#2b7a4f): rack surfaces catching light; hover ground for green controls.
- **Wire** (#a6d9ba): the shelf wires and slot rails, drawn as 2px lines on the green; also the smallest text on green (4.89:1).

### Secondary
- **Stamp Red** (#b7321f): the rubber-stamped PACKED FOR date and price-gun labels. Never a button color; never more than one stamp per packet.

### Tertiary (language bands)
- **TypeScript Band** (#2a63a6, linguist #3178c6 darkened ~12% so paper text clears 4.5:1), **C++ Band** (#f34b7d), **C Band** (#555555), **Python Band** (#3572a5), **Kraft Band** (#b58a55, for repos with no language): each packet's top band and its illustration's second ink. These are GitHub's own linguist colors, so the band is a product fact, not decoration.

### Neutral
- **Card Rule** (#cfe0f3): the pale blue ruling on Q&A index cards, one line per 28px of text.
- **Packet Paper** (#f6f1e4): packet front and back. Paper is an object color, never the page ground.
- **Packet Paper Shade** (#e6dfcc): the folded flap, the tab cut, fold lines.
- **Ink** (#12261a): all text on paper and white; green-black, not pure black.
- **Ink Soft** (#3f5a4a): secondary text on paper. Tinted from ink, never gray.
- **Tag White** (#ffffff): hand-written shelf tags, aisle signs, index cards.

### Named Rules
**The Object Rule.** Paper and white exist only as objects (packets, tags, cards) sitting on the green. If a region of paper has no physical counterpart on a rack, it is wrong.
**The One Stamp Rule.** Stamp Red appears once per packet, on the date. It is not an accent color.
**The Linguist Rule.** Language bands use GitHub's linguist colors; a band may be darkened only as far as needed for its label to reach 4.5:1 (TypeScript is the one such case). Band text is Ink when the band's relative luminance exceeds 0.2 (C++, Kraft), Packet Paper otherwise. New languages take their linguist color; unknown languages take Kraft.

## Typography

**Display Font:** Bricolage Grotesque, condensed axis (with Archivo Narrow, Arial Narrow fallback)
**Body Font:** Schibsted Grotesk (with Helvetica Neue, Arial fallback)
**Stamp Font:** Courier Prime (with Courier New fallback)

**Character:** Variety names on real packets are set in bold condensed grotesques; Bricolage at width 75 and weight 800 gives that with enough quirk to feel printed rather than templated. Schibsted Grotesk is the small sowing-instruction text: compact, humanist, cheap to read at 13px. Courier Prime exists only as a rubber stamp; it is measurement, not costume.

### Hierarchy
- **Display** (800, clamp(2rem, 5vw, 4.5rem), 0.95): the rack header sign only.
- **Price Count** (800, 2.5rem, 1): the number inside the price-gun label on the top shelf.
- **Headline** (800, clamp(1.375rem, 2.4vw, 1.75rem), 1.05): packet variety names, page sign titles.
- **Title** (700, 1.125rem, 1.1): index-card questions, catalogue row names.
- **Body** (400, 1rem, 1.5): shelf-tag copy, answers. Measure 60–70ch.
- **Small** (400, 0.9375rem, 1.5): sign line, shelf notes, catalogue descriptions, card answers.
- **Instruction** (400, 0.875rem, 1.4): the sowing-instructions description on a packet back.
- **Label** (700, 0.75rem, 0.08em, uppercase): packet band text, aisle links, catalogue column heads.
- **Caption** (700, 0.6875rem, 0.08em, uppercase): packet straplines and back-face section heads.
- **Stamp** (700, 0.8125rem, 0.04em, uppercase, Courier Prime): price-gun labels, catalogue dates, filter chips; the packet stamp stacks **Stamp Small** (0.625rem, 0.12em) over **Stamp Date** (0.875rem).

### Named Rules
**The Stamp Rule.** Monospace appears only inside a stamp or a price-gun label. Body copy, headings and navigation never use it.
**The Condensed Rule.** Display and headline always use the condensed width axis (wdth 75); regular-width Bricolage does not appear.

## Layout

The page is the rack, full-bleed green, with a maximum content width of 1120px centered. The rack header sign hangs at the top; the aisle navigation is a strip of clipped signs beneath it; shelves follow.

Shelves are CSS grid rows: `repeat(auto-fill, minmax(180px, 1fr))` with a 24px slot gap on desktop, 16px on mobile. Each shelf is a wire line (2px, Wire) drawn under its row. A packet is a 2:3 portrait object that stands on its wire.

Spacing rhythm: 8px base. Groups inside an object are tight (4–8px); objects on the rack are separated by 24–32px; sections by 64px. More space above a sign than below it.

Responsive: the rack narrows by dropping columns, never by shrinking packets below 150px wide. At 480px and below the rack is two packets wide; shelf tags become full-width. The header sign shrinks with the display clamp.

## Elevation & Depth

Depth is physical and offset. Shadow colors are the rack's own green-black at low alpha (rgba(8, 30, 18, …)), never neutral black. Packets cast a soft, downward shadow onto the green (`0 6px 14px rgba(8, 30, 18, 0.35)`), a forward-leaning packet casts a longer one (`0 14px 28px rgba(8, 30, 18, 0.45)`). Tags and cards cast a tight paper shadow (`0 2px 4px rgba(8, 30, 18, 0.3)`). No glows, no zero-offset halos, no blur as decoration.

### Shadow Vocabulary
- **packet-rest** (`box-shadow: 0 6px 14px rgba(8,30,18,0.35)`): a packet standing in its slot.
- **packet-lean** (`box-shadow: 0 14px 28px rgba(8,30,18,0.45)`): a packet tilted forward (recently pushed, or hovered).
- **paper** (`box-shadow: 0 2px 4px rgba(8,30,18,0.3)`): tags, cards, signs.

Perspective (1200px on the shelf grid) is what makes a leaning packet come forward; the lean is `rotateX(-8deg) translateY(-8px)` from the packet's bottom edge, softened to -5deg under 480px so it never leaves the viewport.

### Named Rules
**The Daylight Rule.** Shadows fall down and slightly forward, as under skylights; never upward, never colored.

## Shapes

Signs are near-square (2px); packets are near-square-cornered rectangles (3px) with a printed top band, a visible fold line one-eighth from the top, and a small semicircular tab cut at the top center where the rack's hook goes through. Shelf tags are white rounded rectangles (6px) with a clipped corner. Aisle signs are square-cornered. The tag clip is 4px, the sign hooks 8px on their top corners. Nothing is a pill except the price-gun label and the catalogue filter chips, which are the same object. Illustrations are two-color line-and-fill prints, slightly misregistered (the fill offset 1px from the line) so they read as printed, not rendered.

## Components

### Packet
The signature component. An `<a>` to the repository. Front: language band across the top carrying the language name in Label type; the botanical print; the variety name in Headline type; a one-line strapline in Label type ("open source · fork of …" when applicable). Back (revealed on hover/focus by a Y-rotation, or shown below the front under reduced motion): the description in Body type at 0.875rem, the PACKED FOR stamp with the pushed date, and "Open on GitHub" as a printed instruction line. States: rest (packet-rest shadow), lean (the three most recently pushed, rotated -6° on X with packet-lean shadow), hover/focus (lifted 6px, packet-lean shadow, flipped), focus-visible (2px Tag White outline offset 3px). Loading: an empty slot with a dashed Wire outline and a "restocking" price-gun label. Error: a shelf tag naming the problem and the recovery.

### Shelf Tag
White paper tag clipped to a wire, holding hand-set copy (the intro, error text, notices). Body type, ink, 16–20px padding, paper shadow, a small drawn clip at the top edge.

### Aisle Link (navigation)
Square-cornered sign on Rack Green Deep with Packet Paper label text, uppercase Label type. Active: Packet Paper ground with Ink text. Hover: Rack Green Lit. Focus-visible: Tag White outline. On mobile the strip scrolls horizontally; it never collapses into a hamburger.

### Stamp
Courier Prime, Stamp Red, uppercase, with a 1.5px Stamp Red rounded border and a 2° rotation; slightly uneven ink via a masked texture is welcome but optional.

### Index Card (Q&A)
White lined card, Title type question, Body answer, a red margin line at the left (1px, Stamp Red, as on a real index card, not a colored border-left).

### Catalogue Row (projects page)
A dense ordered row: variety name, language band swatch, description, packed-for date, link. Rows are separated by 1px Wire lines on green, text in Packet Paper.

## Do's and Don'ts

### Do:
- **Do** keep Rack Green as the page ground on every route; objects sit on it.
- **Do** print every repo as a packet using the same front/back grammar, with the band color from GitHub's linguist data.
- **Do** use one orchestrated motion (packets sliding into slots on load) and keep everything else still.
- **Do** shape illustrations as two-color misregistered prints picked deterministically from the repo name.
- **Do** let the oneko cat live on the top shelf; it is a binding personality asset.

### Don't:
- **Don't** use a dark page ground, a monospace body, neon accents or glows.
- **Don't** ship a hero, a three-feature-card row, or a CTA button row.
- **Don't** add hover effects beyond the packet lift/flip and the aisle link ground change.
- **Don't** invent stars, downloads, proficiency levels or any number the GitHub API did not return.
- **Don't** use gray for secondary text on paper; use Ink Soft.
