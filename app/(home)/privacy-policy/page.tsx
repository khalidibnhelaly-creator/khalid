import type { Metadata } from "next";
import { Clause, PageShell } from "@/components/topzid/legal";
import { brand } from "@/lib/topzid";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | TOPZID" },
  description: "What TOPZID collects, why, who it is shared with, how long it is kept, and how to ask for it to be changed or deleted.",
  alternates: { canonical: "https://www.topzid.com/privacy-policy" },
};

const EFFECTIVE = "11 October 2026";

const TOC = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "What we collect" },
  { id: "use", label: "How we use it" },
  { id: "share", label: "Who we share it with" },
  { id: "transfers", label: "Where it is stored" },
  { id: "retention", label: "How long we keep it" },
  { id: "rights", label: "Your choices and rights" },
  { id: "security", label: "Security" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicy() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      lede="What we collect, why we collect it, who sees it, and how to ask us to change or delete it. Written plainly, so you can read it in five minutes."
      updated={EFFECTIVE}
      toc={TOC}
    >
      <Clause id="who" title="Who we are">
        <p>
          TOPZID is an AI production studio operated by Khalid Bin Helaly in Dhaka, Bangladesh (&ldquo;TOPZID&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy covers topzid.com and every page on it, including our studio
          services, the One Man AI OS Masterclass, the Season 1 recordings, the Aurafarming webinar and our workshops,
          as well as the messages we exchange with you on WhatsApp and email.
        </p>
      </Clause>

      <Clause id="collect" title="What we collect">
        <h3>When you contact us</h3>
        <p>
          The project brief form on our homepage does not store anything on our servers. It opens WhatsApp or your
          email app with your message pre-filled, and we receive only what you choose to send: usually your name,
          company, email, WhatsApp number and project details.
        </p>

        <h3>When you buy a program, course or webinar seat</h3>
        <ul>
          <li>Your name, WhatsApp number and email address</li>
          <li>What you are buying and the amount</li>
          <li>Payment method, transaction ID, the number or account you paid from, and the reference code we generate for you</li>
        </ul>
        <p>We never ask for card numbers, PINs or banking passwords. Payments are sent by you directly through your bank, bKash or Nagad.</p>

        <h3>When you register for the Aurafarming webinar</h3>
        <p>In addition to the purchase details above:</p>
        <ul>
          <li>Your role (for example student, freelancer or agency)</li>
          <li>Your portfolio or social media link</li>
          <li>What you want to create with AI</li>
          <li>Whether you already have a VOSU account</li>
          <li>Your consent to share your registration details with VOSU, the co-host of the event</li>
          <li>How you found the page: campaign tags in the link (such as utm_source), the website that referred you, and the page you first landed on</li>
        </ul>
        <p>
          We calculate a simple score from your role, portfolio link and answer to help us shortlist people for VOSU
          Creator Grants. The public selection rules on the webinar page always apply.
        </p>

        <h3>When you take part in the Creator Grants</h3>
        <ul>
          <li>Code word submissions: your registered email, your VOSU account email, the code word you entered and the time</li>
          <li>Challenge entries: the link to your post and any note you add</li>
        </ul>

        <h3>Applications and scholarships</h3>
        <p>Your written answers and any video links you submit, used only to evaluate your application and tell you the result.</p>

        <h3>Collected automatically</h3>
        <ul>
          <li>
            <b>Analytics and ad measurement.</b> Our pages load Google Tag Manager, which we use to run analytics and
            advertising measurement tools, such as Google Analytics and the Meta Pixel where enabled. These tools may set
            cookies and collect information about your device, browser and how you use our pages.
          </li>
          <li>
            <b>Campaign attribution in your browser.</b> On the webinar pages we save the campaign tags and referring
            website from your first visit in your browser&apos;s local storage for 30 days, so we know which channel
            brought you if you register later. It stays on your device until you register, it expires, or you clear
            your browser data.
          </li>
          <li>
            <b>Videos and fonts.</b> YouTube videos on our pages load only after you press play, using YouTube&apos;s
            privacy-enhanced mode. Some pages load fonts from Google Fonts, which receives your IP address when they load.
          </li>
        </ul>
      </Clause>

      <Clause id="use" title="How we use it">
        <ul>
          <li>To verify your payment, confirm your seat or access, and send joining links, recordings and updates</li>
          <li>To reply to project briefs and prepare quotes</li>
          <li>To run the Creator Grants: verify attendance, shortlist, and contact grant recipients</li>
          <li>To understand which channels and campaigns bring people in, and to report total numbers to our event partners</li>
          <li>To handle refund requests and keep accounting records</li>
          <li>To improve our pages and programs</li>
        </ul>
        <p><b>We do not sell your personal data.</b></p>
      </Clause>

      <Clause id="share" title="Who we share it with">
        <h3>VOSU, for Aurafarming registrants</h3>
        <p>
          VOSU is the co-host of the Aurafarming webinar. If you register for it, your registration details and any
          Creator Grant submissions are shared with VOSU so it can run the event and the credit grants, and contact you
          about VOSU. You give this consent when you register, and registration is not possible without it. Once shared,
          VOSU handles your data under its own privacy policy. We also share total numbers with VOSU, such as
          registrations by channel, that do not identify you.
        </p>

        <h3>Service providers who work on our behalf</h3>
        <ul>
          <li><b>Supabase</b> stores our database</li>
          <li><b>Vercel</b> hosts our website</li>
          <li><b>Google</b> provides Tag Manager, Analytics, Fonts and YouTube</li>
          <li><b>Meta</b> provides WhatsApp, which we use to talk to you, and ad measurement where enabled</li>
        </ul>

        <h3>Payment providers</h3>
        <p>BRAC Bank, bKash and Nagad process the transfer you make. We receive only the transaction details needed to match your payment.</p>

        <h3>When the law requires it</h3>
        <p>We may disclose information if required by law, or to protect our rights or someone&apos;s safety.</p>
      </Clause>

      <Clause id="transfers" title="Where it is stored">
        <p>
          Our database is hosted by Supabase in Sydney, Australia. Our website is hosted by Vercel, and our other
          providers may process data in the United States and other countries. By using our services, you understand
          that your information is processed outside Bangladesh.
        </p>
      </Clause>

      <Clause id="retention" title="How long we keep it">
        <ul>
          <li><b>Purchase and payment records:</b> up to 3 years, for accounting and dispute handling</li>
          <li><b>Webinar registration and grant data:</b> up to 24 months after the event, then deleted or made anonymous</li>
          <li><b>Scholarship submissions:</b> deleted within 90 days of results being announced</li>
          <li><b>Campaign attribution in your browser:</b> 30 days</li>
        </ul>
        <p>You can ask us to delete your data earlier at any time. See the next section.</p>
      </Clause>

      <Clause id="rights" title="Your choices and rights">
        <p>You can ask us to:</p>
        <ul>
          <li>Tell you what data we hold about you and give you a copy</li>
          <li>Correct anything that is wrong</li>
          <li>Delete your data, except records we must keep for accounting</li>
          <li>Stop sending you messages</li>
          <li>Stop sharing your details with VOSU going forward. For data VOSU already holds, contact VOSU as well</li>
        </ul>
        <p>
          Message us on WhatsApp or email us (details below). We reply within 5 business days. You can also block
          cookies or clear local storage in your browser settings.
        </p>
      </Clause>

      <Clause id="security" title="Security">
        <p>
          We use established providers for hosting and storage, keep what we collect to what we need, and never ask
          for card details or banking passwords. No method of storing or sending data online is completely secure. If
          we learn of a breach that affects your data, we will tell you.
        </p>
      </Clause>

      <Clause id="children" title="Children">
        <p>
          Our services are not meant for children under 13. If you are under 18, please get permission from a parent or
          guardian before buying or registering.
        </p>
      </Clause>

      <Clause id="changes" title="Changes to this policy">
        <p>
          When we change this policy, we update the effective date at the top. If a change is significant, we will tell
          current program members on WhatsApp before it takes effect.
        </p>
      </Clause>

      <Clause id="contact" title="Contact">
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
