'use client';

import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { useState } from 'react';

export default function Chat({
  chatId,
  initialMessages,
}: {
  chatId: string;
  initialMessages: UIMessage[];
}) {
  const [input, setInput] = useState('');
  const { messages, sendMessage, error, status } = useChat({
    id: chatId,
    messages: initialMessages,
  });
  const isBusy = status === 'submitted' || status === 'streaming';

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => {
        const isUser = message.role === 'user';
        return (
          <div
            key={message.id}
            className={`flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-zinc-900 ${
                isUser ? 'bg-[#d5e3f0]' : 'bg-[#e6e6e6]'
              }`}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <span key={`${message.id}-${i}`}>{part.text}</span>;
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        );
      })}

      {isBusy && (
        <div className="flex justify-start mb-3">
          <div className="rounded-2xl bg-[#e6e6e6] px-4 py-2 text-zinc-500">
            AI is answering…
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-600 mb-4">
          Could not get an answer: {error.message}
        </div>
      )}

      <form
        className="fixed bottom-0 w-full max-w-md mb-8 flex gap-2"
        onSubmit={e => {
          e.preventDefault();
          if (!input.trim() || isBusy) return;
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="flex-1 dark:bg-zinc-900 p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl bg-white text-zinc-900"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
          disabled={isBusy}
        />
        <button
          type="submit"
          disabled={isBusy || !input.trim()}
          className="px-4 py-2 rounded bg-zinc-900 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
