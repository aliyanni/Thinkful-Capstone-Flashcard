import React from "react";
import { useHistory } from "react-router-dom";

function AddNewDeckButton() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/decks/new");
  };

  return (
    <button className="btn btn-secondary" onClick={handleClick}>
      Create Deck
    </button>
  );
}
export default AddNewDeckButton;
