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
import ReservationsWeekChart, {
  type DayReservationStat,
} from './components/ReservationsWeekChart';

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
  const [
    menuData,
    todayRes,
    upcomingRes,
    settingsData,
    auditLogs,
    messagesData,
    clientsData,
  ] = await Promise.all([
    getAdminMenuData(),
    getAdminReservations({ scope: 'today' }),
    getAdminReservations({ scope: 'upcoming' }),
    getAdminRestaurantSettings(),
    getRecentAuditLogs(6),
    getAdminMessages(),
    getAdminClients(),
  ]);

  const { items } = menuData;
  const { settings } = settingsData;
  const dayKey = currentBrusselsDayKey();
  const daySched = settings.hours.days[dayKey];
  const isClosedOverride = settings.closed_days.some((d) => d.date === today);
  const isOpenToday = daySched.is_open && !isClosedOverride;

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

  // 7-day forecast chart data
  const dayNamesRo = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];
  const weekStats: DayReservationStat[] = [];
  const todayDateObj = new Date(`${today}T12:00:00Z`);

  for (let i = 0; i < 7; i++) {
    const d = new Date(todayDateObj);
    d.setUTCDate(d.getUTCDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayOfWeek = d.getUTCDay();
    const dayName = dayNamesRo[dayOfWeek];
    const dayNumber = String(d.getUTCDate());

    const dayRows = upcomingRes.rows.filter(
      (r) =>
        r.reservation_date === dateStr &&
        r.status !== 'cancelled' &&
        r.status !== 'no_show'
    );

    const tablesCount = dayRows.length;
    const coversCount = dayRows.reduce((sum, r) => sum + (r.party_size || 0), 0);

    weekStats.push({
      date: dateStr,
      dayName,
      dayNumber,
      tablesCount,
      coversCount,
      isToday: i === 0,
      isWeekend: dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0,
    });
  }

  return (
    <EliteFrame
      title="Dashboard"
      actions={
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/admin/clients"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#C8A96A] via-[#DFC286] to-[#C8A96A] hover:brightness-105 text-[#0B192C] text-xs font-extrabold transition shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trimite Email Reclamă</span>
            <span className="sm:hidden">Email</span>
          </Link>
          <Link
            href="/admin/dishes/new"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preparat nou</span>
          </Link>
        </div>
      }
    >
      {/* Top 4 KPI Cards - 2x2 on Mobile, 4x1 on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-5">
        {/* Status Restaurant */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 truncate">
              Restaurant Azi
            </span>
            {isOpenToday ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Deschis
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                Închis
              </span>
            )}
          </div>
          <div className="mt-2 sm:mt-3">
            <p className="text-base sm:text-xl font-black text-slate-900 leading-tight">
              {isOpenToday ? `${daySched.open} – ${daySched.close}` : 'Închis'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              Bucătărie până la {daySched.kitchen_close}
            </p>
          </div>
        </div>

        {/* Rezervari Azi */}
        <Link
          href="/admin/reservations"
          className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-2xs hover:border-[#C8A96A] transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 truncate">
              Rezervări Azi
            </span>
            <CalendarClock className="w-4 h-4 text-[#C8A96A]" />
          </div>
          <div className="mt-2 sm:mt-3">
            <p className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
              {activeReservations.length}{' '}
              <span className="text-xs sm:text-sm font-semibold text-slate-500">
                mese
              </span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              {totalCoversToday} pers. · {pendingReservations.length > 0 ? `${pendingReservations.length} noi` : 'Procesate'}
            </p>
          </div>
        </Link>

        {/* Mesaje & Contact */}
        <Link
          href="/admin/messages"
          className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-2xs hover:border-indigo-400 transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 truncate">
              Mesaje &amp; Evenimente
            </span>
            <MessageSquare className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 sm:mt-3">
            <p className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
              {messages.length}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              Cereri primite de pe site
            </p>
          </div>
        </Link>

        {/* Baza Clienti & Marketing */}
        <Link
          href="/admin/clients"
          className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-2xs hover:border-blue-400 transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 truncate">
              Clienți Marketing
            </span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 sm:mt-3">
            <p className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
              {clients.length}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              Emailuri gata pt. reclamă
            </p>
          </div>
        </Link>
      </div>

      {/* 7-Day Reservations Forecast Chart */}
      <div className="mb-5 sm:mb-6">
        <ReservationsWeekChart stats={weekStats} />
      </div>

      {/* Main grid: Today's reservations + Quick CTAs / Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Today's Reservations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                Rezervările de azi ({today})
              </h2>
              <p className="text-xs text-slate-500">
                {activeReservations.length} rezervări confirmate sau în așteptare
              </p>
            </div>
            <Link
              href="/admin/reservations"
              className="text-xs font-bold text-[#0B192C] bg-[#DFC286]/25 hover:bg-[#DFC286]/40 border border-[#DFC286]/50 px-3 py-1.5 rounded-xl transition"
            >
              Vezi toate rezervările →
            </Link>
          </div>

          {todayRes.rows.length === 0 ? (
            <div className="p-8 sm:p-12 text-center text-sm text-slate-500 space-y-1">
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
                    className="px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-2.5 hover:bg-slate-50/50 transition"
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
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${st.badgeClass}`}
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
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
            <h2 className="font-bold text-slate-900 text-sm mb-3">
              Comenzi Rapide &amp; Sală
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/reservations"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-[#0B192C]/5 border border-slate-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-[#C8A96A]" />
                  Gestionare Rezervări &amp; Mese
                </span>
                <span className="text-[11px] text-[#C8A96A] font-bold">Deschide →</span>
              </Link>

              <Link
                href="/admin/clients"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0B192C]/5 hover:bg-[#0B192C]/10 border border-[#DFC286]/30 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C8A96A]" />
                  Trimite Reclamă &amp; Email în Masă
                </span>
                <span className="text-[11px] text-[#0B192C] font-extrabold">Marketing →</span>
              </Link>

              <Link
                href="/admin/messages"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  Mesaje Contact &amp; Evenimente
                </span>
                <span className="text-[11px] text-indigo-700 font-semibold">Inbox →</span>
              </Link>

              <Link
                href="/admin/dishes"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-slate-600" />
                  Meniu: Ascunde / Editează ({visibleItems.length} active)
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Catalog →</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-600" />
                  Program, Orar &amp; Setări Locație
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Setări →</span>
              </Link>
            </div>
          </div>

          {/* Audit log */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
            <h2 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Activitate recentă
            </h2>
            {auditLogs.length === 0 ? (
              <p className="text-xs text-slate-500">
                Nicio modificare înregistrată încă.
              </p>
            ) : (
              <ul className="space-y-2">
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
