import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardBack from "../card/CardBack";
import CardFront from "../card/CardFront";
import NavBar from "../card/Navbar";

import { readDeck } from "../utils/api";

function StudyPage() {
  const abortController = new AbortController();
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [totalNumOfCards, setTotalNumOfCards] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(deckFromAPI);
      setCurrentCard(deckFromAPI.cards[0]);
      setTotalNumOfCards(deckFromAPI.cards.length);
    }
    loadDeck();
  }, [deckId]);

  return (
    <>
      <NavBar deckName={deck.name} pageTitle="Study" />
      <h2>{`${deck.name}: Study`}</h2>
      {deck.cards && totalNumOfCards > 2 ? (
        deck.cards
          .filter((card) => card.id === currentCard.id)
          .map((card, index) => {
            return isFront ? (
              <CardFront
                key={index}
                front={card.front}
                currentCardNum={
                  deck.cards.findIndex((card) => card.id === currentCard.id) + 1
                }
                numOfCards={totalNumOfCards}
                flip={() => setIsFront(false)}
              />
            ) : (
              <CardBack
                key={index}
                cards={deck.cards}
                cardId={card.id}
                setCard={setCurrentCard}
                back={card.back}
                currentCardNum={
                  deck.cards.findIndex((card) => card.id === currentCard.id) + 1
                }
                numOfCards={totalNumOfCards}
                flip={() => setIsFront(true)}
              />
            );
          })
      ) : (
        <>
          <h3>Not enough cards.</h3>
          <p>{`You need at least 3 cards to study. There are cards ${totalNumOfCards} in this deck.`}</p>
          <Link to={`/decks/${deck.id}/cards/new/`} className="btn btn-primary">
            Add Card
          </Link>
        </>
      )}
    </>
  );
}

export default StudyPage;
