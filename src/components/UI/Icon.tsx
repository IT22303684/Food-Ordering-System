import React from "react";

interface IconProps {
  name: string;
  size?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = "24px", className = "" }) => {
  return (
    <i className={`material-icons text-gray-600 ${className}`} style={{ fontSize: size }}>
      {name}
    </i>
  );
};