import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

let supabase: SupabaseClient;

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is undefined");
    }
    supabase = createClient(url, key);
  }
  return supabase;
}

export async function connectToSupabase() {
  const client = getSupabaseClient();
  const { error } = await client.from("users").select("user_id").limit(1);
  if (error) throw new Error(`Supabase connection failed: ${error.message}`);
  console.log("Successfully connected to Supabase");
}