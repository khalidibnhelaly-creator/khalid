/* ------------------------------------------------------------------
   Season 1 recordings — single source of truth.
   Loaded by BOTH /masterclass/season1 (sales) and /masterclass/season1/pay.
   Edit values here only; both pages pick them up.
------------------------------------------------------------------- */
(function () {
  "use strict";

  var S1 = {
    product: "One Man AI OS Masterclass, Season 1 Recordings",

    /* Pricing. priceNow is what everyone sees and pays; priceAfter is the
       regular price shown struck through (৳5,000 saving).
       Optional `deadline` (Dhaka time) ends priceNow and switches to priceAfter;
       null = no deadline, no countdown. */
    priceNow: 10000,
    priceAfter: 15000,
    deadline: null,

    /* Checkout-only codes. The code itself is never stored in the page: only
       its SHA-256 hash. Buyers who enter it see `price` at checkout; everyone
       else keeps seeing priceNow. `until` (optional, Dhaka time) ends a code.
       To add a code: hash it (uppercase) with SHA-256 and add a line here. */
    codes: [
      { hash: "ae6ebf892f745b2be5b7f547ee83c3de6b9abf561c6befb7cc01288c7b1ef7db", price: 7000, until: null }, // webinar offer, Oct 23
    ],

    whatsapp: "8801681096975",
    refPrefix: "S1",
    tier: "season1",
  };

  S1.isLaunch = function () {
    return !S1.deadline || Date.now() < new Date(S1.deadline).getTime();
  };
  S1.price = function () {
    return S1.isLaunch() ? S1.priceNow : S1.priceAfter;
  };
  S1.taka = function (n) {
    return "৳" + Number(n).toLocaleString("en-US");
  };

  window.S1 = S1;
})();
