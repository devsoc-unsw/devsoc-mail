import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { Email } from "../components/Email";
import { ComposeButton } from "../components/ComposeButton";
import { useNavigate } from "react-router-dom";
import { useState, MouseEvent, useEffect } from "react";
import { Button } from "../components/Button";
import { PORT } from "../../../backend/config.json";
import { Mail } from "../../../shared/constants/types";
import axios from "axios";

const MailPage = () => {
  const navigate = useNavigate();
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [emails, setEmails] = useState<Mail[]>([]);
  const [currEmail, setCurrEmail] = useState("");
  
  // DEMO
  const handleLogout = async(event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

  }
  
  // EXAMPLE
  const handleDelete = async() => {
    try {
      const email = currEmail;
      await axios.delete(
        `http://localhost:${PORT}/mail/delete`,
        { 
          params: { mailIds: selectedEmails, email: email },
          headers: {
          "session": localStorage.getItem("sessionId") // Add the session ID to the request headers
          }
        }
      );
      loadAllMails();
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * Route: /mail/view
   * const email = JSON.parse(localStorage.getItem("userData") as string).email;
   *  params: { email },
      headers: {
          "session": localStorage.getItem("sessionId")
      }
   * 
   */
  const loadAllMails = async() => {
    
  }


  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      alert("Session is invalid. Please log in again.");
      navigate('/');
    }

    loadAllMails();
    setCurrEmail(JSON.parse(localStorage.getItem("userData") as string).email);
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-4 bg-white flex flex-col">
      <nav className="flex justify-between items-center">
        <img src={Logo} className="h-10"></img>
        <Input
          placeholder="Search"
          className="w-1/2 border-2 border-black"
          setter={setSearchTerm}
        />
        <Button
          onClick={(e) => handleLogout(e)}
          className="bg-[#D9807E] border-2 border-black p-2 rounded"
        >
          Logout
        </Button>
      </nav>

      <div className="border-black border-3 rounded-lg mt-4">
        <div className="mt-4 mb-4 flex justify-between px-4">
          <Button
            className="cursor-pointer text-white bg-[#D34B48] border-2 border-black p-2 rounded"
            onClick={handleDelete}
          >
            Delete All
          </Button>
          <ComposeButton className="bg-[#5DAB61] border-2 border-black p-2 rounded" />
        </div>
        <div className="flex flex-col gap-4">
          {emails.map((email) => (
            <Email
              id={email.mailId}
              subject={email.title}
              date={email.timeSent}
              from={email.sender}
              to={email.receivers}
              body={email.message}
              page=""
              setSelectedEmails={setSelectedEmails}
              selectedEmails={selectedEmails}
              isRead={email.readBy.includes(currEmail)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export { MailPage };
