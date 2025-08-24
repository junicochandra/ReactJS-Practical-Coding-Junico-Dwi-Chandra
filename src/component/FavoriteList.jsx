import { useFavorites } from "../context/FavoritesContext";

function FavoriteList() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h1 className="mt-5">Favorites</h1>
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
                  <h2 className="card-title fs-6 fs-sm-5 fs-md-4 fs-lg-3">
                    {movie.Title}
                  </h2>
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
          <p className="text-muted">No favorites yet.</p>
        )}
      </div>
    </div>
  );
}

export default FavoriteList;
