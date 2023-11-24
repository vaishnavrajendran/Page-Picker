import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const OpenPdfModal = ({ openPdf, handleOpenClosePdf, selectedPdf }) => {
  if (!selectedPdf) return null;
  return (
    <Dialog open={openPdf} onOpenChange={handleOpenClosePdf}>
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
        <ScrollArea className="h-[800px] w-[500px] rounded-md border p-4">
          {selectedPdf && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
              <Viewer
                fileUrl={`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/${selectedPdf.path}`}
              />
            </Worker>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OpenPdfModal;
