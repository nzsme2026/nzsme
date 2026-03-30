import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error("RESEND_API_KEY is missing");
}

const resend = new Resend(apiKey!);

// Supabase admin client
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
  console.log("SUBMIT API HIT");

  try {
    const data = await req.json();
    console.log("PAYLOAD:", data);

    // 🔒 Duplicate protection (based on email)
    if (data.email) {
      const { data: existing, error: checkError } = await supabaseAdmin
        .from("membership_applications")
        .select("id")
        .eq("email", data.email)
        .order("created_at", { ascending: false })
        .limit(1);

      if (checkError) {
        console.error("CHECK ERROR:", checkError);
      }

      if (existing && existing.length > 0) {
        console.log("Duplicate detected, skipping insert");

        // Return success to avoid user confusion
        return NextResponse.json({ success: true });
      }
    }

    // Insert into DB
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

    // ❌ If DB fails → return SAFE message
    if (dbError) {
      console.error("DB INSERT ERROR:", dbError);

      return NextResponse.json(
        {
          error:
            "We have received your payment. However, there was an issue submitting your details. Please feel free to WhatsApp your details to Shailesh on 0273333300.",
        },
        { status: 500 }
      );
    }

    // ✅ Respond immediately (prevents timeout)
    const response = NextResponse.json({ success: true });

    // 🔁 Send email in background (no await)
    if (apiKey) {
      resend.emails
        .send({
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
        })
        .catch((emailError) => {
          console.error("EMAIL ERROR:", emailError);
        });
    }

    return response;
  } catch (error: any) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error:
          "We have received your payment. However, there was an issue submitting your details. Please feel free to WhatsApp your details to Shailesh on 0273333300.",
      },
      { status: 500 }
    );
  }
}