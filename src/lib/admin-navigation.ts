export type AdminNavIconKey =
  | 'dashboard'
  | 'reservations'
  | 'soldOut'
  | 'takeaway'
  | 'dishes'
  | 'qr'
  | 'homepage'
  | 'customers'
  | 'leads'
  | 'reviews'
  | 'promo'
  | 'coupons'
  | 'emails'
  | 'settings';

export interface AdminNavItem {
  name: string;
  path: string;
  iconKey: AdminNavIconKey;
  /** Marked true when implemented in Phase 1; later phases display subtle "Curând" badge if not yet built. */
  phase: 1 | 2;
}

export interface AdminNavGroup {
  id: string;
  label: string;
  items: AdminNavItem[];
}

/**
 * Single source of truth for Pescobar Admin navigation (desktop sidebar + mobile drawer).
 * Grouped by daily restaurant workflow frequency.
 */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: 'daily',
    label: 'A. Zilnic (Sală & Bucătărie)',
    items: [
      { name: 'Dashboard', path: '/admin', iconKey: 'dashboard', phase: 1 },
      { name: 'Rezervări Mese', path: '/admin/reservations', iconKey: 'reservations', phase: 1 },
      { name: "Epuizate Azi (86'd) & Lunch", path: '/admin/sold-out', iconKey: 'soldOut', phase: 1 },
      { name: 'Precomenzi Platouri', path: '/admin/takeaway', iconKey: 'takeaway', phase: 2 },
    ],
  },
  {
    id: 'menu-qr',
    label: 'B. Meniu, QR & Conținut',
    items: [
      { name: 'Categorii & Preparate', path: '/admin/dishes', iconKey: 'dishes', phase: 1 },
      { name: 'QR Menu & Mese', path: '/admin/qr', iconKey: 'qr', phase: 2 },
      { name: 'Homepage & Secțiuni', path: '/admin/homepage', iconKey: 'homepage', phase: 2 },
    ],
  },
  {
    id: 'customers-reputation',
    label: 'C. Clienți & Reputație',
    items: [
      { name: 'Clienți (CRM)', path: '/admin/customers', iconKey: 'customers', phase: 2 },
      { name: 'Contact & Evenimente', path: '/admin/leads', iconKey: 'leads', phase: 2 },
      { name: 'Recenzii Google', path: '/admin/reviews', iconKey: 'reviews', phase: 2 },
    ],
  },
  {
    id: 'marketing',
    label: 'D. Marketing & Promoții',
    items: [
      { name: 'Pop-up-uri & Sezon', path: '/admin/promo', iconKey: 'promo', phase: 2 },
      { name: 'Vouchere & Cupoane', path: '/admin/coupons', iconKey: 'coupons', phase: 2 },
      { name: 'Email & Campanii', path: '/admin/emails', iconKey: 'emails', phase: 2 },
    ],
  },
  {
    id: 'system',
    label: 'E. Locație & Sistem',
    items: [
      { name: 'Setări Restaurant & Program', path: '/admin/settings', iconKey: 'settings', phase: 1 },
    ],
  },
];

export function isAdminNavPathActive(pathname: string, itemPath: string): boolean {
  if (!pathname) return false;
  if (itemPath === '/admin') {
    return pathname === '/admin';
  }
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export function findActiveAdminNav(
  pathname: string
): { group: AdminNavGroup; item: AdminNavItem } | null {
  for (const group of ADMIN_NAV_GROUPS) {
    for (const item of group.items) {
      if (isAdminNavPathActive(pathname, item.path)) {
        return { group, item };
      }
    }
  }
  return null;
}

