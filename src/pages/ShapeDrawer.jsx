import { useState } from "react";

const ShapeDrawer = () => {
  const [shapeArr, setShapeArr] = useState([]);
  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setShapeArr((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left - 20,
        y: e.clientY - rect.top - 20,
      },
    ]);
  }
  return (
    <div className="w-screen h-screen flex flex-col gap-y-4">
      <div className="bg-amber-100 h-24"></div>
      <div
        className="w-full flex-1 bg-pink-100 relative overflow-hidden"
        onClick={handleClick}
      >
        {shapeArr.map(({ id, x, y }) => (
          <div
            className={`h-10 w-10 bg-green-300 absolute`}
            style={{ left: `${x}px`, top: `${y}px` }}
            key={id}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ShapeDrawer;
