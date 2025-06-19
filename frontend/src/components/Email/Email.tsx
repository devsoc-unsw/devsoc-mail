/**
 * Week 2 exercise
 * 
 * Make an email component here
 */

import { useNavigate } from "react-router-dom";
import styles from "./Email.module.css";

interface EmailProps {
  id: number;
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
      <button
        onClick={() => {
          navigate(props.page);
        }}
        className={styles.emailButton}
      >
        <p className={styles.emailFrom}>{props.from}</p>
        <p className={styles.emailSubject}>{props.subject}</p>
        <p className={styles.emailBody}>{props.body}</p>
        <p className={styles.emailDate}>{props.date}</p>
      </button>
    </div>
  );
};

export { Email };
