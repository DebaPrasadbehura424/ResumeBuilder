// Button.tsx
interface ButtonProps {
  /**
   * @default "lg"
   */
  size?: "sm" | "md" | "lg" | "xl";

  /**
   * @default "primary"
   */
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "success"
    | "warning";

  /**
   * @default "rounded"
   */
  shape?: "rounded" | "pill" | "square";

  className?: string;

  text: string;

  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  disabled?: boolean;

  fullWidth?: boolean;

  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  size = "lg",
  variant = "primary",
  shape = "rounded",
  className = "",
  text,
  onClick,
  disabled = false,
  fullWidth = false,
  ...rest
}) => {
  const baseStyles = `
    inline-flex items-center justify-center 
    font-medium transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-60 disabled:cursor-not-allowed 
    active:scale-98
  `;

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-2.5 text-base rounded-xl",
    lg: "px-8 py-4 text-lg font-semibold rounded-xl",
    xl: "px-10 py-5 text-xl font-bold rounded-2xl",
  };

  // Shape variants
  const shapeStyles = {
    rounded: "rounded-xl",
    pill: "rounded-full",
    square: "rounded-none",
  };

  // Variant styles (beautiful & modern)
  const variantStyles = {
    primary: `
      bg-indigo-600 text-white 
      hover:bg-indigo-700 active:bg-indigo-800 
      shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50
      focus:ring-indigo-500
    `,
    secondary: `
      border-2 border-gray-300 text-gray-900 
      hover:bg-gray-50 hover:border-gray-400 
      active:bg-gray-100 
      focus:ring-gray-400
    `,
    ghost: `
      bg-transparent text-gray-800 hover:bg-gray-100 hover:text-gray-900 
      active:bg-gray-200 
      focus:ring-gray-300
    `,
    danger: `
      bg-red-600 text-white 
      hover:bg-red-700 active:bg-red-800 
      shadow-md shadow-red-200/50 hover:shadow-lg hover:shadow-red-300/50
      focus:ring-red-500
    `,
    success: `
      bg-emerald-600 text-white 
      hover:bg-emerald-700 active:bg-emerald-800 
      shadow-md shadow-emerald-200/50 hover:shadow-lg hover:shadow-emerald-300/50
      focus:ring-emerald-500
    `,
    warning: `
      bg-amber-500 text-white 
      hover:bg-amber-600 active:bg-amber-700 
      shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-300/50
      focus:ring-amber-500
    `,
  };

  const buttonClasses = [
    baseStyles,
    sizeStyles[size],
    shapeStyles[shape],
    variantStyles[variant] || variantStyles.primary,
    fullWidth ? "w-full" : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
};
