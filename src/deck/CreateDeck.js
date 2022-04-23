import React, { useState } from "react";
import NavBar from "../card/Navbar";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const [deck, setDeck] = useState({});

  const history = useHistory();
  const handleCancelClick = () => {
    history.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDeck(deck, AbortController.signal);
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <NavBar pageTitle="Create Deck" />
      <h2>Create Deck</h2>
      <label htmlFor="deckName" className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-control"
        id="deckName"
        placeholder="Deck Name"
        onChange={(e) => setDeck({ ...deck, name: e.target.value })}
      />
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <textarea
        type="text"
        className="form-control"
        id="description"
        placeholder="Brief description od the deck"
        onChange={(e) => setDeck({ ...deck, description: e.target.value })}
      />

      <button
        onClick={handleCancelClick}
        type="submit"
        className="btn btn-secondary"
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default CreateDeck;
