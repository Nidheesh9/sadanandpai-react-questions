import { useState } from "react";

const Circles = () => {
  const [circles, setCircles] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    const width = 800 / value;
    const arr = [];
    for (let i = 1; i <= value; i++) {
      arr.unshift(width * i);
    }
    setCircles(arr);
  }

  return (
    <div className="w-screen flex flex-col justify-center pt-4 h-screen items-center gap-y-2">
      <input
        type="number"
        onChange={handleChange}
        className="p-2 border border-black"
      />
      <div className="border-2 border-black w-200 aspect-square relative">
        {circles.map((width) => (
          <div
            key={width}
            style={{ width: width }}
            className="border border-amber-700 aspect-square rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Circles;
