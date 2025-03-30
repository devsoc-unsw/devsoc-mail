import Logo from '../assets/Logo.png';
import { Input } from '../components/Input/Input';
import { AuthButton } from '../components/AuthButton/AuthButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const userDataObject = localStorage.getItem('userData');
    if (userDataObject != null) {
      alert('User is already logged in.');
    }
  }, []);
  return (
    <>
      <img src={Logo}></img>
      <form id="login-box">
        <h2>Login</h2>
        <Input text="Email" setter={setEmail} />
        {email && <p>The email entered is {email}.</p>}
        <Input text="Password" setter={setPassword} />
        <a>Forgot password?</a>
        <AuthButton
          onClick={() => {
            const data = {
              email,
              password,
              loginTime: new Date(),
            };
            const dataString = JSON.stringify(data);
            localStorage.setItem('userData', dataString);
          }}
          to="/mail"
        >
          Log in
        </AuthButton>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </>
  );
};

export { LoginPage };
