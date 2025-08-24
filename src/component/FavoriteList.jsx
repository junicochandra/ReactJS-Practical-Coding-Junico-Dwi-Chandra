import { useFavorites } from "../context/FavoritesContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FavoriteList() {
  const { favorites, removeFavorite, addFavorite } = useFavorites();

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
                  alt={`${movie.Title} (${movie.Year})`}
                  loading="lazy"
                />
                <div className="card-body">
                  <h2 className="card-title fs-6 fs-sm-5 fs-md-4 fs-lg-3">
                    {movie.Title}
                  </h2>
                  <p className="card-text">{movie.Year}</p>
                  <button
                    aria-label="Remove from favorites"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(movie)}
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
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default FavoriteList;
