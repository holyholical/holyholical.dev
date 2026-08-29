"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchFeed, type FeedState } from "@/lib/github";

const LOADING: FeedState = { status: "loading" };

/** Loads the live repo feed once per mount and exposes a retry for the error state. */
export function useFeed() {
  const [state, setState] = useState<FeedState>(LOADING);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchFeed(controller.signal).then((next) => {
      if (!controller.signal.aborted) setState(next);
    });
    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setState(LOADING);
    setAttempt((n) => n + 1);
  }, []);

  return { state, retry };
}
