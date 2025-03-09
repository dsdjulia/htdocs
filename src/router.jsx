import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GameList from "./pages/GameList";
import GameDetail from "./pages/GameDetail";
import GamesByGenre from "./pages/GamesByGenre";
import GamesByTag from "./pages/GamesByTag";
import Publisher from "./pages/Publisher";
import SearchResults from "./pages/SearchResults";
import Publishers from "./pages/Publishers";
import Favorites from "./pages/Favorites";


function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/genre/:genre" element={<GamesByGenre />} />
            <Route path="/tag/:tag" element={<GamesByTag />} />
            <Route path="/publisher/:id" element={<Publisher />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;
