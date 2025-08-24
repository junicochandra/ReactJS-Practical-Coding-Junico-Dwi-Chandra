import { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const baseUrl = import.meta.env.VITE_OMDB_API_URL;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetchMovies(query);
      } else {
        setMovies([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchMovies = async (searchQuery) => {
    try {
      const res = await fetch(`${baseUrl}?apikey=${apiKey}&s=${searchQuery}`);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const isFavorite = (id) => favorites.some((fav) => fav.imdbID === id);

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search movie..."
        aria-label="Search movie by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3 mb-3">
            <div className="card h-100">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x400"
                }
                className="card-img-top"
                alt={movie.Title}
              />
              <div className="card-body">
                <h2 className="card-title fs-6 fs-sm-5 fs-md-4 fs-lg-3">
                  {movie.Title}
                </h2>
                <p className="card-text">{movie.Year}</p>
                {isFavorite(movie.imdbID) ? (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFavorite(movie.imdbID)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => addFavorite(movie)}
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
