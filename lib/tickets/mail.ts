import { Resend } from "resend";
import type { OrderRow } from "./types";
import { formatEUR } from "./types";
import { SITE } from "@/lib/data";

type EventMeta = {
  title: string;
  dateLabel: string;
  time?: string | null;
  venue: string;
};

const SITE_URL = () =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://klingende-kirche.de";

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
  return process.env.MAIL_REPLY_TO ?? SITE.email;
}

function adminRecipient(): string | null {
  const to = process.env.ORDER_NOTIFICATION_EMAIL?.trim();
  if (to) return to;
  const fallback = process.env.MAIL_REPLY_TO?.trim() ?? SITE.email;
  return fallback || null;
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

function reference(order: OrderRow, event: EventMeta) {
  return `${order.id} · ${event.title}`.slice(0, 140);
}

/**
 * An den Besteller: Bestellung angenommen, bitte überweisen. Enthält Bankdaten
 * und Verwendungszweck.
 */
export async function sendOrderReceivedToCustomer(
  order: OrderRow,
  event: EventMeta
) {
  const r = resend();
  if (!r) return;

  const amount = formatEUR(order.amount_cents, "de");
  const quantityRegular = order.quantity - order.quantity_reduced;
  const quantityLabel =
    order.quantity_reduced > 0
      ? `${order.quantity} (davon ${quantityRegular} regulär, ${order.quantity_reduced} ermäßigt)`
      : String(order.quantity);
  const ref = reference(order, event);
  const holder = SITE.bank.holder.de;

  const html = layout(
    "Ihre Bestellung",
    `
    <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:32px;margin:0 0 8px 0;color:#0A1033;">
      Vielen Dank, ${esc(order.buyer_name)}.
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;">
      Wir haben Ihre Bestellung erhalten. Sobald Ihre Überweisung bei uns
      eingeht, ist Ihr Platz verbindlich reserviert und Ihre Karten werden an
      der Abendkasse auf Ihren Namen hinterlegt.
    </p>

    <div style="margin:24px 0;padding:20px 22px;border:1px solid rgba(197,159,74,0.3);background:#FFFEFA;border-radius:10px;">
      <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C59F4A;">Konzert</p>
      <p style="margin:0 0 14px 0;font-size:20px;font-weight:600;color:#0A1033;">${esc(event.title)}</p>
      <table style="width:100%;font-size:14px;color:#333;">
        <tr><td style="padding:3px 0;color:#777;width:140px;">Datum</td><td>${esc(event.dateLabel)}${event.time ? " · " + esc(event.time) : ""}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Ort</td><td>${esc(event.venue)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Anzahl Karten</td><td>${esc(quantityLabel)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Bestellnummer</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(order.id)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Betrag</td><td style="font-weight:600;">${amount}</td></tr>
      </table>
    </div>

    <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:22px;margin:28px 0 10px 0;color:#0A1033;">
      Bitte überweisen Sie den Betrag an:
    </h2>
    <div style="margin:10px 0 0;padding:18px 20px;border:1px solid rgba(20,30,78,0.12);background:#FDFBF6;border-radius:10px;">
      <table style="width:100%;font-size:14px;color:#222;">
        <tr><td style="padding:4px 0;color:#777;width:170px;">Kontoinhaber</td><td>${esc(holder)}</td></tr>
        <tr><td style="padding:4px 0;color:#777;">IBAN</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(SITE.bank.iban)}</td></tr>
        <tr><td style="padding:4px 0;color:#777;">BIC</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(SITE.bank.bic)}</td></tr>
        <tr><td style="padding:4px 0;color:#777;">Bank</td><td>${esc(SITE.bank.name)}</td></tr>
        <tr><td style="padding:4px 0;color:#777;">Betrag</td><td style="font-weight:600;">${amount}</td></tr>
        <tr><td style="padding:4px 0;color:#777;">Verwendungszweck</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(ref)}</td></tr>
      </table>
    </div>

    <p style="font-size:13.5px;line-height:1.6;color:#555;margin-top:18px;">
      Bitte geben Sie den Verwendungszweck genau so an, damit wir Ihre Zahlung
      Ihrer Bestellung zuordnen können.
    </p>

    <p style="font-size:14px;color:#555;line-height:1.6;margin-top:28px;">
      Herzlichen Dank für Ihre Unterstützung.<br>
      Ihr Förderverein Klingende Kirche
    </p>
    `
  );

  await r.emails.send({
    from: mailFrom(),
    to: order.buyer_email,
    replyTo: replyTo(),
    subject: `Ihre Bestellung für „${event.title}"`,
    html,
    text:
      `Vielen Dank, ${order.buyer_name}.\n\n` +
      `Wir haben Ihre Bestellung erhalten. Bitte überweisen Sie den Betrag ` +
      `an die unten stehende Bankverbindung. Ihre Karten werden an der ` +
      `Abendkasse auf Ihren Namen hinterlegt.\n\n` +
      `Konzert: ${event.title}\n` +
      `Datum: ${event.dateLabel}${event.time ? " · " + event.time : ""}\n` +
      `Ort: ${event.venue}\n` +
      `Anzahl Karten: ${quantityLabel}\n` +
      `Bestellnummer: ${order.id}\n` +
      `Betrag: ${amount}\n\n` +
      `Bankverbindung:\n` +
      `Kontoinhaber: ${holder}\n` +
      `IBAN: ${SITE.bank.iban}\n` +
      `BIC: ${SITE.bank.bic}\n` +
      `Bank: ${SITE.bank.name}\n` +
      `Betrag: ${amount}\n` +
      `Verwendungszweck: ${ref}\n`
  });
}

/**
 * An die Vereinsadresse: neue Bestellung ist eingegangen.
 */
export async function sendOrderReceivedToAdmin(
  order: OrderRow,
  event: EventMeta
) {
  const r = resend();
  if (!r) return;
  const to = adminRecipient();
  if (!to) {
    console.warn("[tickets/mail] no admin recipient configured");
    return;
  }

  const amount = formatEUR(order.amount_cents, "de");
  const quantityRegular = order.quantity - order.quantity_reduced;
  const quantityLabel =
    order.quantity_reduced > 0
      ? `${order.quantity} (davon ${quantityRegular} regulär, ${order.quantity_reduced} ermäßigt)`
      : String(order.quantity);
  const adminUrl = `${SITE_URL()}/admin`;

  const html = layout(
    "Neue Bestellung",
    `
    <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:28px;margin:0 0 8px 0;color:#0A1033;">
      Neue Bestellung eingegangen.
    </h1>
    <p style="font-size:14.5px;line-height:1.6;color:#333;">
      Eine neue Kartenbestellung wartet auf Zahlungseingang.
    </p>

    <div style="margin:22px 0;padding:18px 20px;border:1px solid rgba(197,159,74,0.3);background:#FFFEFA;border-radius:10px;">
      <table style="width:100%;font-size:14px;color:#222;">
        <tr><td style="padding:3px 0;color:#777;width:150px;">Konzert</td><td>${esc(event.title)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Datum</td><td>${esc(event.dateLabel)}${event.time ? " · " + esc(event.time) : ""}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Besteller</td><td>${esc(order.buyer_name)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">E-Mail</td><td><a href="mailto:${esc(order.buyer_email)}" style="color:#141E4E;">${esc(order.buyer_email)}</a></td></tr>
        <tr><td style="padding:3px 0;color:#777;">Karten</td><td>${esc(quantityLabel)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Betrag</td><td style="font-weight:600;">${amount}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Bestellnummer</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(order.id)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Verwendungszweck</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(reference(order, event))}</td></tr>
      </table>
    </div>

    <p style="margin:12px 0 0;">
      <a href="${adminUrl}" style="display:inline-block;background:#0A1033;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:500;">
        Im Admin öffnen
      </a>
    </p>

    <p style="font-size:13px;color:#777;margin-top:16px;">
      Sobald die Zahlung eingegangen ist, markieren Sie die Bestellung im Admin
      als bezahlt.
    </p>
    `
  );

  await r.emails.send({
    from: mailFrom(),
    to,
    replyTo: order.buyer_email,
    subject: `Neue Bestellung · ${event.title} · ${order.buyer_name}`,
    html,
    text:
      `Neue Bestellung eingegangen.\n\n` +
      `Konzert: ${event.title}\n` +
      `Datum: ${event.dateLabel}\n` +
      `Besteller: ${order.buyer_name} <${order.buyer_email}>\n` +
      `Karten: ${quantityLabel}\n` +
      `Betrag: ${amount}\n` +
      `Bestellnummer: ${order.id}\n` +
      `Verwendungszweck: ${reference(order, event)}\n\n` +
      `Admin: ${adminUrl}\n`
  });
}

/**
 * An den Besteller: Zahlungseingang ist bestätigt.
 */
export async function sendPaymentConfirmedToCustomer(
  order: OrderRow,
  event: EventMeta
) {
  const r = resend();
  if (!r) return;

  const amount = formatEUR(order.amount_cents, "de");
  const html = layout(
    "Zahlung erhalten",
    `
    <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:30px;margin:0 0 8px 0;color:#0A1033;">
      Wir haben Ihre Zahlung erhalten.
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;">
      Vielen Dank, ${esc(order.buyer_name)}. Ihre Karten für ${esc(event.title)}
      sind verbindlich reserviert und werden an der Abendkasse auf Ihren Namen
      hinterlegt.
    </p>

    <div style="margin:22px 0;padding:18px 20px;border:1px solid rgba(197,159,74,0.3);background:#FFFEFA;border-radius:10px;">
      <table style="width:100%;font-size:14px;color:#333;">
        <tr><td style="padding:3px 0;color:#777;width:140px;">Konzert</td><td>${esc(event.title)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Datum</td><td>${esc(event.dateLabel)}${event.time ? " · " + esc(event.time) : ""}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Ort</td><td>${esc(event.venue)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Karten</td><td>${order.quantity}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Betrag</td><td style="font-weight:600;">${amount}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Bestellnummer</td><td style="font-family:ui-monospace,Menlo,monospace;">${esc(order.id)}</td></tr>
      </table>
    </div>

    <p style="font-size:14px;color:#555;line-height:1.6;margin-top:24px;">
      Wir freuen uns auf Ihren Besuch.<br>
      Ihr Förderverein Klingende Kirche
    </p>
    `
  );

  await r.emails.send({
    from: mailFrom(),
    to: order.buyer_email,
    replyTo: replyTo(),
    subject: `Zahlung erhalten · „${event.title}"`,
    html,
    text:
      `Wir haben Ihre Zahlung erhalten.\n\n` +
      `Konzert: ${event.title}\n` +
      `Datum: ${event.dateLabel}${event.time ? " · " + event.time : ""}\n` +
      `Ort: ${event.venue}\n` +
      `Karten: ${order.quantity}\n` +
      `Betrag: ${amount}\n` +
      `Bestellnummer: ${order.id}\n`
  });
}

/**
 * An den Besteller: Bestellung durch den Verein abgesagt.
 */
export async function sendOrderCancelledToCustomer(
  order: OrderRow,
  event: EventMeta
) {
  const r = resend();
  if (!r) return;

  const html = layout(
    "Bestellung abgesagt",
    `
    <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:28px;margin:0 0 10px 0;color:#0A1033;">
      Ihre Bestellung wurde abgesagt.
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;">
      Hallo ${esc(order.buyer_name)},<br>
      Ihre Bestellung für ${esc(event.title)} ist storniert. Falls Sie den
      Betrag bereits überwiesen haben, melden Sie sich bitte kurz bei uns,
      damit wir die Rückerstattung veranlassen können.
    </p>

    <div style="margin:20px 0;padding:16px 20px;border:1px solid rgba(197,159,74,0.3);background:#FFFEFA;border-radius:10px;">
      <table style="width:100%;font-size:14px;color:#333;">
        <tr><td style="padding:3px 0;color:#777;width:140px;">Konzert</td><td>${esc(event.title)}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Datum</td><td>${esc(event.dateLabel)}</td></tr>
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
    subject: `Bestellung abgesagt · „${event.title}"`,
    html,
    text:
      `Ihre Bestellung wurde abgesagt.\n\n` +
      `Konzert: ${event.title}\n` +
      `Datum: ${event.dateLabel}\n` +
      `Bestellnummer: ${order.id}\n\n` +
      `Falls Sie bereits überwiesen haben, melden Sie sich bitte kurz, damit ` +
      `wir die Rückerstattung veranlassen können.\n`
  });
}
