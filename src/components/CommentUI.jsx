import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";

export const CommentUI = ({ comment, addComment, parent, removeComment }) => {
  const [wannaReply, setWannaReply] = useState(false);
  const inputRef = useRef(null);

  function handleChange() {
    const value = inputRef.current.value;
    if (value) {
      addComment(parent, value);
      setWannaReply((prev) => !prev);
    }
  }

  return (
    <>
      <div className="flex gap-4 p-5 bg-gray-100 rounded-lg mb-3 border-l-4 border-blue-600">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
          <CgProfile className="w-full h-full" />
        </div>
        <div className="flex-1">
          <div className="font-semibold mb-2 text-black">{comment.title}</div>
          {!wannaReply ? (
            <div className="flex gap-4">
              <button
                className="text-sm text-gray-700 hover:underline"
                onClick={() => {
                  setWannaReply((prev) => !prev);
                  inputRef?.current?.focus();
                }}
              >
                Reply
              </button>
              <button
                className="text-sm text-gray-700 hover:underline"
                onClick={() => {
                  removeComment(parent);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                placeholder="Reply..."
                className="px-4 border border-gray-300 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleChange();
                  }
                }}
                ref={inputRef}
                autoFocus
              />
              <button
                className="text-sm text-gray-700 hover:underline"
                onClick={handleChange}
              >
                Add
              </button>
              <button
                className="text-sm text-gray-700 hover:underline"
                onClick={() => {
                  setWannaReply((prev) => !prev);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="ml-6">
        {comment.child.length > 0 ? (
          comment.child.map((data, index) => (
            <CommentUI
              comment={data}
              key={index}
              parent={[...parent, index]}
              addComment={addComment}
              removeComment={removeComment}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
