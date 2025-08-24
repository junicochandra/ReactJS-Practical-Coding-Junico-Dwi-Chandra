import React from "react";
import { toast } from "react-toastify";
import { useFavorites } from "../context/FavoritesContext";

const MovieCard = React.memo(function MovieCard({ movie, isFavorite, onAdd }) {
  const { removeFavorite, addFavorite } = useFavorites();
  const handleRemove = (movie) => {
    removeFavorite(movie.imdbID);

    toast(
      <div>
        Removed <strong>{movie.Title}</strong>
        <button
          className="btn btn-link btn-sm ms-2"
          onClick={() => {
            addFavorite(movie);
            toast.dismiss();
          }}
        >
          Undo
        </button>
      </div>,
      { autoClose: 5000 }
    );
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card h-100">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x400"
          }
          className="card-img-top"
          alt={`${movie.Title} (${movie.Year})`}
          loading="lazy"
        />
        <div className="card-body">
          <h2 className="card-title fs-6 fs-sm-5 fs-md-4 fs-lg-3">
            {movie.Title}
          </h2>
          <p className="card-text">{movie.Year}</p>

          {isFavorite ? (
            <button
              aria-label="Remove from favorites"
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleRemove(movie)}
            >
              Remove
            </button>
          ) : (
            <button
              aria-label="Add to favorites"
              className="btn btn-outline-success btn-sm"
              onClick={() => onAdd(movie)}
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
