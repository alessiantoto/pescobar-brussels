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
      title="Revalidează cache-ul site-ului și QR Menu"
      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition disabled:opacity-50 shrink-0"
    >
      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#DFC286]' : 'text-slate-300'}`} />
      <span className="hidden sm:inline">
        {loading ? 'Se actualizează...' : 'Refresh Cache'}
      </span>
    </button>
  );
}
