"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * The homepage is statically rendered at deploy time, but program dates are
 * live (price deadlines, go-live times). These helpers resolve against the
 * visitor's clock after hydration. The server snapshot is "before", so the
 * pre-deadline state is what ships in HTML and search engines see.
 */
function useIsPast(iso: string) {
  const at = new Date(iso).getTime();
  // Stable subscribe so React doesn't resubscribe on every render.
  const subscribe = useCallback(
    (notify: () => void) => {
      const ms = at - Date.now();
      if (ms <= 0 || ms > 2 ** 31 - 1) return () => {};
      const t = setTimeout(notify, ms + 500);
      return () => clearTimeout(t);
    },
    [at]
  );
  return useSyncExternalStore(subscribe, () => Date.now() >= at, () => false);
}

/** Status label that flips from `before` to `after` at `until`. */
export function TimeStatus({ before, after, until }: { before: string; after: string; until: string }) {
  const past = useIsPast(until);
  return <span className={`status${past ? " is-off" : ""}`}>{past ? after : before}</span>;
}

/** Renders children only until `until`; then disappears. */
export function Until({ until, children }: { until: string; children: React.ReactNode }) {
  const past = useIsPast(until);
  return past ? null : <>{children}</>;
}
