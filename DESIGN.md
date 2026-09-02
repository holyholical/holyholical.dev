---
name: holyholical.dev
description: A 1998 anime shrine homepage. Pixel waifus, bevelled windows, sparkles, and a live GitHub feed.
colors:
  pink: "#ff8fc8"
  hot: "#ff2d95"
  rose: "#ffd1e8"
  lav: "#c8a2ff"
  lav-deep: "#9b6bff"
  sky: "#a2d2ff"
  mint: "#b5ead7"
  lemon: "#fff3a8"
  cream: "#fff7fb"
  paper: "#ffffff"
  ground: "#ffe0f0"
  ink: "#3a1f3a"
  ink-soft: "#6b4a6b"
  bevel-light: "#ffffff"
  bevel-dark: "#b06a9a"
  bevel-darker: "#6b3a5e"
  link: "#c2148a"
  link-visited: "#7a3cc4"
  counter-glow: "#7dff9a"
  counter-well: "#110011"
  rainbow-1: "#ffc2e0"
  rainbow-2: "#d7c2ff"
  rainbow-3: "#c2e6ff"
  rainbow-4: "#c2ffe6"
  rainbow-5: "#fff5c2"
  sparkle-sky: "#7bd5ff"
  sparkle-gold: "#ffd166"
typography:
  banner:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "clamp(16px, 3.4vw, 30px)"
    fontWeight: 400
    lineHeight: 1.4
  pixel-lg:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  pixel:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
  pixel-sm:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.5
  pixel-xs:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "8px"
    fontWeight: 400
    lineHeight: 1.6
  pixel-xxs:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "7px"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  body-lg:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-xs:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  deco:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.2
  terminal-xl:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.2
  terminal-lg:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.2
  terminal:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.2
  terminal-md:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.2
  terminal-sm:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.15
  terminal-xs:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.2
  sparkle:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1
  icon:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1
rounded:
  none: "0"
  bubble: "10px"
  chat: "12px"
  chat-tail: "2px"
  sprite-hit: "6px"
spacing:
  hair: "2px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  base: "10px"
  lg: "12px"
  xl: "14px"
  xxl: "16px"
  xxxl: "18px"
---

# holyholical.dev: the Kawaii Shrine

## The world

It is 1998 and Holy has a homepage. It lives on a tiled pastel ground of stars and
hearts, inside one big double-bordered page with a drop shadow that does not blur.
Every section is a Windows-95 window with a pink-to-lavender title bar and working
minimise and close buttons. The type is bitmap: Press Start 2P for anything that reads
as a label or heading, DotGothic16 for body copy, VT323 for anything that feels like a
terminal, a counter, or a visual-novel text box.

## The cast

Four palette-swapped pixel girls narrate the site. They are drawn in `lib/sprites.ts` as
a 20x31 grid of palette keys and rendered as SVG rects with crisp edges. Expressions are
patches over the eyes, brows, and mouth. Howwy-tan (pink) is the mascot and the one who
speaks in the intro dialog and the Q&A. Minto (mint), Lavvy (lavender), and Kuro (black)
live in the shrine on the home page.

## The voice

Copy is written as plain English in source and run through `uwuify` at render. Level 1
(default) swaps r and l for w, adds "ny", and sprinkles a suffix. Level 2 goes further.
Level 0 is plain English for anyone who needs to read the page. "Holy" is always
"Howwy". Repo names, URLs, and proper nouns like GitHub are rendered outside the uwu
path.

## Rules

- Nothing blurs. Shadows are hard offsets. Motion uses `steps()` so it looks like frames.
- Bevels are two-tone borders: light on top-left, dark on bottom-right; pressed inverts.
- Blink is allowed on exactly two things: NEW! tags and the dialog advance hint.
- Sound is opt-in, always. The BGM button is the only way audio starts.
- The hit counter counts this browser only and says so. No fake global numbers.
- Every interactive thing works with a keyboard and has a visible focus ring.
- `prefers-reduced-motion` turns off the marquee, sparkles, bobbing, blinking, and the
  rainbow ground.
- The live GitHub feed is still the core. Loading, empty, and error states all speak in
  Holy's voice and offer a retry and a link out.

## MAXIMUM KAWAII

The Konami code toggles `body.kawaii-max`: the ground becomes a slow pastel rainbow, the
title hue-cycles, the girls dance, and the sparkle trail triples. It persists in
localStorage and a "calm down" button turns it off.
