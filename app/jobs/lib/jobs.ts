import { cache } from "react";

import { supabaseClient as supabase } from "@/lib/supabase/client";
export const PAGE_SIZE = 10;

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
] as const;

export const CATEGORIES = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Customer Support",
  "Data",
  "Writing",
  "Other",
] as const;

export type Job = {
  id: string;
  title: string;
  company: string;
  company_logo_url: string | null;
  category: string;
  job_type: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  description: string;
  tags: string[];
  apply_url: string;
  is_active: boolean;
  created_at: string;
};

export type JobQuery = {
  q?: string;
  category?: string;
  type?: string;
  page?: number;
};

export async function getJobs({ q, category, type, page = 1 }: JobQuery) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    // Strip characters that have meaning inside PostgREST filters
    const term = q.replace(/[%,()*\\]/g, " ").trim();
    if (term) {
      query = query.or(`title.ilike.%${term}%,company.ilike.%${term}%`);
    }
  }
  if (category) query = query.eq("category", category);
  if (type) query = query.eq("job_type", type);

  const { data, count, error } = await query;

  // Page number beyond the last page: show an empty result instead of crashing
  if (error?.code === "PGRST103") {
    return { jobs: [] as Job[], total: 0, totalPages: 1 };
  }
  if (error) throw new Error(error.message);

  const total = count ?? 0;
  return {
    jobs: (data ?? []) as Job[],
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getJobById = cache(async (id: string): Promise<Job | null> => {
  if (!UUID_RE.test(id)) return null;

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as Job | null) ?? null;
});
