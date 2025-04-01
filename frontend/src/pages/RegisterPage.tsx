import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/*
  Workshop 4 exercise 1:
  - Style the RegisterPage component to match the mockup
  - Use the Input component for the input fields
  - Use the AuthButton component for the register button
  - Input and AuthButton components already has some styles applied, you can add more if needed
  - Feel free to reorganize the html structure
*/

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
    <div>
      <img src={Logo} />
      <form>
        <h2>Register</h2>
        <Input placeholder="Email" setter={setEmail} />
        <Input
          placeholder="Password"
          setter={setPassword}
          onChange={checkPassword}
        />
        <Input placeholder="Confirm Password" setter={setConfirmPassword} />
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
