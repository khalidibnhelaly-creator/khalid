import type { Metadata } from "next";
import Link from "next/link";
import { OMA, calendarLinks } from "@/lib/oma";
import { brand } from "@/lib/topzid";

export const metadata: Metadata = {
  title: { absolute: "You're registered | One Man Agency | TOPZID" },
  robots: { index: false, follow: false },
};

/**
 * Confirmation for registrations that came through the plain form post
 * (phones whose browser could not run the page's JavaScript). Pure HTML,
 * no client JavaScript needed.
 */
export default async function Registered({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
  const first = one(sp.n).replace(/[^\p{L}\p{M}\s'.-]/gu, "").slice(0, 40) || "friend";
  const repeat = one(sp.r) === "1";
  const { google, icsHref } = calendarLinks();
  const shareText = `I'm joining ONE MAN AGENCY, a free live class by Khalid Bin Helaly. Fri 27 Nov, 8 PM. Register free: ${OMA.url}`;

  return (
    <main className="oma-sec" style={{ minHeight: "100vh", borderBottom: 0 }}>
      <div className="wrap" style={{ maxWidth: 720 }}>
        <Link href="/oma" className="lbl" style={{ textDecoration: "none" }}>← One Man Agency</Link>
        <div className="oma-done" role="status" style={{ marginTop: 24 }}>
          <span className="lbl" style={{ color: "var(--ok)" }}>{repeat ? "Already registered" : "Registered"}</span>
          <h1 className="disp" style={{ fontSize: "clamp(40px, 9vw, 64px)", margin: "12px 0 14px" }}>You&apos;re in, {first}.</h1>
          <p>
            {repeat ? "This WhatsApp number is already on the list, so you are all set. " : "Your seat is confirmed. "}
            We will add you to the class WhatsApp group and email you the joining link before we go live on Friday,
            27 November at 8:00 PM Dhaka.
          </p>
          <div className="acts">
            <a className="btn btn-fg" href={google} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
            <a className="btn btn-line" href={icsHref} download="one-man-agency.ics">Apple / Outlook calendar</a>
            <a className="btn btn-line" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
            <a className="btn btn-line" href="/oma">Back to the class page</a>
          </div>
          <p className="tip">
            <b>Save {brand.whatsappDisplay} in your contacts</b> so you can be added to the group, and check your
            email (and spam folder) for the joining link.
          </p>
          <p style={{ marginTop: 16, fontSize: 14 }}>
            The class is free. If you want to support it, there is an optional{" "}
            <a href="/oma/support" style={{ color: "var(--fg)" }}>donation box</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
