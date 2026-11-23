'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { purgeAllSiteCache } from '@/app/actions/admin-settings';

export default function ClearCacheButton({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);

  const handlePurge = async () => {
    setLoading(true);
    try {
      const res = await purgeAllSiteCache();
      if (res.ok) {
        toast.success('Cache-ul site-ului public și QR Menu a fost revalidat!');
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error('Eroare la revalidare.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePurge}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition disabled:opacity-50 ${
        compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-xs sm:text-sm shadow-xs'
      }`}
    >
      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-600' : 'text-slate-500'}`} />
      <span>{loading ? 'Se actualizează...' : 'Actualizează Site & QR'}</span>
    </button>
  );
}

