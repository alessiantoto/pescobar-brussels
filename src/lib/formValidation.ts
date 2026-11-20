import type { Locale } from '@/config/site';

export const REQUIRED_FIELD_ERROR: Record<Locale, string> = {
  fr: 'Champ obligatoire',
  nl: 'Verplicht veld',
  en: 'Required field',
  ro: 'Câmp obligatoriu',
};

export const INVALID_EMAIL_ERROR: Record<Locale, string> = {
  fr: 'Adresse e-mail invalide',
  nl: 'Ongeldig e-mailadres',
  en: 'Invalid email address',
  ro: 'Adresă de e-mail invalidă',
};

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Returns dark-theme Tailwind classes highlighting invalid/missing inputs
 * with a clear coral-rose border, subtle crimson tint, and focus ring.
 */
export function getFieldBorderClass(hasError: boolean): string {
  return hasError
    ? 'border-rose-500 bg-rose-950/30 ring-2 ring-rose-500/25 focus:border-rose-400'
    : 'border-white/15 bg-[#070D17] focus:border-[#C8A96A]';
}

export function getFieldLabelClass(hasError: boolean): string {
  return hasError ? 'text-rose-400' : 'text-[#B8C7DC]';
}

/**
 * Focuses and scrolls to the first invalid form field so users immediately see
 * which required box needs attention on mobile and desktop.
 */
export function focusFirstInvalidField(
  fields: Array<{ id: string; invalid: boolean }>
): void {
  const first = fields.find((f) => f.invalid);
  if (!first || typeof document === 'undefined') return;
  const el = document.getElementById(first.id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.focus({ preventScroll: true });
}

/**
 * Smoothly aligns a stepped form container cleanly below the sticky top navbar
 * so step transitions never leave the viewport scrolled too high or too low.
 */
export function scrollToElementBelowNavbar(el: HTMLElement | null): void {
  if (typeof window === 'undefined' || !el) return;
  requestAnimationFrame(() => {
    const header = document.querySelector('header');
    const navHeight = header
      ? header.getBoundingClientRect().height
      : window.innerWidth >= 640
      ? 80
      : 64;
    const targetTop =
      el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  });
}
