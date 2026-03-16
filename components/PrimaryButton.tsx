'use client';

interface PrimaryButtonProps {
  className?: string;
  text: string | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
}

export default function PrimaryButton({
  text,
  className,
  type,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`uppercase bg-surface-button-primary hover:bg-surface-button-primary-hover rounded-md p-2 text-text-button-primary border-1 border-border hover:border-border-focus cursor-pointer ${className ?? ''}`}
    >
      {text}
    </button>
  );
}
