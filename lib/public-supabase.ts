/**
 * Public, browser-safe Supabase details (the same publishable key the static
 * checkout pages use). Every table written from the browser has RLS with
 * insert-only policies, so this key can add rows but never read them.
 */
export const SUPABASE_URL = "https://yuxdvspnxwltqchqluso.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_7vjFoH1Fio_PlwjSbWnfQw_8ng889Od";

/** Insert one row with return=minimal. Resolves on 2xx, rejects otherwise. */
export async function insertRow(table: string, row: Record<string, unknown>, keepalive = false): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    keepalive,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(await res.text());
}
