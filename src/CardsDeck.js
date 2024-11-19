import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import './CardsDeck.css';

function Deck() {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [remaining, setRemaining] = useState(52);
    // const [isShuffling, setIsShuffling] = useState(false);

    const isShuffling = useRef(false);
    const drawButtonRef = useRef(null);

    // Fetch a new deck on component mount
    useEffect(() => {
        async function fetchDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
            setDeckId(res.data.deck_id);
        }
        fetchDeck();
    }, []);

    // Draw a card when the button is clicked
    const drawCard = async () => {
        if (remaining === 0) {
            alert("Error: no cards remaining!");
            return;
        }

        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
        const card = res.data.cards[0];

        setCards([...cards, card]);
        setRemaining(res.data.remaining);
    };

    // Shuffle the deck
    const shuffleDeck = async () => {
        if (isShuffling.current) return; // Prevent multiple shuffle requests
        isShuffling.current = true;

        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            setCards([]); 
            setRemaining(52); 
        } catch (error) {
            console.error("Failed to shuffle the deck:", error);
        } finally {
            isShuffling.current = false;
            drawButtonRef.current?.focus();
        }
    };

    return (
        <div className="Card-deck">
            <div className="Controls">
                <button ref={drawButtonRef} onClick={drawCard}>
                    Draw a Card
                </button>
                <button onClick={shuffleDeck} disabled={isShuffling.current}>
                    {isShuffling.current ? "Shuffling..." : "Shuffle Deck"}
                </button>
            </div>


            <div className="Card-container">
                {cards.map((card, idx) => (
                    <Card
                        key={idx}
                        image={card.image}
                        alt={`${card.value} of ${card.suit}`}
                        index={idx}
                    />
                ))}
            </div>
        </div>
    );
}

export default Deck;