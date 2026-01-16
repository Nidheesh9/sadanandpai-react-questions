import { useState, useRef, useEffect } from "react";

function ToDoList() {
  const [itemArr, setItemArr] = useState([]);
  const [selectedButton, setSelectedButton] = useState("all");
  const [allCompleted, setAllCompleted] = useState(true);
  const inputRef = useRef(null);

  function handleInput(e) {
    if (e.key === "Enter") {
      const obj = {
        name: e.target.value,
        isUpdate: false,
        isDone: false,
      };
      setItemArr((prev) => [...prev, obj]);
      e.target.value = "";
    }
  }

  function handleDoubleClick(index) {
    const arr = [...itemArr];
    arr[index].isUpdate = true;
    setItemArr(arr);
  }

  function handleOnChageItem(e, index) {
    const arr = [...itemArr];
    arr[index].name = e.target.value;
    setItemArr(arr);
  }

  function handleOnKeyUpItem(e, index) {
    const arr = [...itemArr];
    arr[index].isUpdate = false;
    setItemArr(arr);
  }

  function handleCheckbox(isChecked, index) {
    const arr = [...itemArr];
    arr[index].isDone = isChecked;
    setItemArr(arr);
  }

  function handleRemoveItem(removalIndex) {
    setItemArr((prev) => prev.filter((_, index) => index !== removalIndex));
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [itemArr]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center pt-16">
        <h1 className="text-8xl font-medium text-red-500 mb-8">todos</h1>

        <div className="w-full max-w-2xl bg-white shadow-lg">
          <div className="relative border-b border-gray-200">
            {!!itemArr.length && (
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl transform rotate-90 hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setAllCompleted((prev) => !prev);
                  setItemArr((prev) =>
                    prev.map((item) => ({ ...item, isDone: allCompleted }))
                  );
                }}
              >
                ❯
              </span>
            )}
            <input
              type="text"
              id="todo-input"
              placeholder="What needs to be done?"
              className="w-full px-16 py-4 text-2xl italic placeholder-gray-300 focus:outline-none"
              onKeyUp={handleInput}
            />
          </div>

          <div id="todo-list">
            {itemArr.map(
              (item, index) =>
                (selectedButton === "all" ||
                  (selectedButton === "active" && !item.isDone) ||
                  (selectedButton === "done" && item.isDone)) && (
                  <div
                    className={`todo-item border ${
                      item.isUpdate
                        ? "border-[#fb5c5c]"
                        : "border-white border-b-[#e5e7eb] "
                    }`}
                    key={index}
                    onDoubleClick={() => handleDoubleClick(index)}
                  >
                    {!item.isUpdate ? (
                      <>
                        <input
                          type="checkbox"
                          checked={item?.isDone ?? false}
                          onChange={(e) => {
                            handleCheckbox(e.target.checked, index);
                          }}
                          onDoubleClick={(e) => e.stopPropagation()}
                        />
                        <div>{item.name}</div>
                        <span
                          className="remove-item"
                          onClick={() => {
                            handleRemoveItem(index);
                          }}
                        >
                          x
                        </span>
                      </>
                    ) : (
                      <input
                        ref={inputRef}
                        type="text"
                        value={item?.name ?? ""}
                        className={`pl-14 ${item.isDone ? "line-through" : ""}`}
                        onChange={(e) => handleOnChageItem(e, index)}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            handleOnKeyUpItem(e, index);
                          }
                        }}
                        onBlur={(e) => handleOnKeyUpItem(e, index)}
                      />
                    )}
                  </div>
                )
            )}
          </div>
          {!!itemArr.length && (
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-900 border-t border-gray-200">
              <span id="item-count">
                {itemArr.filter((item) => !item.isDone).length} item
                {itemArr.filter((item) => !item.isDone).length !== 1 &&
                  "s"}{" "}
                left!
              </span>

              <div className="flex gap-2">
                <button
                  className={`btn ${
                    selectedButton === "all" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedButton("all");
                  }}
                >
                  All
                </button>
                <button
                  className={`btn ${
                    selectedButton === "active" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedButton("active");
                  }}
                >
                  Active
                </button>
                <button
                  className={`btn ${
                    selectedButton === "done" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedButton("done");
                  }}
                >
                  Completed
                </button>
              </div>

              <button
                className="hover:underline"
                onClick={() => {
                  setItemArr((prev) => prev.filter((item) => !item.isDone));
                }}
              >
                Clear completed
              </button>
            </div>
          )}
        </div>

        <div className="mt-16 text-center text-gray-500 text-xs">
          <p className="mb-1">Double-click to edit a todo</p>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
