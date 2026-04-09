import { Card, Deck } from '@/app/types/deck';
import { stringify } from 'querystring';

const STORAGE_KEY = 'decks';

export function loadDecks(): Deck[] {
  try {
    const rawDeck = localStorage.getItem(STORAGE_KEY);
    if (!rawDeck) return [];
    return JSON.parse(rawDeck) as Deck[];
  } catch (err) {
    console.log('Failed to load decks from local storage: ', err);
    return [];
  }
}

export function saveDecks(decks: Deck[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function addDeck(deck: Deck) {
  try {
    const decks = loadDecks();
    saveDecks([...decks, deck]);
  } catch (err) {
    console.log('Failed to add deck to local storage: ', err);
  }
}

export function deleteDeck(deckId: string) {
  try {
    const decks = loadDecks();
    saveDecks(decks.filter((deck) => deck.id != deckId));
  } catch (err) {
    console.log('Failed to delete deck: ', err);
  }
}

export function getDeckById(deckId: string): Deck | null {
  try {
    const decks = loadDecks();
    return decks.find((deck) => deck.id === deckId) ?? null;
  } catch (err) {
    console.log('Failed to get deck by ID: ', err);
    return null;
  }
}

export function updateCard(
  deckId: string,
  cardId: string,
  front: string,
  back: string
) {
  try {
    const deck = getDeckById(deckId);
    if (!deck) return;
    const updatedDeck = {
      ...deck,
      cards: deck.cards.map((card) =>
        card.id === cardId ? { ...card, front, back } : card
      ),
    };
    const decks = loadDecks();
    saveDecks(decks.map((d) => (d.id === deckId ? updatedDeck : d)));
  } catch (err) {
    console.log('Failed to update card: ', err);
    return null;
  }
}
