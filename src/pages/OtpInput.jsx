import { useRef, useState } from "react";

const OtpInput = () => {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  return (
    <div className="w-screen h-screen bg-pink-100 flex justify-center">
      <div className="w-md flex justify-center pt-10">
        <div className="flex gap-2">
          <input
            ref={inputRef1}
            className="w-10 h-10 flex items-center justify-center p-2 border border-gray-400"
            value={value1}
            onChange={(e) => {
              if (e.target.value) {
                setValue1(e.target.value);
                inputRef2.current.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                setValue1("");
              }
            }}
          />

          <input
            ref={inputRef2}
            className="w-10 h-10 flex items-center justify-center p-2 border border-gray-400"
            value={value2}
            onChange={(e) => {
              if (e.target.value) {
                setValue2(e.target.value);
                inputRef3.current.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                setValue2("");
                inputRef1.current.focus();
              }
            }}
          />

          <input
            ref={inputRef3}
            className="w-10 h-10 flex items-center justify-center p-2 border border-gray-400"
            value={value3}
            onChange={(e) => {
              if (e.target.value) {
                setValue3(e.target.value);
                inputRef4.current.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                setValue3("");
                inputRef2.current.focus();
              }
            }}
          />

          <input
            ref={inputRef4}
            className="w-10 h-10 flex items-center justify-center p-2 border border-gray-400"
            value={value4}
            onChange={(e) => {
              setValue4(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                setValue4("");
                inputRef3.current.focus();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
