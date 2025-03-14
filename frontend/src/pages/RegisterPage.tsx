import Logo from "../assets/Logo.png";
import { Input } from "../components/Input/Input";
import { AuthButton } from "../components/AuthButton/AuthButton";

const RegisterPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white flex flex-col">
      <img src={Logo} className="mb-15 self-center"></img>
      <form
        id="login-box"
        className="min-w-full flex flex-col justify-center p-8 bg-white border-3 border-black rounded-lg shadow-md"
      >
        <h2 className="text-4xl font-semibold text-center mb-4">Register</h2>
        <Input text="Name" />
        <Input text="Email" />
        <Input text="Password" />
        <Input text="Confirm Password" />
        <a className="text-sm text-black-600 underline text-left mt-2">
          Forgot password?
        </a>
        <AuthButton to="/mail" text="Register" />
        <p className="text-left">
          Don’t have an account? <span className="underline">Register</span>
        </p>
      </form>
    </div>
  );
};
export { RegisterPage };
