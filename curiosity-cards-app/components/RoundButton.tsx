'use client'

import { ReactNode } from 'react';
import Link from 'next/link';

interface RoundButtonProps {
    icon: ReactNode,
    onClick?: () => void,
    className?: string,
    href?: string,
    label?: string
}

export default function RoundButton({ icon, onClick, className = '', href, label }: RoundButtonProps) {
    const baseClasses = `text-text-button-secondary cursor-pointer rounded-full border border-border bg-surface-background-50 flex items-center justify-center text-text-body hover:bg-surface-background-100 hover:border-border-focus transition-colors ${className}`;
    
    const content = (
        <>
            {icon}
            {label && (
                <span className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-text-body text-xs whitespace-nowrap">
                    {label}
                </span>
            )}
        </>
    );
    
    if (href) {
        return (
            <Link href={href} className={`${baseClasses} relative group`}>
                {content}
            </Link>
        );
    }
    
    return (
        <button
            onClick={onClick}
            className={`${baseClasses} relative group`}
        >
            {content}
        </button>
    );
}