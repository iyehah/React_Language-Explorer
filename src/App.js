import React, { useState, useEffect } from "react"
import './App.css';
import Header from "./Header/Header";
import Card from "./Card/Card";
import { cardImages } from "./ImageData/ImageData";

const App = () => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);

    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);


    //  Shuffle the cards
    const shuffleCard = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
    };

    // Call the shuffle card function
    useEffect(() => {
        shuffleCard();
    }, []);

    //  Handle Choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    //  Check two card
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                reset();
            } else {
                setTimeout(() => reset(), 500);
            }
        }
    }, [choiceOne, choiceTwo]);

    //  reset on every turn
    function reset() {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
        setTurns((prevTurns) => prevTurns + 1);
    }

    return (
        <div className="App">
            <Header onShuffle={shuffleCard} />
            <p className="turns">Turns: {turns}</p>
            <div className="card-grid">
                {cards.map((card) => (
                    <div key={card.id}>
                        <Card
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                            disabled={disabled}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default App