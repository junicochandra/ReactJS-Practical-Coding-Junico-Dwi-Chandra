import { FavoritesProvider } from "./context/FavoritesContext";
import MovieSearch from "./component/MovieSearch";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage";
import FavoriteList from "./component/FavoriteList";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="container mt-4">
          <h1 className="mb-4">Movie App</h1>
          <nav>
            <Link to="/" className="me-3">
              Home
            </Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
          <hr />
          {/* <FavoriteList /> */}

          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
