import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SEND_EMAIL_TO = process.env.SEND_EMAIL_TO || "nagaraj7rg@gmail.com";

function validateEmail(value: unknown) {
    return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return NextResponse.json(
            { error: "Email service is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS." },
            { status: 500 }
        );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!email || !validateEmail(email) || !message) {
        return NextResponse.json(
            { error: "Please provide a valid email address and a message." },
            { status: 400 }
        );
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    const subject = `Portfolio contact from ${name || email}`;
    const text = `Name: ${name || "(no name provided)"}\nEmail: ${email}\n\nMessage:\n${message}`;
    const html = `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #111;">
            <p><strong>Name:</strong> ${name || "(no name provided)"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${SMTP_USER}>`,
            to: SEND_EMAIL_TO,
            replyTo: email,
            subject: subject,
            text: text,
            html: html,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact email error:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please check mail server settings." },
            { status: 500 }
        );
    }
}
