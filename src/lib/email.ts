import { Resend } from 'resend';
import { SITE_CONFIG, type Locale } from '@/config/site';
import type { ReservationService, ReservationZone, ReservationStatus } from '@/lib/reservations-contract';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Default sender address: uses onboarding@resend.dev until pescobarseafoodbrussels.be is verified
export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Pescobar Seafood Bruxelles <onboarding@resend.dev>'
  );
}

// Restaurant notification inbox
export function getAlertEmail(): string {
  return (
    process.env.RESERVATION_ALERT_EMAIL?.trim() ||
    'pescobarbrussels@gmail.com'
  );
}

function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const ZONE_NAMES: Record<Locale, Record<ReservationZone, string>> = {
  fr: {
    main: 'Salle Principale',
    window_terrace: 'Terrasse Vitrée',
    lounge: 'Table de Groupe / Lounge',
  },
  nl: {
    main: 'Hoofdzaal',
    window_terrace: 'Glazen Terras',
    lounge: 'Groepstafel / Lounge',
  },
  en: {
    main: 'Main Dining Room',
    window_terrace: 'Glass Terrace',
    lounge: 'Group Table / Lounge',
  },
  ro: {
    main: 'Salonul Principal',
    window_terrace: 'Terasă Vitrată',
    lounge: 'Masă de Grup / Lounge',
  },
};

const SERVICE_NAMES: Record<Locale, Record<ReservationService, string>> = {
  fr: { lunch: 'Déjeuner (12:00 – 16:00)', dinner: 'Dîner (16:00 – 23:00)' },
  nl: { lunch: 'Lunch (12:00 – 16:00)', dinner: 'Diner (16:00 – 23:00)' },
  en: { lunch: 'Lunch (12:00 – 16:00)', dinner: 'Dinner (16:00 – 23:00)' },
  ro: { lunch: 'Prânz (12:00 – 16:00)', dinner: 'Cină (16:00 – 23:00)' },
};

function formatDisplayDate(dateStr: string, locale: Locale): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const lang = locale === 'ro' ? 'ro-RO' : locale === 'nl' ? 'nl-BE' : locale === 'en' ? 'en-GB' : 'fr-BE';
    return dateObj.toLocaleDateString(lang, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Reusable luxury email container
function buildEmailTemplate({
  title,
  preheader,
  contentHtml,
  ctaHtml,
}: {
  title: string;
  preheader?: string;
  contentHtml: string;
  ctaHtml?: string;
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #070D17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; }
    table { border-collapse: collapse; }
    a { color: #C8A96A; text-decoration: none; }
  </style>
</head>
<body style="margin:0;padding:24px 12px;background-color:#070D17;color:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#0C1524;border-radius:16px;border:1px solid #1E2D44;overflow:hidden;box-shadow:0 12px 36px rgba(0,0,0,0.45);">
    <!-- Header -->
    <tr>
      <td style="padding:28px 24px 20px;text-align:center;background:linear-gradient(180deg,#101C30 0%,#0C1524 100%);border-bottom:1px solid #1E2D44;">
        <div style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C8A96A;margin-bottom:6px;">
          RESTAURANT FRUITS DE MER &bull; BRUXELLES
        </div>
        <div style="font-size:24px;font-weight:800;letter-spacing:1px;color:#FFFFFF;line-height:1.2;">
          Pescobar Seafood
        </div>
        <div style="font-size:12px;color:#8E9EB5;margin-top:4px;">
          Rue Jourdan 18, 1060 Saint-Gilles &bull; Quartier Louise
        </div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:28px 24px;">
        <h1 style="font-size:20px;font-weight:700;margin:0 0 16px 0;color:#FFFFFF;line-height:1.3;">
          ${escapeHtml(title)}
        </h1>

        ${contentHtml}

        ${ctaHtml ? `<div style="margin-top:28px;padding-top:20px;border-top:1px solid #1E2D44;">${ctaHtml}</div>` : ''}
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:20px 24px;background-color:#080E18;border-top:1px solid #142032;text-align:center;font-size:12px;color:#7A8B9E;line-height:1.6;">
        <div style="font-weight:600;color:#A9B8CC;margin-bottom:6px;">
          Pescobar Seafood Bruxelles &bull; SRL BE 1022.567.070
        </div>
        <div>
          Ouvert 7j/7 de 12:00 à 23:00 (Cuisine continue)
        </div>
        <div style="margin-top:6px;">
          <a href="tel:${SITE_CONFIG.phoneRaw}" style="color:#C8A96A;text-decoration:none;font-weight:600;">${SITE_CONFIG.phone}</a>
          &bull;
          <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" style="color:#25D366;text-decoration:none;font-weight:600;">WhatsApp</a>
          &bull;
          <a href="${SITE_CONFIG.domain}" style="color:#C8A96A;text-decoration:none;">pescobarseafoodbruxelles.be</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// -------------------------------------------------------------
// RESERVATIONS
// -------------------------------------------------------------

export interface ReservationEmailData {
  id?: string | null;
  reservationDate: string;
  reservationTime: string;
  service: ReservationService;
  partySize: number;
  zone: ReservationZone;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  occasion?: string | null;
  notes?: string | null;
  locale?: Locale;
}

export async function sendReservationEmail(data: ReservationEmailData): Promise<{
  adminSent: boolean;
  customerSent: boolean;
  errors?: string[];
}> {
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not set. Skipping reservation email dispatch.');
    return { adminSent: false, customerSent: false, errors: ['No API key'] };
  }

  const locale = (['fr', 'nl', 'en', 'ro'].includes(data.locale || '') ? data.locale : 'fr') as Locale;
  const fullName = [data.firstName.trim(), data.lastName.trim()].filter(Boolean).join(' ');
  const formattedDate = formatDisplayDate(data.reservationDate, locale);
  const zoneName = ZONE_NAMES[locale][data.zone] || data.zone;
  const serviceName = SERVICE_NAMES[locale][data.service] || data.service;
  const cleanPhone = data.phone.replace(/[^0-9+]/g, '');
  const fromEmail = getFromEmail();
  const alertEmail = getAlertEmail();

  const errors: string[] = [];
  let adminSent = false;
  let customerSent = false;

  // 1. Admin Alert Email (Sent to restaurant)
  try {
    const adminHtml = buildEmailTemplate({
      title: `🦞 Nouvelle Réservation : ${data.partySize} pers. — ${escapeHtml(fullName)}`,
      preheader: `Réservation pour le ${data.reservationDate} à ${data.reservationTime} (${data.partySize} pers.)`,
      contentHtml: `
        <div style="background-color:#070D17;border:1px solid #1E2D44;border-radius:12px;padding:16px;margin-bottom:20px;">
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#FFFFFF;">
            <tr>
              <td style="color:#8E9EB5;width:40%;font-weight:600;">Date & Heure :</td>
              <td style="color:#DFC286;font-weight:700;font-size:15px;">${escapeHtml(formattedDate)} à ${escapeHtml(data.reservationTime)}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Couverts :</td>
              <td style="font-weight:700;">${data.partySize} personnes</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Zone souhaitée :</td>
              <td>${escapeHtml(zoneName)}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Service :</td>
              <td>${escapeHtml(serviceName)}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Client :</td>
              <td style="font-weight:700;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Téléphone :</td>
              <td><a href="tel:${escapeHtml(cleanPhone)}" style="color:#C8A96A;font-weight:600;">${escapeHtml(data.phone)}</a></td>
            </tr>
            ${data.email ? `
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">E-mail client :</td>
              <td><a href="mailto:${escapeHtml(data.email)}" style="color:#C8A96A;">${escapeHtml(data.email)}</a></td>
            </tr>` : ''}
            ${data.occasion ? `
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Occasion :</td>
              <td style="color:#DFC286;font-weight:600;">${escapeHtml(data.occasion)}</td>
            </tr>` : ''}
            ${data.notes ? `
            <tr>
              <td style="color:#8E9EB5;font-weight:600;vertical-align:top;">Remarques :</td>
              <td style="color:#CBD7E6;font-style:italic;">“${escapeHtml(data.notes)}”</td>
            </tr>` : ''}
          </table>
        </div>
      `,
      ctaHtml: `
        <div style="text-align:center;">
          <a href="https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(`Bonjour ${fullName}, nous vous confirmons avec plaisir votre réservation chez Pescobar Seafood pour ${data.partySize} pers. le ${data.reservationDate} à ${data.reservationTime}.`)}" style="display:inline-block;padding:12px 20px;margin:4px;background-color:#25D366;color:#070D17;font-weight:700;font-size:13px;border-radius:10px;text-decoration:none;">
            💬 Contacter sur WhatsApp
          </a>
          <a href="tel:${escapeHtml(cleanPhone)}" style="display:inline-block;padding:12px 20px;margin:4px;background-color:#1E2D44;color:#FFFFFF;font-weight:700;font-size:13px;border-radius:10px;text-decoration:none;border:1px solid #2B3E5C;">
            📞 Appeler (${escapeHtml(data.phone)})
          </a>
          <div style="margin-top:12px;">
            <a href="${SITE_CONFIG.domain}/admin/reservations" style="font-size:12px;color:#8E9EB5;text-decoration:underline;">
              Ouvrir l'administration des réservations &rarr;
            </a>
          </div>
        </div>
      `,
    });

    const adminRes = await resend.emails.send({
      from: fromEmail,
      to: alertEmail,
      subject: `🦞 Réservation ${data.partySize}p — ${fullName} (${data.reservationDate} à ${data.reservationTime})`,
      html: adminHtml,
    });

    if (adminRes.error) {
      console.error('[Resend] Error sending admin reservation alert:', adminRes.error);
      errors.push(`Admin email error: ${adminRes.error.message}`);
    } else {
      adminSent = true;
      console.log('[Resend] Admin reservation alert sent successfully:', adminRes.data?.id);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Resend] Exception sending admin reservation alert:', msg);
    errors.push(`Admin email exception: ${msg}`);
  }

  // 2. Customer Confirmation Email (if customer provided an email)
  if (data.email && data.email.includes('@')) {
    try {
      const titlesByLocale: Record<Locale, string> = {
        fr: `Votre table chez Pescobar Seafood (${formattedDate} à ${data.reservationTime})`,
        nl: `Uw tafel bij Pescobar Seafood (${formattedDate} om ${data.reservationTime})`,
        en: `Your Table at Pescobar Seafood (${formattedDate} at ${data.reservationTime})`,
        ro: `Rezervarea dumneavoastră la Pescobar Seafood (${formattedDate} la ora ${data.reservationTime})`,
      };

      const greetingsByLocale: Record<Locale, string> = {
        fr: `Bonjour ${escapeHtml(data.firstName)},<br><br>Nous avons le plaisir de vous confirmer la prise en compte de votre réservation chez <strong>Pescobar Seafood Bruxelles</strong>. Toute l’équipe se réjouit de vous accueillir pour un moment gourmand et convivial autour de nos fruits de mer d’exception.`,
        nl: `Beste ${escapeHtml(data.firstName)},<br><br>We bevestigen met plezier uw reservering bij <strong>Pescobar Seafood Brussel</strong>. Ons team kijkt ernaar uit u te verwelkomen voor een heerlijke zeevruchtenervaring.`,
        en: `Dear ${escapeHtml(data.firstName)},<br><br>We are delighted to confirm your reservation at <strong>Pescobar Seafood Brussels</strong>. Our team looks forward to welcoming you for an unforgettable seafood experience.`,
        ro: `Bună ziua, ${escapeHtml(data.firstName)},<br><br>Avem plăcerea de a vă confirma înregistrarea rezervării dumneavoastră la <strong>Pescobar Seafood Bruxelles</strong>. Echipa noastră vă așteaptă cu drag pentru o experiență culinară de neuitat.`,
      };

      const customerHtml = buildEmailTemplate({
        title: titlesByLocale[locale],
        preheader: `Votre réservation pour ${data.partySize} personnes le ${data.reservationDate} à ${data.reservationTime}`,
        contentHtml: `
          <p style="font-size:15px;line-height:1.6;color:#E0E8F5;margin-bottom:20px;">
            ${greetingsByLocale[locale]}
          </p>

          <div style="background-color:#070D17;border:1px solid #C8A96A;border-radius:12px;padding:18px;margin-bottom:24px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#C8A96A;margin-bottom:12px;">
              RÉCAPITULATIF DE VOTRE RÉSERVATION
            </div>
            <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#FFFFFF;">
              <tr>
                <td style="color:#8E9EB5;width:40%;">Date :</td>
                <td style="color:#DFC286;font-weight:700;">${escapeHtml(formattedDate)}</td>
              </tr>
              <tr>
                <td style="color:#8E9EB5;">Heure :</td>
                <td style="color:#DFC286;font-weight:700;">${escapeHtml(data.reservationTime)}</td>
              </tr>
              <tr>
                <td style="color:#8E9EB5;">Nombre d'invités :</td>
                <td style="font-weight:700;">${data.partySize} personnes</td>
              </tr>
              <tr>
                <td style="color:#8E9EB5;">Zone :</td>
                <td>${escapeHtml(zoneName)}</td>
              </tr>
              <tr>
                <td style="color:#8E9EB5;">Nom de contact :</td>
                <td>${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="color:#8E9EB5;">Téléphone :</td>
                <td>${escapeHtml(data.phone)}</td>
              </tr>
              ${data.occasion ? `
              <tr>
                <td style="color:#8E9EB5;">Occasion :</td>
                <td style="color:#DFC286;">${escapeHtml(data.occasion)}</td>
              </tr>` : ''}
            </table>
          </div>

          <!-- Accès & Stationnement -->
          <div style="background-color:#0E1828;border:1px solid #1A283D;border-radius:12px;padding:16px;margin-bottom:20px;font-size:13px;line-height:1.6;color:#BAC7D8;">
            <div style="font-weight:700;color:#FFFFFF;margin-bottom:6px;">📍 Accès & Informations pratiques</div>
            <div>&bull; <strong>Adresse :</strong> Rue Jourdan 18, 1060 Saint-Gilles (à 250m de la Place Stéphanie / Avenue Louise)</div>
            <div>&bull; <strong>Transports :</strong> Métro Louise (lignes 2 & 6) à 3 min à pied &bull; Trams 8, 92, 93, 97 (Arrêt Stéphanie)</div>
            <div>&bull; <strong>Parkings :</strong> Interparking Stéphanie-Louise (Avenue Louise 83) &bull; Interparking Toison d'Or</div>
            <div style="margin-top:6px;color:#8E9EB5;">En cas d'imprévu ou de retard, contactez-nous directement au <strong style="color:#C8A96A;">${SITE_CONFIG.phone}</strong> ou sur WhatsApp.</div>
          </div>
        `,
        ctaHtml: `
          <div style="text-align:center;">
            <a href="${SITE_CONFIG.domain}/${locale}/menu" style="display:inline-block;padding:13px 26px;background-color:#C8A96A;color:#070D17;font-weight:800;font-size:13px;border-radius:10px;text-decoration:none;">
              Consulter la carte & les plateaux &rarr;
            </a>
          </div>
        `,
      });

      const custRes = await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: titlesByLocale[locale],
        html: customerHtml,
      });

      if (custRes.error) {
        // If account is in sandbox mode, Resend prevents sending to non-account emails
        console.warn('[Resend Sandbox Notice] Customer confirmation email could not be delivered to non-account address:', custRes.error.message);
        errors.push(`Customer email note: ${custRes.error.message}`);
      } else {
        customerSent = true;
        console.log('[Resend] Customer confirmation email sent:', custRes.data?.id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn('[Resend] Exception delivering customer confirmation email:', msg);
      errors.push(`Customer email exception: ${msg}`);
    }
  }

  return { adminSent, customerSent, errors: errors.length ? errors : undefined };
}

// -------------------------------------------------------------
// CONTACT FORM
// -------------------------------------------------------------

export interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  locale?: Locale;
}

export async function sendContactEmail(data: ContactEmailData): Promise<{
  adminSent: boolean;
  customerSent: boolean;
  errors?: string[];
}> {
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not set. Skipping contact email dispatch.');
    return { adminSent: false, customerSent: false, errors: ['No API key'] };
  }

  const fullName = [data.firstName.trim(), data.lastName.trim()].filter(Boolean).join(' ');
  const fromEmail = getFromEmail();
  const alertEmail = getAlertEmail();
  const errors: string[] = [];
  let adminSent = false;
  let customerSent = false;

  // Admin alert
  try {
    const adminHtml = buildEmailTemplate({
      title: `📩 Nouveau message de contact : ${escapeHtml(data.subject)}`,
      preheader: `Message de ${fullName} (${data.email})`,
      contentHtml: `
        <div style="background-color:#070D17;border:1px solid #1E2D44;border-radius:12px;padding:16px;margin-bottom:20px;">
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#FFFFFF;">
            <tr>
              <td style="color:#8E9EB5;width:35%;font-weight:600;">Expéditeur :</td>
              <td style="font-weight:700;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">E-mail :</td>
              <td><a href="mailto:${escapeHtml(data.email)}" style="color:#C8A96A;font-weight:600;">${escapeHtml(data.email)}</a></td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Téléphone :</td>
              <td><a href="tel:${escapeHtml(data.phone)}" style="color:#C8A96A;">${escapeHtml(data.phone)}</a></td>
            </tr>` : ''}
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Sujet :</td>
              <td style="color:#DFC286;font-weight:700;">${escapeHtml(data.subject)}</td>
            </tr>
          </table>
        </div>

        <div style="background-color:#0A1220;border-left:4px solid #C8A96A;padding:16px;border-radius:0 10px 10px 0;margin-bottom:20px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8E9EB5;margin-bottom:8px;">
            CONTENU DU MESSAGE :
          </div>
          <div style="font-size:14px;line-height:1.7;color:#FFFFFF;white-space:pre-wrap;">
            ${escapeHtml(data.message)}
          </div>
        </div>
      `,
      ctaHtml: `
        <div style="text-align:center;">
          <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: ${data.subject} — Pescobar Seafood`)}" style="display:inline-block;padding:12px 22px;background-color:#C8A96A;color:#070D17;font-weight:700;font-size:13px;border-radius:10px;text-decoration:none;">
            ✉️ Répondre par E-mail
          </a>
          ${data.phone ? `
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="display:inline-block;padding:12px 22px;margin-left:8px;background-color:#25D366;color:#070D17;font-weight:700;font-size:13px;border-radius:10px;text-decoration:none;">
            💬 Répondre sur WhatsApp
          </a>` : ''}
        </div>
      `,
    });

    const res = await resend.emails.send({
      from: fromEmail,
      to: alertEmail,
      subject: `📩 Contact Pescobar : ${data.subject} — ${fullName}`,
      html: adminHtml,
      replyTo: data.email,
    });

    if (res.error) {
      errors.push(`Admin contact email error: ${res.error.message}`);
    } else {
      adminSent = true;
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`Admin contact email exception: ${msg}`);
  }

  // Customer receipt
  if (data.email && data.email.includes('@')) {
    try {
      const custHtml = buildEmailTemplate({
        title: `Nous avons bien reçu votre message`,
        preheader: `Merci pour votre prise de contact avec Pescobar Seafood Bruxelles`,
        contentHtml: `
          <p style="font-size:15px;line-height:1.6;color:#E0E8F5;margin-bottom:18px;">
            Bonjour ${escapeHtml(data.firstName)},<br><br>
            Nous vous remercions pour votre message concernant <strong>“${escapeHtml(data.subject)}”</strong>.
            Notre équipe en prend connaissance avec attention et vous répondra dans les plus brefs délais.
          </p>

          <div style="background-color:#070D17;border:1px solid #1E2D44;border-radius:12px;padding:16px;margin-bottom:20px;font-size:13px;color:#8E9EB5;line-height:1.6;">
            <div style="color:#C8A96A;font-weight:700;margin-bottom:6px;">Rappel de votre demande :</div>
            <div style="color:#CBD7E6;font-style:italic;">“${escapeHtml(data.message)}”</div>
          </div>

          <p style="font-size:13px;line-height:1.6;color:#8E9EB5;">
            Si votre demande est urgente ou concerne une réservation le jour même, vous pouvez également nous joindre directement par téléphone au <strong>${SITE_CONFIG.phone}</strong>.
          </p>
        `,
      });

      const custRes = await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: `Message reçu — Pescobar Seafood Bruxelles`,
        html: custHtml,
      });

      if (!custRes.error) {
        customerSent = true;
      }
    } catch {
      // Sandbox restrictions for guest recipient caught cleanly
    }
  }

  return { adminSent, customerSent, errors: errors.length ? errors : undefined };
}

// -------------------------------------------------------------
// PRIVATE EVENTS & GROUP DINING
// -------------------------------------------------------------

export interface PrivateEventEmailData {
  eventType: string;
  eventDate?: string | null;
  guestsCount?: string | null;
  firstName: string;
  lastName: string;
  company?: string | null;
  email?: string | null;
  phone: string;
  message?: string | null;
  locale?: Locale;
}

export async function sendPrivateEventEmail(data: PrivateEventEmailData): Promise<{
  adminSent: boolean;
  customerSent: boolean;
  errors?: string[];
}> {
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not set. Skipping private event email dispatch.');
    return { adminSent: false, customerSent: false, errors: ['No API key'] };
  }

  const fullName = [data.firstName.trim(), data.lastName.trim()].filter(Boolean).join(' ');
  const contactWithCompany = data.company?.trim() ? `${fullName} (${data.company.trim()})` : fullName;
  const fromEmail = getFromEmail();
  const alertEmail = getAlertEmail();
  const errors: string[] = [];
  let adminSent = false;
  let customerSent = false;

  // Admin alert
  try {
    const adminHtml = buildEmailTemplate({
      title: `🍾 Demande Événement Privé / Groupe : ${escapeHtml(data.eventType)}`,
      preheader: `Demande de ${contactWithCompany} - ${data.guestsCount || 'Groupe'} invités`,
      contentHtml: `
        <div style="background-color:#070D17;border:1px solid #1E2D44;border-radius:12px;padding:16px;margin-bottom:20px;">
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#FFFFFF;">
            <tr>
              <td style="color:#8E9EB5;width:35%;font-weight:600;">Type d'événement :</td>
              <td style="color:#DFC286;font-weight:700;">${escapeHtml(data.eventType)}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Date envisagée :</td>
              <td style="font-weight:700;">${escapeHtml(data.eventDate || 'À définir')}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Nombre d'invités :</td>
              <td style="font-weight:700;">${escapeHtml(data.guestsCount || 'Non précisé')}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Contact :</td>
              <td style="font-weight:700;">${escapeHtml(contactWithCompany)}</td>
            </tr>
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">Téléphone :</td>
              <td><a href="tel:${escapeHtml(data.phone)}" style="color:#C8A96A;font-weight:600;">${escapeHtml(data.phone)}</a></td>
            </tr>
            ${data.email ? `
            <tr>
              <td style="color:#8E9EB5;font-weight:600;">E-mail :</td>
              <td><a href="mailto:${escapeHtml(data.email)}" style="color:#C8A96A;">${escapeHtml(data.email)}</a></td>
            </tr>` : ''}
          </table>
        </div>

        ${data.message ? `
        <div style="background-color:#0A1220;border-left:4px solid #DFC286;padding:16px;border-radius:0 10px 10px 0;margin-bottom:20px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8E9EB5;margin-bottom:8px;">
            BRIEF / SOUHAITS PARTICULIERS :
          </div>
          <div style="font-size:14px;line-height:1.7;color:#FFFFFF;white-space:pre-wrap;">
            ${escapeHtml(data.message)}
          </div>
        </div>` : ''}
      `,
      ctaHtml: `
        <div style="text-align:center;">
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${fullName}, nous avons bien reçu votre demande pour votre événement "${data.eventType}" chez Pescobar Seafood.`)}" style="display:inline-block;padding:12px 22px;background-color:#25D366;color:#070D17;font-weight:700;font-size:13px;border-radius:10px;text-decoration:none;">
            💬 Échanger sur WhatsApp
          </a>
          <a href="tel:${escapeHtml(data.phone)}" style="display:inline-block;padding:12px 22px;margin-left:8px;background-color:#1E2D44;color:#FFFFFF;font-weight:700;font-size:13px;border-radius:10px;text-decoration:none;border:1px solid #2B3E5C;">
            📞 Appeler (${escapeHtml(data.phone)})
          </a>
        </div>
      `,
    });

    const res = await resend.emails.send({
      from: fromEmail,
      to: alertEmail,
      subject: `🍾 Demande Événement Privé : ${data.eventType} — ${contactWithCompany}`,
      html: adminHtml,
      replyTo: data.email || undefined,
    });

    if (res.error) {
      errors.push(`Admin event email error: ${res.error.message}`);
    } else {
      adminSent = true;
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`Admin event email exception: ${msg}`);
  }

  // Customer receipt
  if (data.email && data.email.includes('@')) {
    try {
      const custHtml = buildEmailTemplate({
        title: `Demande d'événement bien reçue`,
        preheader: `Votre projet d'événement chez Pescobar Seafood Bruxelles`,
        contentHtml: `
          <p style="font-size:15px;line-height:1.6;color:#E0E8F5;margin-bottom:18px;">
            Bonjour ${escapeHtml(data.firstName)},<br><br>
            Nous vous confirmons la bonne réception de votre demande pour l'organisation de votre événement <strong>“${escapeHtml(data.eventType)}”</strong> chez Pescobar Seafood.
          </p>

          <div style="background-color:#070D17;border:1px solid #1E2D44;border-radius:12px;padding:16px;margin-bottom:20px;font-size:13px;line-height:1.6;">
            <div style="color:#C8A96A;font-weight:700;margin-bottom:8px;">Détails enregistrés :</div>
            <div>&bull; <strong>Format :</strong> ${escapeHtml(data.eventType)}</div>
            ${data.eventDate ? `<div>&bull; <strong>Date souhaitée :</strong> ${escapeHtml(data.eventDate)}</div>` : ''}
            ${data.guestsCount ? `<div>&bull; <strong>Invités estimés :</strong> ${escapeHtml(data.guestsCount)}</div>` : ''}
          </div>

          <p style="font-size:13px;line-height:1.6;color:#BAC7D8;">
            Notre responsable événementiel vous recontactera rapidement par téléphone ou WhatsApp afin de vous proposer un menu sur-mesure (plateaux géants, Seafood Boil signature, accords vins & desserts).
          </p>
        `,
      });

      const custRes = await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: `Votre demande d'événement chez Pescobar Seafood Bruxelles`,
        html: custHtml,
      });

      if (!custRes.error) {
        customerSent = true;
      }
    } catch {
      // Sandbox restrictions caught cleanly
    }
  }

  return { adminSent, customerSent, errors: errors.length ? errors : undefined };
}

// -------------------------------------------------------------
// STATUS UPDATE (Confirmed / Cancelled by Admin)
// -------------------------------------------------------------

export async function sendReservationStatusUpdateEmail(
  reservation: {
    first_name: string;
    last_name: string;
    email: string | null;
    reservation_date: string;
    reservation_time: string;
    party_size: number;
    locale: Locale;
  },
  newStatus: ReservationStatus
): Promise<boolean> {
  if (!resend || !reservation.email || !reservation.email.includes('@')) {
    return false;
  }
  if (newStatus !== 'confirmed' && newStatus !== 'cancelled') {
    return false;
  }

  const locale = reservation.locale || 'fr';
  const fullName = [reservation.first_name, reservation.last_name].filter(Boolean).join(' ');
  const formattedDate = formatDisplayDate(reservation.reservation_date, locale);
  const fromEmail = getFromEmail();

  const isConfirmed = newStatus === 'confirmed';
  const title = isConfirmed
    ? `✅ Votre réservation est confirmée — Pescobar Seafood`
    : `Mise à jour de votre réservation — Pescobar Seafood`;

  const bodyMsg = isConfirmed
    ? `Excellente nouvelle ! Votre réservation pour <strong>${reservation.party_size} personnes</strong> le <strong>${escapeHtml(formattedDate)} à ${escapeHtml(reservation.reservation_time)}</strong> est officiellement <strong>confirmée</strong> par notre équipe.<br><br>Nous vous attendons avec impatience au <strong>Rue Jourdan 18, 1060 Saint-Gilles</strong>.`
    : `Nous vous informons que votre réservation pour le <strong>${escapeHtml(formattedDate)} à ${escapeHtml(reservation.reservation_time)}</strong> a été annulée.<br><br>Pour toute question ou pour reprogrammer une table, contactez-nous au <strong>${SITE_CONFIG.phone}</strong>.`;

  try {
    const html = buildEmailTemplate({
      title,
      contentHtml: `
        <p style="font-size:15px;line-height:1.6;color:#E0E8F5;">
          Bonjour ${escapeHtml(reservation.first_name)},<br><br>
          ${bodyMsg}
        </p>
      `,
    });

    const res = await resend.emails.send({
      from: fromEmail,
      to: reservation.email,
      subject: title,
      html,
    });

    return !res.error;
  } catch {
    return false;
  }
}
