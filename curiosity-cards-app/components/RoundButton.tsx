'use client'

import { ReactNode } from 'react';

interface RoundButtonProps {
    icon: ReactNode,
    onClick?: () => void,
    className?: string,
}

export default function RoundButton({ icon, onClick, className = '' }: RoundButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`w-10 h-10 rounded-full border border-border bg-surface-background-50 flex items-center justify-center text-text-body hover:bg-surface-background-100 transition-colors ${className}`}
        >
            {icon}
        </button>
    )
}

