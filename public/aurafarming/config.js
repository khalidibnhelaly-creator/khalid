/* ------------------------------------------------------------------
   Aurafarming webinar: single source of truth.
   Loaded by BOTH /aurafarming (landing) and /aurafarming/pay.
------------------------------------------------------------------- */
(function () {
  "use strict";

  var AF = {
    product: "Aurafarming Live Webinar (Oct 23)",
    price: 1000,
    seats: 500,

    /* Webinar start, Dhaka time. Registration closes automatically at this
       moment on both pages. */
    startsAt: "2026-10-23T21:00:00+06:00",

    /* Flip to true the moment all 500 seats are confirmed. Both pages
       switch to a "sold out" state immediately after deploy. */
    soldOut: false,

    whatsapp: "8801681096975",
    refPrefix: "AF",
    tier: "aurafarming",
  };

  AF.isOpen = function () {
    return !AF.soldOut && Date.now() < new Date(AF.startsAt).getTime();
  };
  AF.taka = function (n) {
    return "৳" + Number(n).toLocaleString("en-US");
  };

  window.AF = AF;
})();
