import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const baseUrl = import.meta.env.VITE_OMDB_API_URL;
    const url = `${baseUrl}?apikey=${apiKey}&s=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetch data:", error);
    }
  };

  // Add to favorites
  const addFavorite = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Delete from favorites
  const removeFavorite = (imdbID) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Search Movies</h2>

      {/* Search Form */}
      <form onSubmit={searchMovies}>
        <div className="row">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search Movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Search
        </button>
      </form>

      {/* Search Result */}
      <h4 className="mt-5">Result</h4>
      <div className="row mt-3">
        {movies.length > 0 ? (
          movies.map((movie) => (
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
                  <h6 className="card-title">{movie.Title}</h6>
                  <p className="card-text">{movie.Year}</p>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => addFavorite(movie)}
                  >
                    + Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No result.</p>
        )}
      </div>

      {/* Favorites */}
      <h4 className="mt-5">Favorites</h4>
      <div className="row mt-3">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.imdbID} className="col-md-3 mb-3">
              <div className="card h-100 border-warning">
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
                  <h6 className="card-title">{movie.Title}</h6>
                  <p className="card-text">{movie.Year}</p>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFavorite(movie.imdbID)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No favorites.</p>
        )}
      </div>
    </div>
  );
}

export default App;
