import Dialog from "@mui/material/Dialog";
import React, { useState, MouseEvent, useEffect } from "react";
import { Input } from "./Input";
import { PORT } from "../../../backend/config.json";
import axios from "axios";

interface NewEmailProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewEmail = (props: NewEmailProps) => {
  const [to, setTo] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const handleClose = () => {
    props.setOpen(false);
  };

  // EXAMPLE
  const handleSend = async(event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://localhost:${PORT}/mail/send`,
        { receivers: to, title: subject, message: message },
        { headers: {
          "session": localStorage.getItem("sessionId") // Add the session ID to the request headers
          }
        }
      );
      handleClose();
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUser(JSON.parse(data).email);
    } else {
      setUser("Error occured. Email not found!");
    }
  }, []);

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} fullWidth={true}>
        <header className="flex justify-between items-center px-6 py-3 bg-[#D9807E] text-white">
          <h2 className="text-2xl font-normal">New Email</h2>
          <button
            onClick={handleClose}
            className="bg-[#D34B48] text-white px-4 py-1.5 rounded-lg border-2 border-black cursor-pointer"
          >
            Discard email
          </button>
        </header>

        <div className="flex h-12 px-6 border-b border-black items-center py-1">
          <strong className="w-20">From:</strong>
          <p>{user}</p>
        </div>
        <div className="flex h-12 px-6 border-b border-black items-center py-1">
          <strong className="w-20">To:</strong>
          <Input className="flex-1" placeholder="To" setter={setTo} multipleStr={true}/>
        </div>
        <div className="flex h-12 px-6 border-b border-black items-center py-1">
          <strong className="w-20">Subject:</strong>
          <Input className="flex-1" placeholder="Subject" setter={setSubject} />
        </div>

        <textarea
          className="m-6 p-3 w-[calc(100%-3rem)] h-64 border border-black rounded-lg resize-none"
          placeholder="Write your message here..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="px-6 pb-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            onClick={handleSend}>
            Send Email
          </button>
        </div>
      </Dialog>
    </>
  );
};

export { NewEmail };
