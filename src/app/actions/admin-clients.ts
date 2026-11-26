'use server';

import { getAdminSession } from '@/app/actions/admin-auth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';
import { resend, getFromEmail } from '@/lib/email';
import { writeAuditLog } from '@/lib/audit';

export interface AdminClientItem {
  email: string;
  fullName: string;
  phone: string;
  reservationsCount: number;
  lastVisit: string;
  totalGuests: number;
  source: 'reservation' | 'contact' | 'lead';
  notes?: string;
}

export async function getAdminClients(): Promise<{
  ok: boolean;
  clients: AdminClientItem[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { ok: false, clients: [], error: 'Sesiune expirată. Autentificați-vă din nou.' };
  }

  if (!isSupabaseConfigured()) {
    return { ok: true, clients: [] };
  }

  try {
    // 1. Fetch from reservations
    const { data: resData, error: resError } = await supabaseAdmin
      .from('reservations')
      .select('email, first_name, last_name, phone, reservation_date, party_size, notes, created_at')
      .order('created_at', { ascending: false });

    if (resError) {
      console.warn('getAdminClients resError:', resError);
    }

    const clientMap = new Map<string, AdminClientItem>();

    if (resData && Array.isArray(resData)) {
      for (const row of resData) {
        const email = String(row.email || '').trim().toLowerCase();
        if (!email || !email.includes('@')) continue;

        const fullName = `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'Client Pescobar';
        const phone = row.phone || '';
        const visitDate = row.reservation_date || (row.created_at ? String(row.created_at).slice(0, 10) : '');
        const partySize = Number(row.party_size) || 1;

        const existing = clientMap.get(email);
        if (existing) {
          existing.reservationsCount += 1;
          existing.totalGuests += partySize;
          if (visitDate && (!existing.lastVisit || visitDate > existing.lastVisit)) {
            existing.lastVisit = visitDate;
          }
          if (!existing.phone && phone) {
            existing.phone = phone;
          }
        } else {
          clientMap.set(email, {
            email,
            fullName,
            phone,
            reservationsCount: 1,
            lastVisit: visitDate,
            totalGuests: partySize,
            source: 'reservation',
            notes: row.notes || undefined,
          });
        }
      }
    }

    // 2. Fetch from audit_log for contact inquiries
    const { data: auditData } = await supabaseAdmin
      .from('audit_log')
      .select('actor_email, action, diff, at')
      .ilike('action', 'contact.%')
      .order('at', { ascending: false })
      .limit(200);

    if (auditData && Array.isArray(auditData)) {
      for (const entry of auditData) {
        const diff = (entry.diff || {}) as Record<string, unknown>;
        const email = String(diff.email || entry.actor_email || '').trim().toLowerCase();
        if (!email || !email.includes('@') || email.includes('onboarding@') || email.includes('admin@')) continue;

        const existing = clientMap.get(email);
        const contactName = `${diff.firstName || ''} ${diff.lastName || ''}`.trim();
        const contactPhone = String(diff.phone || '');
        const dateStr = entry.at ? String(entry.at).slice(0, 10) : '';

        if (!existing) {
          clientMap.set(email, {
            email,
            fullName: contactName || 'Contact Web',
            phone: contactPhone,
            reservationsCount: 0,
            lastVisit: dateStr,
            totalGuests: 0,
            source: 'contact',
          });
        } else if (!existing.phone && contactPhone) {
          existing.phone = contactPhone;
        }
      }
    }

    const list = Array.from(clientMap.values()).sort((a, b) =>
      b.lastVisit.localeCompare(a.lastVisit)
    );

    return { ok: true, clients: list };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Eroare la încărcarea listei de clienți.';
    return { ok: false, clients: [], error: msg };
  }
}

export async function sendAdminMassEmail({
  recipients,
  subject,
  messageBody,
  buttonText,
  buttonUrl,
}: {
  recipients: string[];
  subject: string;
  messageBody: string;
  buttonText?: string;
  buttonUrl?: string;
}): Promise<{ ok: boolean; sentCount: number; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { ok: false, sentCount: 0, error: 'Sesiune neautorizată.' };
  }

  if (!recipients || recipients.length === 0) {
    return { ok: false, sentCount: 0, error: 'Selectați cel puțin un destinatar.' };
  }

  if (!subject.trim()) {
    return { ok: false, sentCount: 0, error: 'Subiectul emailului este obligatoriu.' };
  }

  if (!messageBody.trim()) {
    return { ok: false, sentCount: 0, error: 'Conținutul mesajului este obligatoriu.' };
  }

  if (!resend) {
    return {
      ok: false,
      sentCount: 0,
      error: 'Serviciul Resend nu este configurat (lipsește RESEND_API_KEY).',
    };
  }

  const fromEmail = getFromEmail();
  const paragraphs = messageBody
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #E2E8F0;">${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');

  const ctaButtonHtml = buttonText && buttonUrl ? `
    <div style="text-align: center; margin: 36px 0 24px;">
      <a href="${buttonUrl}" style="display: inline-block; background: linear-gradient(135deg, #C8A96A 0%, #DFC286 50%, #C8A96A 100%); color: #0B192C; font-weight: 800; font-size: 15px; padding: 15px 36px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 16px rgba(200, 169, 106, 0.35); text-transform: uppercase; letter-spacing: 0.5px;">
        ${buttonText}
      </a>
    </div>
  ` : '';

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07101C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #07101C; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0B192C; border-radius: 20px; border: 1px solid rgba(223, 194, 134, 0.3); overflow: hidden; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px 28px; text-align: center; background: radial-gradient(circle at 50% 0%, rgba(223, 194, 134, 0.15) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.08);">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 26px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase;">
                PESCOBAR
              </h1>
              <p style="margin: 6px 0 0; color: #DFC286; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">
                Seafood Restaurant · Bruxelles
              </p>
              <div style="height: 1px; width: 60px; background-color: #DFC286; margin: 18px auto 0; opacity: 0.6;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px 28px; background-color: #0B192C;">
              <h2 style="margin: 0 0 22px; color: #DFC286; font-size: 21px; font-weight: 700; line-height: 1.35; letter-spacing: 0.2px;">
                ${subject}
              </h2>
              ${paragraphs}
              ${ctaButtonHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px 32px; background-color: #07101C; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
              <p style="margin: 0 0 8px; color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">
                Pescobar Seafood Restaurant Bruxelles
              </p>
              <p style="margin: 0 0 16px; color: #94A3B8; font-size: 12px; line-height: 1.6;">
                Quai aux Briques 46, 1000 Bruxelles (Sainte-Catherine)<br/>
                Telefon & WhatsApp: <a href="tel:+32499007022" style="color: #DFC286; text-decoration: none; font-weight: 600;">+32 499 00 70 22</a>
              </p>
              <table role="presentation" align="center" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://pescobarseafoodbrussels.be/ro/menu" style="color: #DFC286; font-size: 12px; text-decoration: none; font-weight: 600;">Meniu Online</a>
                  </td>
                  <td style="color: #64748B;">•</td>
                  <td style="padding: 0 8px;">
                    <a href="https://pescobarseafoodbrussels.be/ro/rezervare" style="color: #DFC286; font-size: 12px; text-decoration: none; font-weight: 600;">Rezervare Masă</a>
                  </td>
                  <td style="color: #64748B;">•</td>
                  <td style="padding: 0 8px;">
                    <a href="https://pescobarseafoodbrussels.be" style="color: #DFC286; font-size: 12px; text-decoration: none; font-weight: 600;">pescobarseafoodbrussels.be</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Deduplicate emails
  const uniqueEmails = Array.from(new Set(recipients.map((e) => e.trim().toLowerCase()))).filter(
    (e) => e && e.includes('@')
  );

  let sentCount = 0;
  // Send in small batches
  for (const email of uniqueEmails) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlTemplate,
      });
      sentCount++;
    } catch (sendErr) {
      console.warn(`Failed sending marketing email to ${email}:`, sendErr);
    }
  }

  // Log in audit log
  await writeAuditLog({
    actorEmail: session.email,
    action: 'marketing.mass_email',
    entity: 'settings',
    summary: `Campanie email trimisă la ${sentCount} clienți: "${subject}"`,
    diff: {
      subject,
      totalRecipients: uniqueEmails.length,
      sentCount,
    },
  });

  return { ok: true, sentCount };
}
