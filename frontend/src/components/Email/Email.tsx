/**
 * Week 2 exercise
 * 
 * Make an email component here
 */

import { useNavigate } from "react-router-dom";
import styles from "./Email.module.css";
<<<<<<< Updated upstream
import { Checkbox } from "@mui/material";
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    const navigate = useNavigate();
  
    return (
      <div className={styles.emailBox}>
        <Checkbox
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

=======
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
        <p>{props.body}</p>
        <p>{props.date}</p>
      </button>
    </div>
  );
};

export { Email };
>>>>>>> Stashed changes
