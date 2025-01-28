import "./ViewBox.css";

type ViewBoxProps = {
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
        <div id="mail-header">
          <div className="header-left">
            <button>&lt;</button>
            <p>{props.subject}</p>
          </div>
          <p>{props.date}</p>
        </div>
        <div id="mail-users">
          <div className="user">
            <p>From:</p>
            <p>{props.from}</p>
          </div>
          <div className="user">
            <p>To:</p>
            <p>{props.to.join(", ")}</p>
          </div>
        </div>
        <div id="mail-body">{props.body}</div>
      </div>
    </>
  );
};

export { ViewBox };
