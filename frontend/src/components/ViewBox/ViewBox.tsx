import "./ViewBox.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

export type ViewBoxProps = {
  subject: string;
  date: string; // change this into Date object once database is implemented
  from: string;
  to: string[];
  body: string;
};

const ViewBox = (props: ViewBoxProps) => {
  return (
    <>
      <div id="mail-box">
        <div id="mail-header" className="bottom-border">
          <div className="header-left">
            <button>
              <ArrowBackIosRoundedIcon />
            </button>
            <strong>{props.subject}</strong>
          </div>
          <p>{props.date}</p>
        </div>
        <div id="mail-users">
          <div className="user bottom-border mail-padding">
            <strong>From:&nbsp;</strong>
            <p>{props.from}</p>
          </div>
          <div className="user bottom-border mail-padding">
            <strong>To:&nbsp;</strong>
            <p>{props.to.join(", ")}</p>
          </div>
        </div>
        <div id="mail-body" className="mail-padding">
          {props.body}
        </div>
      </div>
    </>
  );
};

export { ViewBox };
