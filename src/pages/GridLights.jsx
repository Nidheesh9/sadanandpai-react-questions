import { useEffect, useState } from "react";

const GridLights = () => {
  const [arr, setArr] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (arr.length === 9) {
      const timer = setInterval(() => {
        setIsDisable(true);
        setArr((prev) => {
          if (prev.length === 0) {
            setIsDisable(false);
            clearInterval(timer);
            return [];
          }
          return prev.slice(0, prev.length - 1);
        });
      }, 500);
    }
  }, [arr.length]);

  return (
    <div className="w-screen h-screen flex justify-center">
      <div
        className="w-200 gap-2 h-fit flex flex-wrap items-center justify-center"
        style={{
          cursor: isDisable ? "not-allowed" : "default",
        }}
      >
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <div
              className={`w-1/4 aspect-square ${arr.includes(index) ? "bg-green-300" : "bg-gray-300"} ${isDisable ? "pointer-events-none" : ""}`}
              key={index}
              onClick={() =>
                setArr((prev) => {
                  if (prev.includes(index)) {
                    return prev;
                  }
                  return [...prev, index];
                })
              }
            ></div>
          ))}
      </div>
    </div>
  );
};

export default GridLights;
