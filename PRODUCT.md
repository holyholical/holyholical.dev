# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Mixed, no priority: recruiters sizing up a developer, other developers who arrived from a repo or a post, and friends or community members visiting a personal home base. No audience is optimized for over another.

## Product Purpose
holyholical.dev is Holy's personal developer portfolio. It exists to show who Holy is and what they are building, with an always-current view of their work. Success is a visitor leaving with an accurate picture of Holy's projects and a way to explore or reach out.

## Positioning
The live project showcase is the core: projects are pulled at runtime from the GitHub API for the `holyholical` account rather than hand-maintained, so the site never goes stale relative to what is actually being built.

## Operating Context
- Statically exported Next.js site deployed to GitHub Pages via `.github/workflows/deploy.yml`; served under the `/holyholical.dev` basePath at https://holyholical.github.io/holyholical.dev/.
- Project data comes from `https://api.github.com/users/holyholical/repos?sort=updated` in the browser at page load (unauthenticated, rate-limited).
- Visitors browse a small set of top-level routes from a persistent top bar: home, projects, qna, skills.

## Capabilities and Constraints
- Confirmed: static hosting only, no backend, now or planned. Nothing may depend on a server, an API route, a filesystem, or a bot process.
- Confirmed: the Q&A page keeps a curated static list of questions and answers. The submission form is dropped entirely; no third-party form endpoint.
- Confirmed: the keys page (PGP and SSH public keys) and the donate page (crypto addresses) are to be fully removed, including their nav entries and the footer donate link. Do not migrate, display, or reference those keys or addresses anywhere.
- Consequence of the above: `lib/telegram-bot.ts` and `lib/questions-storage.ts` have no runnable home on this platform and are dead code once the form is gone.
- Home page: a stepped self-introduction (five short lines, advanced by a button, with a reset).
- Skills page: a fixed grid of languages and frameworks (HTML, CSS, JavaScript, TypeScript, Next.js/React, C++, C#, C, Python, Assembly) with icons from the devicon CDN and outbound reference links.
- Open decision: whether and when the github.io URL moves to a custom domain (would remove the basePath). Not decided; do not assume it.
- Terminology: the author goes by "Holy"; the GitHub handle and site name are `holyholical`.

## Brand Commitments
- Name: holyholical.dev; author name "Holy".
- Existing personality signals in the incumbent build: the oneko cursor-chasing cat (`components/oneko.tsx`, `public/oneko.gif`) and a first-person, casual, self-described-introvert voice ("I'm introverted but I love talking with people."). These are evidence of voice, not binding visual constraints; no visual direction was pinned during init.
- Licensed under the repository LICENSE, linked from the footer along with the GitHub repo.

## Evidence on Hand
- Live GitHub repositories for `holyholical` (fetched at runtime; no local snapshot).
- Home page intro copy in `app/page.tsx`.
- Three curated Q&A entries in `app/qna/page.tsx` (how Holy started coding, favorite language TypeScript with React, contributes to open source).
- Skills list in `app/skills/page.tsx`.
- No testimonials, press, metrics, employers, or client work exist. Do not fabricate any.
- No custom domain is live; the README's "soon on my own domain" is aspirational, not a fact.

## Product Principles
1. Never stale: the projects surface reflects GitHub as it is right now; hand-curated project copy is a regression.
2. Static is a hard boundary: every feature must work as exported HTML and client-side JS on GitHub Pages.
3. Honest and small: only real content ships; an empty section is removed rather than padded.
4. Holy's voice stays first-person and casual; the site is a person's page, not a company's.
5. Serve every visitor type equally; no single audience gets a dedicated funnel.
