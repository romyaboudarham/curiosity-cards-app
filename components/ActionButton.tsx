'use client'

import { ReactNode } from 'react';
import Link from 'next/link';

interface ActionButtonProps {
    icon?: ReactNode,
    text?: string,
    onClick?: () => void,
    className?: string,
    href?: string,
    label?: string,
    noBorder?: boolean,
    rounded?: string,
    variant?: 'primary' | 'secondary',
}

const variantClasses = {
    primary: 'bg-surface-button-primary hover:bg-surface-button-primary-hover text-text-button-primary uppercase',
    secondary: 'bg-surface-button-secondary hover:bg-surface-button-secondary-hover text-text-button-secondary uppercase',
};

export default function ActionButton({ icon, text, onClick, className = '', href, label, noBorder = false, rounded = 'full', variant }: ActionButtonProps) {
    const colorClasses = variant ? variantClasses[variant] : variantClasses['secondary'];
    const baseClasses = `cursor-pointer rounded-${rounded} ${noBorder ? '' : 'border border-border hover:border-border-focus'} flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:border-border-focus ${colorClasses} ${className}`;

    const content = (
        <>
            {icon && <span className="flex items-center">{icon}</span>}
            {text && <span className={icon ? 'ml-2' : ''}>{text}</span>}
            {!icon && !text && null}
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
