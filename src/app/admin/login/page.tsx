'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, ArrowLeft, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="min-h-dvh bg-[#07101C] text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#132A4A]/50 via-[#0B192C]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-radial from-[#DFC286]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Luxury Split Card */}
      <div className="w-full max-w-4xl rounded-3xl bg-[#0B192C] border border-[#DFC286]/25 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 backdrop-blur-md">
        
        {/* Left Side: Signature Octopus Showcase */}
        <div className="md:col-span-5 relative min-h-[260px] md:min-h-[540px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/10">
          {/* Background image: signature whole octopus */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/catalog/caracatita-intreaga-taverna-racilor.jpg"
              alt="Caracatiță întreagă la grătar Pescobar Bruxelles"
              fill
              priority
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out hover:scale-110"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            {/* Cinematic dark luxury overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/70 to-[#07101C]/60" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0B192C]/40 to-[#0B192C]" />
          </div>

          {/* Top badge */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-[#07101C]/80 backdrop-blur-md border border-[#DFC286]/40 text-[#DFC286]">
              <Sparkles className="w-3.5 h-3.5 text-[#DFC286]" />
              Specialitatea Casei
            </span>
          </div>

          {/* Bottom text over octopus image */}
          <div className="relative z-10 mt-auto pt-12 space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight font-serif">
              Caracatiță Regală &amp; Fructe de Mare
            </h2>
            <p className="text-xs text-[#C8D4E6] leading-relaxed">
              Quai aux Briques 46 · Sainte-Catherine, Bruxelles. Gătită proaspăt la plită în fiecare zi.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#DFC286] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#DFC286]" />
              Sesiune Manager Securizată SSL
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          {/* Top navigation row */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <PescobarBrandLogo size="nav" className="!h-9 w-auto" />
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#DFC286] px-2 py-0.5 rounded-full bg-white/5 border border-[#DFC286]/30">
                ADMIN
              </span>
            </div>

            <Link
              href="/fr"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#DFC286] transition font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Site Public
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Autentificare Restaurant
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Introduceți datele de acces pentru gestionarea rezervărilor, meniului și clienților.
            </p>
          </div>

          {!supabasePublicReady && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-400/30 p-3.5 text-xs text-amber-200 flex gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">
                  Configurare Supabase necesară
                </p>
                <p className="mt-1 text-amber-200/80 leading-relaxed">
                  Copiază <code className="font-mono">.env.example</code> în{' '}
                  <code className="font-mono">.env.local</code> și adaugă cheile proiectului.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adresa@email.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#07101C] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DFC286] focus:ring-1 focus:ring-[#DFC286] transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Parolă
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#07101C] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DFC286] focus:ring-1 focus:ring-[#DFC286] transition"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3.5 py-2.5">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C8A96A] via-[#DFC286] to-[#C8A96A] hover:brightness-105 text-[#0B192C] font-extrabold text-sm tracking-wide shadow-lg transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Se verifică accesul...' : 'Intră în Panoul de Control'}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-[11px] text-slate-500">
            Pescobar Seafood Restaurant Bruxelles © {new Date().getFullYear()} · Toate drepturile rezervate
          </div>
        </div>
      </div>
    </div>
  );
}
