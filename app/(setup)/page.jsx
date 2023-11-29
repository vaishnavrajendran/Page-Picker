"use client";
import MapDocs from "@/components/MapDocs";
import UploadDocs from "@/components/UploadDocs";
import { getDocs } from "@/components/providers/DocsProvider";

export default function Home() {
  const { docs } = getDocs();
  if (!docs) return null;

  return (
    <div className="flex gap-4 flex-wrap w-full justify-center py-8">
      <MapDocs docs={docs} />
      <UploadDocs />
    </div>
  );
}
