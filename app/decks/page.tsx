'use client';

import DeckCard from '@/components/DeckCard';
import { Deck } from '@/app/types/deck';
import { useState, useEffect } from 'react';
import { loadDecks } from '../utils/dataStorage';
import NavBar from '@/components/NavBar';

export default function Desks() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const decks = loadDecks();
    if (decks) setDecks(decks);
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-4 pt-16">
      <NavBar />
      <main className="w-full max-w-5xl mx-auto mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-fit mx-auto">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              id={deck.id}
              title={deck.title}
              numCards={deck.cards?.length ?? 0}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
