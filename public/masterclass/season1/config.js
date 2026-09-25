/* ------------------------------------------------------------------
   Season 1 recordings — single source of truth.
   Loaded by BOTH /masterclass/season1 (sales) and /masterclass/season1/pay.
   Edit values here only; both pages pick them up.
------------------------------------------------------------------- */
(function () {
  "use strict";

  var S1 = {
    product: "One Man AI OS Masterclass, Season 1 Recordings",

    /* Pricing. Launch price holds until `deadline`, then `priceAfter` applies
       on both pages automatically (sales page + payment amount). */
    priceNow: 5000,
    priceAfter: 15000,
    deadline: "2026-10-20T23:59:00+06:00", // Dhaka time

    /* Webinar (Fri Oct 23, 9:00 PM Dhaka, "Become an AI Influencer Today: Aurafarming!")
       is written into the page copy in index.html. */

    whatsapp: "8801681096975",
    refPrefix: "S1",
    tier: "season1",
  };

  S1.isLaunch = function () {
    return Date.now() < new Date(S1.deadline).getTime();
  };
  S1.price = function () {
    return S1.isLaunch() ? S1.priceNow : S1.priceAfter;
  };
  S1.taka = function (n) {
    return "৳" + Number(n).toLocaleString("en-US");
  };

  window.S1 = S1;
})();
