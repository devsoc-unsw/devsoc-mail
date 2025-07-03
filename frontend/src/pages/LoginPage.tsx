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

  return (
    <main>
      <form>
        <img src={Logo} />
        <h2>Login</h2>
        <Input placeholder="Email" setter={setEmail} />
        <Input placeholder="Password" setter={setPassword} />
        <a>Forgot password?</a>
        <AuthButton to="/mail" text="Login" />
        <p>
          Don't have an account? <span>Register</span>
        </p>
      </form>
    </main>
  );
};

export { LoginPage };
