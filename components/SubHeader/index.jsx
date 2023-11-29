import React from "react";
import { Button } from "../ui/button";

const SubHeader = ({
  disabled,
  downloadLink,
  handleSubmit,
  handleDownload,
}) => {
  return (
    <>
      <p className="text-white text-center mb-2 p-1">
        Select the pages you want to extract and drag and drop the pages to
        rearrange. Note: Only selected pages will be extracted and reordered
      </p>
      <div className="flex justify-end mb-3 p-2 gap-2">
        <Button disabled={disabled} onClick={handleSubmit}>
          {disabled ? "Extracting....." : "Extract/Rearrange"}
        </Button>
        {downloadLink && <Button onClick={handleDownload}>Download</Button>}
      </div>
    </>
  );
};

export default SubHeader;
