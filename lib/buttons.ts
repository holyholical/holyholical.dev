import { GITHUB_PROFILE_URL } from "./github";
import { BASE_PATH, SITE_URL } from "./site";

/** Folder under public/ that holds the 88×31 GIFs. */
export const BUTTON_DIR = "buttons";

export interface WebButton {
  /** File name inside public/buttons. */
  file: string;
  /** What a screen reader (or a 1998 text browser) gets instead of the picture. */
  alt: string;
  /** Where the button goes when clicked. Purely decorative buttons have none. */
  href?: string;
}

/** The shrine's own button, for other people's walls. Drawn by scripts/make-site-button.py. */
export const SITE_BUTTON: WebButton = {
  file: "holyholical.gif",
  alt: "holyholical.dev",
  href: `${SITE_URL}/`,
};

/**
 * Rescued from the cyber.dabamos.de archive, which asks that you copy rather than hot-link. So we did.
 * Roughly grouped: what it's made with, how to view it, what it runs on, and the cute stuff.
 */
export const BUTTONS: readonly WebButton[] = [
  { file: "github.gif", alt: "GitHub", href: GITHUB_PROFILE_URL },
  { file: "madewithvi.gif", alt: "Made with vi" },
  { file: "vim.gif", alt: "This site powered by vim", href: "https://www.vim.org/" },
  { file: "built_with_microsoft_notepad.gif", alt: "Built with Microsoft Notepad" },
  { file: "handpainted.gif", alt: "Hand painted" },
  { file: "javascript.gif", alt: "JavaScript now!" },
  { file: "powered-cpp.gif", alt: "C++" },
  { file: "poweredbyasm_88x31.gif", alt: "Powered by ASM" },
  { file: "valid-html5.gif", alt: "W3C valid HTML 5", href: "https://validator.w3.org/" },
  { file: "css3.gif", alt: "Made with Cascading Style Sheets" },

  { file: "any_browser.gif", alt: "Any browser, any OS" },
  { file: "best_viewed_with_eyes.gif", alt: "Best viewed with eyes" },
  { file: "800x600.gif", alt: "Best viewed at 800 by 600" },
  { file: "netscape_now.gif", alt: "Netscape now!" },
  { file: "firefox.gif", alt: "Get Firefox", href: "https://www.mozilla.org/firefox/" },
  { file: "blink.gif", alt: "Blink web engine" },
  { file: "nocookie.gif", alt: "This site is certified 100% cookie free" },

  { file: "archlinux.gif", alt: "Arch Linux", href: "https://archlinux.org/" },
  { file: "gnu-linux.gif", alt: "Made on GNU/Linux" },
  { file: "pgp-now.gif", alt: "Privacy now! PGP" },
  { file: "tor.gif", alt: "Tor", href: "https://www.torproject.org/" },

  { file: "kawaiibutton.gif", alt: "Kawaii" },
  { file: "kawaiiness.gif", alt: "Kawaiiness" },
  { file: "otaku.gif", alt: "Otaku World" },
  { file: "animeland.gif", alt: "Anime Land" },
  { file: "sailormoonmicrobar.gif", alt: "Sailor Moon" },
  { file: "neko.gif", alt: "Neko, the cat's tail" },
  { file: "neko-b.gif", alt: "Nekoscape '98, nyan!" },
  { file: "machine_cat.gif", alt: "machine_cat.exe" },

  { file: "geocities.gif", alt: "GeoCities" },
  { file: "neocities-pink.gif", alt: "Neocities, the web is yours", href: "https://neocities.org/" },
  { file: "winamp.gif", alt: "Nullsoft Winamp" },
  { file: "guestbook.gif", alt: "The guestbook (there is no guestbook)" },
  { file: "undercon.gif", alt: "Under construction" },
];

/** Public path for a button GIF, basePath included so GitHub Pages resolves it. */
export function buttonSrc(file: string): string {
  return `${BASE_PATH}/${BUTTON_DIR}/${file}`;
}

/** The one-liner other webmasters paste to link back here. */
export function embedSnippet(): string {
  const src = `${SITE_URL}/${BUTTON_DIR}/${SITE_BUTTON.file}`;
  return `<a href="${SITE_URL}/"><img src="${src}" alt="${SITE_BUTTON.alt}" width="88" height="31"></a>`;
}
