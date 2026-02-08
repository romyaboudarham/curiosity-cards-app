'use client'

interface SecondaryButtonProps {
    className?: string,
    text: string,
    onClick?: () => void,
}

export default function SecondaryButton({text, className, onClick}: SecondaryButtonProps) {
    return(
        <button 
            onClick={onClick}
            className={`uppercase bg-surface-button-secondary hover:bg-surface-button-secondary-hover rounded-md p-2 text-text-button-secondary border-1 border-border hover:border-border-focus cursor-pointer ${className ?? ''}`}>
            {text}
        </button>
    );
}