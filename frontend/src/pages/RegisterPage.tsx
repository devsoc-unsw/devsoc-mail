import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
import { AuthButton } from "../components/AuthButton";

/*
  Workshop 4 exercise 1:
  - Style the RegisterPage component to match the mockup
  - Use the Input component for the input fields
  - Use the AuthButton component for the register button
  - Input and AuthButton components already has some styles applied, you can add more if needed
  - Feel free to reorganize the html structure
*/

const RegisterPage = () => {
  return (
    <div>
      <img src={Logo} />
      <form>
        <h2>Register</h2>
        <a>Forgot password?</a>
        <p>
          Already have an account? <span>Login</span>
        </p>
      </form>
    </div>
  );
};

export { RegisterPage };
