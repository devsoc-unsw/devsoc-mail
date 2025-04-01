import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const userDataObject = localStorage.getItem("userData");
  //   if (userDataObject != null) {
  //     alert("User is already logged in.");
  //   }
  // }, []);
  
  return <div>nothing is here...</div>;
};

export { LoginPage };
