import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAdminMenuData } from '@/lib/admin/menu-repo';
import { todayInBrussels } from '@/lib/menu-contract';
import EliteFrame from '../components/EliteFrame';
import DishesListClient from './DishesListClient';

export const dynamic = 'force-dynamic';

export default async function AdminDishesPage() {
  const { categories, items, source } = await getAdminMenuData();

  return (
    <EliteFrame
      title="Categorii & Preparate"
      subtitle={`${items.length} preparate în ${categories.length} categorii · ${
        source === 'supabase' ? 'Supabase Live' : 'Fallback local'
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
      <DishesListClient
        initialItems={items}
        categories={categories}
        today={todayInBrussels()}
      />
    </EliteFrame>
  );
}

