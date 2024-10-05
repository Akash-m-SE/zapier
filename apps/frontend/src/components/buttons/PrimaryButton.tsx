import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: "big" | "small";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const PrimaryButton = ({
  children,
  onClick,
  size = "small",
  className,
  type = "button",
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} cursor-pointer hover:shadow-md bg-orange-600 text-white rounded-full text-center w-full sm:w-[35vw] md:w-[30vw] lg:w-[25vw] xl:w-[15vw] h-15 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
