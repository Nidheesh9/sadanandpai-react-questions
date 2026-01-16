import { Activity, useRef, useState } from "react";

const Directory = ({
  data,
  margin,
  show,
  parent,
  addFile,
  removeFile,
  editFile,
  index,
}) => {
  const [showChild, setShowChild] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showChildInput, setShowChildInput] = useState(false);
  const [isFolder, setIsFolder] = useState(false);
  const inputRef = useRef(null);
  const childInputRef = useRef(null);

  return (
    <>
      <div
        style={{ marginLeft: margin + "rem", display: show ? "block" : "none" }}
        className="p-2"
      >
        {showInput ? (
          <input
            type="text"
            className="border border-black"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editFile(parent, e.target.value);
                setShowInput(false);
              }
            }}
            ref={inputRef}
          />
        ) : (
          <div className="title flex items-center">
            <button
              className="ml-2 flex items-center gap-x-2"
              onClick={() => setShowChild((prev) => !prev)}
            >
              <span>{data.isFolder ? "📂" : "📄"}</span>
              {data.title}
            </button>

            <div className="all-icons hidden">
              {parent.length > 0 && (
                <>
                  <span
                    className="ml-4 px-2"
                    onClick={() => {
                      setShowInput((prev) => !prev);
                      inputRef.current.focus();
                    }}
                  >
                    ✏️
                  </span>
                  <span
                    className="ml-4 px-2"
                    onClick={() => removeFile(parent, index)}
                  >
                    🗑️
                  </span>
                </>
              )}

              {data.isFolder && (
                <>
                  <button
                    className="ml-4 px-2"
                    onClick={() => {
                      setShowChildInput((prev) => !prev);
                      setIsFolder(false);
                      childInputRef.current?.focus();
                    }}
                  >
                    📄
                  </button>
                  <button
                    className="ml-4 px-2 text-black"
                    onClick={() => {
                      setShowChildInput((prev) => !prev);
                      setIsFolder(true);
                      childInputRef?.current?.focus();
                    }}
                  >
                    🗂
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {data.child.length > 0 &&
        data.child.map((item, index) => (
          <Directory
            key={[...parent, index].join("-")}
            data={item}
            margin={margin + 1}
            show={show && showChild}
            parent={[...parent, index]}
            index={index}
            addFile={addFile}
            removeFile={removeFile}
            editFile={editFile}
          />
        ))}

      <Activity mode={showChildInput ? "visible" : "hidden"}>
        <input
          type="text"
          style={{ marginLeft: margin + 2 + "rem" }}
          className="border pl-2 border-black"
          onBlur={() => setShowChildInput(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addFile(parent, e.target.value, isFolder);
              setShowChildInput(false);
            }
          }}
          ref={childInputRef}
        />
      </Activity>
    </>
  );
};

export default Directory;
