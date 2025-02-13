import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}
export const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) => {
  return <button onClick={onClick} className={`${variant === "primary" ? "bg-gradient-to-r from-red-500 to-orange-500  text-white" : "bg-white hover:bg-gray-50 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent border border-orange-600"} px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer ${className}`}>
      {children}
    </button>;
};