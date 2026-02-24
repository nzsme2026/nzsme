import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error("RESEND_API_KEY is missing");
}

const resend = new Resend(apiKey!);

// Use SERVICE ROLE key for backend insert (bypasses RLS safely)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export async function POST(req: Request) {
  console.log("SUBMIT API HIT"); // ← Added log to confirm route execution

  try {
    const data = await req.json();

    // Insert into Supabase FIRST
    const { error: dbError } = await supabaseAdmin
      .from("membership_applications")
      .insert([
        {
          first_name: data.firstName || "",
          last_name: data.lastName || "",
          phone: data.phone || "",
          email: data.email || "",
          registered_business_name: data.registeredBusinessName || "",
          nzbn: data.nzbn || "",
          trading_name: data.tradingName || "",
          website: data.website || "",
          business_email: data.businessEmail || "",
          business_phone: data.businessPhone || "",
          address: data.address || "",
          description: data.description || "",
          category: data.category || "",
          payment_status: "paid",
        },
      ]);

    if (dbError) {
      console.error("DB INSERT ERROR:", dbError);
      return NextResponse.json(
        { error: "Failed to store application" },
        { status: 500 }
      );
    }

    // Send email (non-blocking)
    if (apiKey) {
      try {
        await resend.emails.send({
          from: "NZSME <onboarding@resend.dev>",
          to: ["nzsme2026@gmail.com"],
          subject: "New NZSME Membership Application",
          html: `
            <h2>New Membership Application</h2>
            <hr/>
            <p><strong>First Name:</strong> ${data.firstName || ""}</p>
            <p><strong>Last Name:</strong> ${data.lastName || ""}</p>
            <p><strong>Phone:</strong> ${data.phone || ""}</p>
            <p><strong>Email:</strong> ${data.email || ""}</p>
            <hr/>
            <p><strong>Registered Business Name:</strong> ${data.registeredBusinessName || ""}</p>
            <p><strong>NZBN:</strong> ${data.nzbn || ""}</p>
            <p><strong>Trading Name:</strong> ${data.tradingName || ""}</p>
            <p><strong>Website:</strong> ${data.website || ""}</p>
            <p><strong>Business Email:</strong> ${data.businessEmail || ""}</p>
            <p><strong>Business Phone:</strong> ${data.businessPhone || ""}</p>
            <p><strong>Address:</strong> ${data.address || ""}</p>
            <p><strong>Description:</strong> ${data.description || ""}</p>
            <p><strong>Category:</strong> ${data.category || ""}</p>
          `,
        });
      } catch (emailError) {
        console.error("EMAIL ERROR (non-blocking):", emailError);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}