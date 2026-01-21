import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ymfghuwqrmzdkuqypeqs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZmdodXdxcm16ZGt1cXlwZXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3Nzg4OTUsImV4cCI6MjA4MzM1NDg5NX0.7U__fMba89exUDk0mmFMspS5Bn6FDtmSCQkxgaEpWQg";

export const supabase = createClient(supabaseUrl, supabaseKey);
