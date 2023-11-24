import React from "react";

import UploadDocs from "../UploadDocs";
import MapDocs from "../MapDocs";

const DocsContainer = ({ docs }) => {
  if (!docs) return null;

  return (
    <div className="flex gap-4 flex-wrap w-full justify-center py-8">
      <MapDocs docs={docs} />
      <UploadDocs />
    </div>
  );
};

export default DocsContainer;
