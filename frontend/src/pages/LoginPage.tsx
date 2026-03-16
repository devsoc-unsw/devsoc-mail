import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const userDataObject = localStorage.getItem("userData");
  //   if (userDataObject != null) {
  //     alert("User is already logged in.");
  //   }
  // }, []);

  return (
    // 1st step is to containerize evt
    <main className="max-w-3xl mx-auto flex flex-col items-center min-h-screen p-4 bg-white">
      <img src={Logo} />
      <form className="flex flex-col justify-center border-black border-3 rounded-2xl p-8 mt-10 w-full">
        <h2 className="text-4xl font-semibold text-center mb-4">Login</h2>
        <Input className="border-3 border-black rounded-2xl "placeholder="Email" setter={setEmail} />
        <Input className="border-3 border-black rounded-2xl mt-2"placeholder="Password" setter={setPassword} />
        <a className="text-sm text-black-600 underline text-left mt-2">Forgot password?</a>
        <AuthButton to="/mail" text="Login" />
        <p>
          Don't have an account? <span className="text-sm text-black-600 underline text-left mt-2">Register</span>
        </p>
      </form>
    </main>
  );
};

export { LoginPage };
