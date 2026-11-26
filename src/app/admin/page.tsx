import Link from 'next/link';
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Plus,
  Send,
  Settings,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { getAdminMenuData } from '@/lib/admin/menu-repo';
import { getAdminReservations } from '@/lib/admin/reservations-repo';
import { getAdminRestaurantSettings } from '@/lib/admin/settings-repo';
import { getAdminMessages } from '@/app/actions/admin-messages';
import { getAdminClients } from '@/app/actions/admin-clients';
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
  const [menuData, todayRes, settingsData, auditLogs, messagesData, clientsData] = await Promise.all([
    getAdminMenuData(),
    getAdminReservations({ scope: 'today' }),
    getAdminRestaurantSettings(),
    getRecentAuditLogs(6),
    getAdminMessages(),
    getAdminClients(),
  ]);

  const { items, categories, source: menuSource } = menuData;
  const { settings } = settingsData;
  const dayKey = currentBrusselsDayKey();
  const daySched = settings.hours.days[dayKey];
  const isClosedOverride = settings.closed_days.some((d) => d.date === today);
  const isOpenToday = daySched.is_open && !isClosedOverride;

  const hiddenItems = items.filter(
    (item) => effectiveStatus(item, today) === 'hidden'
  );
  const visibleItems = items.filter(
    (item) => effectiveStatus(item, today) !== 'hidden'
  );

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

  const messages = messagesData.ok ? messagesData.messages : [];
  const clients = clientsData.ok ? clientsData.clients : [];

  return (
    <EliteFrame
      title="Dashboard"
      subtitle={`Brussels · ${today} · Sursă meniu: ${
        menuSource === 'supabase' ? 'Supabase Live' : 'Fallback local'
      }`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/clients"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C8A96A] via-[#DFC286] to-[#C8A96A] hover:brightness-105 text-[#0B192C] text-xs sm:text-sm font-extrabold transition shadow-sm"
          >
            <Send className="w-4 h-4" />
            Trimite Email Reclamă
          </Link>
          <Link
            href="/admin/dishes/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition"
          >
            <Plus className="w-4 h-4" />
            Preparat nou
          </Link>
        </div>
      }
    >
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* Status Restaurant */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Restaurant Azi
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
            {settings.hours.businessLunchActive ? 'activ' : 'oprit'}
          </p>
        </div>

        {/* Rezervari Azi */}
        <Link
          href="/admin/reservations"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-amber-400 hover:shadow-xs transition block"
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

        {/* Mesaje & Contact */}
        <Link
          href="/admin/messages"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Mesaje & Evenimente
            </span>
            <MessageSquare className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {messages.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Cereri primite din formular contact & evenimente
          </p>
        </Link>

        {/* Baza Clienti & Marketing */}
        <Link
          href="/admin/clients"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Clienți & Marketing
            </span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {clients.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Contacte email salvate · Click pt. email în masă
          </p>
        </Link>
      </div>

      {/* Main grid: Today's reservations + Quick CTAs / Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Reservations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                Rezervările de azi ({today})
              </h2>
              <p className="text-xs text-slate-500">
                {activeReservations.length} rezervări confirmate sau în așteptare
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/reservations"
                className="text-xs font-bold text-[#0B192C] bg-[#DFC286]/25 hover:bg-[#DFC286]/40 border border-[#DFC286]/50 px-3 py-1.5 rounded-lg transition"
              >
                Vezi toate rezervările →
              </Link>
            </div>
          </div>

          {todayRes.rows.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500 space-y-1">
              <CalendarClock className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-semibold text-slate-700">Nicio rezervare înregistrată pentru astăzi.</p>
              <p className="text-xs text-slate-400">Rezervările noi vor apărea automat aici.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {todayRes.rows.slice(0, 8).map((r) => {
                const st = RESERVATION_STATUS_LABELS[r.status];
                return (
                  <div
                    key={r.id}
                    className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/50 transition"
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

        {/* Right column: Quick Action CTAs & Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <h2 className="font-bold text-slate-900 text-sm mb-3">
              Comenzi Rapide & Management
            </h2>
            <div className="space-y-2.5">
              <Link
                href="/admin/reservations"
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-[#0B192C]/5 border border-slate-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-[#C8A96A]" />
                  Gestionare Rezervări & Mese
                </span>
                <span className="text-[11px] text-[#C8A96A] font-bold">Deschide →</span>
              </Link>

              <Link
                href="/admin/clients"
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#0B192C]/5 hover:bg-[#0B192C]/10 border border-[#DFC286]/30 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C8A96A]" />
                  Trimite Reclamă & Email în Masă
                </span>
                <span className="text-[11px] text-[#0B192C] font-extrabold">Marketing →</span>
              </Link>

              <Link
                href="/admin/messages"
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  Mesaje Contact & Evenimente
                </span>
                <span className="text-[11px] text-indigo-700 font-semibold">Inbox →</span>
              </Link>

              <Link
                href="/admin/dishes"
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-slate-600" />
                  Meniu: Prețuri & Ascundere ({visibleItems.length} active)
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Catalog →</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-600" />
                  Program, Orar & Setări Locație
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Setări →</span>
              </Link>
            </div>
          </div>

          {/* Audit log */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
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
                  <li key={log.id} className="text-xs border-l-2 border-[#DFC286] pl-2.5">
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
