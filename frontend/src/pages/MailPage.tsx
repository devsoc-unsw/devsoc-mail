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
    <main className="max-w-4xl mx-auto p-4 bg-white flex flex-col">
      <nav className="flex justify-between items-center">
        <img src={Logo} className="h-10"></img>
        <Input placeholder="Search" className="w-1/2 border-2 border-black" />
        <Button
          onClick={() => {
            navigate("/");
          }}
          className="bg-[#D9807E] border-2 border-black p-2 rounded"
        >
          Logout
        </Button>
      </nav>

      <div className="border-black border-3 rounded-lg mt-4">
        <div className="mt-4 mb-4 flex justify-between px-4">
          <Button
            className="cursor-pointer text-white bg-[#D34B48] border-2 border-black p-2 rounded"
            onClick={deleteEmails}
          >
            Delete All
          </Button>
          <ComposeButton className="bg-[#5DAB61] border-2 border-black p-2 rounded" />
        </div>
        <div className="flex flex-col gap-4">
          {emails.map((email) => (
            <Email
              id={email.id}
              subject={email.subject}
              date={email.date}
              from={email.from}
              to={email.to}
              body={email.body}
              page={email.page}
              setSelectedEmails={setSelectedEmails}
              selectedEmails={selectedEmails}
            ></Email>
          ))}
        </div>
      </div>
    </main>
  );
};

export { MailPage };
