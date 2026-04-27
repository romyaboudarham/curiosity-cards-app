'use client';

interface SecondaryButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

export default function SecondaryButton({
  text,
  className,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`uppercase bg-surface-button-secondary hover:bg-surface-button-secondary-hover rounded-md p-2 text-text-button-secondary border border-border hover:border-border-focus cursor-pointer focus-visible:outline-none focus-visible:border-border-focus ${className ?? ''}`}
    >
      {text}
    </button>
  );
}
