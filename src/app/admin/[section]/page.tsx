import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { findActiveAdminNav } from '@/lib/admin-navigation';
import EliteFrame from '../components/EliteFrame';

export default async function AdminPhase2PlaceholderPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const active = findActiveAdminNav(`/admin/${section}`);

  return (
    <EliteFrame
      title={active?.item.name || 'Secțiune în pregătire'}
      subtitle="Modul planificat pentru Faza 2"
    >
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto mt-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Construction className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          {active?.item.name || section} — Faza 2
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Această secțiune face parte din Faza 2 a panoului Pescobar Admin.
          Toate operațiunile esențiale de Faza 1 (Dashboard, Rezervări Mese,
          Epuizate Azi 86&apos;d, Editor Preparate 3 tab-uri FR/NL/EN/RO și Setări
          Restaurant) sunt deja active.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Dashboard
        </Link>
      </div>
    </EliteFrame>
  );
}

