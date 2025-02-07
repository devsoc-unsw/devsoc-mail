/* TODO: use props to customize the text button */
import { useNavigate } from "react-router-dom";

interface AuthButtonProps {
  to: string;
}

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
