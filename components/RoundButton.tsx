'use client'

import { ReactNode } from 'react';
import Link from 'next/link';

interface RoundButtonProps {
    icon: ReactNode,
    onClick?: () => void,
    className?: string,
    href?: string,
    label?: string,
    noBorder?: boolean
}

export default function RoundButton({ icon, onClick, className = '', href, label, noBorder = false }: RoundButtonProps) {
    const baseClasses = `text-text-button-secondary cursor-pointer rounded-full ${noBorder ? '' : 'border border-border hover:border-border-focus'} bg-surface-background-50 flex items-center justify-center text-text-body hover:bg-surface-background-100 transition-colors focus-visible:outline-none focus-visible:border-border-focus ${className}`;
    
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