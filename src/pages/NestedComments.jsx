import { useRef, useState } from "react";
import { CommentUI } from "../components/CommentUI";

function NestedComments() {
  const [commentsData, setCommentsData] = useState([
    {
      title: "Hello World! How are you?",
      child: [
        {
          title: "Hey, I am fine, wau?",
          child: [],
        },
      ],
    },
  ]);
  const inputRef = useRef(null);

  function handleChange() {
    const value = inputRef.current.value;
    if (value) {
      setCommentsData((prev) => [
        ...prev,
        {
          title: value,
          child: [],
        },
      ]);
    }
    inputRef.current.value = "";
  }

  function addComment(arr, title) {
    const updatedCommentsData = [...commentsData];
    let obj;
    arr.forEach((ele, index) => {
      if (index === 0) {
        obj = updatedCommentsData[ele];
      } else {
        obj = obj.child[ele];
      }
    });
    obj.child.unshift({
      title: title,
      child: [],
    });
    setCommentsData(updatedCommentsData);
  }

  function removeComment(arr) {
    if (arr.length === 1) {
      setCommentsData((prev) => [
        ...prev.filter((_, index) => index !== arr[0]),
      ]);
      return;
    }
    const updatedCommentsData = [...commentsData];
    const lastIndex = arr[arr.length - 1];
    let obj = updatedCommentsData[arr[0]];
    arr.forEach((ele, index) => {
      if (index === arr.length - 1) return;
      else if (index !== 0) {
        obj = obj.child[ele];
      }
    });
    obj.child = obj.child.filter((_, index) => index !== lastIndex);
    setCommentsData(updatedCommentsData);
  }

  return (
    <>
      <div className="p-5 bg-white">
        <div className="max-w-screen">
          <h1 className="text-4xl font-bold mb-8 text-black">Comments</h1>

          <div className="flex gap-3 mb-5 max-w-3xs">
            <input
              type="text"
              placeholder="Add comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChange();
                }
              }}
            />
            <button
              onClick={handleChange}
              className="px-6 py-2 bg-gray-100 border border-gray-300 rounded text-sm font-medium hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          {commentsData?.map((commentData, index) => (
            <CommentUI
              comment={commentData}
              key={index}
              addComment={addComment}
              parent={[index]}
              removeComment={removeComment}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default NestedComments;
