import Dialog from "@mui/material/Dialog";
import React from "react";
import styles from "./NewEmail.module.css";
import { Button } from "../Button/Button";
import { EmailField } from "../EmailField/EmailField";

type NewEmailProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Workshop 2: Typescript + Component Exercise
 *
 * Notice line 35-46 seems to be repeating the same component three times.
 * Make a reusable component and replace/adjust the code as needed
 *
 * TODO: Make a reusable component for "From", "To", and "Subject"
 */
const NewEmail = (props: NewEmailProps) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} fullWidth={true}>
        <header className={styles.header}>
          <h2>New Email</h2>
          <Button text="Discard email" onClick={handleClose} />
        </header>

        {/* Reusable component from workshop 2 exercise */}
        <EmailField 
          label="From" 
          type="static" 
          value="placeholder@devsoc.mail" 
        />
        <EmailField 
          label="To" 
          type="input" 
        />
        <EmailField 
          label="Subject" 
          type="input" 
        />

        <textarea className={styles.content} rows={11}></textarea>
        <Button text="Send email" />
      </Dialog>
    </>
  );
};

export { NewEmail };
