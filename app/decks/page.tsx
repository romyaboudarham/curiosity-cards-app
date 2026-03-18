'use client';

import DeckCard from '@/components/DeckCard';
import { Deck } from '@/app/types/deck';
import { useState, useEffect } from 'react';
import { loadDecks } from '../utils/dataStorage';
import NavBar from '@/components/NavBar';
import { deleteDeck } from '@/app/utils/dataStorage';

export default function Decks() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const decks = loadDecks();
    if (decks) setDecks(decks);
  }, []);

  function handleDelete(deckId: string) {
    deleteDeck(deckId);
    setDecks((prev) => prev.filter((d) => d.id !== deckId));
  }

  return (
    <div className="min-h-screen px-4 pt-16">
      <NavBar />
      <div className="text-center w-full max-w-lg mx-auto pt-4 md:pt-6">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold text-text-heading">
            <span className="block mb-1">My Decks</span>
          </h1>
        </header>
      </div>

      <main className="mt-8 md:mt-10 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-fit mx-auto">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              id={deck.id}
              title={deck.title}
              numCards={deck.cards?.length ?? 0}
              onDelete={() => handleDelete(deck.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
