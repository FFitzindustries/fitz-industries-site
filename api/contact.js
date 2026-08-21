import nodemailer from 'nodemailer';

const MAX = { name: 120, email: 160, message: 5000 };

function clean(v, max) {
  return String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  // Honeypot: nur Bots fuellen das Feld aus. Erfolg vortaeuschen, nichts senden.
  if (body.botcheck) return res.status(200).json({ success: true, message: 'ok' });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const message = String(body.message ?? '').trim().slice(0, MAX.message);

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Pflichtfelder fehlen' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ success: false, message: 'E-Mail ungueltig' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.error('SMTP env vars fehlen');
    return res.status(500).json({ success: false, message: 'Server nicht konfiguriert' });
  }

  const port = Number(SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST, port, secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      // From muss die eigene Domain sein, sonst scheitert SPF/DKIM.
      from: `"Anfrage fitz-industries.ch" <${MAIL_FROM || SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `Projektanfrage über fitz-industries.ch — ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
      html:
        `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">` +
        `<tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td style="padding:4px 0"><b>${escapeHtml(name)}</b></td></tr>` +
        `<tr><td style="padding:4px 12px 4px 0;color:#666">E-Mail</td><td style="padding:4px 0"><b>${escapeHtml(email)}</b></td></tr>` +
        `</table><hr style="border:none;border-top:1px solid #ddd;margin:16px 0">` +
        `<div style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</div>`,
    });
    return res.status(200).json({ success: true, message: 'Gesendet' });
  } catch (err) {
    console.error('SMTP-Fehler:', err.message);
    return res.status(502).json({ success: false, message: 'Versand fehlgeschlagen' });
  }
}
