import { useNavigate } from "react-router-dom";
import styles from "./Email.module.css";
import { Checkbox } from "@mui/material";

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
}

const Email = (props: EmailProps) => {
    const navigate = useNavigate();
  
    // when checkbox selected, email id added to an array of email ids to be deleted
    // when checkbox unselected, remove this email id from the array
    const selectEmail = (emailId: number) => {
      props.setSelectedEmails((prev) =>
        prev.includes(emailId)
          ? prev.filter((id) => id !== emailId)
          : [...prev, emailId]
      );
    };
  
    return (
      <div className={styles.emailBox}>
        <Checkbox
          checked={props.selectedEmails.includes(props.id)}
          onChange={() => selectEmail(props.id)}
        />
        <button
          onClick={() => {
            navigate(props.page);
          }}
          className={styles.emailButton}
        >
          <p className={styles.emailFrom}>{props.from}</p>
          <p className={styles.emailSubject}>{props.subject}</p>
          <p>{props.body}</p>
          <p>{props.date}</p>
        </button>
      </div>
    );
  };
  

export { Email };
