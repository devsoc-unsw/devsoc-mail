import Logo from "../../assets/Logo.png";
import { Input } from "../../components/Input/Input";
import { Email } from "../../components/Email/Email";
import styles from "./MailPage.module.css";
import { Composebutton } from "../../components/ComposeButton";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";


const MailPage = () => {
    const navigate = useNavigate();


  return (
    <>
    <IconButton onClick={() => {navigate("/")}}>
        <LogoutIcon></LogoutIcon>
    </IconButton>
      <button>Delete All</button>
      <Composebutton />
      <img src={Logo} className={styles.devsocLogo}></img>
      <div className={styles.searchBar}>
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
        />
        <Email
          subject="Dummy"
          date="26 Jan 2025, 17:12"
          from="admin@devsoc.mail"
          to={["me@devsoc.mail", "you@devsoc.mail"]}
          body="Lorem ipsum odor amet... "
          page="/view"
        ></Email>
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
