import Link from 'next/link';
import {
  Ban,
  CalendarClock,
  CheckCircle2,
  Clock,
  Plus,
  Settings,
  UtensilsCrossed,
} from 'lucide-react';
import { getAdminMenuData } from '@/lib/admin/menu-repo';
import { getAdminReservations } from '@/lib/admin/reservations-repo';
import { getAdminRestaurantSettings } from '@/lib/admin/settings-repo';
import { getRecentAuditLogs } from '@/lib/audit';
import { effectiveStatus, todayInBrussels } from '@/lib/menu-contract';
import {
  RESERVATION_STATUS_LABELS,
  ZONE_LABELS,
} from '@/lib/reservations-contract';
import { DAYS_OF_WEEK } from '@/lib/settings-contract';
import EliteFrame from './components/EliteFrame';

export const dynamic = 'force-dynamic';

function currentBrusselsDayKey() {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Brussels',
    weekday: 'long',
  })
    .format(new Date())
    .toLowerCase();
  return (
    DAYS_OF_WEEK.find((d) => d.key === weekday)?.key ?? 'monday'
  );
}

export default async function AdminDashboardPage() {
  const today = todayInBrussels();
  const [menuData, todayRes, settingsData, auditLogs] = await Promise.all([
    getAdminMenuData(),
    getAdminReservations({ scope: 'today' }),
    getAdminRestaurantSettings(),
    getRecentAuditLogs(6),
  ]);

  const { items, categories, source: menuSource } = menuData;
  const { settings } = settingsData;
  const dayKey = currentBrusselsDayKey();
  const daySched = settings.hours.days[dayKey];
  const isClosedOverride = settings.closed_days.some((d) => d.date === today);
  const isOpenToday = daySched.is_open && !isClosedOverride;

  const soldOutItems = items.filter(
    (item) => effectiveStatus(item, today) === 'sold_out'
  );
  const hiddenItems = items.filter(
    (item) => effectiveStatus(item, today) === 'hidden'
  );
  const businessLunchItems = items.filter((item) => item.show_business_lunch);

  const activeReservations = todayRes.rows.filter(
    (r) => r.status !== 'cancelled' && r.status !== 'no_show'
  );
  const pendingReservations = todayRes.rows.filter(
    (r) => r.status === 'pending'
  );
  const totalCoversToday = activeReservations.reduce(
    (acc, r) => acc + (r.party_size || 0),
    0
  );

  return (
    <EliteFrame
      title="Dashboard"
      subtitle={`Brussels · ${today} · Sursă meniu: ${
        menuSource === 'supabase' ? 'Supabase Live' : 'Fallback local (menu.ts)'
      }`}
      actions={
        <Link
          href="/admin/dishes/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Preparat nou
        </Link>
      }
    >
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status Restaurant Azi
            </span>
            {isOpenToday ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Deschis
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                Închis
              </span>
            )}
          </div>
          <p className="mt-3 text-xl font-bold text-slate-900">
            {isOpenToday
              ? `${daySched.open} – ${daySched.close}`
              : 'Închis astăzi'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Bucătărie până la {daySched.kitchen_close} · Business Lunch{' '}
            {settings.hours.businessLunchActive ? 'activ' : 'oprit'} (€
            {settings.hours.businessLunchPriceEur})
          </p>
        </div>

        <Link
          href="/admin/reservations"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-amber-300 transition block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rezervări Azi
            </span>
            <CalendarClock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {activeReservations.length}{' '}
            <span className="text-sm font-medium text-slate-500">
              mese ({totalCoversToday} pers.)
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {pendingReservations.length > 0 ? (
              <span className="text-amber-700 font-semibold">
                {pendingReservations.length} în așteptare de confirmare
              </span>
            ) : (
              'Toate rezervările de azi sunt procesate'
            )}
          </p>
        </Link>

        <Link
          href="/admin/sold-out"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-rose-300 transition block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Epuizate Azi (86&apos;d)
            </span>
            <Ban className="w-4 h-4 text-rose-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {soldOutItems.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {hiddenItems.length} ascunse (draft) · {businessLunchItems.length}{' '}
            în Business Lunch
          </p>
        </Link>

        <Link
          href="/admin/dishes"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Catalog Meniu
            </span>
            <UtensilsCrossed className="w-4 h-4 text-slate-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {items.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            în {categories.length} categorii (4 limbi: FR/NL/EN/RO)
          </p>
        </Link>
      </div>

      {/* Main grid: Today's reservations + Quick actions / Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm sm:text-base">
              Rezervările de azi ({today})
            </h2>
            <Link
              href="/admin/reservations"
              className="text-xs font-semibold text-amber-700 hover:underline"
            >
              Vezi toate →
            </Link>
          </div>

          {todayRes.rows.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Nicio rezervare înregistrată pentru astăzi încă.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {todayRes.rows.slice(0, 8).map((r) => {
                const st = RESERVATION_STATUS_LABELS[r.status];
                return (
                  <div
                    key={r.id}
                    className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {r.reservation_time.slice(0, 5)} · {r.first_name}{' '}
                        {r.last_name}{' '}
                        <span className="text-slate-500 font-normal">
                          ({r.party_size} pers.)
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {ZONE_LABELS[r.zone]} · {r.phone}
                        {r.notes ? ` · "${r.notes}"` : ''}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${st.badgeClass}`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 text-sm mb-3">
              Acțiuni rapide (Sală & Manager)
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/sold-out"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-rose-50/70 hover:bg-rose-50 border border-rose-200/70 text-xs font-semibold text-rose-900 transition"
              >
                <span>Marchează preparat Epuizat Azi (86&apos;d)</span>
                <Ban className="w-4 h-4 text-rose-600" />
              </Link>
              <Link
                href="/admin/dishes"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition"
              >
                <span>Editează prețuri, alergeni & traduceri</span>
                <UtensilsCrossed className="w-4 h-4 text-slate-600" />
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition"
              >
                <span>Program, Business Lunch & Zile închise</span>
                <Settings className="w-4 h-4 text-slate-600" />
              </Link>
            </div>
          </div>

          {/* Audit log */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Activitate recentă
            </h2>
            {auditLogs.length === 0 ? (
              <p className="text-xs text-slate-500">
                Nicio modificare înregistrată încă.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {auditLogs.map((log) => (
                  <li key={log.id} className="text-xs border-l-2 border-amber-400 pl-2.5">
                    <p className="font-medium text-slate-800">{log.summary}</p>
                    <p className="text-[11px] text-slate-400">
                      {log.actor_email} ·{' '}
                      {new Date(log.at).toLocaleString('ro-RO')}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </EliteFrame>
  );
}

