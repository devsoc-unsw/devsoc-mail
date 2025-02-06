import { useNavigate } from "react-router-dom";
import "./Email.css"

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
      <div className="email-box">
        <p className="email-from">{props.from}</p>
        <p className="email-subject">{props.subject}</p> 
        <p>{props.body}</p>
        <p>{props.date}</p>
      </div>
    </button>
  );
};

export { Email };

