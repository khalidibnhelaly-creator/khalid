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
       regular price shown struck through.
       Optional `deadline` (Dhaka time) ends priceNow and switches to priceAfter;
       null = no deadline, no countdown. */
    priceNow: 7000,
    priceAfter: 15000,
    deadline: null,

    /* Checkout codes removed Oct 31: one price for everyone. */
    codes: [],

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
