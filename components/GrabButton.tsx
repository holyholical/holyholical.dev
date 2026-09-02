"use client";

import { useEffect, useRef, useState } from "react";
import WebButton from "@/components/WebButton";
import { embedSnippet, SITE_BUTTON } from "@/lib/buttons";
import { useShrine } from "@/lib/shrine-context";

const COPIED_MS = 1800;

type CopyState = "idle" | "copied" | "failed";

/** The shrine's own button plus the HTML to paste it elsewhere. Link exchange, 1998 style. */
export default function GrabButton() {
  const { t } = useShrine();
  const [state, setState] = useState<CopyState>("idle");
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const snippet = embedSnippet();

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), COPIED_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setState("copied");
    } catch {
      // No clipboard permission or API. Select the text so a manual copy is one keystroke away.
      codeRef.current?.select();
      setState("failed");
    }
  };

  const label = state === "copied" ? t("copied!") : state === "failed" ? t("select & copy") : t("copy");

  return (
    <div className="grab">
      <p className="grab__legend">{t("link me!")}</p>
      <div className="grab__preview">
        <WebButton button={{ ...SITE_BUTTON, href: undefined }} />
      </div>
      <textarea
        ref={codeRef}
        className="grab__code"
        readOnly
        rows={4}
        value={snippet}
        aria-label={t("HTML to embed this site's button")}
        onFocus={(event) => event.currentTarget.select()}
      />
      <button type="button" className="btn btn--tiny grab__copy" onClick={copy} aria-live="polite">
        {label}
      </button>
    </div>
  );
}
