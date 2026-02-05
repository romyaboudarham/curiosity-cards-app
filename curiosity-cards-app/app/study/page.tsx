'use client';

import {useState, useEffect } from 'react';
import { Card } from '@/app/types';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import FlashCard from '@/components/FlashCard';

type InstructionStep = 'flip' | 'next' | 'done';

export default function Study() {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [instructionStep, setInstructionStep] = useState<InstructionStep>('flip');

    const handlePrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }

    const handleNext = () => {
      if (instructionStep === 'next') {
        setInstructionStep('done');
      }
      setCurrentIndex(prev => prev + 1);
    }

    const handleFlip = () => {
      if (instructionStep === 'flip') {
        setInstructionStep('next');
      }
    }

    const handleRestart = () => {
      // Shuffle cards using Fisher-Yates algorithm
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setCards(shuffled);
      setCurrentIndex(0);
    }

    useEffect(() => {
        const flashcardsRaw = localStorage.getItem('flashcardsRaw');
        if (flashcardsRaw) {
          const parsed = flashcardsRaw
            .split(';')
            .filter(c => c.trim())
            .map(c => {
                const [front, back] = c.split(':');
                return {
                  id: crypto.randomUUID(),
                  front, 
                  back 
                }
            });
          setCards(parsed);
        }
    }, []);

    const showFlipInstruction = instructionStep === 'flip' && currentIndex === 0;
    const showNextInstruction = instructionStep === 'next';

    return (
        <div className="flex flex-col min-h-screen items-center px-4">
          <main className="w-full max-w-md text-center">
            <div className="flex mt-8">
              <PrimaryButton text="Study" className="flex-1 rounded-r-none"/>
              <SecondaryButton text="Edit" className="flex-1 rounded-l-none"/>
            </div>
            <div className='mt-8'>
              {cards.length > 0 && currentIndex < cards.length ? (
                <FlashCard 
                  key={cards[currentIndex].id} 
                  card={cards[currentIndex]}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onFlip={handleFlip}
                  showFlipInstruction={showFlipInstruction}
                  showSwipeInstruction={showNextInstruction}
                />
              ) : (
                <div className="bg-surface-background-50 rounded-xl shadow-lg border border-border p-8 aspect-[3/2] flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold text-text-heading mb-4">You've reviewed all {cards.length} cards</h2>
                  <PrimaryButton text="Restart" onClick={handleRestart}/>
                </div>
              )}
            </div>
            {/* Card count with navigation buttons */}
            {cards.length > 0 && currentIndex < cards.length && (
              <div className='mt-4 flex items-center justify-center gap-4'>
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="hidden md:block p-2 rounded-lg border border-border bg-surface-background-50 text-text-body-100 hover:bg-surface-background-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                <p className="text-text-body-200 min-w-[60px]">{currentIndex + 1}/{cards.length}</p>
                <div className="relative hidden md:block">
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-lg border border-border bg-surface-background-50 text-text-body-100 hover:bg-surface-background-100 transition-colors"
                  >
                    →
                  </button>
                  {showNextInstruction && (
                    <div 
                      className="absolute inset-0 rounded-lg ring-2 ring-green-500 pointer-events-none"
                      style={{ animation: 'fade-pulse 2s ease-in-out infinite' }}
                    />
                  )}
                </div>
              </div>
            )}
            
          </main>
        </div>
    );
}
