'use client';

import { useState, type FormEvent } from 'react';
import { Plus, Save, Shield, Trash2, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminSaveSettingsSection } from '@/app/actions/admin-settings';
import {
  addAdminUser,
  removeAdminUser,
  toggleAdminUserActive,
  type AdminUserRecord,
} from '@/app/actions/admin-users';
import type { AdminRole } from '@/lib/admin/types';
import {
  DAYS_OF_WEEK,
  type RestaurantSettingsBundle,
} from '@/lib/settings-contract';
import ClearCacheButton from '../components/ClearCacheButton';

interface AuditRow {
  id: number;
  at: string;
  actor_email: string;
  action: string;
  entity: string;
  summary: string;
}

export default function SettingsClient({
  initialSettings,
  initialUsers,
  auditLogs,
}: {
  initialSettings: RestaurantSettingsBundle;
  initialUsers: AdminUserRecord[];
  auditLogs: AuditRow[];
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const [users, setUsers] = useState(initialUsers);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminRole>('admin');

  const [closedDate, setClosedDate] = useState('');
  const [closedReason, setClosedReason] = useState('');

  const saveSection = async <K extends keyof RestaurantSettingsBundle>(key: K) => {
    setSavingKey(key);
    const res = await adminSaveSettingsSection(key, settings[key]);
    setSavingKey(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success(`Secțiunea "${key}" a fost salvată!`);
  };

  const handleAddAdmin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await addAdminUser(newUserEmail, newUserName, newUserRole);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setUsers((prev) => [...prev, res.data]);
    setNewUserEmail('');
    setNewUserName('');
    toast.success('Administrator adăugat în whitelist!');
  };

  const handleToggleUser = async (id: string, current: boolean) => {
    const res = await toggleAdminUserActive(id, !current);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, is_active: !current } : u))
    );
    toast.success('Status cont actualizat.');
  };

  const handleRemoveUser = async (id: string) => {
    if (!confirm('Ștergi acest administrator din whitelist?')) return;
    const res = await removeAdminUser(id);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success('Administrator șters.');
  };

  return (
    <div className="space-y-6">
      {/* 1. Identity & Contact */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-900">
            1. Identitate &amp; Contact
          </h2>
          <button
            type="button"
            disabled={savingKey === 'identity'}
            onClick={() => saveSection('identity')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            Salvează identitatea
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            [
              ['brandName', 'Nume brand'],
              ['legalName', 'Denumire legală (SRL/BV)'],
              ['phone', 'Telefon'],
              ['whatsappNumber', 'WhatsApp (fără +)'],
              ['email', 'Email rezervări'],
              ['vatNumber', 'Cod TVA (BE ...)'],
            ] as [keyof RestaurantSettingsBundle['identity'], string][]
          ).map(([field, label]) => (
            <div key={field}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {label}
              </label>
              <input
                type="text"
                value={settings.identity[field]}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    identity: { ...s.identity, [field]: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Weekly Schedule & Closed Days */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-900">
            2. Orar săptămânal &amp; Zile închise
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={savingKey === 'hours'}
              onClick={() => saveSection('hours')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Save className="w-3.5 h-3.5" />
              Salvează orarul
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {DAYS_OF_WEEK.map(({ key, labelRo }) => {
            const day = settings.hours.days[key];
            return (
              <div
                key={key}
                className="grid grid-cols-2 sm:grid-cols-5 items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
              >
                <label className="inline-flex items-center gap-2 font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={day.is_open}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        hours: {
                          ...s.hours,
                          days: {
                            ...s.hours.days,
                            [key]: { ...day, is_open: e.target.checked },
                          },
                        },
                      }))
                    }
                    className="rounded border-slate-300 text-amber-600"
                  />
                  {labelRo}
                </label>

                <input
                  type="time"
                  value={day.open}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      hours: {
                        ...s.hours,
                        days: {
                          ...s.hours.days,
                          [key]: { ...day, open: e.target.value },
                        },
                      },
                    }))
                  }
                  className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
                <input
                  type="time"
                  value={day.close}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      hours: {
                        ...s.hours,
                        days: {
                          ...s.hours.days,
                          [key]: { ...day, close: e.target.value },
                        },
                      },
                    }))
                  }
                  className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
                <div className="col-span-2 sm:col-span-2 flex items-center gap-2">
                  <span className="text-slate-500">Bucătărie:</span>
                  <input
                    type="time"
                    value={day.kitchen_close}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        hours: {
                          ...s.hours,
                          days: {
                            ...s.hours.days,
                            [key]: { ...day, kitchen_close: e.target.value },
                          },
                        },
                      }))
                    }
                    className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Closed Days */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Zile speciale închise (blochează și rezervările online)
            </h3>
            <button
              type="button"
              disabled={savingKey === 'closed_days'}
              onClick={() => saveSection('closed_days')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800"
            >
              <Save className="w-3.5 h-3.5" /> Salvează zile închise
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <input
              type="date"
              value={closedDate}
              onChange={(e) => setClosedDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
            <input
              type="text"
              value={closedReason}
              onChange={(e) => setClosedReason(e.target.value)}
              placeholder="Motiv (ex: Eveniment privat)"
              className="flex-1 min-w-[180px] px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
            <button
              type="button"
              onClick={() => {
                if (!closedDate) return;
                setSettings((s) => ({
                  ...s,
                  closed_days: [
                    ...s.closed_days,
                    { date: closedDate, reason: closedReason || 'Închis' },
                  ],
                }));
                setClosedDate('');
                setClosedReason('');
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Adaugă zi
            </button>
          </div>

          {settings.closed_days.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {settings.closed_days.map((d, idx) => (
                <span
                  key={`${d.date}-${idx}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900"
                >
                  <strong>{d.date}</strong> · {d.reason}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((s) => ({
                        ...s,
                        closed_days: s.closed_days.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-rose-600 hover:text-rose-900"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Delivery & Reservation Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              3. Delivery &amp; Takeaway
            </h2>
            <button
              type="button"
              disabled={savingKey === 'delivery'}
              onClick={() => saveSection('delivery')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Save className="w-3.5 h-3.5" /> Salvează
            </button>
          </div>

          {[
            {
              flag: 'uberEatsEnabled',
              url: 'uberEatsUrl',
              label: 'Uber Eats',
            },
            {
              flag: 'deliverooEnabled',
              url: 'deliverooUrl',
              label: 'Deliveroo',
            },
            {
              flag: 'takeawayEnabled',
              url: 'takeawayUrl',
              label: 'Takeaway direct',
            },
          ].map((row) => {
            const flagKey = row.flag as keyof RestaurantSettingsBundle['delivery'];
            const urlKey = row.url as keyof RestaurantSettingsBundle['delivery'];
            return (
              <div key={row.label} className="space-y-1.5">
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(settings.delivery[flagKey])}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        delivery: { ...s.delivery, [flagKey]: e.target.checked },
                      }))
                    }
                  />
                  {row.label} activ
                </label>
                <input
                  type="url"
                  value={String(settings.delivery[urlKey] ?? '')}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      delivery: { ...s.delivery, [urlKey]: e.target.value },
                    }))
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            );
          })}
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              4. Reguli Rezervări &amp; Cache
            </h2>
            <button
              type="button"
              disabled={savingKey === 'reservation_rules'}
              onClick={() => saveSection('reservation_rules')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Save className="w-3.5 h-3.5" /> Salvează
            </button>
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reservation_rules.onlineBookingsEnabled}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  reservation_rules: {
                    ...s.reservation_rules,
                    onlineBookingsEnabled: e.target.checked,
                  },
                }))
              }
            />
            Rezervări online activate pe site
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Capacitate / interval
              </label>
              <input
                type="number"
                value={settings.reservation_rules.maxCapacityPerSlot}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    reservation_rules: {
                      ...s.reservation_rules,
                      maxCapacityPerSlot: Number(e.target.value) || 40,
                    },
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Prag grup mare (pers.)
              </label>
              <input
                type="number"
                value={settings.reservation_rules.largeGroupThreshold}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    reservation_rules: {
                      ...s.reservation_rules,
                      largeGroupThreshold: Number(e.target.value) || 8,
                    },
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Purge instant cache site public &amp; QR Menu:
            </span>
            <ClearCacheButton />
          </div>
        </section>
      </div>

      {/* 5. Admin Users Whitelist & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-600" />
            Administratori (Whitelist)
          </h2>

          <form onSubmit={handleAddAdmin} className="flex flex-wrap gap-2">
            <input
              type="email"
              required
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="email@pescobar.be"
              className="flex-1 min-w-[160px] px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Nume"
              className="w-32 px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value as AdminRole)}
              className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
            >
              <option value="staff">Staff (86&apos;d &amp; Rezervări)</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <UserPlus className="w-3.5 h-3.5" /> Adaugă
            </button>
          </form>

          <div className="divide-y divide-slate-100">
            {users.map((u) => (
              <div
                key={u.id}
                className="py-2.5 flex items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {u.email}
                  </p>
                  <p className="text-slate-500">
                    {u.full_name || '—'} · {u.role}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleUser(u.id, u.is_active)}
                    className={`px-2 py-1 rounded-lg font-semibold ${
                      u.is_active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {u.is_active ? 'Activ' : 'Blocat'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(u.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-xs text-slate-400 py-2">
                Lista adminilor va apărea aici după conectarea Supabase.
              </p>
            )}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            Audit Log (ultimele 25 modificări)
          </h2>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-2 text-xs">
                <p className="font-medium text-slate-800">{log.summary}</p>
                <p className="text-[11px] text-slate-400">
                  {log.actor_email} · {new Date(log.at).toLocaleString('ro-RO')}
                </p>
              </div>
            ))}
            {auditLogs.length === 0 && (
              <p className="text-xs text-slate-400 py-2">
                Nicio înregistrare în audit_log încă.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
