import Logo from '../assets/Logo.png';
import { Input } from '../components/Input/Input';
import { AuthButton } from '../components/AuthButton/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { PORT } from "../../../backend/config.json"
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_password, setConfirmPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState('');

  const navigate = useNavigate();

  const checkPassword = () => {
    const len = password.length;
    const nums = password.match(/\d/g) || [];
    if (len < 8) {
      setPasswordScore('Poor');
    } else if (len >= 8 && len <= 12) {
      setPasswordScore('Good');
    } else if (len >= 12 && nums.length >= 2) {
      setPasswordScore('Great');
    }
  };

  // task 5 solution
  useEffect(() => {
    checkPassword();
  }, [password]);

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      alert("User is already logged in.");
      navigate("/mail");
    }
  }, []);

  const handleRegister = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(name, _email, _password)
      const response = await axios.post(
        `http://localhost:${PORT}/auth/register`,
        { name, email: _email, password: _password }
      );
      console.log("Registration successful:", response.data);
      localStorage.setItem("sessionId", response.data.sessionId);
      navigate('/mail');
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <img src={Logo}></img>
      <form id="login-box" onSubmit={handleRegister}>
        <h2>Register</h2>
        <Input text="Name" setter={setName} />
        <Input text="Email" setter={setEmail} />
        {/* note onChange for task 6 solution */}
        <Input text="Password" setter={setPassword} onChange={checkPassword} />
        <Input text="Confirm password" setter={setConfirmPassword} />
        {password && <p>{passwordScore}</p>}
        <AuthButton>Register</AuthButton>
        <p>
          Already got an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </>
  );
};

export { RegisterPage };
