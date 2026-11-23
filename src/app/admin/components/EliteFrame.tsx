'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Ban,
  CalendarClock,
  ExternalLink,
  Gift,
  Globe,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Mail,
  MessageSquare,
  QrCode,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { logoutAdmin } from '@/app/actions/admin-auth';
import {
  ADMIN_NAV_GROUPS,
  findActiveAdminNav,
  isAdminNavPathActive,
  type AdminNavIconKey,
} from '@/lib/admin-navigation';
import AdminMenuButton from './AdminMenuButton';
import { useAdminShell } from './AdminShellContext';
import ClearCacheButton from './ClearCacheButton';

const NAV_ICONS: Record<AdminNavIconKey, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  reservations: CalendarClock,
  soldOut: Ban,
  takeaway: ShoppingBag,
  dishes: UtensilsCrossed,
  qr: QrCode,
  homepage: LayoutTemplate,
  customers: Users,
  leads: MessageSquare,
  reviews: Star,
  promo: Sparkles,
  coupons: Gift,
  emails: Mail,
  settings: Settings,
};

function SidebarNavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() || '/admin';
  const { session } = useAdminShell();

  return (
    <div className="flex flex-col h-full bg-[#0B1220] text-slate-200">
      {/* Brand header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-3 min-w-0"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center shrink-0">
            <span className="text-amber-400 font-serif font-bold text-lg">P</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-wide text-white truncate">
              PESCOBAR ADMIN
            </p>
            <p className="text-[11px] text-amber-300/80 truncate">
              Brussels · Control Center
            </p>
          </div>
        </Link>
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Închide meniul"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Grouped Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.id}>
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = NAV_ICONS[item.iconKey];
                const active = isAdminNavPathActive(pathname, item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={onNavigate}
                      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-[13px] font-medium transition ${
                        active
                          ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            active ? 'text-slate-950' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </span>
                      {item.phase === 2 && (
                        <span
                          className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                            active
                              ? 'bg-slate-950/15 text-slate-950'
                              : 'bg-white/10 text-slate-400'
                          }`}
                        >
                          Curând
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Session */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <Link
          href="/fr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            Vezi site-ul public
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        {session && (
          <div className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {session.fullName || session.email}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-amber-300/80">
                {session.role.replace('_', ' ')}
              </p>
            </div>
            <form action={logoutAdmin}>
              <button
                type="submit"
                title="Deconectare"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EliteFrame({
  title,
  subtitle,
  actions,
  children,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() || '/admin';
  const { mobileNavOpen, closeMobileNav, supabaseConfigured } = useAdminShell();
  const activeNav = findActiveAdminNav(pathname);
  const resolvedTitle = title || activeNav?.item.name || 'Admin';

  return (
    <div className="min-h-dvh flex bg-[#f4f6f8] text-slate-900">
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:block w-68 shrink-0 border-r border-slate-200/80 sticky top-0 h-dvh">
        <SidebarNavContent />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={closeMobileNav}
          />
          <div className="relative w-76 max-w-[85vw] h-full z-10 shadow-2xl">
            <SidebarNavContent onNavigate={closeMobileNav} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <AdminMenuButton />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                  {resolvedTitle}
                </h1>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-slate-500 truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {actions}
              <ClearCacheButton compact />
            </div>
          </div>
        </header>

        {!supabaseConfigured && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 lg:px-8 py-2.5">
            <p className="max-w-7xl mx-auto text-xs sm:text-sm text-amber-900">
              <strong>Mod Preview / Fără DB conectată:</strong> Adaugă cheile Supabase în{' '}
              <code className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-xs">
                .env.local
              </code>{' '}
              și rulează migrarea SQL{' '}
              <code className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-xs">
                supabase/migrations/001_pescobar_core.sql
              </code>{' '}
              pentru a salva modificările live.
            </p>
          </div>
        )}

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

