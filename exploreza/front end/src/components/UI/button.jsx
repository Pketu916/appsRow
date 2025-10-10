const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) => {
  // Base styles
  let baseStyles =
    "font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed mt-0 ";

  // Size variants
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  // Color variants
  const variantStyles = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
    secondary:
      "bg-orange-100 hover:bg-orange-200 text-orange-800 focus:ring-orange-500",
    outline:
      "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500",
    ghost: "text-orange-500 hover:bg-orange-100 focus:ring-orange-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500",
    info: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    dark: "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-500",
  };

  // Disabled styles
  const disabledStyles = "bg-gray-400 text-gray-700 cursor-not-allowed";

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : variantStyles[variant]}
    ${className}
  `.trim();

  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
