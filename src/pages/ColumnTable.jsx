import { useState } from "react";

const ColumnTable = () => {
  const [row, setRow] = useState(4);
  const [column, setColumn] = useState(4);

  return (
    <div className="w-screen mt-10 flex flex-col justify-between">
      <div className="flex justify-evenly">
        <div className="flex gap-2">
          <span>Row {row}</span>
          <input
            type="range"
            max={8}
            min={2}
            value={row}
            onChange={(e) => {
              setRow(Number(e.target.value));
              setColumn((prev) => prev);
            }}
          />
        </div>
        <div className="flex gap-2">
          <span>Column {column}</span>
          <input
            type="range"
            max={8}
            min={2}
            value={column}
            onChange={(e) => setColumn(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 items-center justify-center">
        {[...Array(row)].map((_, i) => (
          <div
            key={i}
            className="flex gap-x-2"
            style={{
              flexDirection: i % 2 ? "row-reverse" : "row",
            }}
          >
            {[...Array(column)].map((_, j) => (
              <div
                key={j}
                className="w-10 h-10 bg-red-100 flex justify-center items-center"
              >
                {i * column + j + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnTable;
