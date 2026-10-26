/**
 * One Man Agency: free live class (with VOSU). Single source of truth for
 * dates, links and the optional live prize. Used by /onemanagency and the
 * homepage live bar / program card.
 */
export const OMA = {
  title: "One Man Agency",
  url: "https://www.topzid.com/oma",
  /** 8:00 PM Dhaka (GMT+6), Friday 27 November 2026. */
  startsAt: "2026-11-27T20:00:00+06:00",
  durationMin: 240,
  /** Registration closes when the class starts. Set true to close early. */
  closed: false,
  /** Where people watch. Fill in the stream links when they exist. */
  watch: { youtube: "", facebook: "" },
  /**
   * Live-only prize. Leave empty until it is confirmed in writing; the prize
   * line only renders when this has text.
   */
  prize: "",
  vosu: {
    signup:
      "https://vosu.ai/?ref=thekhalidway&utm_source=topzid&utm_medium=referral&utm_campaign=onemanagency",
  },
} as const;

export function vosuLink(placement: string) {
  return `${OMA.vosu.signup}&utm_content=${encodeURIComponent(placement)}`;
}

/** Start and end in UTC, for calendar links. */
export function omaTimes() {
  const start = new Date(OMA.startsAt);
  const end = new Date(start.getTime() + OMA.durationMin * 60_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return { start, end, startUtc: fmt(start), endUtc: fmt(end) };
}
