import { NextRequest, NextResponse } from "next/server";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, message } = body as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
    };

    // -----------------------------
    // Validate name
    // -----------------------------
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > MAX_NAME_LENGTH
    ) {
      return NextResponse.json(
        { error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    // -----------------------------
    // Validate email
    // -----------------------------
    if (
      typeof email !== "string" ||
      email.trim().length === 0 ||
      email.trim().length > MAX_EMAIL_LENGTH ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email." },
        { status: 400 }
      );
    }

    // -----------------------------
    // Validate message
    // -----------------------------
    if (
      typeof message !== "string" ||
      message.trim().length < 5 ||
      message.trim().length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: "Please provide a message between 5 and 5000 characters." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    const resendKey = process.env.RESEND_API_KEY;
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "mitanisha74@gmail.com";

    // -----------------------------------------
    // No email provider configured
    // -----------------------------------------
    if (!resendKey || !receiverEmail) {
      console.warn(
        "Contact form validated, but email delivery is not configured."
      );

      return NextResponse.json({
        success: true,
        delivered: false,
      });
    }

    // -----------------------------------------
    // Send through Resend
    // -----------------------------------------
    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: receiverEmail,
          reply_to: cleanEmail,
          subject: `New portfolio message from ${cleanName}`,
          text: [
            `Name: ${cleanName}`,
            `Email: ${cleanEmail}`,
            "",
            "Message:",
            cleanMessage,
          ].join("\n"),
        }),
      }
    );

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();

      console.error("Resend API error:", errorText);

      return NextResponse.json(
        {
          error:
            "Message could not be sent right now. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      delivered: true,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}