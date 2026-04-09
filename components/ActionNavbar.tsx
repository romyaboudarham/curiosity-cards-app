'use client';

import { ReactNode } from 'react';
import ActionButton from './ActionButton';

interface ActionNavbarProps {
  buttons: {
    icon?: ReactNode;
    text?: string;
    label?: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }[];
}

export default function ActionNavbar({ buttons }: ActionNavbarProps) {
  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-center gap-3">
      {buttons.map((button, i) => (
        <ActionButton
          key={button.text ?? button.label ?? i}
          icon={button.icon}
          text={button.text}
          label={button.label}
          onClick={button.onClick}
          className="px-4 h-10"
          rounded="md"
          variant={button.variant ?? 'secondary'}
        />
      ))}
    </div>
  );
}
