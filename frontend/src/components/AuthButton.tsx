import { useNavigate } from "react-router-dom";

interface AuthButtonProps {
  to: string; // navigates to route specified when the button is clicked
  text: string; // text to display on the button
}

const AuthButton = ({ to, text }: AuthButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(to);
        }}
        className="text-white font-semibold border-2 border-black bg-[#D9807E] rounded-lg h-[50px] mt-4 mb-4 hover:shadow-lg cursor-pointer"
      >
        {text}
      </button>
    </>
  );
};

export { AuthButton };
