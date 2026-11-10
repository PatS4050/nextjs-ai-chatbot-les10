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
    messages: Array.isArray(data.messages) ? (data.messages as UIMessage[]) : [],
  };
}
