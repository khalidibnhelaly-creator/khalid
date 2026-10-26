"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { OMA } from "@/lib/oma";

const pad = (n: number) => String(n).padStart(2, "0");

/** Days / hours / minutes / seconds until the class. Hidden once it starts. */
export function Countdown() {
  const end = new Date(OMA.startsAt).getTime();
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [end]);
  if (left === null || left <= 0) return null;
  const s = Math.floor(left / 1000);
  const cells: [string, number][] = [
    ["Days", Math.floor(s / 86400)],
    ["Hrs", Math.floor((s % 86400) / 3600)],
    ["Min", Math.floor((s % 3600) / 60)],
    ["Sec", s % 60],
  ];
  return (
    <div className="oma-cd" aria-hidden="true">
      {cells.map(([k, v]) => (
        <div key={k}>
          <b>{pad(v)}</b>
          <span>{k}</span>
        </div>
      ))}
    </div>
  );
}

/** "That's 3:00 PM where you are" for visitors outside Dhaka time. */
function localLabel() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz || tz === "Asia/Dhaka") return "";
    const t = new Date(OMA.startsAt).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true });
    return `${t} your time`;
  } catch {
    return "";
  }
}
const noop = () => () => {};

export function LocalTime() {
  const txt = useSyncExternalStore(noop, localLabel, () => "");
  return txt ? <span className="local">{txt}</span> : null;
}
