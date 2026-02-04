'use client'

import { Card } from '@/app/types';

interface FlashCardProps {
    card: Card,
    isFlipped: boolean,
    onFlip: () => void,
}

export default function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
    return(
        <div 
            onClick={onFlip}
            className="
                cursor-pointer
                bg-surface-background-50
                rounded-xl
                shadow-lg
                border border-border
                aspect-[3/2]
                p-6
                flex flex-col items-center justify-center
                text-center">
                {isFlipped ? (
                    <div>
                        <h1 className="text-2xl font-bold text-text-heading">
                            {card.back}
                        </h1>
                        <p>Swipe for next</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-4xl font-bold text-text-heading">
                            {card.front}
                        </h1>
                        <p>tap to flip</p>
                    </div>
                )}
        </div>
    )
}