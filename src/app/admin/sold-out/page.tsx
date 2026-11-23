import { getAdminMenuData } from '@/lib/admin/menu-repo';
import { getAdminRestaurantSettings } from '@/lib/admin/settings-repo';
import { todayInBrussels } from '@/lib/menu-contract';
import EliteFrame from '../components/EliteFrame';
import SoldOutClient from './SoldOutClient';

export const dynamic = 'force-dynamic';

export default async function AdminSoldOutPage() {
  const [menuData, settingsData] = await Promise.all([
    getAdminMenuData(),
    getAdminRestaurantSettings(),
  ]);

  return (
    <EliteFrame
      title="Epuizate Azi (86'd) & Business Lunch"
      subtitle="Control instant de pe telefon pentru sală & bucătărie — se sincronizează pe site și QR Menu"
    >
      <SoldOutClient
        initialItems={menuData.items}
        categories={menuData.categories}
        today={todayInBrussels()}
        initialHours={settingsData.settings.hours}
      />
    </EliteFrame>
  );
}

