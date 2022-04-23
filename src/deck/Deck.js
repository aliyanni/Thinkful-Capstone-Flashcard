import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Deck({ name, id, description, cards, isDeckInfo = false }) {
  const history = useHistory();
  const {deckId} = useParams();

  const handleDelete = async () => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this card?"
      );
      if (shouldDelete) {
        await deleteDeck(id, AbortController.signal);
      }
    } catch (error) {
      console.log(error);
    } finally {
      deckId ? history.push("/") : history.go(0);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <span>{`${cards.length} cards`}</span>
          <p className="card-text">{description}</p>
          {!isDeckInfo ? (
            <Link to={`/decks/${id}`} className="btn btn-secondary">
              View
            </Link>
          ) : (
            <Link to={`/decks/${id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
          )}
          <Link to={`/decks/${id}/study`} className="btn btn-primary">
            Study
          </Link>
          {isDeckInfo && (
            <Link to={`/decks/${id}/cards/new/`} className="btn btn-primary">
              Add Card
            </Link>
          )}
          <button onClick={handleDelete} className="btn btn-danger">
              Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Deck;
