import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";
import NavBar from "./Navbar";

function AddCard() {
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, AbortController.signal);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCard(deckId, card, AbortController.signal);
    setCard({ front: "", back: "" });
  };

  return (
    <>
      <NavBar deckName={deck.name} pageTitle="Add Card" />
      <h2>Add Card</h2>
      <CardForm handleSubmit={handleSubmit} card={card} setCard={setCard} />
    </>
  );
}

export default AddCard;
