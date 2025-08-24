import React from "react";

const MovieCard = React.memo(function MovieCard({
  movie,
  isFavorite,
  onAdd,
  onRemove,
}) {
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
              onClick={() => onRemove(movie.imdbID)}
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
