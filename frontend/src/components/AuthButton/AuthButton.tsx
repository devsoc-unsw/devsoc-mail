import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthButtonProps {
  to: string; // navigates to route specified when the button is clicked
  text: string; // text to display on the button
}

/**
 * Workshop 2: Component Exercise
 *
 * The button currently only displays 'MODIFY ME' by default
 * We want it to display any String we pass in the component
 *
 * TODO: use props to customize the text button
 */
const AuthButton = ({ to, text }: AuthButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(to);
        }}
      >
        {text}
      </button>
    </>
  );
};

export { AuthButton };
