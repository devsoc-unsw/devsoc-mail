import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { Email } from "../components/Email/Email";
import "./MailPage.css";

const MailPage = () => {
  return (
    <>
      <img src={Logo} className="devsoc-logo"></img>
      <div className="search-bar">
        <Input text="Search" />
      </div>
      <div className="email">
        <Email
          subject="Dummy"
          date="26 Jan 2025, 17:12"
          from="admin@devsoc.mail"
          to={["me@devsoc.mail", "you@devsoc.mail"]}
          body="Lorem ipsum odor amet... "
          page="/view"
        ></Email>
      </div>
    </>
  );
};

export { MailPage };
