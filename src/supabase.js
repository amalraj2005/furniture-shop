import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ihwkihhwaneexkslpqvs.supabase.co";
const supabaseKey = "sb_publishable_ZvOLyXYSTuZwmaMGyYkbWA_CVz0-AG-";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);  