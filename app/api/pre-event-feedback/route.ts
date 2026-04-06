import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      full_name: body.full_name || null,
      email: body.email || null,
      company: body.company || null,
      role: body.role || null,
      industry: body.industry || null,
      business_stage: body.business_stage || null,
      team_size: body.team_size || null,
      goal: body.goal || null,
      experience_level: body.experience_level || null,
      importance: body.importance || null,
      sessions: body.sessions || [],
      gains: body.gains || [],
      problem: body.problem || null,
    };

    const { error } = await supabase
      .from("pre_event_feedback")
      .insert([payload]);

    if (error) {
      console.error("INSERT ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}