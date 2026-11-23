import { getAdminUsers } from '@/app/actions/admin-users';
import { getAdminRestaurantSettings } from '@/lib/admin/settings-repo';
import { getRecentAuditLogs } from '@/lib/audit';
import EliteFrame from '../components/EliteFrame';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const [settingsData, usersRes, auditLogs] = await Promise.all([
    getAdminRestaurantSettings(),
    getAdminUsers(),
    getRecentAuditLogs(25),
  ]);

  return (
    <EliteFrame
      title="Setări Restaurant & Program"
      subtitle="Identitate, orar săptămânal, zile închise, delivery, reguli rezervări, admini & cache"
    >
      <SettingsClient
        initialSettings={settingsData.settings}
        initialUsers={usersRes}
        auditLogs={auditLogs}
      />
    </EliteFrame>
  );
}
