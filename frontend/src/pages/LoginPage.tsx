import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";

const LoginPage = () => {
  return (
    <div>
      <img src={Logo} />
      <form>
        <h2>Login</h2>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <a>Forgot password?</a>
        <AuthButton to="/mail" text="Login" />
        <p>
          Don't have an account? <span>Register</span>
        </p>
      </form>
    </div>
  );
};

export { LoginPage };
