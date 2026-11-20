import { Resend } from "resend";
import type { OrderRow } from "./types";
import { formatEUR } from "./types";

type EventMeta = {
  title: string;
  dateLabel: string;
  time?: string | null;
  venue: string;
};

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://klingende-kirche.de";

function resend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[tickets/mail] RESEND_API_KEY is not set, skipping mail");
    return null;
  }
  return new Resend(key);
}

function mailFrom() {
  return (
    process.env.MAIL_FROM ??
    "Klingende Kirche <tickets@klingende-kirche.de>"
  );
}

function replyTo() {
  return process.env.MAIL_REPLY_TO ?? "info@klingende-kirche.de";
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(title: string, bodyHtml: string) {
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(title)}</title>
</head>
<body style="margin:0;background:#FDFBF6;font-family:Inter,Arial,sans-serif;color:#111;">
  <div style="max-width:620px;margin:0 auto;padding:36px 24px;">
    <div style="font-family:'Instrument Serif','Cormorant Garamond',Georgia,serif;font-size:28px;letter-spacing:-0.01em;color:#141E4E;">
      Klingende Kirche<br>
      <span style="font-style:italic;color:#C59F4A;font-size:18px;letter-spacing:0.2em;text-transform:uppercase;">Saarlouis-Lisdorf</span>
    </div>
    <div style="height:1px;background:#C59F4A;opacity:0.3;margin:24px 0;"></div>
    ${bodyHtml}
    <div style="height:1px;background:#C59F4A;opacity:0.2;margin:32px 0 20px;"></div>
    <p style="font-size:12px;color:#777;line-height:1.6;">
      Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.<br>
      Weißdornflur 9 · 66740 Saarlouis-Lisdorf<br>
      <a href="mailto:${replyTo()}" style="color:#141E4E;">${replyTo()}</a>
    </p>
  </div>
</body></html>`;
}

export async function sendTicketConfirmation(
  order: OrderRow,
  event: EventMeta
) {
  const r = resend();
  if (!r) return;

  const portalUrl = `${SITE_URL()}/bestellung/${order.token}`;
  const amount = formatEUR(order.amount_cents, "de");

  const html = layout(
    "Ihre Tickets",
    `
    <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;margin:0 0 8px 0;color:#0A1033;">
      Vielen Dank, ${esc(order.buyer_name)}.
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;">
      Ihre Bestellung ist bestätigt. Die Karten gelten als Einlass und werden an der Abendkasse auf Ihren Namen hinterlegt.
    </p>

    <div style="margin:24px 0;padding:20px 22px;border:1px solid rgba(197,159,74,0.3);background:#FFFEFA;border-radius:10px;">
      <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C59F4A;">Konzert</p>
      <p style="margin:0 0 14px 0;font-size:20px;font-weight:600;color:#0A1033;">${esc(event.title)}</p>
      <table style="width:100%;font-size:14px;color:#333;">
        <tr><td style="padding:3px 0;color:#777;width:140px;">Datum</td><td>${esc(event.dateLabel)}${event.time ? " · " + esc(event.time) : ""}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Ort</td><td>${esc(event.venue)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Anzahl Karten</td><td>${order.quantity}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Bestellnummer</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(order.id)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Betrag</td><td style="font-weight:600;">${amount}</td></tr>
      </table>
    </div>

    <p style="font-size:15px;line-height:1.6;color:#333;">
      Ihre Bestellung einsehen oder stornieren:
    </p>
    <p style="margin:12px 0 0;">
      <a href="${portalUrl}" style="display:inline-block;background:#0A1033;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:500;">
        Bestellung öffnen
      </a>
    </p>
    <p style="font-size:13px;color:#777;margin-top:10px;">
      Oder kopieren Sie diesen Link:<br>
      <span style="font-family:ui-monospace,Menlo,monospace;color:#444;word-break:break-all;">${esc(portalUrl)}</span>
    </p>

    <p style="font-size:14px;color:#555;line-height:1.6;margin-top:28px;">
      Soli Deo Gloria.<br>
      Ihr Förderverein Klingende Kirche
    </p>
    `
  );

  await r.emails.send({
    from: mailFrom(),
    to: order.buyer_email,
    replyTo: replyTo(),
    subject: `Ihre Karten für „${event.title}"`,
    html,
    text:
      `Vielen Dank, ${order.buyer_name}.\n\n` +
      `Konzert: ${event.title}\n` +
      `Datum: ${event.dateLabel}${event.time ? " · " + event.time : ""}\n` +
      `Ort: ${event.venue}\n` +
      `Anzahl Karten: ${order.quantity}\n` +
      `Bestellnummer: ${order.id}\n` +
      `Betrag: ${amount}\n\n` +
      `Bestellung einsehen oder stornieren: ${portalUrl}`
  });
}

export async function sendCancellationMail(
  order: OrderRow,
  event: EventMeta
) {
  const r = resend();
  if (!r) return;

  const amount = formatEUR(order.amount_cents, "de");
  const refunded = order.status === "refunded";

  const html = layout(
    "Bestellung storniert",
    `
    <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:30px;margin:0 0 10px 0;color:#0A1033;">
      Stornierung bestätigt.
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;">
      ${
        refunded
          ? `Ihre Bestellung ist storniert, der Betrag von ${amount} wird in den nächsten Werktagen Ihrer Zahlungsmethode gutgeschrieben.`
          : "Ihre noch offene Bestellung wurde storniert. Es wurde nichts berechnet."
      }
    </p>

    <div style="margin:22px 0;padding:18px 20px;border:1px solid rgba(197,159,74,0.3);background:#FFFEFA;border-radius:10px;">
      <table style="width:100%;font-size:14px;color:#333;">
        <tr><td style="padding:3px 0;color:#777;width:140px;">Konzert</td><td>${esc(event.title)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Datum</td><td>${esc(event.dateLabel)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Anzahl Karten</td><td>${order.quantity}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Bestellnummer</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(order.id)}</td></tr>
      </table>
    </div>

    <p style="font-size:14px;color:#555;line-height:1.6;">
      Wir freuen uns, Sie zu einem anderen Konzert bei uns begrüßen zu dürfen.
    </p>
    `
  );

  await r.emails.send({
    from: mailFrom(),
    to: order.buyer_email,
    replyTo: replyTo(),
    subject: `Stornierung bestätigt · „${event.title}"`,
    html,
    text:
      `Stornierung bestätigt.\n\n` +
      `Konzert: ${event.title}\n` +
      `Datum: ${event.dateLabel}\n` +
      `Bestellnummer: ${order.id}\n\n` +
      (refunded
        ? `Der Betrag von ${amount} wird in den nächsten Werktagen zurück erstattet.`
        : `Es wurde nichts berechnet.`)
  });
}
