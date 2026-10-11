/**
 * Regional pricing for /consult.
 * Bangladesh sees taka; every other country sees US dollars.
 * Country comes from Vercel's x-vercel-ip-country request header.
 * Override with ?region=bd or ?region=intl (testing, or sharing a specific price).
 */
export type Region = "bd" | "intl";

export const CONSULT_PRICE = {
  bd: { display: "৳150,000", currency: "BDT", amount: 150000 },
  intl: { display: "$3,000", currency: "USD", amount: 3000 },
} as const;

export type Price = (typeof CONSULT_PRICE)[Region];

export function resolveRegion(country: string | null, override?: string | string[]): Region {
  const o = Array.isArray(override) ? override[0] : override;
  if (o === "bd" || o === "intl") return o;
  // No header (local dev, some bots): default to the home market.
  if (!country) return "bd";
  return country.toUpperCase() === "BD" ? "bd" : "intl";
}

/** Two-letter country code from the request, or null when unknown. */
export function cleanCountry(raw: string | null): string | null {
  return raw && /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null;
}
