import { createServerSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email khong hop le" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json({ error: "Email da duoc dang ky" }, { status: 409 });
      }
      // Reactivate
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ status: "active", subscribed_at: new Date().toISOString() })
        .eq("id", existing.id);

      if (error) throw error;
      return NextResponse.json({ message: "Dang ky lai thanh cong" });
    }

    // New subscriber
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
        name: name || null,
        status: "active",
        subscribed_at: new Date().toISOString(),
      });

    if (error) throw error;

    return NextResponse.json({ message: "Dang ky thanh cong" }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Co loi xay ra" }, { status: 500 });
  }
}
