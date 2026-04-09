'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/app/types/deck';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import NavBar from '@/components/NavBar';
import { getDeckById, updateCard } from '@/app/utils/dataStorage';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import EditCard from '@/components/EditCard';

export default function Edit() {
  const router = useRouter();
  const { deckId } = useParams<{ deckId: string }>();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const deck = getDeckById(deckId);
    if (deck) setCards(deck.cards);
  }, [deckId]);

  function handleOnSave(cardId: string, front: string, back: string) {
    console.log('saving', cardId, front, back);
    setCards((prev) =>
      prev.map((card) => (card.id === cardId ? { ...card, front, back } : card))
    );
    updateCard(deckId, cardId, front, back);
  }

  return (
    <div className="flex flex-col min-h-screen px-4 pt-16">
      <NavBar />
      <header className="w-full max-w-lg mx-auto text-center m-8">
        <div className="flex mt-8">
          <SecondaryButton
            text="Study"
            className="flex-1 rounded-r-none"
            onClick={() => router.push(`/study/${deckId}`)}
          />
          <PrimaryButton text="Edit" className="flex-1 rounded-l-none" />
        </div>
      </header>
      <main className="w-full max-w-5xl mx-auto">
        <div>
          {cards.map((card) => (
            <EditCard key={card.id} card={card} onSave={handleOnSave} />
          ))}
        </div>
      </main>
    </div>
  );
}
