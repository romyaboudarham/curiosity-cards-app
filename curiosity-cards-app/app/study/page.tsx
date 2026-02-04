'use client';

import {useState, useEffect } from 'react';
import { Card } from '@/app/types';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import FlashCard from '@/components/FlashCard';

export default function Study() {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
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
                  isFlipped={isFlipped}
                  onFlip={handleFlip}/>
              ) : (
                <p>No cards to display</p>
              )}
            </div>
            <div className='mt-8'>
              <p>{currentIndex + 1}/{cards.length}</p>
            </div>
          </main>
        </div>
    );
}