import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchFoodItems() {
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
} 