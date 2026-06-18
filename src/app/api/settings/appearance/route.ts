import { createServerSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("appearance_settings")
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Get appearance error:", error);
    return NextResponse.json({ error: "Co loi xay ra" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["admin", "editor"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { error } = await supabase
      .from("appearance_settings")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", body.id);

    if (error) throw error;
    return NextResponse.json({ message: "Cap nhat thanh cong" });
  } catch (error) {
    console.error("Update appearance error:", error);
    return NextResponse.json({ error: "Co loi xay ra" }, { status: 500 });
  }
}
