import { getAdminReservations } from '@/lib/admin/reservations-repo';
import { todayInBrussels } from '@/lib/menu-contract';
import EliteFrame from '../components/EliteFrame';
import ReservationsClient from './ReservationsClient';

export const dynamic = 'force-dynamic';

export default async function AdminReservationsPage() {
  const { rows, source } = await getAdminReservations({ scope: 'all' });

  return (
    <EliteFrame
      title="Rezervări Mese"
      subtitle={`Gestionare rezervări sală, terasă & lounge · ${
        source === 'supabase' ? 'Supabase Live' : 'DB neconectată încă'
      }`}
    >
      <ReservationsClient initialRows={rows} today={todayInBrussels()} />
    </EliteFrame>
  );
}

