"use client"

import { useState, useEffect } from 'react';

const tickerWords = ["study", "learn", "make"];

export default function Home() {
    const [tickerIndex, setTickerIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerIndex(i => (i + 1) % tickerWords.length);
        }, 500);

        return () => clearInterval(interval); // cleanup function, avoid memory leaks
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">
                <span className="block">Curious?</span>
                <span className="inline-block w-20 text-right text-primary">{tickerWords[tickerIndex]}</span>
                <span className="ml-6">it.</span>
            </h1>
        </div>
    );
}