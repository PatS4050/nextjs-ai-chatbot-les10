import { Suspense } from 'react';
import Chat from '@/src/components/chat';
import { getLatestChat } from '@/src/lib/chat/queries';

export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="mx-auto max-w-md py-24 text-zinc-500">Gesprek laden…</p>
      }
    >
      <SavedChat />
    </Suspense>
  );
}

async function SavedChat() {
  const chat = await getLatestChat();

  return <Chat chatId={chat.id} initialMessages={chat.messages} />;
}
