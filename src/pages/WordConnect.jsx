import { useState } from "react";
import initialData from "../data/initialData";

const WordConnect = () => {
  const [items, setItems] = useState(shuffleArray(initialData));
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const handleClick = (item) => {
    if (selected.some((s) => s.id === item.id)) return;

    const newSelected = [...selected, item];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setAttempts((prev) => prev + 1);

      const [first, second] = newSelected;

      if (first.groupId === second.groupId) {
        setTimeout(() => {
          setItems((prevItems) =>
            shuffleArray(
              prevItems.filter((i) => i.id !== first.id && i.id !== second.id),
            ),
          );
          setSelected([]);
        }, 400);
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 600);
      }
    }
  };

  const handleReset = () => {
    setItems(shuffleArray(initialData));
    setSelected([]);
    setAttempts(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-semibold mb-2">Word Connect</h1>
      <p className="text-gray-600 mb-4">
        Connect group of 2 words by clicking on related words
      </p>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {items.map((item) => {
          const isSelected = selected.some((s) => s.id === item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`px-3 py-2 rounded-md border text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? "bg-indigo-200 border-indigo-500"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="mb-4 font-medium">Attempts: {attempts}</p>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md"
      >
        Reset
      </button>
    </div>
  );
};

export default WordConnect;
