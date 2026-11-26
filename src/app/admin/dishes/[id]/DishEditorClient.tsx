'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Ban,
  CheckCircle2,
  EyeOff,
  Image as ImageIcon,
  Languages,
  Save,
  Scale,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  adminDeleteDish,
  adminSaveDish,
  adminSetDishStatus,
} from '@/app/actions/admin-menu';
import {
  todayInBrussels,
  type MenuCategoryRow,
  type MenuItemRow,
  type MenuItemStatus,
} from '@/lib/menu-contract';
import GeneralTab from './GeneralTab';
import MediaTab from './MediaTab';
import PricingAllergensTab from './PricingAllergensTab';

type EditorTab = 'general' | 'pricing' | 'media';

export default function DishEditorClient({
  initialItem,
  categories,
  isNew,
}: {
  initialItem: MenuItemRow;
  categories: MenuCategoryRow[];
  isNew: boolean;
}) {
  const router = useRouter();
  const [item, setItem] = useState<MenuItemRow>(initialItem);
  const [activeTab, setActiveTab] = useState<EditorTab>('general');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleQuickStatus = async (status: MenuItemStatus) => {
    const soldOutOn = status === 'sold_out_today' ? todayInBrussels() : null;
    setItem((prev) => ({ ...prev, status, sold_out_on: soldOutOn }));

    if (!isNew && item.id) {
      const res = await adminSetDishStatus(item.id, status);
      if (res.ok) {
        toast.success('Status actualizat live!');
      } else {
        toast.error(res.error);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await adminSaveDish(item, isNew);
    setSaving(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success('Preparatul a fost salvat și sincronizat!');
    if (isNew) {
      router.push(`/admin/dishes/${res.data.id}`);
    } else {
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (isNew || !item.id) return;
    if (!confirm(`Ștergi definitiv preparatul "${item.names.fr}"?`)) return;

    setDeleting(true);
    const res = await adminDeleteDish(item.id);
    setDeleting(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success('Preparat șters.');
    router.push('/admin/dishes');
  };

  return (
    <div className="space-y-5">
      {/* Zero-lag top status & save bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-1">
            Status rapid:
          </span>
          <button
            type="button"
            onClick={() => handleQuickStatus('available')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              item.status === 'available'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Disponibil
          </button>

          <button
            type="button"
            onClick={() => handleQuickStatus('sold_out_today')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              item.status === 'sold_out_today'
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
            }`}
          >
            <Ban className="w-3.5 h-3.5" />
            Epuizat azi (86&apos;d)
          </button>

          <button
            type="button"
            onClick={() => handleQuickStatus('hidden')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              item.status === 'hidden'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            Ascuns (Draft)
          </button>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Șterge
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1526] hover:bg-[#132A4A] text-white border border-white/10 font-bold text-xs sm:text-sm transition disabled:opacity-50 shadow-xs"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Se salvează...' : 'Salvează modificările'}
          </button>
        </div>
      </div>

      {/* 3-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'general'
              ? 'border-[#0B1526] text-[#0B1526] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Languages className="w-4 h-4" />
          1. General &amp; Vizibilitate (4 limbi)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'pricing'
              ? 'border-[#0B1526] text-[#0B1526] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          2. Preț, Porții, Ingrediente &amp; Alergeni UE
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'media'
              ? 'border-[#0B1526] text-[#0B1526] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          3. Media &amp; Clip 9:16
        </button>
      </div>

      {/* Active Tab Content */}
      {activeTab === 'general' && (
        <GeneralTab
          item={item}
          categories={categories}
          isNew={isNew}
          onChange={setItem}
        />
      )}
      {activeTab === 'pricing' && (
        <PricingAllergensTab item={item} onChange={setItem} />
      )}
      {activeTab === 'media' && <MediaTab item={item} onChange={setItem} />}
    </div>
  );
}

