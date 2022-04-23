import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import FullCard from "../card/FullCard";
import Deck from "./Deck";
import NavBar from "../card/Navbar";


function DeckInfo() {
  const abortController = new AbortController();
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();


  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  return (
    <>
      {deck.cards ? (
        <>
          <NavBar pageTitle={deck.name} />
          <Deck
            name={deck.name}
            description={deck.description}
            isDeckInfo={true}
            id={deck.id}
            cards={deck.cards}
          />
          <h3>Cards</h3>
          {deck.cards.map((card) => (
            <FullCard
              key={card.id}
              id={card.id}
              front={card.front}
              back={card.back}
              isDeckInfo={true}
            />
          ))}
        </>
      ) : null}
    </>
  );
}

export default DeckInfo;
