import type { UIMessage } from 'ai';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';

export async function saveChat(id: string, messages: UIMessage[]) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('chats').upsert({
    id,
    messages,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error('Kon de conversatie niet opslaan.');
  }
}
