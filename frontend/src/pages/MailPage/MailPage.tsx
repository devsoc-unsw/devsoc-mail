import Logo from "../../assets/Logo.png";
import { Input } from "../../components/Input/Input";
import { Email } from "../../components/Email/Email";
import styles from "./MailPage.module.css";
import { Composebutton } from "../../components/ComposeButton";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button"

const MailPage = () => {
  const navigate = useNavigate();
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

  const [emails, setEmails] = useState([
    {
      id: 1,
      subject: "Dummy",
      date: "26 Jan 2025, 17:12",
      from: "admin@devsoc.mail",
      to: ["me@devsoc.mail", "you@devsoc.mail"],
      body: "Lorem ipsum odor amet... ",
      page: "/view",
    },
    {
      id: 2,
      subject: "Dummy",
      date: "26 Jan 2025, 17:12",
      from: "admin@devsoc.mail",
      to: ["me@devsoc.mail", "you@devsoc.mail"],
      body: "Lorem ipsum odor amet... ",
      page: "/view",
    },
    {
      id: 3,
      subject: "Dummy",
      date: "26 Jan 2025, 17:12",
      from: "admin@devsoc.mail",
      to: ["me@devsoc.mail", "you@devsoc.mail"],
      body: "Lorem ipsum odor amet... ",
      page: "/view",
    },
  ]);

  const deleteEmails = () => {
    console.log("delete");
    const updatedEmails = emails.filter(
      (email) => !selectedEmails.includes(email.id)
    );

    setEmails(updatedEmails);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          navigate("/");
        }}
      >
        <LogoutIcon></LogoutIcon>
      </IconButton>

      <div className="h-[40vw] w-[50vw] border-black border-3 rounded-lg">
        <div className={styles.searchBar}>
          <Input text="Search" />
        </div>
        <div className="mt-4 mb-4">
          <Button className="cursor-pointer bg-[#D34B48] border-2 border-black p-2" onClick={deleteEmails}>Delete All</Button>
          <Composebutton />
          <img src={Logo} className={styles.devsocLogo}></img>
        </div>
        <div className="email">
          {emails.map((email) => (
            <Email
              id={email.id}
              subject={email.subject}
              date={email.date}
              from={email.from}
              to={email.to}
              body={email.body}
              page={email.page}
              setSelectedEmails={setSelectedEmails}
              selectedEmails={selectedEmails}
            ></Email>
          ))}
        </div>
      </div>
      
    </>
  );
};

export { MailPage };
