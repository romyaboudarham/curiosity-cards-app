'use client';

import { useRef } from 'react';
import { Card } from '@/app/types/deck';
import { Trash2 } from 'lucide-react';
import ActionButton from './ActionButton';

interface EditCardProps {
  card: Card;
  onSave: (cardId: string, front: string, back: string) => void;
  onDelete?: () => void;
}

const LINE_HEIGHT = 24; // px — matches text-base line-height
const MAX_LINES = 2;
const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES;

function autoResize(el: HTMLTextAreaElement, prevValue: { current: string }) {
  el.style.height = 'auto';
  if (el.scrollHeight > MAX_HEIGHT) {
    el.value = prevValue.current;
  } else {
    prevValue.current = el.value;
  }
  el.style.height = Math.min(el.scrollHeight, MAX_HEIGHT) + 'px';
}

export default function EditCard({ card, onSave, onDelete }: EditCardProps) {
  const frontRef = useRef<HTMLTextAreaElement>(null);
  const backRef = useRef<HTMLTextAreaElement>(null);
  const prevFront = useRef(card.front);
  const prevBack = useRef(card.back);

  const handleSave = () => {
    if (frontRef.current && backRef.current) {
      onSave(card.id, frontRef.current.value, backRef.current.value);
    }
  };

  return (
    <div className="group relative flex items-center gap-4 w-full min-h-14 bg-surface-background-50 border border-border rounded-xl px-4 py-3 mb-2 focus-within:border-border-focus">
      {/* Actions — always visible inside card on mobile, hover outside on desktop */}
      <div className="flex flex-col gap-1 md:absolute md:-right-10 md:top-1/2 md:-translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-150">
        <ActionButton icon={<Trash2 className="w-4 h-4" />} onClick={onDelete} className="w-8 h-8" rounded="md" />
      </div>
      <label className="flex flex-col flex-1 cursor-text">
        <span className="text-xs text-text-body-200">FRONT</span>
        <textarea
          ref={frontRef}
          rows={1}
          className="text-text-heading bg-transparent focus:outline-none w-full resize-none overflow-hidden leading-6"
          style={{ maxHeight: MAX_HEIGHT }}
          defaultValue={card.front}
          onInput={(e) => autoResize(e.currentTarget, prevFront)}
          onBlur={handleSave}
        />
      </label>
      <div className="w-px self-stretch bg-border" />
      <label className="flex flex-col flex-1 cursor-text">
        <span className="text-xs text-text-body-200">BACK</span>
        <textarea
          ref={backRef}
          rows={1}
          className="text-text-heading bg-transparent focus:outline-none w-full resize-none overflow-hidden leading-6"
          style={{ maxHeight: MAX_HEIGHT }}
          defaultValue={card.back}
          onInput={(e) => autoResize(e.currentTarget, prevBack)}
          onBlur={handleSave}
        />
      </label>
    </div>
  );
}
