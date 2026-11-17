// Checks your SMTP settings and sends one test email to CONTACT_TO_EMAIL.
// Run: npm run mail:test   (reads .env.local)

import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

const missing = Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL })
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (missing.length) {
  console.error(`Missing in .env.local: ${missing.join(", ")}`);
  process.exit(1);
}

const port = Number(SMTP_PORT || 587);
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transporter.verify();
  console.log(`Connected to ${SMTP_HOST}:${port} as ${SMTP_USER}`);
  const info = await transporter.sendMail({
    from: CONTACT_FROM_EMAIL || `Vrishbhan Singh <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL,
    subject: "Portfolio contact form: SMTP test",
    text: "If you can read this, the portfolio contact form can send email.",
  });
  console.log(`Test email sent to ${CONTACT_TO_EMAIL} (id ${info.messageId})`);
} catch (err) {
  console.error("SMTP failed:", err.message);
  if (/Invalid login|535|Username and Password not accepted/i.test(err.message)) {
    console.error("For Gmail, SMTP_PASS must be a 16-character App Password, not your normal password.");
  }
  process.exit(1);
}
