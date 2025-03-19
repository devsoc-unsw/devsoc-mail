import Logo from "../assets/Logo.png";
import { Input } from "../components/Input/Input";
import { AuthButton } from "../components/AuthButton/AuthButton";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <img src={Logo}></img>
      <form id="login-box">
        <h2>Register</h2>
        <Input text="Email" />
        <Input text="Password" />
        <Input text="Confirm password" />
        <AuthButton to="/mail">Register</AuthButton>
        <p>
          Already got an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </>
  );
};

export { RegisterPage };
