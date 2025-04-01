import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const [_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_password, setConfirmPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState("");
  const checkPassword = () => {
    const len = password.length;
    const nums = password.match(/\d/g) || [];
    if (len < 8) {
      setPasswordScore("Poor");
    } else if (len >= 8 && len <= 12) {
      setPasswordScore("Good");
    } else if (len >= 12 && nums.length >= 2) {
      setPasswordScore("Great");
    }
  };

  useEffect(() => {
    checkPassword();
  }, [password]);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white flex flex-col">
      <img src={Logo} className="mb-15 self-center"></img>
      <form
        id="login-box"
        className="min-w-full flex flex-col justify-center p-8 bg-white border-3 border-black rounded-lg shadow-md"
      >
        <h2 className="text-4xl font-semibold text-center mb-4">Register</h2>
        <Input
          placeholder="Email"
          setter={setEmail}
          className="border-2 border-black"
        />
        <Input
          placeholder="Password"
          setter={setPassword}
          onChange={checkPassword}
          className="border-2 border-black mt-2"
        />
        <Input
          placeholder="Confirm Password"
          setter={setConfirmPassword}
          className="border-2 border-black mt-2"
        />
        {password && <p>{passwordScore}</p>}
        <AuthButton to="/mail" text="Register" />
        <p className="text-left">
          Already got an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </div>
  );
};
export { RegisterPage };
