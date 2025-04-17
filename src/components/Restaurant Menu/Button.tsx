import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition ${className}`}
  >
    {children}
  </button>
);

export default Button;
