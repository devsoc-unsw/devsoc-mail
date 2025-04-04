import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  onClick?: (e: any) => void;
  className?: string;
  children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "bg-[#D9807E] border-2 border-black p-2 cursor-pointer",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export { Button };
