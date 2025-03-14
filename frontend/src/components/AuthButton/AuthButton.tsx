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
        className="text-white font-semibold border-2 border-black bg-[#D9807E] rounded-lg h-1/6 mt-4 mb-4 hover:shadow-lg cursor-pointer"
      >
        MODIFY ME
      </button>
    </>
  );
};

export { AuthButton };
