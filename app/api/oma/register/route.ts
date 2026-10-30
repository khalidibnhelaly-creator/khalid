import { NextResponse } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/public-supabase";

/**
 * One Man Agency registration endpoint.
 *
 * Two callers:
 *  1. The page's JavaScript (JSON in, JSON out).
 *  2. A plain HTML form post, for phones whose in-app browser cannot run the
 *     page's JavaScript (old Android WebViews, older iOS). That path answers
 *     with a redirect to /oma/registered, or back to /oma with an error flag.
 *
 * Inserts into public.oma_registrations with the publishable key (RLS is
 * insert-only). One row per WhatsApp number; a repeat comes back as 409 and
 * counts as success.
 */

const OCC = new Set(["freelancer", "agency", "business_owner", "marketer", "creator", "employee", "student", "job_seeker", "other"]);
const SOCIAL = ["instagram", "tiktok", "youtube", "linkedin", "facebook"] as const;

type Input = Record<string, string | undefined>;

function validate(i: Input) {
  const name = (i.name || "").trim().slice(0, 120);
  const whatsapp = (i.whatsapp || "").trim().slice(0, 40);
  const email = (i.email || "").trim().slice(0, 254);
  const occupation = (i.occupation || "").trim();
  const digits = whatsapp.replace(/\D/g, "");
  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (digits.length < 10 || digits.length > 15) errors.push("whatsapp");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("email");
  if (!OCC.has(occupation)) errors.push("occ");
  const clean = (v?: string, n = 200) => (v || "").trim().slice(0, n) || null;
  const row: Record<string, unknown> = {
    name,
    whatsapp,
    email,
    occupation,
    occupation_note: occupation === "other" ? clean(i.occupation_note, 120) : null,
    utm_source: clean(i.utm_source, 120),
    utm_medium: clean(i.utm_medium, 120),
    utm_campaign: clean(i.utm_campaign, 160),
    referrer: clean(i.referrer, 500),
  };
  for (const k of SOCIAL) row[k] = clean(i[k]);
  return { errors, row, first: name.split(/\s+/)[0] || "" };
}

async function insert(row: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/oma_registrations`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (res.status === 409) return { ok: true, repeat: true };
  if (!res.ok) return { ok: false, repeat: false, detail: (await res.text()).slice(0, 300) };
  return { ok: true, repeat: false };
}

export async function POST(req: Request) {
  const type = req.headers.get("content-type") || "";
  const isJson = type.includes("application/json");
  const country = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();

  let input: Input = {};
  try {
    if (isJson) {
      input = (await req.json()) as Input;
    } else {
      const fd = await req.formData();
      fd.forEach((v, k) => {
        if (typeof v === "string") input[k] = v;
      });
      if (!input.referrer) input.referrer = req.headers.get("referer") || undefined;
    }
  } catch {
    return isJson
      ? NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 })
      : NextResponse.redirect(new URL("/oma?error=1#register", req.url), 303);
  }

  const { errors, row, first } = validate(input);
  if (/^[A-Z]{2}$/.test(country)) row.country = country;

  if (errors.length) {
    return isJson
      ? NextResponse.json({ ok: false, error: "invalid", fields: errors }, { status: 422 })
      : NextResponse.redirect(new URL(`/oma?error=${errors.join(",")}#register`, req.url), 303);
  }

  let r: { ok: boolean; repeat: boolean; detail?: string };
  try {
    r = await insert(row);
  } catch (err) {
    r = { ok: false, repeat: false, detail: String(err).slice(0, 300) };
  }
  if (!r.ok) {
    console.error("oma register failed", r.detail);
    return isJson
      ? NextResponse.json({ ok: false, error: "save_failed" }, { status: 502 })
      : NextResponse.redirect(new URL("/oma?error=save#register", req.url), 303);
  }

  if (isJson) return NextResponse.json({ ok: true, repeat: r.repeat, first });
  const q = new URLSearchParams({ n: first });
  if (r.repeat) q.set("r", "1");
  return NextResponse.redirect(new URL(`/oma/registered?${q}`, req.url), 303);
}
