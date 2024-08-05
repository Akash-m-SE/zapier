import { ReactNode } from "react";

const PrimaryButton = ({
  children,
  onClick,
  size = "small",
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-full text-center flex justify-center flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default PrimaryButton;
