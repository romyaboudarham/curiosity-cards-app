'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/app/types/deck';

interface EditCardProps {
  card: Card;
  onSwap?: () => void;
}

export default function EditCard({ card }: EditCardProps) {
  return (
    <div className="flex items-center gap-4 w-full h-14 bg-surface-background-50 border border-border rounded-xl px-4 mb-2">
      <div className="flex flex-col flex-1">
        <span className="text-xs text-text-body-200">FRONT</span>
        <p className="text-text-heading truncate">{card.front}</p>
      </div>
      <div className="w-px h-8 bg-border" />
      <div className="flex flex-col flex-1">
        <span className="text-xs text-text-body-200">BACK</span>
        <p className="text-text-body truncate">{card.back}</p>
      </div>
    </div>
  );
}
