"use client";

import DialogBox, { type DialogLine } from "@/components/DialogBox";
import RetroWindow from "@/components/RetroWindow";
import Shrine from "@/components/Shrine";
import WhatsNew from "@/components/WhatsNew";
import { useShrine } from "@/lib/shrine-context";
import { CAST } from "@/lib/sprites";

const INTRO: readonly DialogLine[] = [
  { text: "Hello there! I'm Holy. Welcome to my little corner of the web.", expression: "happy" },
  { text: "I'm a developer and a tech enthusiast. I'm introverted, but I love talking with people. Really!", expression: "normal" },
  { text: "My coding journey started when I was small, and I've been fascinated by technology ever since.", expression: "wink" },
  { text: "Everything on the projects page is pulled live from my GitHub, so it never goes stale.", expression: "surprised" },
  { text: "Have a look around, click the girls, turn on the music, and reach out on GitHub if you'd like to talk!", expression: "love" },
];

const ABOUT: readonly [string, string][] = [
  ["name", "Holy"],
  ["handle", "holyholical"],
  ["type", "introvert who loves talking with people"],
  ["favourite language", "TypeScript with React"],
  ["also speaks", "C, C++, C#, Python, a little Assembly"],
  ["open source", "yes, and I love learning from the community"],
  ["status", "always building something"],
];

/** The shrine's front room: the VN intro, an about table, what's new, and the cast. */
export default function Home() {
  const { t } = useShrine();
  return (
    <>
      <RetroWindow title={t("hello!!")} icon="chat" headingId="intro-title">
        <DialogBox speaker={CAST[0]} lines={INTRO} />
      </RetroWindow>

      <div className="two-up">
        <RetroWindow title={t("about me")} icon="card" headingId="about-title">
          <table className="table table--kv">
            <tbody>
              {ABOUT.map(([key, value]) => (
                <tr key={key}>
                  <th scope="row">{t(key)}</th>
                  <td>{key === "handle" || key === "name" ? value : t(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RetroWindow>

        <RetroWindow title={t("what's new")} icon="disk" headingId="new-title">
          <WhatsNew />
        </RetroWindow>
      </div>

      <RetroWindow title={t("the shrine")} icon="torii" headingId="shrine-title">
        <Shrine />
      </RetroWindow>
    </>
  );
}
