import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { PORT } from "../../../backend/config.json";
import axios from "axios";

interface EmailProps {
  id: number;
  subject: string;
  date: Date;
  from: string;
  to: string[];
  body: string;
  page: string;
  setSelectedEmails: React.Dispatch<React.SetStateAction<number[]>>;
  selectedEmails: number[];
  isRead: boolean;
}

const Email = (props: EmailProps) => {
  const navigate = useNavigate();
  const [read, setRead] = useState(props.isRead);

  // when checkbox selected, email id added to an array of email ids to be deleted
  // when checkbox unselected, remove this email id from the array
  const selectEmail = (emailId: number) => {
    props.setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const readEmail = async (id: number) => {
    try {
      const mailId = id;
      const res = await axios.get(`http://localhost:${PORT}/mail/${mailId}`, {
        headers: {
          session: localStorage.getItem("sessionId"),
        },
      });
      await handleRead();
      setRead(true);
      navigate("/view", { state: res.data });
    } catch (err) {
      console.log("mail cannot be found");
      console.log(err);
    }
  };

  const handleRead = async() => {
    try {
      await axios.put(
        `http://localhost:${PORT}/mail/read`,
        { mailId: props.id },
        {
          headers: {
          "session": localStorage.getItem("sessionId")
          }
        }
      );
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div
      className={twMerge(
        "flex gap-2.5 bg-white items-center border border-black cursor-pointer",
        read ? "bg-gray-300" : ""
      )}
    >
      <Checkbox
        checked={props.selectedEmails.includes(props.id)}
        onChange={() => selectEmail(props.id)}
      />
      <button
        onClick={() => {
          readEmail(props.id);
        }}
        className="border-0 text-center flex gap-2 w-full cursor-pointer"
      >
        <p className="font-bold">{props.from}</p>
        <p className="font-bold truncate">{props.subject}</p>
        <p className="truncate">{props.body}</p>
        <div className="flex justify-end w-40/100">
          <p className="text-right">{new Date(props.date).toLocaleDateString("en-AU")}</p>
        </div>
      </button>
    </div>
  );
};

export { Email };
