import React from "react";
import { useHistory } from "react-router-dom";

function CardBack({
  cards,
  setCard,
  cardId,
  back,
  currentCardNum,
  numOfCards,
  flip,
}) {
  const currentCardIndex = cards.findIndex((card) => card.id === cardId);
  const history = useHistory();
  const handleNext = () => {
    if (currentCardIndex !== cards.length - 1) {
      setCard(cards[currentCardIndex + 1]);
      flip();
    } else {
      const shouldRestart = window.confirm("Would you like to restart?");
      if (shouldRestart) {
        setCard(cards[0]);
        flip();
      } else {
        history.push("/");
      }
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{`Card ${currentCardNum} of ${numOfCards}`}</h5>
        <p className="card-text">{back}</p>
        <button onClick={flip} className="btn btn-secondary">
          Flip
        </button>
        <button onClick={handleNext} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}

export default CardBack;
