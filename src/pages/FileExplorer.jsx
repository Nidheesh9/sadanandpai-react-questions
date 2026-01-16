import { useState } from "react";
import Directory from "../components/Directory";

const FileExplorer = () => {
  const [data, setData] = useState({
    title: "root",
    isFolder: true,
    child: [
      {
        title: "package.json",
        isFolder: false,
        child: [],
      },
      {
        title: "package-lock.json",
        isFolder: false,
        child: [],
      },
    ],
  });

  // Adds file or folder
  function addFile(parent, title, isFolder) {
    setData((prev) => {
      const obj = { ...prev };
      let childObj = obj;
      parent.forEach((item) => {
        childObj = childObj.child[item];
      });
      childObj.child.push({
        title,
        isFolder,
        child: [],
      });
      return obj;
    });
  }

  // Removes file or folder
  function removeFile(parent) {
    setData((prev) => {
      const obj = { ...prev };
      const n = parent.length;
      let childObj = obj;

      for (let i = 0; i < n - 1; i++) {
        childObj = childObj.child[parent[i]];
      }

      childObj.child = childObj.child.filter((_, i) => i !== parent[n - 1]);
      return obj;
    });
  }

  // Edits file
  function editFile(parent, title) {
    setData((prev) => {
      const obj = { ...prev };
      let childObj = obj;
      parent.forEach((item) => {
        childObj = childObj.child[item];
      });
      childObj.title = title;
      return obj;
    });
  }

  return (
    <Directory
      data={data}
      margin={0}
      show={true}
      parent={[]}
      addFile={addFile}
      removeFile={removeFile}
      editFile={editFile}
      index={0}
    />
  );
};

export default FileExplorer;
