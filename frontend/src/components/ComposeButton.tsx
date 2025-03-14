import { useState } from "react";
import { NewEmail } from "./NewEmail";
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";

interface ComposeButtonProps {
  className?: string;
}

export const Composebutton = (props: ComposeButtonProps) => {
  const [showComposeEmailPopup, setShowComposeEmailPopup] = useState(false);

  const handleClick = () => {
    setShowComposeEmailPopup(true);
  };
  return (
    <>
      <Button
        className={twMerge(
          "cursor-pointer bg-[#5DAB61] border-2 border-black p-2",
          props.className
        )}
        onClick={handleClick}
      >
        New Email
      </Button>
      <NewEmail
        open={showComposeEmailPopup}
        setOpen={setShowComposeEmailPopup}
      />
    </>
  );
};
