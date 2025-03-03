import { useNavigate } from "react-router-dom";

interface AuthButtonProps {
  to: string; // navigates to route specified when the button is clicked
}

/**
 * Workshop 2: Component Exercise
 *
 * The button currently only displays 'MODIFY ME' by default
 * We want it to display any String we pass in the component
 *
 * TODO: use props to customize the text button
 */
const AuthButton = ({ to }: AuthButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(to);
        }}
      >
        MODIFY ME
      </button>
    </>
  );
};

export { AuthButton };
