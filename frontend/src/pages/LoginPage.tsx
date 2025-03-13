import Logo from "../assets/Logo.png";
import { Input } from "../components/Input/Input";
import { AuthButton } from "../components/AuthButton/AuthButton";

const LoginPage = () => {
  return (
    <div className="max-w-wd flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <img src={Logo} className="mb-4"></img>
      <form id="login-box" className="max-w-wd p-6 bg-white border border-black-300 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <Input text="Email" />
        <Input text="Password" />
        <a className="text-sm text-black-600 hover:underline">Forgot password?</a>
        <AuthButton to="/mail" />
        <p>Don’t have an account? Register</p>
      </form>
    </div>
  );
};

export { LoginPage };
