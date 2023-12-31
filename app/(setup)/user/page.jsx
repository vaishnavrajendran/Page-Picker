"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useDocs } from "@/components/providers/DocsProvider";
import { sendReArrangeData } from "@/lib/requests";
import PagesMap from "@/components/PagesMap";
import SubHeader from "@/components/SubHeader";

const SelectPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedDoc, setSelectedDoc] = useState();
  const [pageOrder, setPageOrder] = useState([]);
  const [selectedPages, setSelectedPages] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [warning, setWarning] = useState(false);

  const { docs } = useDocs();

  useEffect(() => {
    const currentDoc = docs.filter((doc) => doc._id === id);
    setSelectedDoc(currentDoc[0]);
  }, [docs]);

  const handleSubmit = async () => {
    if (
      Object.keys(selectedPages).length === 0 ||
      !Object.values(selectedPages).some((value) => value === true) //validation, to ensure atleast one page is selected to extract
    ) {
      setWarning(true);
    } else {
      setWarning(false);
      setDisabled(true);
      const data = await sendReArrangeData(
        id,
        pageOrder,
        selectedPages,
        selectedDoc.path
      );
      setDisabled(false);
      setDownloadLink(data.downloadLink);
    }
  };

  const handleDownload = async () => {
    try {
      window.open(downloadLink, "_blank");
      const response = await fetch(downloadLink);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "modified.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadLink("");
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  if (!selectedDoc) return null;

  return (
    <div className="overflow-hidden px-4 md:px-10 py-4">
      <ScrollArea>
        <SubHeader
          disabled={disabled}
          downloadLink={downloadLink}
          handleSubmit={handleSubmit}
          handleDownload={handleDownload}
          warning={warning}
        />
        <PagesMap
          selectedDoc={selectedDoc}
          pageOrder={pageOrder}
          selectedPages={selectedPages}
          setPageOrder={setPageOrder}
          setSelectedPages={setSelectedPages}
        />
      </ScrollArea>
    </div>
  );
};

export default SelectPage;
