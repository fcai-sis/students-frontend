"use client";

import { PropsWithChildren, useState } from "react";

export type DropdownProps = PropsWithChildren<{
  label: string;
}>;
export default function Dropdown({ label, children }: DropdownProps) {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(!show);
  };

  return (
    <div className="relative">
      <button
        className="p-2 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors duration-300"
        onClick={handleButtonClick}
      >
        {label}
      </button>
      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ${
          show ? "" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
