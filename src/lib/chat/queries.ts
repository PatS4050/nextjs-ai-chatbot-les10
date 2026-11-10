import type { UIMessage } from 'ai';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';

export async function getLatestChat(): Promise<{
  id: string;
  messages: UIMessage[];
}> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('chats')
    .select('id, messages')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error('De berichten konden niet geladen worden.');
  }

  if (!data) {
    return { id: crypto.randomUUID(), messages: [] };
  }

  return {
    id: data.id,
    messages: withUniqueMessageIds(
      Array.isArray(data.messages) ? (data.messages as UIMessage[]) : [],
    ),
  };
}

function withUniqueMessageIds(messages: UIMessage[]): UIMessage[] {
  const usedIds = new Set<string>();

  return messages.map(message => {
    if (message.id && !usedIds.has(message.id)) {
      usedIds.add(message.id);
      return message;
    }

    const id = crypto.randomUUID();
    usedIds.add(id);
    return { ...message, id };
  });
}
