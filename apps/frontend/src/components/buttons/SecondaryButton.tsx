import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface SecondaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
  className?: string;
}

const SecondaryButton = ({
  children,
  onClick,
  size = "small",
  className,
}: SecondaryButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 pt-2" : "px-10 py-4"} cursor-pointer hover:shadow-md hover:bg-transparent hover:border-black border text-black border-slate-400 rounded-full bg-transparent w-full sm:w-[30vw] md:w-[30vw] lg:w-[25vw] xl:w-[10vw] h-15 ${className}`}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
