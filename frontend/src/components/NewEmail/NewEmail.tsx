import Dialog from "@mui/material/Dialog";
import React from "react";
import styles from "./NewEmail.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

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

        {/* This part seem to be repeated a lot, huh? Let's make a reusable component!
            Put the component inside components folder
        */}
        <div className={styles.grid}>
          <strong>From:&nbsp;</strong>
          <p>placeholder@devsoc.mail</p>
        </div>
        <div className={styles.grid}>
          <strong>To:&nbsp;</strong>
          <Input />
        </div>
        <div className={styles.grid}>
          <strong>
            Subject:&nbsp; <p id="mail-subject">No Subject</p>
          </strong>
          <Input />
        </div>

        <textarea className={styles.content} rows={11}></textarea>
        <Button text="Send email" />
      </Dialog>
    </>
  );
};

export { NewEmail };
