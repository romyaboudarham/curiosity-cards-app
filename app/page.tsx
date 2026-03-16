'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import { Deck } from '@/app/types/deck';
import { addDeck } from '@/app/utils/dataStorage';
import CreateNewDeck from '@/components/CreateNewDeck';

const tickerWords = ['study', 'learn', 'make'];

const testFlashcards: { deck: Deck } = {
  deck: {
    id: 'test-deck-id-1234',
    createdAt: '2024-01-01T00:00:00.000Z',
    title: 'Types of Dinosaurs',
    cards: [
      {
        id: 'card-1',
        front: 'Velociraptor',
        back: 'A small, fast dinosaur with sharp claws that lived during the Cretaceous period',
      },
      {
        id: 'card-2',
        front: 'Triceratops',
        back: 'A herbivorous dinosaur with three horns and a large bony frill',
      },
      {
        id: 'card-3',
        front: 'Tyrannosaurus Rex',
        back: 'One of the largest carnivorous dinosaurs with tiny arms and powerful jaws',
      },
      {
        id: 'card-4',
        front: 'Stegosaurus',
        back: 'A dinosaur known for its distinctive row of plates along its back',
      },
      {
        id: 'card-5',
        front: 'Pterodactyl',
        back: 'A flying reptile that lived alongside dinosaurs during the Mesozoic era',
      },
    ],
  },
};
const isTesting: boolean = false;

export default function Home() {
  const router = useRouter();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleGenerateFlashcards = async (numCards: number, topic: string) => {
    console.log(`${numCards} cards about ${topic}`);

    setFeedbackMsg(`Generating ${numCards} cards about "${topic}"`);

    let newDeck: { deck: Deck };

    if (isTesting) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      newDeck = testFlashcards;
    } else {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        body: JSON.stringify({ numCards, topic }),
      });
      newDeck = await response.json();
    }

    addDeck(newDeck.deck);

    setFeedbackMsg('Flashcards generated!');
    // Navigate to study page
    router.push(`/study/${newDeck.deck.id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % tickerWords.length);
    }, 500);

    return () => clearInterval(interval); // cleanup function, avoid memory leaks
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-4 pt-16">
      <NavBar />
      <div className="flex flex-1 items-start justify-center">
        <div className="text-center w-full max-w-lg pt-12 md:pt-24">
          <header>
            <h1 className="text-6xl font-bold text-text-heading">
              <span className="block mb-1">Curious?</span>
              <span className="inline-block w-20 text-right text-text-body-brand">
                {tickerWords[tickerIndex]}
              </span>
              <span className="ml-16"> it.</span>
            </h1>

            <p className="m-5 text-lg text-text-body">
              Generate flashcards on any topic instantly
            </p>
          </header>

          <main className="mt-16 w-full max-w-lg mx-auto">
            <CreateNewDeck onSubmitDeck={handleGenerateFlashcards} />
          </main>

          {feedbackMsg && (
            <p className="mt-6 text-text-body-300 text-md">{feedbackMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
