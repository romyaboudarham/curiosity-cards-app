'use client';

interface InputProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Input({ className, value, onChange, placeholder }: InputProps) {
    return(
        <input
            className={`bg-surface-background-50 border-1 border-border rounded-md p-2 focus:outline-none focus:border-border-hover ${className ?? ''}`}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
}