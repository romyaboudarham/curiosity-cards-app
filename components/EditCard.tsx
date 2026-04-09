'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/app/types/deck';

interface EditCardProps {
  card: Card;
  onSave: (cardId: string, front: string, back: string) => void;
  onSwap?: () => void;
}

export default function EditCard({ card, onSave }: EditCardProps) {
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-4 w-full h-14 bg-surface-background-50 border border-border rounded-xl px-4 mb-2 focus-within:border-border-focus">
      <label className="flex flex-col flex-1 cursor-text">
        <span className="text-xs text-text-body-200">FRONT</span>
        <input
          ref={frontRef}
          className="text-text-heading truncate bg-transparent focus:outline-none w-full"
          defaultValue={card.front}
          onBlur={() => {
            if (frontRef.current && backRef.current) {
              onSave(card.id, frontRef.current.value, backRef.current.value);
            }
          }}
        />
      </label>
      <div className="w-px h-8 bg-border" />
      <label className="flex flex-col flex-1 cursor-text">
        <span className="text-xs text-text-body-200">BACK</span>
        <input
          ref={backRef}
          className="text-text-heading truncate bg-transparent focus:outline-none w-full"
          defaultValue={card.back}
          onBlur={() => {
            if (frontRef.current && backRef.current) {
              onSave(card.id, frontRef.current.value, backRef.current.value);
            }
          }}
        />
      </label>
    </div>
  );
}
