"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSearchParams } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getDocs } from "@/providers/DocsProvider";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const SelectPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedDoc, setSelectedDoc] = useState();
  const [numPages, setNumPages] = useState(1);

  const { docs } = getDocs();

  const styles = `
  .react-pdf__Page {
    background-color: transparent !important;
  }
`;

  useEffect(() => {
    const currentDoc = docs.filter((doc) => doc._id === id);
    setSelectedDoc(currentDoc[0]);
  }, [docs]);

  const onDocLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!selectedDoc) return null;

  return (
    <div className="overflow-hidden px-4 md:px-10 py-4">
      <style>{styles}</style>
      <ScrollArea>
        <Document
          file={`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/${selectedDoc.path}`}
          onLoadSuccess={onDocLoadSuccess}
        >
          <div className="flex flex-col md:flex-row w-full gap-3 md:justify-start sm:justify-center sm:items-center">
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page) => {
                return (
                  <div className="">
                    <Page
                      pageNumber={page}
                      width={250}
                      height={500}
                      scale={1.5}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                );
              })}
          </div>
        </Document>
      </ScrollArea>
    </div>
  );
};

export default SelectPage;
