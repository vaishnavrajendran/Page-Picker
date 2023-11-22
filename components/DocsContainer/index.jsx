import React, { useState } from "react";
import { Plus } from "lucide-react";
import FileUploadModal from "../Modals/fileUploadModal";

const DocsContainer = ({ docs }) => {
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const closeModal = () => {
    setOpenUploadModal((prev) => !prev);
  };

  return (
    <div className="w-full px-12 py-8">
      {docs.map((doc, i) => (
        <div key={i}>{doc}</div>
      ))}
      <div className="relative flex flex-col items-center justify-center p-2 mt-2 rounded-md bg-background/10 w-28 h-24">
        <Plus
          className="h-10 w-10 fill-indigo-200 stroke-indigo-400 cursor-pointer"
          onClick={() => setOpenUploadModal(true)}
        />
        <a href="">Add</a>
      </div>
      <FileUploadModal
        openUploadModal={openUploadModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default DocsContainer;
