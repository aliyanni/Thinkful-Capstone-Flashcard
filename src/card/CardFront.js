import React from "react";

function CardFront({ front, currentCardNum, numOfCards, flip }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{`Card ${currentCardNum} of ${numOfCards}`}</h5>
        <p className="card-text">{front}</p>
        <button onClick={flip} className="btn btn-secondary">
          Flip
        </button>
      </div>
    </div>
  );
}

export default CardFront;
