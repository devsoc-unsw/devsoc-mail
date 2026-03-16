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
}

interface EmailCardProps {
  email: EmailProps;
  selectedEmails: number[];
  setSelectedEmails: React.Dispatch<React.SetStateAction<number[]>>;
}

const EmailCard = ({ email, selectedEmails, setSelectedEmails }: EmailCardProps) => {
  const navigate = useNavigate();
  const isSelected = selectedEmails.includes(email.id);

  const selectEmail = (emailId: number) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  return (
    <div
      className={`border border-black rounded-lg flex flex-col cursor-pointer ${
        isSelected ? "bg-red-50" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2.5 px-2 pt-1">
        <Checkbox
          checked={isSelected}
          onChange={() => selectEmail(email.id)}
          onClick={(e) => e.stopPropagation()}
          size="small"
        />
        <p className="text-xs text-gray-400">{email.date}</p>
      </div>

      <button
        onClick={() => navigate(email.page)}
        className="bg-transparent border-0 text-left flex flex-col gap-1 w-full px-4 pb-4"
      >
        <p className="font-bold text-sm truncate">{email.from}</p>
        <p className="font-bold text-sm truncate">{email.subject}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{email.body}</p>
        <p className="text-xs text-gray-400 truncate">
          To: {email.to.join(", ")}
        </p>
      </button>
    </div>
  );
};

export { EmailCard };