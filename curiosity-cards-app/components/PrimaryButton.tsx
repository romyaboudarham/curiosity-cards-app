'use client'

interface PrimaryButtonProps {
    className?: string,
    text: string,
    onClick?: () => void,
}

export default function PrimaryButton({text, className, onClick}: PrimaryButtonProps) {
    return(
        <button 
            onClick={onClick}
            className={`bg-surface-button-primary hover:bg-surface-button-primary-hover rounded-md p-2 text-text-button-primary border-1 border-border hover:border-border-hover cursor-pointer ${className ?? ''}`}>
            {text}
        </button>
    );
}