import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";
import NavBar from "./Navbar";

function EditCard() {
  const history = useHistory();
  const [card, setCard] = useState([]);
  const [deck, setDeck] = useState({});
  const { cardId } = useParams();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, AbortController.signal);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  useEffect(() => {
    async function loadCard() {
      const cardFromAPI = await readCard(cardId, AbortController.signal);
      setCard(cardFromAPI);
    }
    loadCard();
  }, [cardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCard({ ...card, id: cardId }, AbortController.signal);
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <NavBar deckName={deck.name} pageTitle={`Edit Card ${cardId}`} />
      <h2>Edit Card</h2>
      <CardForm handleSubmit={handleSubmit} card={card} setCard={setCard} isEdit />
    </>
  );
}

export default EditCard;
