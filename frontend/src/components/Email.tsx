import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { PORT } from "../../../backend/config.json";
import axios from "axios";

interface EmailProps {
  id: number;
  subject: string;
  date: string;
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
      setRead(true);
      console.log("Mail read!");
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className={
      twMerge("flex gap-2.5 bg-white items-center border border-black cursor-pointer",
        read ? "bg-gray-300" : ""
      )
    }>
      <Checkbox
        checked={props.selectedEmails.includes(props.id)}
        onChange={() => selectEmail(props.id)}
      />
      <button
        onClick={() => {
          navigate(props.page);
          handleRead();
        }}
        className="border-0 text-center flex gap-2 w-full cursor-pointer"
      >
        <p className="font-bold">{props.from}</p>
        <p className="font-bold">{props.subject}</p>
        <p>{props.body}</p>
        <div className="flex justify-end w-40/100">
          <div></div>
          <p className="text-right">{props.date}</p>
        </div>
      </button>
    </div>
  );
};

export { Email };
