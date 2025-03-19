import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthButtonProps {
  to: string;
  children: React.ReactNode;
}

const AuthButton = ({ to, children }: AuthButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(to);
        }}
      >
        {children}
      </button>
    </>
  );
};

export { AuthButton };
