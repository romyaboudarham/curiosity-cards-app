'use client';

import {
  BookOpenText,
  CirclePlus,
  ArrowRightLeft,
  Sparkles,
  Plus,
} from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/app/types/deck';
import NavBar from '@/components/NavBar';
import { getDeckById, updateCard, addCard, deleteCard } from '@/app/utils/dataStorage';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import EditCard from '@/components/EditCard';
import FloatingActionBar from '@/components/FloatingActionBar';
import AIChat from '@/components/AIChat';

export default function Edit() {
  const router = useRouter();
  const { deckId } = useParams<{ deckId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);

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

  function handleOnDelete(cardId: string) {
    console.log('deleting', cardId);
    deleteCard(cardId, deckId);
    setCards((prev) => prev.filter((card) => card.id != cardId));
  }

  const handleAdd = () => {
    const newCard: Card = {
      id: crypto.randomUUID(),
      front: '',
      back: '',
    }
    addCard(newCard, deckId);
    setCards((prev) => [...prev, newCard]);
    setTimeout(() => addButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
  };

  const actions = [
    {
      icon: <CirclePlus className="w-5 h-5" />,
      label: 'Add',
      onClick: handleAdd,
    },
    {
      icon: <ArrowRightLeft className="w-5 h-5" />,
      label: 'Swap',
      onClick: handleAdd,
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: 'AI Edit',
      onClick: () => setAiChatOpen(true),
    },
    {
      icon: <BookOpenText className="w-5 h-5" />,
      label: 'Study',
      onClick: () => router.push(`/study/${deckId}`),
      variant: 'primary' as const,
    },
  ];

  return (
    <>
      <div inert={aiChatOpen} className="flex flex-col min-h-screen px-4 pt-16">
        <NavBar />
        <header className="w-full max-w-lg md:max-w-2xl mx-auto text-center mt-8">
          <div className="flex mb-5">
            <SecondaryButton
              text="Study"
              className="flex-1 rounded-r-none"
              onClick={() => router.push(`/study/${deckId}`)}
            />
            <PrimaryButton text="Edit" className="flex-1 rounded-l-none" />
          </div>
        </header>
        <FloatingActionBar actions={actions} />
        <main className="w-full max-w-4xl mx-auto mt-6 pb-28 md:pb-6">
          <div>
            {cards.map((card) => (
              <EditCard key={card.id} card={card} onSave={handleOnSave} onDelete={handleOnDelete}/>
            ))}
            <button
              ref={addButtonRef}
              onClick={handleAdd}
              className="flex items-center justify-center w-full min-h-14 border cursor-pointer border-dashed border-border rounded-xl mb-2 text-text-body-200 hover:text-text-body hover:border-border-focus transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
      <AIChat open={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </>
  );
}
