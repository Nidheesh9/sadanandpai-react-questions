import { useState } from "react";

function Toast() {
  const [toastArr, setToastArr] = useState([]);

  function addToast() {
    setToastArr((prev) => [...prev, "This is a toast"]);
    setTimeout(() => {
      setToastArr((prev) => prev.filter((_, index) => index !== 0));
    }, 3000);
  }

  return (
    <div className="bg-red-100 w-screen h-screen relative flex justify-center items-center overflow-hidden">
      {!!toastArr.length &&
        toastArr.map((text, index) => (
          <div
            style={{ marginTop: `${index * 3}rem` }}
            className={`absolute top-10 bg-amber-300 p-2 rounded-2xl transition-all duration-200 right-4`}
          >
            {text}
          </div>
        ))}
      <button className="bg-white p-2" onClick={() => addToast()}>
        Toast Up
      </button>
    </div>
  );
}

export default Toast;
