import React, { useState } from "react";
import { Plus } from "lucide-react";

import FileUploadModal from "@/components/Modals/FileUploadModal";

const UploadDocs = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const closeModal = () => {
    setOpenUploadModal((prev) => !prev);
  };
  return (
    <>
      <div
        id="plus"
        className="flex flex-col w-60 h-80 items-center justify-center p-2 cursor-pointer bg-background/10"
        onClick={() => setOpenUploadModal(true)}
      >
        <Plus className="h-8 w-8 fill-indigo-200 stroke-indigo-400 cursor-pointer" />
        <a href="#" className="mt-2 text-sm text-indigo-500">
          Add
        </a>
      </div>
      <FileUploadModal
        openUploadModal={openUploadModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default UploadDocs;
