'use client'

import { Card } from '@/app/types';

interface FlashCardProps {
    card: Card,
    isFlipped: boolean,
    onFlip: () => void,
}

export default function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
    const faceStyles = "absolute inset-0 bg-surface-background-50 rounded-xl shadow-lg border border-border p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden]";

    return(
        <div onClick={onFlip} className="cursor-pointer [perspective:1000px] aspect-[3/2]">
            <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                <div className={faceStyles}>
                    <h1 className="text-4xl font-bold text-text-heading">
                        {card.front}
                    </h1>
                    <p>tap to flip</p>
                </div>
                <div className={`${faceStyles} [transform:rotateY(180deg)]`}>
                    <h1 className="text-3xl font-bold text-text-heading">
                        {card.back}
                    </h1>
                    <p>Swipe for next</p>
                </div>
            </div>
        </div>
    )
}