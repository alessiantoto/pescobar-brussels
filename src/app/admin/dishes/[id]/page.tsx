import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getAdminMenuData, getAdminMenuItemById } from '@/lib/admin/menu-repo';
import {
  emptyLocalized,
  emptyLocalizedList,
  type MenuItemRow,
} from '@/lib/menu-contract';
import EliteFrame from '../../components/EliteFrame';
import DishEditorClient from './DishEditorClient';

export const dynamic = 'force-dynamic';

export default async function AdminDishEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === 'new';

  const [{ categories }, existingResult] = await Promise.all([
    getAdminMenuData(),
    isNew ? Promise.resolve(null) : getAdminMenuItemById(id),
  ]);

  const existing = existingResult?.item ?? null;
  if (!isNew && !existing) {
    notFound();
  }

  const initialItem: MenuItemRow = existing ?? {
    id: '',
    legacy_post_id: null,
    category_id: categories[0]?.id ?? 'platouri',
    type: 'food',
    sort_order: 10,
    status: 'available',
    sold_out_on: null,
    names: emptyLocalized(),
    descriptions: emptyLocalized(),
    chef_notes: emptyLocalized(),
    ingredients: emptyLocalizedList(),
    origin: emptyLocalized(),
    nutrition: emptyLocalized(),
    price_eur: 0,
    old_price_eur: null,
    vat_rate: 12,
    weight_value: null,
    weight_unit: 'g',
    kcal: null,
    variants: [],
    addons: [],
    allergens: [],
    badges: [],
    show_site: true,
    show_qr: true,
    show_takeaway: true,
    show_business_lunch: false,
    image: null,
    gallery: [],
    clip_url: null,
  };

  return (
    <EliteFrame
      title={isNew ? 'Preparat nou' : initialItem.names.fr || initialItem.id}
      subtitle={
        isNew
          ? 'Creează un preparat multilingv (FR / NL / EN / RO)'
          : `ID: ${initialItem.id}`
      }
      actions={
        <Link
          href="/admin/dishes"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la listă
        </Link>
      }
    >
      <DishEditorClient
        initialItem={initialItem}
        categories={categories}
        isNew={isNew}
      />
    </EliteFrame>
  );
}
