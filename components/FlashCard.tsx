'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/app/types';

const SWIPE_THRESHOLD = 40; // Distance to trigger swipe
const THROW_THRESHOLD = 100; // Distance to throw card off screen
const TAP_THRESHOLD = 15; // Max movement for tap
const TAP_TIME_THRESHOLD = 400; // Max time for tap (ms)

interface FlashCardProps {
  card: Card;
  onNext?: () => void;
  onPrevious?: () => void;
  onFlip?: () => void;
  showFlipInstruction?: boolean;
  showSwipeInstruction?: boolean;
}

export default function FlashCard({
  card,
  onNext,
  onPrevious,
  onFlip,
  showFlipInstruction = false,
  showSwipeInstruction = false,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const currentTouchX = useRef(0);
  const isDraggingRef = useRef(false);
  const handledByTouch = useRef(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    onFlip?.();
  };

  const handleClick = () => {
    if (handledByTouch.current) {
      handledByTouch.current = false;
      return;
    }
    handleFlip();
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

  // Mobile touch handlers with visual feedback
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;

    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    currentTouchX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || isAnimating) return;

    currentTouchX.current = e.touches[0].clientX;
    const deltaX = currentTouchX.current - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Only track horizontal swipes (prevent vertical scroll interference)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
      e.preventDefault(); // Prevent scroll when swiping horizontally
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || isAnimating) return;

    const deltaX = currentTouchX.current - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaTime = Date.now() - touchStartTime.current;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    isDraggingRef.current = false;
    setIsDragging(false);

    // Tap detection: small movement, short time
    if (
      absDeltaX < TAP_THRESHOLD &&
      absDeltaY < TAP_THRESHOLD &&
      deltaTime < TAP_TIME_THRESHOLD
    ) {
      setDragOffset(0);
      handledByTouch.current = true;
      handleFlip();
      return;
    }

    // Swipe detection: any horizontal swipe goes to next card
    if (absDeltaX > absDeltaY && absDeltaX > SWIPE_THRESHOLD) {
      setIsAnimating(true);
      const throwDirection = deltaX > 0 ? 1 : -1;

      if (absDeltaX > THROW_THRESHOLD) {
        setDragOffset(throwDirection * window.innerWidth);
      }

      setTimeout(() => {
        onNext?.();
        setDragOffset(0);
        setIsAnimating(false);
      }, 200);
      return;
    }

    // Not enough movement, spring back
    setDragOffset(0);
  };

  const faceStyles =
    'absolute inset-0 bg-surface-background-50 rounded-xl shadow-lg border border-border p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden]';

  // Calculate rotation based on drag for a natural feel
  const dragRotation = dragOffset * 0.05; // Slight rotation during drag

  return (
    <div
      className="cursor-pointer [perspective:1000px] aspect-[3/2] transition-opacity duration-[250ms] ease-out touch-none select-none"
      style={{ opacity }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Inner Div to handle flip animation and drag */}
      <div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{
          transform: `translateX(${dragOffset}px) rotateY(${isFlipped ? 180 : 0}deg) rotateZ(${dragRotation}deg)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Card Front */}
        <div className={faceStyles}>
          <h1 className="text-4xl font-bold text-text-heading">{card.front}</h1>
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
        <div
          className={`${faceStyles} transform-[rotateY(180deg)] overflow-hidden`}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading wrap-break-word max-w-full px-2">
            {card.back}
          </h1>
          {showSwipeInstruction && (
            <p
              className="mt-4 text-green-500 font-medium md:hidden"
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
  );
}
