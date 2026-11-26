import { NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIpFromHeaders,
  rateLimiters,
} from '@/lib/ratelimit';
import {
  sendContactEmail,
  sendPrivateEventEmail,
} from '@/lib/email';
import { writeAuditLog } from '@/lib/audit';
import type { Locale } from '@/config/site';

const VALID_LOCALES = ['fr', 'nl', 'en', 'ro'] as const;

export async function POST(request: Request) {
  const ip = getClientIpFromHeaders(request.headers);
  const rl = await checkRateLimit(rateLimiters.contact, ip, 'contact');
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Trop de requêtes. Veuillez patienter un instant.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  const type = String(body.type || 'contact').trim();
  const firstName = String(body.first_name || '').trim();
  const lastName = String(body.last_name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const message = String(body.message || '').trim();
  const locale = (VALID_LOCALES.includes(body.locale as Locale) ? body.locale : 'fr') as Locale;

  if (!firstName) {
    return NextResponse.json(
      { ok: false, error: 'Le prénom est requis.' },
      { status: 400 }
    );
  }

  // Handle Private Event Inquiry
  if (type === 'private_event') {
    const eventType = String(body.event_type || 'Événement Privé').trim();
    const eventDate = String(body.event_date || '').trim() || null;
    const guestsCount = String(body.guests_count || '').trim() || null;
    const company = String(body.company || '').trim() || null;

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: 'Le numéro de téléphone est requis pour un événement privé.' },
        { status: 400 }
      );
    }

    try {
      const result = await sendPrivateEventEmail({
        eventType,
        eventDate,
        guestsCount,
        firstName,
        lastName,
        company,
        email: email || null,
        phone,
        message: message || null,
        locale,
      });

      await writeAuditLog({
        actorEmail: email || 'contact@client',
        action: 'contact.private_event',
        entity: 'reservation',
        summary: `Cerere eveniment privat: ${firstName} ${lastName} (${guestsCount || '?'} pers, ${eventDate || 'fără dată'})`,
        diff: {
          type: 'private_event',
          firstName,
          lastName,
          company,
          email,
          phone,
          eventType,
          eventDate,
          guestsCount,
          message,
          locale,
        },
      });

      return NextResponse.json({
        ok: true,
        adminSent: result.adminSent,
        customerSent: result.customerSent,
      });
    } catch (err: unknown) {
      console.error('[API contact/private-event] Error:', err);
      return NextResponse.json(
        { ok: false, error: 'Erreur lors de l’envoi de la demande.' },
        { status: 500 }
      );
    }
  }

  // Handle General Contact Message
  const subject = String(body.subject || 'Question générale').trim();

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { ok: false, error: 'Une adresse e-mail valide est requise.' },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { ok: false, error: 'Le message est requis.' },
      { status: 400 }
    );
  }

  try {
    const result = await sendContactEmail({
      firstName,
      lastName,
      email,
      phone: phone || null,
      subject,
      message,
      locale,
    });

    await writeAuditLog({
      actorEmail: email,
      action: 'contact.message',
      entity: 'settings',
      summary: `Mesaj de contact: ${firstName} ${lastName} — "${subject}"`,
      diff: {
        type: 'contact',
        firstName,
        lastName,
        email,
        phone: phone || null,
        subject,
        message,
        locale,
      },
    });

    return NextResponse.json({
      ok: true,
      adminSent: result.adminSent,
      customerSent: result.customerSent,
    });
  } catch (err: unknown) {
    console.error('[API contact] Error:', err);
    return NextResponse.json(
      { ok: false, error: 'Erreur lors de l’envoi du message.' },
      { status: 500 }
    );
  }
}
