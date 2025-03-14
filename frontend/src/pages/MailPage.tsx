import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { Email } from "../components/Email";
import { ComposeButton } from "../components/ComposeButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/Button";

const MailPage = () => {
  const navigate = useNavigate();
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

  const [emails, setEmails] = useState([
    {
      id: 1,
      subject: "Dummy",
      date: "26 Jan 2025, 17:12",
      from: "admin@devsoc.mail",
      to: ["me@devsoc.mail", "you@devsoc.mail"],
      body: "Lorem ipsum odor amet... ",
      page: "/view",
    },
    {
      id: 2,
      subject: "Dummy",
      date: "26 Jan 2025, 17:12",
      from: "admin@devsoc.mail",
      to: ["me@devsoc.mail", "you@devsoc.mail"],
      body: "Lorem ipsum odor amet... ",
      page: "/view",
    },
    {
      id: 3,
      subject: "Dummy",
      date: "26 Jan 2025, 17:12",
      from: "admin@devsoc.mail",
      to: ["me@devsoc.mail", "you@devsoc.mail"],
      body: "Lorem ipsum odor amet... ",
      page: "/view",
    },
  ]);

  const deleteEmails = () => {
    console.log("delete");
    const updatedEmails = emails.filter(
      (email) => !selectedEmails.includes(email.id)
    );
    setEmails(updatedEmails);
  };

  return (
    <main>
      <nav>
        <img src={Logo} />
        <Input placeholder="Search" />
        <Button onClick={() => navigate("/")}>Logout</Button>
      </nav>

      <div>
        <div>
          <Button onClick={deleteEmails}>Delete All</Button>
          <ComposeButton />
        </div>
        <div>
          {emails.map((email) => (
            <Email
              key={email.id}
              id={email.id}
              subject={email.subject}
              date={email.date}
              from={email.from}
              to={email.to}
              body={email.body}
              page={email.page}
              setSelectedEmails={setSelectedEmails}
              selectedEmails={selectedEmails}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export { MailPage };
