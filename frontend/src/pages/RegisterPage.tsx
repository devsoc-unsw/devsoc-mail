import Logo from '../assets/Logo.png';
import { Input } from '../components/Input/Input';
import { AuthButton } from '../components/AuthButton/AuthButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RegisterPage = () => {
  const [_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_password, setConfirmPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState('');
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

  return (
    <>
      <img src={Logo}></img>
      <form id="login-box">
        <h2>Register</h2>
        <Input text="Email" setter={setEmail} />
        {/* note onChange for task 6 solution */}
        <Input text="Password" setter={setPassword} onChange={checkPassword} />
        <Input text="Confirm password" setter={setConfirmPassword} />
        {password && <p>{passwordScore}</p>}
        <AuthButton to="/mail">Register</AuthButton>
        <p>
          Already got an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </>
  );
};

export { RegisterPage };
