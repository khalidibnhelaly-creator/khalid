/* ------------------------------------------------------------------
   Aurafarming webinar: single source of truth.
   Loaded by /aurafarming, /aurafarming/pay, /aurafarming/code and
   /aurafarming/challenge.

   VOSU items marked TO CONFIRM stay empty until VOSU confirms them in
   writing. Empty means the related block does not render at all, so
   nothing unconfirmed ever ships in the page.
------------------------------------------------------------------- */
(function () {
  "use strict";

  var AF = {
    product: "Aurafarming Live Webinar (Oct 23), co-hosted with VOSU",
    price: 1000,
    seats: 2000,

    /* Webinar start, Dhaka time. Registration closes at this moment. */
    startsAt: "2026-10-23T21:00:00+06:00",

    /* Code word submissions (DB decides correctness and timing; these
       only control what the page says). */
    codeOpensAt: "2026-10-23T21:00:00+06:00",
    codeClosesAt: "2026-10-24T01:00:00+06:00",

    /* 72-hour challenge window for starter grant holders. */
    challengeOpensAt: "2026-10-23T21:00:00+06:00",
    challengeClosesAt: "2026-10-26T23:59:00+06:00",
    winnersOn: "2 November",

    /* Flip to true the moment all seats are confirmed. */
    soldOut: false,

    /* Registration closed manually by Khalid (Oct 23). true = no new seats
       anywhere; the page thanks registrants and points them to the live. */
    closed: true,
    closedMessage: "Thank you to everyone who registered. See you live tonight at 9 PM Dhaka.",

    whatsapp: "8801681096975",
    refPrefix: "AF",
    tier: "aurafarming",

    vosu: {
      url: "https://vosu.ai",

      /* Draft values from the VOSU brief. Adjust any of them here; empty
         values hide their block. */
      partnerBadge: "Official Bangladesh Partner",

      /* Khalid's VOSU referral code. When set, every VOSU link on the
         webinar pages carries it and it shows next to the signup link. */
      referralCode: "thekhalidway",
      referralParam: "ref",

      whyLine:
        "The reasons are practical. VOSU credits never expire, so nothing I pay for is wasted between projects, and its workflows and AI agents are the best I have used for production work.",

      /* The Aura Challenge (locked with VOSU). Sponsored by VOSU, live attendees only.
         Round 1 (live): 30 best hooks get perFinalist each. Round 2: films, best one wins prize. */
      challenge: {
        name: "The Aura Challenge",
        total: 800,          // USD in VOSU credits
        finalists: 30,
        perFinalist: 20,
        prize: 200,
        filmWindow: "24 to 30 October",
        winnerOn: "2 November",
        hashtag: "#AuraChallenge",
      },

      /* Buyer bonus: shown on the webinar page and, during the 48 hours after
         the session, on the Season 1 page. Empty = hidden everywhere. */
      /* Paused: not part of the campaign VOSU locked (Aura Challenge). Restore the
         sentence here to show it again on both pages. */
      buyerBonus: "",
      buyerBonusUntil: "2026-10-25T21:00:00+06:00",

      /* FAQ answer for paying VOSU in Bangladesh. */
      localPayment:
        "Not directly yet. VOSU does not accept local payment today, and bKash support is in progress. Until then, you can buy VOSU credit vouchers in taka through bKash from us. Message us on WhatsApp.",
    },
  };

  AF.isOpen = function () {
    return !AF.closed && !AF.soldOut && Date.now() < new Date(AF.startsAt).getTime();
  };
  AF.taka = function (n) {
    return "৳" + Number(n).toLocaleString("en-US");
  };
  AF.num = function (n) {
    return Number(n).toLocaleString("en-US");
  };
  /* VOSU signup link: Khalid's referral code plus UTM tags, so VOSU's
     analytics show topzid.com / aurafarming as the source and which button
     was clicked (placement = utm_content). */
  AF.vosuLink = function (placement) {
    var v = AF.vosu;
    var q = [];
    if (v.referralCode) q.push(v.referralParam + "=" + encodeURIComponent(v.referralCode));
    q.push("utm_source=topzid", "utm_medium=referral", "utm_campaign=aurafarming");
    if (placement) q.push("utm_content=" + encodeURIComponent(placement));
    return v.url + "/?" + q.join("&");
  };

  /* ---------- attribution: first meaningful touch, kept 30 days ----------
     Stores utm_* + referrer + landing path from the first visit that has
     UTMs (or the first visit at all), so the payment page can attach the
     real source even if the person pays days later. */
  var KEY = "af_attrib_v1";
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (Date.now() - o.ts > 30 * 864e5) return null;
      return o;
    } catch (e) { return null; }
  }
  function write(o) {
    try { window.localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }
  (function capture() {
    var params = new URLSearchParams(window.location.search);
    var hasUtm = UTM.some(function (k) { return params.get(k); });
    var existing = read();
    var externalRef = document.referrer && document.referrer.indexOf(window.location.host) === -1;
    if (existing && (!hasUtm || existing.utm_source)) return; // keep first tagged touch
    var o = { ts: Date.now(), landing_path: window.location.pathname, referrer: externalRef ? document.referrer.slice(0, 500) : "" };
    UTM.forEach(function (k) { o[k] = (params.get(k) || "").slice(0, 160); });
    if (!existing || hasUtm) write(o);
  })();
  AF.attribution = function () {
    var o = read() || {};
    var out = {};
    UTM.concat(["referrer", "landing_path"]).forEach(function (k) { out[k] = o[k] || null; });
    return out;
  };

  window.AF = AF;
})();
