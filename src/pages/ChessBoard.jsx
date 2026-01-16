import { useState } from "react";

function ChessBoard() {
  const [block, setBlock] = useState(getBlock());

  function getBlock() {
    const block = [];
    for (let i = 0; i < 8; i++) {
      let isWhite = i % 2 === 0;
      for (let j = 0; j < 8; j++) {
        block.push(
          <div
            id={`${i}-${j}`}
            className={`w-[12.5%] aspect-square ${
              isWhite ? "bg-white" : "bg-black"
            }`}
          ></div>
        );
        isWhite = !isWhite;
      }
    }
    return block;
  }

  function changeColor(i, j) {
    const block = getBlock();
    let x = i,
      y = j;
    while (x < 8 && y < 8) {
      block[8 * x + y] = (
        <div
          id={`${x}-${y}`}
          className="w-[12.5%] aspect-square bg-red-500"
        ></div>
      );
      x++;
      y++;
    }

    (x = i), (y = j);
    while (x >= 0 && y >= 0) {
      block[8 * x + y] = (
        <div
          id={`${x}-${y}`}
          className="w-[12.5%] aspect-square bg-red-500"
        ></div>
      );
      x--;
      y--;
    }

    (x = i), (y = j);
    while (x >= 0 && y < 8) {
      block[8 * x + y] = (
        <div
          id={`${x}-${y}`}
          className="w-[12.5%] aspect-square bg-red-500"
        ></div>
      );
      x--;
      y++;
    }

    (x = i), (y = j);
    while (x < 8 && y >= 0) {
      block[8 * x + y] = (
        <div
          id={`${x}-${y}`}
          className="w-[12.5%] aspect-square bg-red-500"
        ></div>
      );
      x++;
      y--;
    }
    setBlock(block);
  }

  return (
    <div className="w-screen h-screen">
      <div
        className="w-200 aspect-square border border-zinc-800 m-auto flex flex-wrap"
        onClick={(e) => {
          const id = e.target.id.split("-");
          changeColor(Number(id[0]), Number(id[1]));
        }}
      >
        {block.map((item) => item)}
      </div>
    </div>
  );
}

export default ChessBoard;
