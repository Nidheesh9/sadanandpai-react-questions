import { useState } from "react";

const WaterBalancer = () => {
  const [w1, setW1] = useState(0);
  const [w2, setW2] = useState(0);
  const [w3, setW3] = useState(0);
  const [w4, setW4] = useState(0);
  function handleWater() {
    const equalQuantity = (w1 + w2 + w3 + w4 + 20) / 4;
    setW1((prev) => prev + 20);
    const timerId1 = setInterval(() => {
      let done = false;
      setW1((prev) => {
        if (Math.abs(prev - equalQuantity) < 0.1) {
          done = true;
          return prev;
        }
        return prev - 2.5;
      });

      setW2((prev) => {
        if (Math.abs(prev - equalQuantity) < 0.1) {
          done = true;
          return prev;
        }
        return prev + 2.5 / 3;
      });

      setW3((prev) => {
        if (Math.abs(prev - equalQuantity) < 0.1) {
          done = true;
          return prev;
        }
        return prev + 2.5 / 3;
      });

      setW4((prev) => {
        if (Math.abs(prev - equalQuantity) < 0.1) {
          done = true;
          return prev;
        }
        return prev + 2.5 / 3;
      });

      if (done) clearInterval(timerId1);
    }, 1000);
  }
  return (
    <div className="w-screen h-screen bg-pink-100 pt-10 flex justify-center">
      <div className="w-md flex flex-col gap-4">
        <div
          className="p-2 bg-green-300 rounded-2xl w-20 text-center"
          onClick={handleWater}
        >
          Add
        </div>

        <div className="flex gap-4">
          <div className="border border-black w-1/4 h-100 rounded-2xl flex items-end overflow-hidden">
            <div
              style={{ height: `${w1}%` }}
              className="bg-blue-300 w-full h-1/4 rounded-b-2xl transition-all duration-300"
            ></div>
          </div>
          <div className="border border-black w-1/4 h-100 rounded-2xl flex items-end overflow-hidden">
            <div
              style={{ height: `${w2}%` }}
              className="bg-blue-300 w-full h-1/4 rounded-b-2xl transition-all duration-300"
            ></div>
          </div>
          <div className="border border-black w-1/4 h-100 rounded-2xl flex items-end overflow-hidden">
            <div
              style={{ height: `${w3}%` }}
              className="bg-blue-300 w-full h-1/4 rounded-b-2xl transition-all duration-300"
            ></div>
          </div>
          <div className="border border-black w-1/4 h-100 rounded-2xl flex items-end overflow-hidden">
            <div
              style={{ height: `${w4}%` }}
              className="bg-blue-300 w-full h-1/4 rounded-b-2xl transition-all duration-300"
            ></div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/4 text-center">{(w1 * 10).toFixed(2)}</div>
          <div className="w-1/4 text-center">{(w2 * 10).toFixed(2)}</div>
          <div className="w-1/4 text-center">{(w3 * 10).toFixed(2)}</div>
          <div className="w-1/4 text-center">{(w4 * 10).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default WaterBalancer;
