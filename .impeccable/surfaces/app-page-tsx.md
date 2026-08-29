---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/projects/page.tsx"]
---

Scope: the home route (app/page.tsx). Visitor mode: Experience; the live work leads.

Audience and job: mixed visitors (devs, recruiters, friends) landing cold; the job is to see what Holy is building right now and open a repo.
Action: open a repository on GitHub. Secondary: read who Holy is (shelf tag), move to skills or Q&A.
Proof/content: the live GitHub repo feed for holyholical (runtime fetch, sorted by pushed_at); Holy's intro copy; the oneko cat.
Constraints: static export, unauthenticated GitHub API (rate-limited; error state must name the recovery); no stars or invented numbers.

Direction: the Seed Rack. The first viewport is the rack itself: header sign, aisle strip, then shelves of packets with the three most recently pushed leaning forward. No hero, no headline claim.
Memorable moment: packets sliding down into their slots when the feed lands, and a packet flipping to its sowing-instructions back on hover/focus.
Unresolved: whether /projects stays a separate catalogue view once the feed exceeds one rack (currently 8 repos, so home shows everything).
