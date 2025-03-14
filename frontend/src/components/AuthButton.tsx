import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface AuthButtonProps {
  to?: string; // navigates to route specified when the button is clicked
  text?: string; // text to display on the button
  className?: string;
}

const AuthButton = (props: AuthButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(props.to || "");
        }}
        className={twMerge(
          "text-white font-semibold border-2 border-black bg-[#D9807E] rounded-lg h-[50px] mt-4 mb-4 hover:shadow-lg cursor-pointer",
          props.className
        )}
      >
        {props.text}
      </button>
    </>
  );
};

export { AuthButton };
