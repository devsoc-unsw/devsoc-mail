import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { PORT } from "../../../backend/config.json";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId !== undefined && sessionId !== null) {
      alert("User is already logged in.");
      navigate("/mail");
    }
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:${PORT}/auth/login`, {
        email: email,
        password: password,
      });

      const data = {
        email,
        loginTime: new Date(),
      };
      const dataString = JSON.stringify(data);
      localStorage.setItem("userData", dataString);

      localStorage.setItem("sessionId", response.data);
      navigate("/mail");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center min-h-screen p-4 bg-white">
      <img src={Logo} className="mb-15"></img>
      <form
        id="login-box"
        className="w-full flex flex-col justify-center p-8 bg-white border-3 border-black rounded-lg shadow-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-4xl font-semibold text-center mb-4">Login</h2>
        <Input
          placeholder="Email"
          className="border-2 border-black"
          setter={setEmail}
        />
        <Input
          placeholder="Password"
          className="border-2 border-black mt-2"
          setter={setPassword}
        />
        <a className="text-sm text-black-600 underline text-left mt-2">
          Forgot password?
        </a>
        <AuthButton text="Login" />
        <p className="text-left">
          Don’t have an account?{" "}
          <Link className="underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export { LoginPage };
