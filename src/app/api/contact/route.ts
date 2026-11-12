// Contact form endpoint. Sends mail over SMTP using nodemailer.
// Configure it in .env.local (see .env.example). Without SMTP settings,
// development logs the message and production returns a clear error.

import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages from this address. Try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The form data couldn't be read." }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = str("name").slice(0, 100).replace(/[\r\n]/g, " ");
  const email = str("email").slice(0, 200);
  const message = str("message").slice(0, 4000);
  const reason = str("reason").slice(0, 50).replace(/[\r\n]/g, " ") || "Something else";

  // Bots fill the hidden field; pretend it worked.
  if (str("company")) return Response.json({ ok: true });

  if (!name) return Response.json({ error: "Add your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return Response.json({ error: "Check the email address." }, { status: 400 });
  if (message.length < 10) return Response.json({ error: "Write a few more words in the message." }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] SMTP not configured. Message received:", { name, email, reason, message });
      return Response.json({ ok: true });
    }
    return Response.json({ error: "The contact form isn't connected to email yet." }, { status: 503 });
  }

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || `Portfolio contact <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: `${name} <${email}>`,
      subject: `${reason}: message from ${name}`,
      text: `${name} (${email})\n${reason}\n\n${message}`,
      html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)})</p><p>${escapeHtml(reason)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch (err) {
    console.error("[contact] SMTP error", err);
    return Response.json({ error: "The email server didn't accept the message." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
