import nodemailer from "nodemailer";

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_AUTOREPLY } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) return null;
  const port = Number(SMTP_PORT || 587);
  return {
    transport: {
      host: SMTP_HOST,
      port,
      secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    },
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL || `Vrishbhan Singh <${SMTP_USER}>`,
    autoReply: CONTACT_AUTOREPLY !== "false",
  };
}

export function createTransport() {
  const cfg = smtpConfig();
  return cfg ? { cfg, transporter: nodemailer.createTransport(cfg.transport) } : null;
}

const shell = (inner: string) => `<!doctype html><html><body style="margin:0;background:#f2f3ef;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#141a26">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #d9dcd3;border-radius:14px">
<tr><td style="height:4px;background:#3b3fd8;border-radius:14px 14px 0 0"></td></tr>
<tr><td style="padding:28px 28px 24px">${inner}</td></tr>
</table></td></tr></table></body></html>`;

/** Email you receive for every form submission */
export function notificationEmail(d: { name: string; email: string; reason: string; message: string }) {
  const n = escapeHtml(d.name);
  const e = escapeHtml(d.email);
  return {
    subject: `${d.reason}: message from ${d.name}`,
    text: `${d.name} (${d.email})\nTopic: ${d.reason}\n\n${d.message}\n\nReply to this email to answer them directly.`,
    html: shell(`
      <p style="margin:0 0 4px;font-size:13px;color:#5a6273">New message from your portfolio</p>
      <h1 style="margin:0 0 18px;font-size:22px">${n}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:18px">
        <tr><td style="color:#5a6273;padding:2px 16px 2px 0">Email</td><td><a href="mailto:${e}" style="color:#3b3fd8">${e}</a></td></tr>
        <tr><td style="color:#5a6273;padding:2px 16px 2px 0">Topic</td><td>${escapeHtml(d.reason)}</td></tr>
      </table>
      <div style="background:#f2f3ef;border-radius:10px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(d.message)}</div>
      <p style="margin:18px 0 0;font-size:13px;color:#5a6273">Reply to this email to answer ${n} directly.</p>`),
  };
}

/**
 * Confirmation sent to the visitor. It deliberately does not repeat their name or
 * message, so the form can't be used to send arbitrary text to someone else's inbox.
 */
export function autoReplyEmail(site: { github?: string; linkedin?: string }) {
  const links = [
    site.linkedin && `<a href="${site.linkedin}" style="color:#3b3fd8">LinkedIn</a>`,
    site.github && `<a href="${site.github}" style="color:#3b3fd8">GitHub</a>`,
  ]
    .filter(Boolean)
    .join(" &nbsp;·&nbsp; ");
  return {
    subject: "Thanks for getting in touch",
    text: "Hi,\n\nThanks for your message through my portfolio. I've received it and will reply by email.\n\nVrishbhan Singh\nFull Stack Developer (React.js and Laravel)",
    html: shell(`
      <h1 style="margin:0 0 14px;font-size:22px">Thanks for getting in touch</h1>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6">Hi,</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6">Thanks for your message through my portfolio. I've received it and will reply by email.</p>
      <p style="margin:22px 0 2px;font-size:15px;font-weight:bold">Vrishbhan Singh</p>
      <p style="margin:0;font-size:13px;color:#5a6273">Full Stack Developer (React.js and Laravel)</p>
      ${links ? `<p style="margin:14px 0 0;font-size:13px">${links}</p>` : ""}`),
  };
}
