import type { Metadata } from "next";
import Link from "next/link";
import { Clause, PageShell } from "@/components/topzid/legal";
import { brand } from "@/lib/topzid";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | TOPZID" },
  description: "The terms for using topzid.com and buying TOPZID studio services, programs, courses and webinars.",
  alternates: { canonical: "https://www.topzid.com/terms" },
};

const EFFECTIVE = "11 October 2026";

const TOC = [
  { id: "agreement", label: "Agreement" },
  { id: "studio", label: "Studio services" },
  { id: "programs", label: "Programs, courses and webinars" },
  { id: "payments", label: "Prices and payment" },
  { id: "refunds", label: "Refunds" },
  { id: "grants", label: "Grants and partner offers" },
  { id: "conduct", label: "Acceptable use" },
  { id: "ip", label: "Intellectual property" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limitation of liability" },
  { id: "law", label: "Governing law" },
  { id: "changes", label: "Changes and contact" },
];

export default function Terms() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      lede="The agreement between you and TOPZID when you use this website or buy anything from us."
      updated={EFFECTIVE}
      toc={TOC}
    >
      <Clause id="agreement" title="Agreement">
        <p>
          These terms apply when you use topzid.com or buy our studio services, programs, recorded courses or webinars.
          TOPZID is operated by Khalid Bin Helaly in Dhaka, Bangladesh (&ldquo;TOPZID&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;). By using the site or paying for anything, you agree to these terms, our{" "}
          <Link href="/refund-policy">refund policy</Link> and our <Link href="/privacy-policy">privacy policy</Link>.
        </p>
      </Clause>

      <Clause id="studio" title="Studio services">
        <p>
          Commercials, brand films, training and other client work are delivered under a written quote or agreement
          that sets the scope, price, timeline and number of revisions. Where that document differs from these terms,
          the document applies.
        </p>
        <ul>
          <li>
            <b>Your materials.</b> You confirm that you have the rights to everything you give us to use, such as
            logos, product images, scripts, music and the likeness of any person.
          </li>
          <li>
            <b>Ownership.</b> Unless agreed otherwise in writing, the rights to final deliverables pass to you once the
            project is paid in full. We keep our own tools, prompts, workflows and know-how.
          </li>
          <li>
            <b>Portfolio.</b> We may show finished work in our portfolio and on social media unless you ask us in
            writing not to, or the agreement says otherwise.
          </li>
          <li>
            <b>Approval.</b> AI-generated content can contain errors. You are responsible for reviewing and approving
            final deliverables, including claims, text and likenesses, before you publish them.
          </li>
        </ul>
      </Clause>

      <Clause id="programs" title="Programs, courses and webinars">
        <ul>
          <li>
            <b>Personal access.</b> Your seat, joining link and access to recordings are for you only. Do not share,
            resell or re-upload them.
          </li>
          <li>
            <b>Materials.</b> Recordings, prompt libraries, SOPs and other materials are licensed to you for your own
            learning and your own work. You may not resell them, publish them or teach them as your own course.
          </li>
          <li>
            <b>Live sessions.</b> Live sessions may be recorded. We may reschedule a session with notice; what happens
            to your payment in that case is set out in the refund policy.
          </li>
          <li>
            <b>Results.</b> We teach systems we use ourselves, but we cannot guarantee income, clients, followers or
            other outcomes. The only guarantee is the written completion guarantee for the live masterclass, described
            in the refund policy.
          </li>
        </ul>
      </Clause>

      <Clause id="payments" title="Prices and payment">
        <ul>
          <li>Prices are shown in Bangladeshi taka (৳) on each page.</li>
          <li>
            Payments are made by bank transfer, bKash or Nagad and matched by hand using the reference code we give
            you. Your seat or access is confirmed once we verify the payment.
          </li>
          <li>The price shown when you start checkout is the price you pay, even if it changes while you are paying.</li>
          <li>Please use the payment method and reference exactly as instructed so we can match your payment.</li>
        </ul>
      </Clause>

      <Clause id="refunds" title="Refunds">
        <p>
          Refunds are handled under our <Link href="/refund-policy">refund policy</Link>, which sets out the rules for
          each product.
        </p>
      </Clause>

      <Clause id="grants" title="Grants and partner offers">
        <p>
          Some events include benefits from partners, such as the VOSU Creator Grants at the Aurafarming webinar. These
          are awarded under the rules published on the event page, have no cash value, cannot be transferred and are
          not refundable. VOSU accounts and credits are governed by VOSU&apos;s own terms. The number and size of grants
          are as shown on the event page at the time of the event.
        </p>
      </Clause>

      <Clause id="conduct" title="Acceptable use">
        <p>Please do not:</p>
        <ul>
          <li>Use our site, forms or payment process for fraud or with false information</li>
          <li>Harass other members or disrupt live sessions and community groups</li>
          <li>Try to access data or parts of the site that are not meant for you, or copy the site in bulk</li>
          <li>Record or redistribute live sessions or materials without permission</li>
        </ul>
        <p>We may remove anyone from a program or community for serious or repeated breaches, without a refund.</p>
      </Clause>

      <Clause id="ip" title="Intellectual property">
        <p>
          The TOPZID name, this website and our course materials belong to TOPZID and Khalid Bin Helaly. Client logos,
          the VOSU name and logo, and other third-party marks belong to their owners and are shown to identify them.
        </p>
      </Clause>

      <Clause id="disclaimers" title="Disclaimers">
        <p>
          Information on this site is provided as is. AI tools change quickly, so specific features, prices and
          availability of third-party tools may differ from what we describe. We are not responsible for third-party
          platforms, including the services of our partners.
        </p>
      </Clause>

      <Clause id="liability" title="Limitation of liability">
        <p>
          To the extent the law allows, our total liability for any claim connected to our services is limited to the
          amount you paid us for the service the claim relates to, in the 12 months before the claim. We are not liable
          for indirect losses such as lost profits or lost opportunities. Nothing in these terms limits liability that
          cannot be limited by law.
        </p>
      </Clause>

      <Clause id="law" title="Governing law">
        <p>
          These terms are governed by the laws of Bangladesh. Any dispute will be handled by the courts of Dhaka. We
          would always prefer to sort things out directly first, so please contact us.
        </p>
      </Clause>

      <Clause id="changes" title="Changes and contact">
        <p>
          We may update these terms and will change the effective date when we do. Purchases are governed by the terms
          in place at the time you paid.
        </p>
        <dl className="dl">
          <dt>Operated by</dt>
          <dd>Khalid Bin Helaly, trading as TOPZID</dd>
          <dt>Location</dt>
          <dd>{brand.location}</dd>
          <dt>Email</dt>
          <dd><a href={`mailto:${brand.email}`}>{brand.email}</a></dd>
          <dt>WhatsApp</dt>
          <dd><a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer">{brand.whatsappDisplay}</a></dd>
        </dl>
      </Clause>
    </PageShell>
  );
}
