interface CustomButtonProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  height?: string;
  onClick?: () => void;
  style?: string;
}

const CustomButton = ({
  title,
  bgColor = "bg-orange-600",
  textColor = "text-white",
  height = "44px",
  onClick,
  style = "",
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full ${bgColor} ${textColor} ${style} transition-all duration-300`}
      style={{ height }}
    >
      {title}
    </button>
  );
};

export default CustomButton;
