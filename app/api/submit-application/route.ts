import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY!);

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

    // 🧠 SAFE CLEAN FUNCTION
    const clean = (s: string) =>
      (s || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");

    const fn = clean(data.firstName || "USR").slice(0, 3).padEnd(3, "X");
    const ln = clean(data.lastName || "USR").slice(0, 3).padEnd(3, "X");

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const rand = Math.floor(1000 + Math.random() * 9000);

    const confirmationId = `NZSME-${yyyy}${mm}${dd}-${fn}${ln}-${rand}`;

    // 🔒 DUPLICATE CHECK (SAFE)
    let existing = null;

    if (data.email || data.phone) {
      const { data: existingData } = await supabaseAdmin
        .from("membership_applications")
        .select("confirmation_id")
        .or(
          [
            data.email ? `email.eq.${data.email}` : null,
            data.phone ? `phone.eq.${data.phone}` : null,
          ]
            .filter(Boolean)
            .join(",")
        )
        .limit(1);

      if (existingData && existingData.length > 0) {
        existing = existingData[0];
      }
    }

    // ✅ IF DUPLICATE → RETURN EXISTING ID
    if (existing) {
      console.log("Duplicate detected, returning existing ID");

      return NextResponse.json({
        success: true,
        confirmationId: existing.confirmation_id,
      });
    }

    // ✅ INSERT INTO DB
    const { error: dbError } = await supabaseAdmin
      .from("membership_applications")
      .insert([
        {
          confirmation_id: confirmationId,

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
      console.error("DB ERROR:", dbError);

      return NextResponse.json(
        {
          error:
            "We received your payment, but there was an issue saving your details. Please WhatsApp your details to 0273333300.",
        },
        { status: 500 }
      );
    }

    // 📧 EMAIL (NON-BLOCKING)
    if (process.env.RESEND_API_KEY) {
      resend.emails
        .send({
          from: "NZSME <onboarding@resend.dev>",
          to: ["nzsme2026@gmail.com"],
          subject: "New NZSME Membership Application",
          html: `
            <h2>New Membership Application</h2>
            <p><strong>Confirmation ID:</strong> ${confirmationId}</p>
            <hr/>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email || "-"}</p>
            <hr/>
            <p><strong>Business:</strong> ${data.registeredBusinessName || "-"}</p>
            <p><strong>Category:</strong> ${data.category || "-"}</p>
          `,
        })
        .catch((err) => console.error("EMAIL ERROR:", err));
    }

    // ✅ FINAL RESPONSE
    return NextResponse.json({
      success: true,
      confirmationId,
    });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error:
          "We received your payment, but something went wrong. Please WhatsApp your details to 0273333300.",
      },
      { status: 500 }
    );
  }
}