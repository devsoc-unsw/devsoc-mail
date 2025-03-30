import Logo from "../../assets/Logo.png";
import styles from "./MailPage.module.css";
import { Composebutton } from "../../components/ComposeButton";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Workshop 2: Routes exercise
 *
 * How do we do routing??
 *
 * 1. Run `npm install react-router-dom`
 * 2. Go to main.tsx file and check if app component is wrapped with BrowseRouter
 * 3. Go to App.tsx file and add route. (instructions are there)
 * 4. Go to Email.tsx and import useNavigate from react-router-dom. 
 * 5. Add an email to MailPage.tsx and make it navigate to the ViewPage when clicked.
 * 6. Add navigate logic to the logout button
 */

const MailPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      alert("User does not have access. Please log in.");
      navigate("/");
    }
  }, []);

  return (
    <>
      <IconButton
        // Step 6: Add logic to make this button navigate to logout screen.
      >
        <LogoutIcon></LogoutIcon>
      </IconButton>
      

      <button>Delete All</button>
      <Composebutton />
       
       {/* Step 5: Add an email here!!! */}
      
      <img src={Logo} className={styles.devsocLogo}></img>
    </>
  );
};

export { MailPage };


