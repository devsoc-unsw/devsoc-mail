import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";

const LoginPage = () => {
  return (
    <>
      <img src={Logo}></img>
      <form id="login-box">
        <h2>Login</h2>
        <Input text="Email" />
        <Input text="Password" />
        <a>Forgot password?</a>
        <AuthButton />
        <p>Don’t have an account? Register</p>
      </form>
    </>
  );
};

export { LoginPage };
