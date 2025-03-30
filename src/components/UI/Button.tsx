import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-bold text-white shadow-md transition-transform transform hover:scale-105";
  const variantStyles = variant === "primary"
    ? "bg-orange-500 hover:bg-orange-600"
    : "bg-gray-300 hover:bg-gray-400 text-gray-700";

  return (
    <button className={cn(baseStyles, variantStyles, className)} {...props}>
      {children}
    </button>
  );
};