import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://yijfklatjghghiudhovt.supabase.co",
  `${process.env.SUPABASE_KEY}`
);
