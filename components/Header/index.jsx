import React from "react";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="flex justify-between w-full bg-slate-200 px-2 py-2">
      <div className="flex items-center">
        <p className="text-4xl">Page Picker</p>
      </div>
      <div>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;
