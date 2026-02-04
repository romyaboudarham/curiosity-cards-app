'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import PrimaryButton from '@/components/PrimaryButton';
import Dropdown from '@/components/Dropdown'

const tickerWords = ['study', 'learn', 'make'];

const testFlashcards = "Velociraptor:A small, fast dinosaur with sharp claws that lived during the Cretaceous period;Triceratops:A herbivorous dinosaur with three horns and a large bony frill;Tyrannosaurus Rex:One of the largest carnivorous dinosaurs with tiny arms and powerful jaws;Stegosaurus:A dinosaur known for its distinctive row of plates along its back;Pterodactyl:A flying reptile that lived alongside dinosaurs during the Mesozoic era;";
const isTesting: boolean = true;

export default function Home() {
  const router = useRouter();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [numCards, setNumCards] = useState(10);
  const [topic, setTopic] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleGenerateFlashcards = async() => {
    if (!topic) return;

    setFeedbackMsg(`Generating ${numCards} cards about "${topic}"`);

    let flashcardsUnparsed: string;

    if (isTesting) {
      // Use test data - simulate a small delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));
      flashcardsUnparsed = testFlashcards;
    } else {
      const response = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numCards,
          topic,
        }),
      });

      const data = await response.json();
      flashcardsUnparsed = data.flashcards;
    }

    console.log(flashcardsUnparsed);
    localStorage.setItem('flashcards', flashcardsUnparsed);
    setFeedbackMsg("Flashcards generated!");
    router.push('/study');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % tickerWords.length);
    }, 500);

    return () => clearInterval(interval); // cleanup function, avoid memory leaks
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <header className="mt-16 text-center">
        <h1 className="text-4xl font-bold text-text-heading">
          <span className="block mb-1">Curious?</span>
          <span className="inline-block w-20 text-right text-text-body-brand">
            {tickerWords[tickerIndex]}
          </span>
          <span className="ml-6">it.</span>
        </h1>
        <p className="m-5 text-text-body">
          Generate flashcards on any topic instantly
        </p>
      </header>

      <main className="mt-8 w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <Dropdown value={numCards} onChange={setNumCards}/>
          <Input 
            value={topic} 
            onChange={setTopic} 
            placeholder="Try 'types of dinosaurs'" 
            className="flex-1"
          />
        </div>
        <PrimaryButton 
          text="Generate Flashcards" 
          onClick={handleGenerateFlashcards}
          className="w-full"
        />
      </main>

      {feedbackMsg && (
        <p className="mt-6 text-text-body-300 text-sm">{feedbackMsg}</p>
      )}
    </div>
  );
}
