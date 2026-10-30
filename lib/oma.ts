/**
 * One Man Agency: free live class. Single source of truth for
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
  /** VOSU is paused for this class (not on the page). Kept for a quick re-add. */
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

/** Google Calendar link and an .ics data URL for the class. */
export function calendarLinks() {
  const { startUtc, endUtc } = omaTimes();
  const title = "One Man Agency: free live class with Khalid Bin Helaly";
  const details = `Free live class with Khalid Bin Helaly. The joining link comes by email. ${OMA.url}`;
  const google =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}&dates=${startUtc}/${endUtc}` +
    `&details=${encodeURIComponent(details)}&location=${encodeURIComponent(OMA.url)}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TOPZID//One Man Agency//EN",
    "BEGIN:VEVENT",
    `UID:oma-20261127@topzid.com`,
    `DTSTAMP:${startUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `URL:${OMA.url}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:One Man Agency starts in 30 minutes",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return { google, icsHref: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` };
}
