import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ruqdmhxhqkqpvoxhxnhe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1cWRtaHhocWtxcHZveGh4bmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MzEyNzMsImV4cCI6MjA4MTIwNzI3M30.f9Wozo6-Wv7-jks-EJIoeccP8R0iWI1GgBWlDlNiS2k";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
