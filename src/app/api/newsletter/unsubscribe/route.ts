import { createServerSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      return NextResponse.json({ error: "Thieu thong tin" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Verify token (simple hash check)
    const expectedToken = Buffer.from(email + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toString("base64").slice(0, 32);
    if (token !== expectedToken) {
      return NextResponse.json({ error: "Token khong hop le" }, { status: 403 });
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
      .eq("email", email);

    if (error) throw error;

    return NextResponse.json({ message: "Huy dang ky thanh cong" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "Co loi xay ra" }, { status: 500 });
  }
}
