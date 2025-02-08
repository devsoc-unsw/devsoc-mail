import { useNavigate } from "react-router-dom";
import styles from "./Email.module.css";
import { Checkbox } from "@mui/material";

interface EmailProps {
  subject: string;
  date: string;
  from: string;
  to: string[];
  body: string;
  page: string;
}

const Email = (props: EmailProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.emailBox}>
      <Checkbox></Checkbox>
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
