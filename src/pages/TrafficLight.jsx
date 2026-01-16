import { useEffect, useState } from "react";

const TrafficLight = () => {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(5);

  useEffect(() => {
    const timer = [5, 2, 3];
    function red() {
      setTime(timer[0]);
      setIndex(0);

      const timerId = setInterval(() => {
        setTime((prev) => {
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => {
        green();
        clearInterval(timerId);
      }, 5000);
    }

    function green() {
      setTime(timer[2]);
      setIndex(2);

      const timerId = setInterval(() => {
        setTime((prev) => {
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => {
        yellow();
        clearInterval(timerId);
      }, 3000);
    }

    function yellow() {
      setTime(timer[1]);
      setIndex(1);

      const timerId = setInterval(() => {
        setTime((prev) => {
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => {
        red();
        clearInterval(timerId);
      }, 2000);
    }

    red();
  }, []);

  return (
    <div className="w-screen h-screen pt-4 flex items-center  bg-pink-100 flex-col">
      <div className="w-fit h-110 bg-black p-4 flex flex-col justify-evenly rounded-3xl">
        <div
          className={`h-1/4 aspect-square rounded-full ${
            index === 0 ? "bg-red-500" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`h-1/4 aspect-square rounded-full ${
            index === 1 ? "bg-yellow-500" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`h-1/4 aspect-square rounded-full ${
            index === 2 ? "bg-green-500" : "bg-gray-200"
          }`}
        ></div>
      </div>
      <div>{time}</div>
    </div>
  );
};

export default TrafficLight;
