import React from 'react';

interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const AuthButton = ({ children, onClick }: AuthButtonProps) => {
  return (
    <>
      <button
        onClick={() => {
          if (onClick) onClick();
        }}
        type="submit"
      >
        {children}
      </button>
    </>
  );
};

export { AuthButton };
