import { getAdminMessages } from '@/app/actions/admin-messages';
import EliteFrame from '../components/EliteFrame';
import MessagesClient from './MessagesClient';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const result = await getAdminMessages();
  const messages = result.ok ? result.messages : [];

  return (
    <EliteFrame
      title="Mesaje & Evenimente"
      subtitle={`${messages.length} mesaje primite de pe site (contact & evenimente private)`}
    >
      <MessagesClient initialMessages={messages} />
    </EliteFrame>
  );
}
