import { useState } from "react";
import { NewEmail } from "./NewEmail/NewEmail";

export const Composebutton = () => {
  const [showComposeEmailPopup, setShowComposeEmailPopup] = useState(false);

  const handleClick = () => {
    setShowComposeEmailPopup(true);
  };
  return (
    <>
      <button onClick={handleClick}>New Email</button>
      <NewEmail open={showComposeEmailPopup} />
    </>
  );
};
