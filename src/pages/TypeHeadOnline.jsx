import { useEffect, useState } from "react";
import { X } from "lucide-react";

function TypeheadOnline() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.datamuse.com/sug?s=${query}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data.map((item) => item.word));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [query]);

  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      setQuery(results[activeIndex]);
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
    setResults([]);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  return (
    <div className="relative w-80 mx-auto mt-20">
      <h1 className="text-2xl font-extrabold mb-5">TYPEAHEAD (ONLINE)</h1>

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
          placeholder="Search words..."
          className="w-full border px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {showSuggestions && (
        <ul className="absolute w-full bg-white border mt-1 rounded-md shadow z-10 max-h-60 overflow-y-auto">
          {loading && <li className="px-3 py-2 text-gray-500">Loading...</li>}

          {!loading &&
            results.map((item, index) => (
              <li
                key={item}
                onClick={() => {
                  setQuery(item);
                  setActiveIndex(-1);
                  setShowSuggestions(false);
                }}
                className={`px-3 py-2 cursor-pointer 
                ${
                  index === activeIndex ? "bg-indigo-100" : "hover:bg-gray-100"
                }`}
              >
                {item}
              </li>
            ))}

          {!loading && results.length === 0 && (
            <li className="px-3 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default TypeheadOnline;
