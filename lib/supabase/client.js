import { createClient } from "@supabase/supabase-js";

function isValidUrl(val) {
  if (!val || typeof val !== "string") return false;
  try {
    const url = new URL(val);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient =
  isValidUrl(supabaseUrl) && supabaseKey && supabaseKey.trim().length > 10
    ? createClient(supabaseUrl, supabaseKey)
    : null;
