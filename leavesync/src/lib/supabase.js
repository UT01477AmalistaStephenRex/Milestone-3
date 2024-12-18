import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqxhsqhylkgmvjnsmhfj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xeGhzcWh5bGtnbXZqbnNtaGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NDkzMzMsImV4cCI6MjA1MDAyNTMzM30.p53Z-TcfJQHKyWIgpShXfbEiNqyQKNtmagVkhLs1wgM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
