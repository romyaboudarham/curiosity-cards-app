'use client';

import { ReactNode } from 'react';
import ActionButton from './ActionButton';

interface FloatingAction {
  icon: ReactNode;
  label?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface FloatingActionBarProps {
  actions: FloatingAction[];
}

function FloatingButton({ action }: { action: FloatingAction }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <ActionButton
        icon={action.icon}
        onClick={action.onClick}
        variant={action.variant}
        className="w-12 h-12"
        rounded="full"
      />
      {action.label && (
        <span className="text-xs text-text-body-200 uppercase tracking-wide">
          {action.label}
        </span>
      )}
    </div>
  );
}

export default function FloatingActionBar({ actions }: FloatingActionBarProps) {
  return (
    <>
      {/* Mobile: horizontal row fixed at bottom center */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-row gap-4 z-40 bg-surface-background-50 border border-border rounded-xl shadow-lg p-4">
        {actions.map((action, i) => (
          <FloatingButton key={i} action={action} />
        ))}
      </div>

      {/* Desktop: 2-column grid fixed to right side */}
      <div className="hidden md:grid grid-cols-2 gap-4 fixed right-8 bottom-6 z-40 bg-surface-background-50 border border-border rounded-xl shadow-lg p-4">
        {actions.map((action, i) => (
          <FloatingButton key={i} action={action} />
        ))}
      </div>
    </>
  );
}
