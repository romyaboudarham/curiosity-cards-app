'use client'

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/app/types';

const SWIPE_THRESHOLD = 50;

interface FlashCardProps {
    card: Card,
    onNext?: () => void,
    onPrevious?: () => void,
    onFlip?: () => void,
    showFlipInstruction?: boolean,
    showSwipeInstruction?: boolean,
}

export default function FlashCard({ card, onNext, onPrevious, onFlip, showFlipInstruction = false, showSwipeInstruction = false }: FlashCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const touchStartX = useRef(0);

    const handleFlip = () => {
        setIsFlipped(prev => !prev);
        onFlip?.();
    };

    // Fade in on mount
    useEffect(() => {
        requestAnimationFrame(() => setOpacity(1));
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault();
                handleFlip();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                onNext?.();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                onPrevious?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrevious]);

    // Mobile swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;

        // Tap (small movement) = flip
        if (Math.abs(deltaX) < 10) {
            handleFlip();
            return;
        }

        // Swipe right = next
        if (deltaX < -SWIPE_THRESHOLD) {
            onNext?.();
        }
        // Swipe left = previous
        else if (deltaX > SWIPE_THRESHOLD) {
            onPrevious?.();
        }
    };

    const faceStyles = "absolute inset-0 bg-surface-background-50 rounded-xl shadow-lg border border-border p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden]";

    return (
        <div 
            className="cursor-pointer [perspective:1000px] aspect-[3/2] transition-opacity duration-[250ms] ease-out"
            style={{ opacity }}
            onClick={handleFlip}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Inner Div to handle flip animation */}
            <div 
                className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500"
                style={{
                    transform: isFlipped ? 'rotateY(180deg)' : '',
                }}
            >
                {/* Card Front */}
                <div className={faceStyles}>
                    <h1 className="text-4xl font-bold text-text-heading">
                        {card.front}
                    </h1>
                    {showFlipInstruction && (
                        <p 
                            className="absolute bottom-24 text-green-500 font-medium"
                            style={{ animation: 'fade-pulse 2s ease-in-out infinite' }}
                        >
                            click to flip
                        </p>
                    )}
                    {/* Pulsing ring overlay */}
                    {showFlipInstruction && (
                        <div 
                            className="absolute inset-0 rounded-xl ring-2 ring-green-500 ring-offset-2 pointer-events-none" 
                            style={{ animation: 'fade-pulse 2s ease-in-out infinite' }}
                        />
                    )}
                </div>
                {/* Card Back */}
                <div className={`${faceStyles} [transform:rotateY(180deg)]`}>
                    <h1 className="text-3xl font-bold text-text-heading">
                        {card.back}
                    </h1>
                    {showSwipeInstruction && (
                        <p 
                            className="absolute bottom-24 text-green-500 font-medium md:hidden"
                            style={{ animation: 'fade-pulse 2s ease-in-out infinite' }}
                        >
                            swipe for next
                        </p>
                    )}
                    {/* Pulsing ring overlay - mobile only */}
                    {showSwipeInstruction && (
                        <div 
                            className="absolute inset-0 rounded-xl ring-2 ring-green-500 ring-offset-2 pointer-events-none md:hidden" 
                            style={{ animation: 'fade-pulse 2s ease-in-out infinite' }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
