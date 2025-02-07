import { useNavigate } from "react-router-dom";
import styles from "./Email.module.css";

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
    <button
      onClick={() => {
        navigate(props.page);
      }}
    >
      <div className={styles.emailBox}>
        <p className={styles.emailFrom}>{props.from}</p>
        <p className={styles.emailSubject}>{props.subject}</p>
        <p>{props.body}</p>
        <p>{props.date}</p>
      </div>
    </button>
  );
};

export { Email };
