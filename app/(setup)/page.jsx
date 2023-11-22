"use client";
import HomePage from "@/components/HomePage";
import { getUser } from "@/providers/userProvider";

export default function Home() {
  const currentUser = getUser();

  return (
    <div className="flex min-h-screen end-1">
      <div className="flex w-full">
        <HomePage user={currentUser} />
      </div>
    </div>
  );
}
