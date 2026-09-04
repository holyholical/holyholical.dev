---
name: holyholical.dev
description: A 1998 anime homepage in the mascot's own colors, crimson and plum on warm cream. Bevelled windows, pixel type, live GitHub feed.
colors:
  pink: "#b12140"
  hot: "#841828"
  rose: "#f2d6d8"
  lav: "#b9a5c4"
  lav-deep: "#36284d"
  sky: "#e2d7e8"
  mint: "#d8c6cc"
  lemon: "#f3e1d4"
  cream: "#f9f0ec"
  paper: "#fffaf7"
  ground: "#ecd6d6"
  ink: "#1c1025"
  ink-soft: "#5a4a63"
  bevel-light: "#fffaf7"
  bevel-dark: "#9a5566"
  bevel-darker: "#5a1320"
  link: "#841828"
  link-visited: "#36284d"
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
  icon:
    fontFamily: "'DotGothic16', 'MS Gothic', 'Courier New', monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1
rounded:
  none: "0"
  chat: "12px"
  chat-tail: "2px"
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

# holyholical.dev

## The world

It is 1998 and Holy has a homepage. Every color is sampled from the mascot: crimson
from the dress, plum from the hair, warm cream from the skin. It lives on a tiled blush
ground of stars and hearts, inside one big double-bordered page with a drop shadow that does not blur.
The header is a title on the left and the mascot on the right, standing on the nav
bar. The nav bar is a row of bevelled buttons with the current page pressed in. Under
it, the front page is a few lines of terminal type and a button to GitHub; the other
pages are Windows-95 windows with a pink-to-lavender title bar. The type is bitmap:
Press Start 2P for anything that reads as a label or heading, DotGothic16 for body
copy, VT323 for anything that feels like a terminal.

## The mascot

One image, `public/waifu.png`, a real anime cutout with a transparent background. It
is anchored to the top edge of the nav bar with `bottom: 100%` so she stands on it at
every width. It is a plain `<img>` with width and height set so nothing shifts while it
loads. Do not add a second mascot, a sprite sheet, or a speech bubble.

## The voice

Copy is written as plain English in source and run through `uwuify` at render. Level 1
(default) swaps r and l for w, adds "ny", and sprinkles a suffix. Level 2 goes further.
Level 0 is plain English for anyone who needs to read the page. "Holy" is always
"Howwy". Repo names, URLs, and proper nouns like GitHub are rendered outside the uwu
path. The speech toggle lives at the end of the nav bar.

## Rules

- No emoji, ever. Icons are 10x10 pixel maps in `lib/icons.ts` rendered by `PixelIcon`;
  decorative glyphs are plain text characters (★ ☆ ♡ ✧) that every font ships.
- Nothing blurs. Shadows are hard offsets. Motion uses `steps()` so it looks like frames.
- Bevels are two-tone borders: light on top-left, dark on bottom-right; pressed inverts.
- Blink is allowed on exactly one thing: NEW! tags.
- No sound, no cursor trails, no counters, no easter eggs. The page is the page.
- Every interactive thing works with a keyboard and has a visible focus ring.
- `prefers-reduced-motion` turns off blinking and the loading spinner.
- The live GitHub feed is still the core. Loading, empty, and error states all speak in
  Holy's voice and offer a retry and a link out.

## The button wall

Every page signs off with a wall of real 88x31 GIFs, the way link exchanges worked
before social media. The buttons live in `public/buttons/` and are listed with alt text
in `lib/buttons.ts`; they came from the cyber.dabamos.de archive, which asks that you
copy rather than hot-link, so they are copied. The site's own button,
`holyholical.gif`, is drawn by `scripts/make-site-button.py` from the same pixel-map
language as the icons. Buttons are plain `<img>` at native size with
`image-rendering: pixelated`; only the ones with a real destination are links. Every
GIF is checked for 88x31 in the test suite.
