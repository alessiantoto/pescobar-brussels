import { getAdminClients } from '@/app/actions/admin-clients';
import EliteFrame from '../components/EliteFrame';
import ClientsClient from './ClientsClient';

export const dynamic = 'force-dynamic';

export default async function AdminClientsPage() {
  const result = await getAdminClients();
  const clients = result.ok ? result.clients : [];

  return (
    <EliteFrame
      title="Clienți & Email Marketing"
      subtitle={`${clients.length} contacte înregistrate din rezervări & cereri web`}
    >
      <ClientsClient initialClients={clients} />
    </EliteFrame>
  );
}
