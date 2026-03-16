import * as React from 'react';

import PrimaryButton from '@/components/PrimaryButton';
import { useState, useEffect } from 'react';

const OPTIONS = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

export default function CreateNewDeck({
  onSubmitDeck,
}: {
  onSubmitDeck: (numCards: number, topic: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropDownRef = React.useRef<HTMLSelectElement>(null);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) {
      setError(true);
      return;
    }
    onSubmitDeck(Number(dropDownRef.current?.value), inputRef.current.value);
  }

  function handleChange() {
    if (error) setError(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          <select
            ref={dropDownRef}
            className="bg-surface-background-50 border border-border rounded-md p-2 text-text-body cursor-pointer focus:outline-none hover:border-border-focus"
          >
            {OPTIONS.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <input
            ref={inputRef}
            type="text"
            onChange={handleChange}
            placeholder={
              error ? 'Please enter a topic' : 'Try "types of dinosaurs"'
            }
            className={`bg-surface-background-50 border rounded-md p-2 focus:outline-none flex-1 ${
              error
                ? 'border-red-500 placeholder-red-400'
                : 'border-border focus:border-border-focus'
            }`}
          />
        </div>
        <PrimaryButton
          text="Generate Flashcards"
          type="submit"
          className="w-full"
        />
      </form>
    </>
  );
}
