import React from "react";
import { useState } from "react";
import OpenPdfModal from "../Modals/OpenPdfModal";

const MapDocs = ({ docs }) => {
  const [openPdf, setOpenPdf] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(docs[0]);

  const handleOpenClosePdf = (e) => {
    console.log("Hii");
    setOpenPdf((prev) => !prev);
  };

  const setPdf = async (doc) => {
    console.log("DOC", doc);
    setSelectedPdf(doc);
    return Promise.resolve();
  };

  const handleClick = (doc) => {
    setPdf(doc).then(() => handleOpenClosePdf());
  };

  return (
    <>
      {docs.map((doc, i) => (
        <div
          key={i}
          className="flex flex-col w-60 h-80 bg-slate-400 cursor-pointer p-2"
          onClick={() => handleClick(doc)}
        >
          <div className="flex items-center justify-center overflow-hidden h-72">
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/${doc.imagePath}`}
              alt={doc.fileName}
              className=" object-cover"
            />
          </div>
          <div className="text-center mt-2">{doc.fileName}</div>
        </div>
      ))}
      <OpenPdfModal
        openPdf={openPdf}
        handleOpenClosePdf={handleOpenClosePdf}
        selectedPdf={selectedPdf}
      />
    </>
  );
};

export default MapDocs;
