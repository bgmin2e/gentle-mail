import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-sm p-1 cursor-pointer ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
