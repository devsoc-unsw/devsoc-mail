import Logo from "../../assets/Logo.png";
// import { Email } from "../../components/Email/Email";
import styles from "./MailPage.module.css";
import { Composebutton } from "../../components/ComposeButton";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const MailPage = () => {
  const navigate = useNavigate();
//   const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

//   const [emails, setEmails] = useState([
//     {
//       id: 1,
//       subject: "Dummy",
//       date: "26 Jan 2025, 17:12",
//       from: "admin@devsoc.mail",
//       to: ["me@devsoc.mail", "you@devsoc.mail"],
//       body: "Lorem ipsum odor amet... ",
//       page: "/view",
//     },
//     {
//       id: 2,
//       subject: "Dummy",
//       date: "26 Jan 2025, 17:12",
//       from: "admin@devsoc.mail",
//       to: ["me@devsoc.mail", "you@devsoc.mail"],
//       body: "Lorem ipsum odor amet... ",
//       page: "/view",
//     },
//     {
//       id: 3,
//       subject: "Dummy",
//       date: "26 Jan 2025, 17:12",
//       from: "admin@devsoc.mail",
//       to: ["me@devsoc.mail", "you@devsoc.mail"],
//       body: "Lorem ipsum odor amet... ",
//       page: "/view",
//     },
//   ]);

//   const deleteEmails = () => {
//     console.log("delete");
//     const updatedEmails = emails.filter(
//       (email) => !selectedEmails.includes(email.id)
//     );

//     setEmails(updatedEmails);
//   };

  return (
    <>
      <IconButton
        onClick={() => {
          navigate("/");
        }}
      >
        <LogoutIcon></LogoutIcon>
      </IconButton>
      <button>Delete All</button>
      <Composebutton />
      <img src={Logo} className={styles.devsocLogo}></img>
      
    </>
  );
};

export { MailPage };
