import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api";

function FullCard({ id, front, back, isDeckInfo = false }) {
  const history = useHistory();
  const url = useRouteMatch();

  const handleDelete = async () => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this card?"
      );
      if (shouldDelete) {
        await deleteCard(id, AbortController.signal);
      }
    } catch (error) {
      console.log(error);
    } finally {
      history.go(0);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <p className="card-text">{front}</p>
          <p className="card-text">{back}</p>
          {!isDeckInfo ? (
            <>
              <Link to="" className="btn btn-primary">
                Flip
              </Link>
              <Link to="" className="btn btn-primary">
                Next
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`${url.url}/cards/${id}/edit`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                  Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FullCard;
