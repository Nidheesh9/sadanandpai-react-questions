import { useState } from "react";

const Password = () => {
  const [width, setWidth] = useState(0);

  function handleWidth(
    length,
    haveLowerCase,
    haveUpperCase,
    haveNumber,
    haveSpecialCharacter
  ) {
    if (haveLowerCase && haveUpperCase && haveNumber && haveSpecialCharacter) {
      setWidth(50 + length);
    } else if (haveLowerCase && haveUpperCase && haveNumber) {
      setWidth(40 + length);
    } else if (haveLowerCase && haveUpperCase && haveSpecialCharacter) {
      setWidth(40 + length);
    } else if (haveLowerCase && haveNumber && haveSpecialCharacter) {
      setWidth(40 + length);
    } else if (haveUpperCase && haveNumber && haveSpecialCharacter) {
      setWidth(40 + length);
    } else if (haveLowerCase && haveUpperCase) {
      setWidth(30 + length);
    } else if (haveLowerCase && haveNumber) {
      setWidth(30 + length);
    } else if (haveUpperCase && haveNumber) {
      setWidth(30 + length);
    } else if (haveLowerCase && haveSpecialCharacter) {
      setWidth(30 + length);
    } else if (haveUpperCase && haveSpecialCharacter) {
      setWidth(30 + length);
    } else if (haveNumber && haveSpecialCharacter) {
      setWidth(30 + length);
    } else if (haveLowerCase) {
      setWidth(20 + length);
    } else if (haveUpperCase) {
      setWidth(20 + length);
    } else if (haveNumber) {
      setWidth(20 + length);
    } else if (haveSpecialCharacter) {
      setWidth(20 + length);
    }
  }

  function handleClick(e) {
    const value = e.target.value;
    const length = value.length;
    const haveNumber = /[0-9]/g.test(value);
    const haveLowerCase = /[a-z]/g.test(value);
    const haveUpperCase = /[A-Z]/g.test(value);
    const haveSpecialCharacter = /[^0-9^a-z^A-Z]/g.test(value);
    if (length >= 18) {
      handleWidth(
        50,
        haveLowerCase,
        haveUpperCase,
        haveNumber,
        haveSpecialCharacter
      );
    } else if (length >= 15) {
      handleWidth(
        40,
        haveLowerCase,
        haveUpperCase,
        haveNumber,
        haveSpecialCharacter
      );
    } else if (length >= 12) {
      handleWidth(
        30,
        haveLowerCase,
        haveUpperCase,
        haveNumber,
        haveSpecialCharacter
      );
    } else if (length >= 9) {
      handleWidth(
        20,
        haveLowerCase,
        haveUpperCase,
        haveNumber,
        haveSpecialCharacter
      );
    } else if (length >= 6) {
      handleWidth(
        10,
        haveLowerCase,
        haveUpperCase,
        haveNumber,
        haveSpecialCharacter
      );
    } else if (length >= 4) {
      handleWidth(
        0,
        haveLowerCase,
        haveUpperCase,
        haveNumber,
        haveSpecialCharacter
      );
    } else {
      setWidth(0);
    }
  }

  return (
    <div className="w-screen h-screen pt-4 flex items-center bg-pink-200 flex-col">
      <div className="w-fit p-4 flex flex-col justify-evenly rounded-3xl">
        <input
          type="text"
          placeholder="Password"
          className="bg-red-400 p-2 border border-red-800 rounded-2xl w-100 font-bold"
          onChange={handleClick}
        />
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between mt-2">
            <span className="text-sm">Lowercase</span>
            <span className="text-sm">Uppercase</span>
            <span className="text-sm">Number</span>
            <span className="text-sm">Symbols</span>
          </div>
          <div className="w-full h-2 bg-white rounded-2xl">
            <div
              style={{ width: width + "%" }}
              className={`h-full bg-green-600 transition-all duration-200`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
