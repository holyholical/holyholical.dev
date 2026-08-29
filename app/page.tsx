"use client";

/*
 * THESIS: the home page is the rack, not a page about the rack. Every repository is a
 * seed packet standing in a slot; the feed's liveness is physical (recent packets lean
 * out). It refuses the hero-plus-cards portfolio and the dark terminal.
 * OWN-WORLD: rack green ground with wire shelves; paper packets with a linguist-colored
 * band, a misregistered two-color plant print, a condensed grotesque variety name and a
 * red packing stamp; white clipped tags for hand-set copy.
 * STORY: "this person is growing things right now"; the visitor picks a packet and lands
 * on the repository.
 * FIRST VIEWPORT: hung sign (name + one line), aisle strip, top shelf with the intro tag
 * beside the cat, then the first shelf of packets, the three newest leaning forward.
 * FORM: Seed Rack, sixth of seven grounded directions, seed key 8f5bddec.
 */

import Rack from "@/components/Rack";
import ShelfTag from "@/components/ShelfTag";
import { tendedLabel } from "@/lib/github";
import { useFeed } from "@/lib/use-feed";

export default function Home() {
  const { state, retry } = useFeed();
  return (
    <>
      <section className="top-shelf" aria-label="About Holy">
        <ShelfTag heading="Hello there, I'm Holy.">
          <p>
            A passionate developer and tech enthusiast. I&apos;m introverted but I love talking with people. My coding
            journey began at a young age, and I&apos;ve been fascinated by technology ever since.
          </p>
          <p>
            On this rack you&apos;ll find my projects, a growing guide of what I work in, and a few questions people
            have asked me. Feel free to explore and reach out if you&apos;d like to connect!
          </p>
        </ShelfTag>
        {state.status === "ready" ? (
          <p className="rack-label">
            <strong className="rack-label__count">{state.repos.length}</strong>
            <span className="rack-label__text">
              {state.repos.length === 1 ? "variety" : "varieties"} on the rack
              <br />
              {tendedLabel(state.repos[0].pushedAt)}
            </span>
          </p>
        ) : null}
      </section>

      <section className="shelf" aria-labelledby="rack-title">
        <div className="shelf__head">
          <h2 id="rack-title" className="shelf__title">
            On the rack
          </h2>
          <p className="shelf__note">Most recently tended first. Turn a packet over for the sowing instructions.</p>
        </div>
        <Rack state={state} retry={retry} />
      </section>
    </>
  );
}
