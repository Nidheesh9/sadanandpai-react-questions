import { useState } from "react";

const ChipsInput = () => {
  const [chips, setChips] = useState([]);

  return (
    <div className="w-screen h-screen">
      <div className="w-200 text-center mx-auto mt-10">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-2 py-1"
          placeholder="Enter chips here..."
          onKeyDown={(e) => {
            const value = e.target.value.trim();
            if (value && e.key === "Enter") {
              setChips((prev) => [...prev, value]);
            }
          }}
        />
        <div className="mt-2 flex flex-wrap">
          {chips.map((chip, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 flex gap-2"
            >
              {chip}
              <span
                onClick={() =>
                  setChips((prev) => prev.filter((item) => item !== chip))
                }
              >
                x
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChipsInput;
