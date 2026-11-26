'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { PescobarBrandLogo } from '@/components/PescobarBrandLogo';
import { verifyAdminEmail } from '@/app/actions/admin-auth';
import {
  createSupabaseBrowserClient,
  isSupabasePublicConfigured,
} from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabasePublicReady = isSupabasePublicConfigured();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const check = await verifyAdminEmail(email);
      if (check.notConfigured) {
        setErrorMsg(
          'Supabase nu este configurat încă în .env.local. Completează NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY și SUPABASE_SERVICE_ROLE_KEY.'
        );
        return;
      }
      if (check.rateLimited) {
        setErrorMsg(
          'Prea multe încercări. Așteaptă un minut înainte să încerci din nou.'
        );
        return;
      }
      if (!check.allowed) {
        setErrorMsg('Acces refuzat. Emailul nu este activ în whitelist-ul admin.');
        return;
      }

      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMsg('Parolă incorectă sau cont neconfirmat.');
        return;
      }

      toast.success('Bun venit în Pescobar Admin!');
      router.push('/admin');
      router.refresh();
    } catch {
      setErrorMsg('Eroare neașteptată la autentificare.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#070D17] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0F172A] border border-white/10 p-6 sm:p-8 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <PescobarBrandLogo size="nav" className="!h-9 w-auto" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#DFC286] px-2 py-0.5 rounded-full bg-white/5 border border-[#DFC286]/30">
              ADMIN
            </span>
          </div>

          <Link
            href="/fr"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Site
          </Link>
        </div>

        {!supabasePublicReady && (
          <div className="mb-5 rounded-xl bg-amber-500/10 border border-amber-400/30 p-3.5 text-xs text-amber-200 flex gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300">
                Configurare Supabase necesară
              </p>
              <p className="mt-1 text-amber-200/80 leading-relaxed">
                Copiază <code className="font-mono">.env.example</code> în{' '}
                <code className="font-mono">.env.local</code>, adaugă cheile
                proiectului Supabase și inserează primul email în{' '}
                <code className="font-mono">admin_users</code>. Pentru preview
                local fără Supabase poți seta{' '}
                <code className="font-mono">ALLOW_DEV_ADMIN_BYPASS=true</code>{' '}
                în dev.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email administrator
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresa@email.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Parolă
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C8A96A] via-[#DFC286] to-[#C8A96A] hover:brightness-105 text-[#0B192C] font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Se verifică...' : 'Intră în Panou'}
          </button>
        </form>
      </div>
    </div>
  );
}

