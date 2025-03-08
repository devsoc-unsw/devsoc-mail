import Logo from "../../assets/Logo.png";
import styles from "./MailPage.module.css";
import { Composebutton } from "../../components/ComposeButton";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const MailPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        onClick={() => {
          navigate("/");
        }}
      >
        <LogoutIcon></LogoutIcon>
      </IconButton>
      <button>Delete All</button>
      <Composebutton />
      <img src={Logo} className={styles.devsocLogo}></img>
      
    </>
  );
};

export { MailPage };
