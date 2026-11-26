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
          className="bg-[#0B1526] hover:bg-[#132A4A] text-white border border-white/10 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Preparat nou</span>
          <span className="sm:hidden">Nou</span>
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

