"use client";

import { ReactNode } from "react";

const LinkButton = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`px-2 py-2 cursor-pointer hover:bg-slate-100 font-light text-sm rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default LinkButton;
