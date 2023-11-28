"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSearchParams } from "next/navigation";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { StrictModeDroppable as Droppable } from "@/lib/strictModeDroppable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDocs } from "@/providers/DocsProvider";
import { Button } from "@/components/ui/button";
import { sendReArrangeData } from "@/lib/requests";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const SelectPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedDoc, setSelectedDoc] = useState();
  const [numPages, setNumPages] = useState(1);
  const [pageOrder, setPageOrder] = useState([]);
  const [selectedPages, setSelectedPages] = useState({});
  const [disabled, setDisabled] = useState(false);

  const { docs } = getDocs();

  useEffect(() => {
    const currentDoc = docs.filter((doc) => doc._id === id);
    setSelectedDoc(currentDoc[0]);
  }, [docs]);

  useEffect(() => {
    // Create an array of numbers representing page order
    setPageOrder(Array.from({ length: numPages }, (_, index) => index + 1));
  }, [numPages]);

  //removing inbuilt background colour of react-pdf
  const styles = `
  .react-pdf__Page {
    background-color: transparent !important;
  }
`;

  const handleSubmit = async () => {
    setDisabled(true);
    const data = await sendReArrangeData(
      id,
      pageOrder,
      selectedPages,
      selectedDoc.path
    );
    setDisabled(false);
  };

  const handleCheckboxChange = (index) => {
    setSelectedPages((prevSelectedPages) => {
      const newSelectedPages = { ...prevSelectedPages };
      const pageNumber = pageOrder[index];
      newSelectedPages[pageNumber] = !newSelectedPages[pageNumber];
      return newSelectedPages;
    });
  };

  const handleDragEnd = (result) => {
    // Check if the item was dropped inside the droppable area
    if (!result.destination) {
      return;
    }

    // Reorder the pages based on the drag-and-drop result
    const updatedOrder = Array.from(pageOrder);
    updatedOrder.splice(result.source.index, 1);
    const index = +result.draggableId?.split("-").pop();
    updatedOrder.splice(result.destination.index, 0, index);

    setPageOrder(updatedOrder);
  };

  if (!selectedDoc) return null;

  return (
    <div className="overflow-hidden px-4 md:px-10 py-4">
      <style>
        {`
          .react-pdf__Page {
            background-color: transparent !important;
          }
        `}
      </style>
      <ScrollArea>
        <p className="text-white text-center mb-2 p-1">
          Select the pages you want to extract and drag and drop the pages to
          rearrange. Note: Only selected pages will be extracted and reordered
        </p>
        <div className="flex justify-end mb-3 p-2">
          <Button disabled={disabled} onClick={handleSubmit}>
            {disabled ? "Extracting....." : "Extract/Rearrange"}
          </Button>
        </div>
        <Document
          file={`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/${selectedDoc.path}`}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="docs" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-row flex-wrap justify-center items-center gap-3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {pageOrder.map((pageNumber, index) => (
                    <Draggable
                      key={pageNumber}
                      draggableId={`page-${pageNumber}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative mb-3"
                          onClick={() => handleCheckboxChange(index)}
                        >
                          <input
                            type="checkbox"
                            className="page-checkbox scale-150"
                            checked={selectedPages[pageNumber]}
                            readOnly
                          />
                          <Page
                            pageNumber={pageNumber}
                            width={250}
                            height={500}
                            scale={1.5}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Document>
      </ScrollArea>
    </div>
  );
};

export default SelectPage;
