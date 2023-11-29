import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { Document, Page, pdfjs } from "react-pdf";

//react-18 strict-mode have issues with react-dnd, so wrote the custom Droppable
import { StrictModeDroppable as Droppable } from "@/lib/strictModeDroppable";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PagesMap = ({
  selectedDoc,
  setPageOrder,
  setSelectedPages,
  pageOrder,
  selectedPages,
}) => {
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    // Creating an array of numbers representing page order
    setPageOrder(Array.from({ length: numPages }, (_, index) => index + 1));
  }, [numPages]);

  //removing inbuilt background colour of react-pdf
  const styles = `
      .react-pdf__Page {
        background-color: transparent !important;
      }
    `;

  const handleCheckboxChange = (index) => {
    setSelectedPages((prevSelectedPages) => {
      const newSelectedPages = { ...prevSelectedPages };
      const pageNumber = pageOrder[index];
      newSelectedPages[pageNumber] = !newSelectedPages[pageNumber];
      return newSelectedPages;
    });
  };

  const handleDragEnd = (result) => {
    // Check if the item was dropped inside the droppable area(placeholder)
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

  return (
    <>
      <style>{styles}</style>
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
    </>
  );
};

export default PagesMap;