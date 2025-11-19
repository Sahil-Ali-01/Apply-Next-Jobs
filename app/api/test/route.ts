import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("test").select("*");

  if (error) {
    return NextResponse.json({
      connected: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    connected: true,
    data,
  });
}
