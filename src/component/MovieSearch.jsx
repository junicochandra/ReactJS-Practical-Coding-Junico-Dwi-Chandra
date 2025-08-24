import { useState, useEffect, useMemo } from "react";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "./MovieCard";

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

  const movieList = useMemo(
    () =>
      movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={isFavorite(movie.imdbID)}
          onAdd={addFavorite}
          onRemove={removeFavorite}
        />
      )),
    [movies, favorites, addFavorite, removeFavorite, isFavorite]
  );

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
      <div className="row">{movieList}</div>
    </div>
  );
}

export default MovieSearch;
