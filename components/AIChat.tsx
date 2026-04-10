'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChat({ open, onClose }: AIChatProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-22 right-6 w-80 rounded-xl border border-border bg-surface-background-50 shadow-xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-semibold text-text-heading text-sm">AI Edit</span>
        <button onClick={onClose} className="text-text-body-200 hover:text-text-body cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[360px]">
        {messages.length === 0 && (
          <p className="text-text-body-200 text-sm text-center mt-4">Ask me anything about your deck.</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
              msg.role === 'user'
                ? 'bg-surface-button-primary text-text-button-primary ml-auto'
                : 'bg-surface-background-100 text-text-body'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-border">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-sm text-text-body placeholder:text-text-body-200 outline-none"
        />
        <button
          onClick={handleSend}
          className="text-text-button-primary bg-surface-button-primary hover:bg-surface-button-primary-hover rounded-lg p-1.5 transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
