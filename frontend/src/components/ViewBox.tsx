import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface ViewBoxProps {
  subject: string;
  date: string; // change this into Date object once database is implemented
  from: string;
  to: string[];
  body: string;
}

const ViewBox = (props: ViewBoxProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div>
          <button onClick={() => navigate("/mail")}>
            <ArrowBackIosRoundedIcon />
          </button>
          <h2>{props.subject}</h2>
        </div>
        <p>{props.date}</p>
      </div>

      <div>
        <strong>From:&nbsp;</strong>
        <p>{props.from}</p>
      </div>
      <div>
        <strong>To:&nbsp;</strong>
        <p>{props.to.join(", ")}</p>
      </div>

      <div>{props.body}</div>
    </div>
  );
};

export { ViewBox };
