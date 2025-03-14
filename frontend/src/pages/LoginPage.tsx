import Logo from "../assets/Logo.png";
import { Input } from "../components/Input/Input";
import { AuthButton } from "../components/AuthButton/AuthButton";

const LoginPage = () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center min-h-screen p-4 bg-white">
      <img src={Logo} className="mb-15"></img>
      <form
        id="login-box"
        className="w-full flex flex-col justify-center p-8 bg-white border-3 border-black rounded-lg shadow-md"
      >
        <h2 className="text-4xl font-semibold text-center mb-4">Login</h2>
        <Input text="Email" />
        <Input text="Password" />
        <a className="text-sm text-black-600 underline text-left mt-2">
          Forgot password?
        </a>
        <AuthButton to="/mail" text="Login" />
        <p className="text-left">
          Don’t have an account? <span className="underline">Register</span>
        </p>
      </form>
    </div>
  );
};

export { LoginPage };
