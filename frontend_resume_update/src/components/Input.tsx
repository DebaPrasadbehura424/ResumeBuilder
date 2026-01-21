import type React from "react";

interface InputProps {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  type?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  size = "md",
  className = "",
}) => {
  const base = "border outline-none rounded w-full transition";

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${base} ${sizes[size]} ${className}`}
    />
  );
};
