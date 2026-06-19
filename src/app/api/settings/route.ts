import { createServerSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Get settings error:", error);
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

    if (!profile || !["admin", "editor"].includes((profile as any).role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { error } = await supabase
      .from("site_settings")
      // @ts-ignore
      .update({ ...body, updated_at: new Date().toISOString() } as any)
      .eq("id", body.id);

    if (error) throw error;
    return NextResponse.json({ message: "Cap nhat thanh cong" });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Co loi xay ra" }, { status: 500 });
  }
}
