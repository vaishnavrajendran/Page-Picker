import React from "react";
import UploadDocs from "../UploadDocs";

const DocsContainer = ({ docs }) => {
  if (!docs) return null;

  return (
    <div className="flex gap-4 flex-wrap w-full justify-center py-8">
      {docs.map((doc, i) => (
        <div
          key={i}
          className="flex flex-col w-60 h-80 bg-slate-400 cursor-pointer p-2"
        >
          <div className="flex items-center justify-center overflow-hidden h-72">
            <img
              src={`http://localhost:8080/${doc.imagePath}`}
              alt={doc.fileName}
              className=" object-cover"
            />
          </div>
          <div className="text-center mt-2">{doc.fileName}</div>
        </div>
      ))}
      <UploadDocs />
    </div>
  );
};

export default DocsContainer;
