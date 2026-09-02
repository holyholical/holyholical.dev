# holyholical.dev: Kawaii Shrine redesign

Date: 2026-09-02. Branch: `redesign/kawaii-shrine`. Replaces the Seed Rack (commit e2d4f71).

## Brief (from Kristian)

Full redesign. Very kawaii, waifus, lots of anime, cute anime speech ("Howwy" for
Holy), highly interactive, retro like a 90s page.

## Concept

A 1998 personal anime shrine on Geocities. Tiled pastel background, a marquee, a hit
counter, blinking NEW! tags, 88x31 badges, a webring bar, and Windows-95 style bevelled
windows with title bars. The site is narrated by pixel-art chibi mascots who talk in
visual-novel dialog boxes. The live GitHub feed stays the core: it is the "what's new"
section and the projects page.

## Decisions made without the user (assumptions)

1. Waifus are hand-drawn pixel art defined as string maps in code, rendered as SVG.
   No AI-generated or copyrighted images. Four palette-swapped characters:
   Howwy-tan (pink), Minto (mint), Lavvy (lavender), Kuro (black, goth).
2. Cute speech is produced by a deterministic uwu-ifier applied to site copy at
   render. Default is on. A toggle switches to plain English for anyone who needs to
   actually read the page. Repo names, URLs, and code never go through it.
3. Sound is opt-in. A Web Audio square-wave chiptune loop plays only after the visitor
   presses the BGM button. No audio files shipped.
4. Hit counter counts visits in localStorage only and says so. No fabricated global
   number.
5. Routes stay: `/`, `/projects/`, `/skills/`, `/qna/`. Static export and basePath
   unchanged. GitHub Pages workflow unchanged.
6. The oneko cat stays (existing brand signal).
7. Q&A remains three curated static entries, no form. Keys and donate stay removed.

## Interactive inventory

- Visual-novel dialog box: typewriter text, click or key to advance, blinking cursor,
  mascot expression changes per line.
- Click any waifu: cycles expression and shows a random line in a speech bubble.
- Sparkle cursor trail (pointer devices only; respects `prefers-reduced-motion`).
- Retro windows: title bar `_` collapses, `×` collapses with a sad face, both restorable.
- Marquee: pauses on hover.
- Hit counter: increments per visit, odometer style.
- BGM button: chiptune on/off.
- uwu toggle: off / uwu / MAX.
- Konami code: unlocks MAXIMUM KAWAII mode (rainbow ground, more sparkles, dancing cast,
  toast). Persists in localStorage until toggled off.
- Projects: language filter tabs, blinking NEW! on repos pushed within 7 days.
- Blessing/heart counter on the shrine: click to add a heart, stored locally.

## Architecture

```
app/layout.tsx          fonts, UwuProvider, Sparkles, Oneko, KonamiCode, frame shell
app/globals.css         entire retro kawaii system (tokens, bevels, windows, tables)
app/page.tsx            shrine home: VN intro, about table, what's new, shrine lineup
app/projects/page.tsx   repo table with filters
app/skills/page.tsx     skill collection cards
app/qna/page.tsx        chat-bubble Q&A
components/PixelWaifu   SVG sprite renderer (sprite map + palette + expression)
components/DialogBox    VN typewriter box
components/Sparkles     cursor trail
components/RetroWindow  bevelled window with collapsible title bar
components/Marquee, HitCounter, Badges, BgmButton, UwuToggle, KonamiCode,
           SideNav, Footer, Shrine, WhatsNew, NewTag
lib/uwu.ts              uwuify(text, level, seed) + React context/hook
lib/sprites.ts          sprite maps, palettes, expressions, applyPatches
lib/chiptune.ts         melody data + scheduler on Web Audio
lib/github.ts           unchanged feed client (kept)
lib/use-feed.ts         unchanged
```

## Copy voice

First person, Holy's voice, casual. Plain strings in source. uwu level 1 does
r/l to w, n+vowel to ny, "ove" to "uv", occasional stutter and a suffix sparkle.
Level 2 adds "th" to "d", more stutters, more suffixes. Proper nouns that must stay
readable (GitHub, repo names, URLs) are rendered outside the uwu path.

## Testing

Vitest for pure logic: `lib/uwu.ts`, `lib/sprites.ts`, `lib/chiptune.ts`,
`lib/github.ts`. Components verified by build, lint, type-check, and Librewolf
screenshots of every route at desktop and mobile widths.

## Out of scope

Custom domain, backend, forms, real guestbook, audio assets, generated imagery.
