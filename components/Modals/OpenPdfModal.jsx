import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const OpenPdfModal = ({ openPdf, handleOpenClosePdf, selectedPdf }) => {
  return (
    <Dialog open={openPdf} onOpenChange={handleOpenClosePdf} className="w-full">
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Select / Rearrange your pdf
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Select the pages you want to extract. Your pdf will be arranged
            based on the order you select
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full h-[800px] flex">
          {selectedPdf && (
            <div className="pdf-pages flex">
              <Document
                file={`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/${selectedPdf.path}`}
              >
                <div className="flex w-full">
                  {/* {renderPages()} */}
                  <Page pageNumber={2} />
                  <Page pageNumber={1} />
                </div>
              </Document>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OpenPdfModal;
