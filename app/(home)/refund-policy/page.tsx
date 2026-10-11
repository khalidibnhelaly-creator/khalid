import type { Metadata } from "next";
import { Clause, PageShell } from "@/components/topzid/legal";
import { brand } from "@/lib/topzid";

export const metadata: Metadata = {
  title: { absolute: "Refund Policy | TOPZID" },
  description: "Refund rules for the One Man AI OS Masterclass, Season 1 recordings, the Aurafarming webinar, consulting and TOPZID studio services.",
  alternates: { canonical: "https://www.topzid.com/refund-policy" },
};

const EFFECTIVE = "11 October 2026";

const TOC = [
  { id: "summary", label: "Summary" },
  { id: "masterclass", label: "Masterclass (live)" },
  { id: "recordings", label: "Season 1 recordings" },
  { id: "webinar", label: "Aurafarming webinar" },
  { id: "consult", label: "Consulting session" },
  { id: "studio", label: "Studio services" },
  { id: "duplicate", label: "Duplicate payments" },
  { id: "how", label: "How to request a refund" },
];

export default function RefundPolicy() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Refund policy"
      lede="Clear rules for every product, so you know exactly where you stand before you pay. If you are unsure, ask us before paying, not after."
      updated={EFFECTIVE}
      toc={TOC}
    >
      <Clause id="summary" title="Summary">
        <dl className="dl">
          <dt>Masterclass (live)</dt>
          <dd>Full refund if requested within 24 hours of your WhatsApp confirmation</dd>
          <dt>Season 1 recordings</dt>
          <dd>Full refund until your access link is sent. Final after that</dd>
          <dt>Aurafarming webinar</dt>
          <dd>Non-refundable once your payment is confirmed. Full refund if we cancel</dd>
          <dt>Consulting session</dt>
          <dd>Full refund or one reschedule up to 48 hours before the session. Non-refundable after that</dd>
          <dt>Studio services</dt>
          <dd>As set out in your written quote or agreement</dd>
          <dt>Duplicate payments</dt>
          <dd>Always refunded in full</dd>
        </dl>
      </Clause>

      <Clause id="masterclass" title="One Man AI OS Masterclass (live cohort)">
        <div className="callout">
          <p>
            You have <b>24 hours from the moment your payment is confirmed</b> to request a full refund. After that, no
            refund is issued. This is a live, cohort-based program with a fixed number of seats, and your seat is held
            for you from the moment your payment lands.
          </p>
        </div>
        <h3>When the 24 hours start</h3>
        <p>
          The clock starts when you receive a WhatsApp message from Team Khalid confirming that your payment is verified
          and your seat is locked. Not when you submit the payment form, and not when you transfer the money. If you have
          not received that confirmation within 24 hours of paying, message us first: your payment may still be
          pending verification.
        </p>
        <h3>Not refundable</h3>
        <ul>
          <li>Requests made more than 24 hours after payment confirmation</li>
          <li>Scholarship seats, which are free</li>
          <li>Paying and then not attending sessions</li>
          <li>Requests made after attending one or more sessions</li>
          <li>Dissatisfaction with content after attending a session</li>
        </ul>
        <h3>If we cancel</h3>
        <p>
          If we cancel the program entirely before it begins, every paying member receives a full refund within 7
          business days, with no conditions. If a single session is rescheduled rather than cancelled, no refund applies.
        </p>
        <h3>Completion guarantee</h3>
        <p>
          The masterclass carries a separate completion guarantee: attend all sessions, submit the weekly work and ship
          your reel. If you meet those conditions and still do not leave with a working system and a portfolio-grade
          reel, you receive a full refund regardless of how much time has passed. The guarantee is honoured on its own
          terms. This policy covers every other situation.
        </p>
      </Clause>

      <Clause id="recordings" title="One Man AI OS Masterclass: Season 1 recordings">
        <p>
          The recordings are a digital product. Until we send your access link, you can cancel and receive a full
          refund. Once the access link is sent, the purchase is final. Please watch the free session on the Season 1
          page before buying, so you know exactly what you are getting.
        </p>
        <p>
          If a recording is missing or does not play, tell us and we will fix it or replace it. That is not affected by
          this policy.
        </p>
      </Clause>

      <Clause id="webinar" title="Aurafarming live webinar">
        <ul>
          <li>Seats are non-refundable once your payment is confirmed.</li>
          <li>If we cancel the webinar, everyone who paid receives a full refund.</li>
          <li>If we move the webinar to a new date or time, your seat carries over to the new session.</li>
        </ul>
        <p>
          VOSU Creator Grants are VOSU credits awarded under the rules on the webinar page. They have no cash value and
          are not part of what you pay for, so they are not refundable or exchangeable for money.
        </p>
      </Clause>

      <Clause id="consult" title="Consulting session">
        <ul>
          <li>Applying is free. You pay only if your application is accepted.</li>
          <li>Up to 48 hours before your session, you can cancel for a full refund or reschedule once.</li>
          <li>Less than 48 hours before the session, or after it has taken place, the fee is not refundable.</li>
          <li>If we cancel or cannot hold the session, you choose a new time or a full refund.</li>
        </ul>
      </Clause>

      <Clause id="studio" title="Studio services">
        <p>
          For commercials, brand films, training and other client work, payment terms, deposits, revisions and
          cancellation are set out in your written quote or agreement. Where that document says something different
          from this page, the document applies.
        </p>
      </Clause>

      <Clause id="duplicate" title="Duplicate payments and overpayments">
        <p>
          If you pay twice for the same thing, or pay more than the listed price, the extra amount is refunded in full,
          whatever product it is.
        </p>
      </Clause>

      <Clause id="how" title="How to request a refund">
        <ul>
          <li>
            Message us on WhatsApp at{" "}
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer">{brand.whatsappDisplay}</a>{" "}
            or email <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </li>
          <li>Include your reference code (for example AF-7LQZ or OPR-7LQZ) and your transaction ID.</li>
          <li>Say clearly that you are requesting a refund.</li>
        </ul>
        <p>
          Approved refunds are paid within 5 business days, using the same method you paid with: bank transfer, bKash
          or Nagad.
        </p>
      </Clause>
    </PageShell>
  );
}
