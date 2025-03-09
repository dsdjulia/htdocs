import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2">
      <input
        type="text"
        value={query || ""}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Buscar juegos o publishers..."
        className="px-4 py-2 border rounded w-64 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
