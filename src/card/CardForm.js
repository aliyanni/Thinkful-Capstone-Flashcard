import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";
import NavBar from "./Navbar";

function CardForm({ isEdit = false }) {
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
    if (isEdit) {
      async function loadCard() {
        const cardFromAPI = await readCard(cardId, AbortController.signal);
        setCard(cardFromAPI);
      }
      loadCard();
    }
  }, [cardId, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateCard({ ...card, id: cardId }, AbortController.signal);
      history.push(`/decks/${deckId}`);
    } else {
      await createCard(deckId, card, AbortController.signal);
      setCard({ front: "", back: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <NavBar
        deckName={deck.name}
        pageTitle={`${isEdit ? `Edit Card ${cardId}` : "Add Card"}`}
      />
      <h2>{isEdit ? "Edit" : "Add"} Card</h2>
      <label htmlFor="cardFront" className="form-label">
        Front
      </label>
      <textarea
        type="text"
        value={card.front}
        className="form-control"
        id="cardFront"
        onChange={(e) => setCard({ ...card, front: e.target.value })}
      />

      <label htmlFor="cardBack" className="form-label">
        Back
      </label>
      <textarea
        type="text"
        value={card.back}
        className="form-control"
        id="cardBack"
        onChange={(e) => setCard({ ...card, back: e.target.value })}
      />

      <Link to={`/decks/${deckId}`} type="button" className="btn btn-secondary">
        {isEdit ? "Cancel" : "Done"}
      </Link>
      <button type="submit" className="btn btn-primary">
        {isEdit ? "Submit" : "Save"}
      </button>
    </form>
  );
}

export default CardForm;
