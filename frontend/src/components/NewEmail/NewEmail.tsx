import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import styles from "./NewEmail.module.css";
import { Input } from "../Input/Input";
import { DiscardButton } from "../DiscardButton/DiscardButton";

type NewEmailProps = {
  open: boolean;
};

const NewEmail = (props: NewEmailProps) => {
  const [open, setOpen] = useState(props.open);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} fullWidth={true}>
        <div className={styles.header}>
          <h2>New Email</h2>
          <DiscardButton />
        </div>
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
      </Dialog>
    </>
  );
};

export { NewEmail };
