import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface ViewBoxProps {
  subject: string;
  date: string; // change this into Date object once database is implemented
  from: string;
  to: string[];
  body: string;
}

/*
  Workshop 4 exercise 2:
  - Style the ViewBox component to match the mockup
  - You won't need any new components for this exercise, just focus on applying tailwind classes
  - Feel free to reorganize the html structure
*/

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
