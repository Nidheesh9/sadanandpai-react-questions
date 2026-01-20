import data from "../data/data";
import { useState } from "react";
import { X } from "lucide-react";

function TypeheadOffline() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = query
    ? data.filter((item) =>
        item.toLocaleLowerCase().startsWith(query.toLocaleLowerCase()),
      )
    : [];

  const handleKeyDown = (e) => {
    if (!filtered.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      setQuery(filtered[activeIndex]);
      setShowSuggestions(false);
      setActiveIndex(-1);
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  return (
    <div className="relative w-80 mx-auto mt-20">
      <h1 className="text-shadow-cyan-900 text-2xl font-extrabold mb-5 bg-amber-700">
        TYPEHEAD (OFFLINE)
      </h1>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search here"
          className="w-full border px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute w-full bg-white border mt-1 rounded-md shadow z-10 max-h-60 overflow-y-auto">
          {filtered.map((item, index) => (
            <li
              key={item}
              onClick={() => {
                setQuery(item);
                setActiveIndex(-1);
                setShowSuggestions(false);
              }}
              className={`px-3 py-2 cursor-pointer 
              ${index === activeIndex ? "bg-indigo-100" : "hover:bg-gray-100"}`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TypeheadOffline;
