import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "bg-[#D9807E] border-2 border-black p-2",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export { Button };
