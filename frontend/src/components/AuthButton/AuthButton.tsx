import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthButtonProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const AuthButton = ({ to, children, onClick }: AuthButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          if (onClick) onClick();
          navigate(to);
        }}
      >
        {children}
      </button>
    </>
  );
};

export { AuthButton };
