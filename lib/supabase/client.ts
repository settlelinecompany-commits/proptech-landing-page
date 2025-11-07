import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Only create client if env vars are available
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables")
    // Return null to indicate client is not available
    return null as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
