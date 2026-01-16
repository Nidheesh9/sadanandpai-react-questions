import { useState } from "react";

const BookBusTicket = () => {
  const column = ["A", "B", "C", "D", "E", "F"];
  const row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [seats, setSeats] = useState([]);
  const [noOfSeats, setNoOfSeats] = useState(2);

  return (
    <div className="w-screen h-screen bg-pink-100 flex flex-col gap-y-4 items-center pt-20 ">
      <input
        type="number"
        className="bg-gray-100 p-2 border border-green-400"
        placeholder="Seats"
        value={noOfSeats}
        onChange={(e) => {
          const val = Number(e.target.value) || 0;
          if (seats.length > val) {
            setSeats((prev) => prev.slice(0, val));
          }
          setNoOfSeats(val);
        }}
      />
      <div className="w-md flex flex-col gap-y-2">
        <div className="flex w-full gap-x-2 ml-12">
          {column.map((j) => (
            <div
              key={j}
              className="w-10 h-10 bg-amber-200 flex items-center justify-center"
            >
              {j}
            </div>
          ))}
        </div>
        {row.map((i) => (
          <div key={i} className="flex w-full gap-x-2">
            <div className="w-10 h-10 bg-amber-200 flex items-center justify-center">
              {i}
            </div>
            {column.map((j) => (
              <div
                key={i + j}
                className="w-10 h-10 bg-red-400"
                onClick={() => {
                  setSeats((prev) => {
                    const seat = `${i}${j}`;
                    if (prev.indexOf(seat) !== -1) {
                      return prev.filter((item) => item !== seat);
                    }
                    if (prev.length >= Number(noOfSeats)) {
                      return prev;
                    }
                    return [...prev, seat];
                  });
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-x-2 p-2">
        {seats.length > 0 && seats.map((seat) => <div key={seat}>{seat}</div>)}
      </div>
    </div>
  );
};

export default BookBusTicket;
