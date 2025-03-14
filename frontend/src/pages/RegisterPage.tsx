import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";

const RegisterPage = () => {
  return (
    <div>
      <img src={Logo} />
      <form>
        <h2>Register</h2>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Input placeholder="Confirm Password" />
        <a>Forgot password?</a>
        <AuthButton to="/mail" text="Register" />
        <p>
          Already have an account? <span>Login</span>
        </p>
      </form>
    </div>
  );
};

export { RegisterPage };
