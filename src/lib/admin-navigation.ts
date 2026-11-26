export type AdminNavIconKey =
  | 'dashboard'
  | 'reservations'
  | 'dishes'
  | 'customers'
  | 'messages'
  | 'settings';

export interface AdminNavItem {
  name: string;
  path: string;
  iconKey: AdminNavIconKey;
  description?: string;
}

export interface AdminNavGroup {
  id: string;
  label: string;
  items: AdminNavItem[];
}

/**
 * Single source of truth for Pescobar Admin navigation.
 * Clean, modern, 100% functional menu without placeholders or fake items.
 */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: 'management',
    label: 'Administrare Restaurant',
    items: [
      {
        name: 'Dashboard',
        path: '/admin',
        iconKey: 'dashboard',
        description: 'Vedere de ansamblu & acțiuni rapide',
      },
      {
        name: 'Rezervări Mese',
        path: '/admin/reservations',
        iconKey: 'reservations',
        description: 'Gestionare mese, ore & statusuri',
      },
      {
        name: 'Meniu & Preparate',
        path: '/admin/dishes',
        iconKey: 'dishes',
        description: 'Preparate, prețuri & vizibilitate site',
      },
      {
        name: 'Clienți & Email Marketing',
        path: '/admin/clients',
        iconKey: 'customers',
        description: 'Bază date clienți & trimitere email în masă',
      },
      {
        name: 'Mesaje & Evenimente',
        path: '/admin/messages',
        iconKey: 'messages',
        description: 'Formular contact & cereri private',
      },
      {
        name: 'Setări Restaurant',
        path: '/admin/settings',
        iconKey: 'settings',
        description: 'Program, orar & date restaurant',
      },
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
