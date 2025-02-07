import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import styles from "./ViewBox.module.css";

export type ViewBoxProps = {
  subject: string;
  date: string; // change this into Date object once database is implemented
  from: string;
  to: string[];
  body: string;
};

const ViewBox = (props: ViewBoxProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div id={styles.mailBox}>
        <div id={styles.mailHeader}>
          <div className="header-left">
            <button onClick={() => navigate("/mail")}>
              <ArrowBackIosRoundedIcon />
            </button>
            <strong>{props.subject}</strong>
          </div>
          <p>{props.date}</p>
        </div>
        <div id={styles.mailUser}>
          <div className={styles.user}>
            <strong>From:&nbsp;</strong>
            <p>{props.from}</p>
          </div>
          <div className={styles.user}>
            <strong>To:&nbsp;</strong>
            <p>{props.to.join(", ")}</p>
          </div>
        </div>
        <div id={styles.mailBody}>{props.body}</div>
      </div>
    </>
  );
};

export { ViewBox };
