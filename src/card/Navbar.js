import React from "react";
import { Link, useParams } from "react-router-dom";

function NavBar({ deckName, pageTitle }) {
  const {deckId} = useParams();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        <Link to="/">
          Home
        </Link>
        {deckName ? <Link to={`/decks/${deckId}`}>{` / ${deckName}`}</Link> : null}
        <p>{` / ${pageTitle}`}</p>
      </div>
    </nav>
  );
}

export default NavBar;
