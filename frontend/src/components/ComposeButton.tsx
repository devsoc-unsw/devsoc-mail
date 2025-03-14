import { useState } from "react";
import { NewEmail } from "./NewEmail/NewEmail";
import { Button } from "@/components/ui/button"

export const Composebutton = () => {
  const [showComposeEmailPopup, setShowComposeEmailPopup] = useState(false);

  const handleClick = () => {
    setShowComposeEmailPopup(true);
  };
  return (
    <>
      <Button className="cursor-pointer bg-[#5DAB61] border-2 border-black p-2" onClick={handleClick}>New Email</Button>
      <NewEmail
        open={showComposeEmailPopup}
        setOpen={setShowComposeEmailPopup}
      />
    </>
  );
};
