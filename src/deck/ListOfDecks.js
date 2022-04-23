import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Deck from "./Deck";
import AddNewDeckButton from "./AddNewDeckButton";

function ListOfDecks() {
  const abortController = new AbortController();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const decksFromAPI = await listDecks(abortController.signal);
      setDecks(decksFromAPI);
    }

    loadDecks();
  }, []);

  return (
    <>
      <AddNewDeckButton />
      {decks.map((deck) => (
        <Deck
          key={deck.id}
          name={deck.name}
          id={deck.id}
          description={deck.description}
          cards={deck.cards}
        />
      ))}
    </>
  );
}

export default ListOfDecks;
