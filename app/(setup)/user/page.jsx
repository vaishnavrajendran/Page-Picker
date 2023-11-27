"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSearchParams } from "next/navigation";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { StrictModeDroppable as Droppable } from "@/lib/strictModeDroppable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDocs } from "@/providers/DocsProvider";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const SelectPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedDoc, setSelectedDoc] = useState();
  const [numPages, setNumPages] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);

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
    setSelectedPages(Array.from({ length: numPages }, () => false));
  };

  const handleCheckboxChange = (index) => {
    const newSelectedPages = [...selectedPages];
    newSelectedPages[index] = !newSelectedPages[index];
    setSelectedPages(newSelectedPages);
  };

  const handleDragEnd = (result) => {
    // Check if the item was dropped inside the droppable area
    if (!result.destination) {
      return;
    }

    // Reorder the pages based on the drag-and-drop result
    const updatedPages = Array.from(selectedPages);
    const [draggedPage] = updatedPages.splice(result.source.index, 1);
    updatedPages.splice(result.destination.index, 0, draggedPage);

    // Update the state with the new order of pages
    setSelectedPages(updatedPages);
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="docs" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-row w-full gap-3 md:justify-start sm:justify-center sm:items-center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {Array.apply(null, Array(numPages)).map((x, i) => (
                    <Draggable key={i} draggableId={`page-${i}`} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative"
                          onClick={() => handleCheckboxChange(i)}
                        >
                          <input
                            type="checkbox"
                            className="page-checkbox scale-150"
                            checked={selectedPages[i]}
                          />
                          <Page
                            pageNumber={i + 1}
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
