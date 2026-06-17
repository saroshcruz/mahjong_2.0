import "server-only";

import { createClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          id?: string;
          membership_id: string;
          full_name: string;
          email: string;
          phone: string;
          city: string;
          membership_tier: string;
          payment_status: string;
          razorpay_order_id: string;
          razorpay_payment_id: string;
          amount_paid: number;
        };
        Insert: {
          membership_id?: string;
          full_name: string;
          email: string;
          phone: string;
          city: string;
          membership_tier: string;
          payment_status: string;
          razorpay_order_id: string;
          razorpay_payment_id: string;
          amount_paid: number;
        };
        Update: Partial<Database["public"]["Tables"]["members"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type SupabaseServerClient = ReturnType<typeof createClient<Database>>;

let cachedSupabaseServer: SupabaseServerClient | null = null;

export function getSupabaseServer() {
  if (cachedSupabaseServer) return cachedSupabaseServer;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase server credentials are not configured.");
  }

  cachedSupabaseServer = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedSupabaseServer;
}
