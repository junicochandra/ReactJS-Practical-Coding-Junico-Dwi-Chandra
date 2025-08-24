import { FavoritesProvider } from "./context/FavoritesContext";
import MovieSearch from "./component/MovieSearch";
import FavoriteList from "./component/FavoriteList";

function App() {
  return (
    <FavoritesProvider>
      <div className="container mt-4">
        <h1 className="mb-4">Movie App</h1>
        <MovieSearch />
        <FavoriteList />
      </div>
    </FavoritesProvider>
  );
}

export default App;
