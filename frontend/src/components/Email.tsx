import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";

interface EmailProps {
  id: number;
  subject: string;
  date: string;
  from: string;
  to: string[];
  body: string;
  page: string;
  setSelectedEmails: React.Dispatch<React.SetStateAction<number[]>>;
  selectedEmails: number[];
}

const Email = (props: EmailProps) => {
  const navigate = useNavigate();

  // when checkbox selected, email id added to an array of email ids to be deleted
  // when checkbox unselected, remove this email id from the array
  const selectEmail = (emailId: number) => {
    props.setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  return (
    <div className="flex gap-2.5 bg-white items-center border border-black">
      <Checkbox
        checked={props.selectedEmails.includes(props.id)}
        onChange={() => selectEmail(props.id)}
      />
      <button
        onClick={() => {
          navigate(props.page);
        }}
        className="bg-white border-0 text-center flex gap-2 w-full"
      >
        <p className="font-bold">{props.from}</p>
        <p className="font-bold">{props.subject}</p>
        <p>{props.body}</p>
        <div className="flex justify-end w-40/100">
          <div></div>
          <p className="text-right">{props.date}</p>
        </div>
      </button>
    </div>
  );
};

export { Email };
