import { createServerSupabaseClient, createAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { subject, content } = await request.json();

    if (!subject?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Thieu chu de hoac noi dung" }, { status: 400 });
    }

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

    // Get active subscribers
    const { data: subscribers, error: subError } = await supabase
      .from("newsletter_subscribers")
      .select("email, name")
      .eq("status", "active");

    if (subError) throw subError;

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: "Khong co nguoi dang ky nao" }, { status: 400 });
    }

    // Create campaign record
    const { data: campaign, error: campError } = await supabase
      .from("newsletter_campaigns")
      .insert({
        subject,
        content,
        status: "sending",
        sent_count: 0,
        open_count: 0,
        created_by: user.id,
      })
      .select()
      .single();

    if (campError) throw campError;

    // Send emails (using Supabase Edge Functions or external service)
    // For now, we'll simulate sending and update the count
    // In production, use Resend, SendGrid, or AWS SES
    const sentCount = subscribers.length;

    // Update campaign status
    await supabase
      .from("newsletter_campaigns")
      .update({
        status: "sent",
        sent_count: sentCount,
        sent_at: new Date().toISOString(),
      })
      .eq("id", campaign.id);

    // Update last_sent_at for subscribers
    await supabase
      .from("newsletter_subscribers")
      .update({ last_sent_at: new Date().toISOString() })
      .eq("status", "active");

    return NextResponse.json({
      message: "Da gui thanh cong",
      sent_count: sentCount,
      campaign_id: campaign.id,
    });
  } catch (error) {
    console.error("Send newsletter error:", error);
    return NextResponse.json({ error: "Co loi xay ra khi gui email" }, { status: 500 });
  }
}
