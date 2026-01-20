import { useState } from "react";

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);

  function startTimer() {
    const timerId = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);
    setTimerId(timerId);
  }

  return (
    <div className="w-screen h-screen mt-2 flex justify-center">
      <div className="w-200 flex items-center flex-col">
        <div>
          {Math.floor(timer / 6000)} : {Math.floor(timer / 100) % 60} :{" "}
          {timer % 100}
        </div>
        <div className="flex gap-2">
          <div onClick={startTimer}>Start</div>
          <div onClick={() => clearInterval(timerId)}>Stop</div>
          <div
            onClick={() => {
              setTimer(0);
              clearInterval(timerId);
            }}
          >
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
