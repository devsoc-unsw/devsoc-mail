import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import styles from "./NewEmail.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

type NewEmailProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

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
        <div className={styles.grid}>
          <strong>From:&nbsp;</strong>
          <p>placeholder@devsoc.mail</p>
        </div>
        <div className={styles.grid}>
          <strong>To:&nbsp;</strong>
          <Input />
        </div>
        <div className={styles.grid}>
          <strong>Subject:&nbsp;</strong>
          <Input />
        </div>
        <textarea className={styles.content} rows={11}></textarea>
        <Button text="Send email" />
      </Dialog>
    </>
  );
};

export { NewEmail };
