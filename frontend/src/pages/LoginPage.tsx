import Logo from "../assets/Logo.png";
import { Input } from "../components/Input/Input";
import { AuthButton } from "../components/AuthButton/AuthButton";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <img src={Logo}></img>
      <form id="login-box">
        <h2>Login</h2>
        <Input text="Email" />
        <Input text="Password" />
        <a>Forgot password?</a>
        <AuthButton to="/mail">Log in</AuthButton>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </>
  );
};

export { LoginPage };
