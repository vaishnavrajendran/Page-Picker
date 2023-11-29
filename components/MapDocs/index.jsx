import React from "react";
import { useRouter } from "next/navigation";

const MapDocs = ({ docs }) => {
  const router = useRouter();

  const handleClick = (doc) => {
    router.push(`/user/?id=${doc._id}`);
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
    </>
  );
};

export default MapDocs;
