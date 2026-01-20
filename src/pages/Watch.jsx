import { useEffect, useState } from "react";

const Watch = () => {
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSecond((prev) => prev + 6);
    }, 1000);
    setInterval(() => {
      setMinute((prev) => prev + 0.1);
    }, 1000);
    setInterval(() => {
      setHour((prev) => prev + 0.5);
    }, 60 * 1000);
  }, []);

  return (
    <div className="w-screen flex flex-col justify-center pt-4 h-screen items-center gap-y-2">
      <div className="w-200 aspect-square border rounded-full border-black relative">
        <div
          style={{ rotate: second + "deg" }}
          className="absolute bg-black top-[15%] left-[calc(50%-0.5px)] w-[0.1%] h-[55%] origin-[50%_63.5%]"
        ></div>
        <div
          style={{ rotate: minute + "deg" }}
          className="absolute bg-black top-[5%] left-[calc(50%-1.5px)] w-[0.3%] h-[45%] origin-[50%_100%]"
        ></div>
        <div
          style={{ rotate: hour + "deg" }}
          className="absolute bg-black top-[20%] left-[calc(50%-2.5px)] w-[0.5%] h-[30%] origin-[50%_100%]"
        ></div>
      </div>
    </div>
  );
};

export default Watch;
