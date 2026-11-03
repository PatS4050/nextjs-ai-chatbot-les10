'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, error, status } = useChat();
  const isBusy = status === 'submitted' || status === 'streaming';

  return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.map(message => (
            <div key={message.id} className="whitespace-pre-wrap mb-4">
              {message.role === 'user' ? 'User: ' : 'AI: '}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  default:
                    return null;
                }
              })}
            </div>
        ))}

        {isBusy && <div className="text-zinc-500 mb-4">AI is answering…</div>}
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
              className="flex-1 dark:bg-zinc-900 p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl bg-white"
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
