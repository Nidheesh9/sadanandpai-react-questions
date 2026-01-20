import { useState } from "react";

const MatchPair = () => {
  const [arr, setArr] = useState(
    [...Array(16)].map((_, i) => ({
      title: i % 8,
      isShow: false,
      isClickValid: true,
    }))
  );

  const [check, setCheck] = useState([]);

  function handleClick(index, item) {
    setCheck((prev) => [
      ...prev,
      {
        title: item.title,
        index,
      },
    ]);
    if (check.length >= 2) {
      if (check[0].title === check[1].title) {
        setArr((prev) => {
          return prev.map((item) =>
            item.title === check[0].title
              ? { ...item, isClickValid: false }
              : item
          );
        });
      } else {
        setArr((prev) =>
          prev.map((item, i) =>
            check[0].index === i || check[1].index === i
              ? { ...item, isShow: false }
              : item
          )
        );
      }
      setCheck((prev) => prev.slice(2, prev.length));
    }
    setArr((prev) =>
      prev.map((item, i) => (index === i ? { ...item, isShow: true } : item))
    );
  }

  return (
    <div className="w-screen flex justify-center pt-10 bg-pink-100 h-screen">
      <div className="w-70 flex flex-wrap justify-between items-center gap-2 h-fit">
        {arr.map((item, index) => (
          <div
            key={index}
            className={`w-15 h-15 bg-white flex justify-center items-center transition-all duration-200 ${
              item.isClickValid
                ? "cursor-pointer"
                : "cursor-none pointer-events-none"
            }`}
            onClick={() => handleClick(index, item)}
          >
            {item.isShow && item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchPair;
