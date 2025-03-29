import React from "react";

interface IconProps {
  name: string;
  size?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = "24px" }) => {
  return (
    <i className={`text-gray-500 material-icons`} style={{ fontSize: size }}>
      {name}
    </i>
  );
};

export default Icon;
