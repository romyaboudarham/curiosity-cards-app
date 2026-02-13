'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/app/types';

const SWIPE_THRESHOLD = 40;
const THROW_THRESHOLD = 100;
const TAP_THRESHOLD = 15;
const TAP_TIME_THRESHOLD = 400;

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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
      e.preventDefault();
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

    setDragOffset(0);
  };

  const faceStyles =
    'absolute inset-0 bg-surface-background-50 rounded-xl shadow-lg border border-border p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden]';
  const pulseStyle = { animation: 'fade-pulse 2s ease-in-out infinite' };
  const dragRotation = dragOffset * 0.05;

  return (
    <div
      className="cursor-pointer perspective-[1000px] aspect-1/1 md:aspect-3/2 animate-fade-in touch-none select-none"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative w-full h-full transform-3d"
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
            <>
              <p
                className="absolute bottom-24 text-green-500 font-medium"
                style={pulseStyle}
              >
                click to flip
              </p>
              <div
                className="absolute inset-0 rounded-xl ring-2 ring-green-500 ring-offset-2 pointer-events-none"
                style={pulseStyle}
              />
            </>
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
            <>
              <p
                className="mt-4 text-green-500 font-medium md:hidden"
                style={pulseStyle}
              >
                swipe for next
              </p>
              <div
                className="absolute inset-0 rounded-xl ring-2 ring-green-500 ring-offset-2 pointer-events-none md:hidden"
                style={pulseStyle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
