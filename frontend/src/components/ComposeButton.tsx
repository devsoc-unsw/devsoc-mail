import { useState } from "react";

export const Composebutton = () => {
  const [showComposeEmailPopup, setShowComposeEmailPopup] = useState(false);

    const handleClick = () => {
        setShowComposeEmailPopup(true);
    }
  return (
    <>
      <button onClick={handleClick}>New Email</button>
      {showComposeEmailPopup ? <p>new email</p> : null}
    </>
  );
};
