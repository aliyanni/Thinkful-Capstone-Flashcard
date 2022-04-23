import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "../card/Navbar";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, AbortController.signal);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDeck({ ...deck, id: deckId }, AbortController.signal).then(
      (card) => console.log(card, "CARD")
    );
    history.push(`/decks/${deckId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <NavBar deckName={deck.name} pageTitle="Edit Deck" />
      <h2>Edit Deck</h2>
      <label htmlFor="deckName" className="form-label">
        Name
      </label>
      <textarea
        type="text"
        value={deck.name}
        className="form-control"
        id="deckName"
        onChange={(e) => setDeck({ ...deck, name: e.target.value })}
      />
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <textarea
        type="text"
        value={deck.description}
        className="form-control"
        id="description"
        onChange={(e) => setDeck({ ...deck, description: e.target.value })}
      />

      <Link to={`/decks/${deck.id}`} type="button" className="btn btn-secondary">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default EditDeck;
