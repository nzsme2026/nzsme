import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await resend.emails.send({
      from: "NZSME <onboarding@resend.dev>", // temporary sender
      to: ["nzsme2026@gmail.com"],
      subject: "New NZSME Membership Application",
      html: `
        <h2>New Membership Application</h2>
        <hr/>
        <p><strong>First Name:</strong> ${data.firstName}</p>
        <p><strong>Last Name:</strong> ${data.lastName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <hr/>
        <p><strong>Registered Business Name:</strong> ${data.registeredBusinessName}</p>
        <p><strong>NZBN:</strong> ${data.nzbn}</p>
        <p><strong>Trading Name:</strong> ${data.tradingName}</p>
        <p><strong>Website:</strong> ${data.website}</p>
        <p><strong>Business Email:</strong> ${data.businessEmail}</p>
        <p><strong>Business Phone:</strong> ${data.businessPhone}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Category:</strong> ${data.category}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send application email" },
      { status: 500 }
    );
  }
}