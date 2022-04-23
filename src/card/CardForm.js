import React from "react";
import { useParams, Link  } from "react-router-dom";

function CardForm({ handleSubmit, card, setCard, isEdit = false }) {
  const { deckId } = useParams();

  return (
    <form onSubmit={handleSubmit}>
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
