import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import styles from "./NewEmail.module.css";

const NewEmail = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleClickOpen}>Trigger</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className="flex">
            <h2>Placeholder title</h2>
            <button>Discard email</button>
          </div>
          <div className="user mail-padding">
            <strong>From:&nbsp;</strong>
            <p>Me</p>
          </div>
          <div className="user mail-padding">
            <strong>To:&nbsp;</strong>
            <p>Me</p>
          </div>
          <div className="flex">
            <strong>Subject:&nbsp;</strong>
            <p>I'm a potato</p>
          </div>
        </DialogTitle>
        <DialogContent>I'm a content</DialogContent>
      </Dialog>
    </>
  );
};

export { NewEmail };
