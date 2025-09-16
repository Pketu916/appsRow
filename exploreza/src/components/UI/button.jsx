const Button = ({
  children,
  isBtnStyle = true,
  isWarning = false,
  disabled = false,
  ...props
}) => {
  let btnStyle = "px-8 py-3 transition-all duration-300 rounded-lg";

  if (disabled) {
    btnStyle += " bg-gray-400 text-gray-700 cursor-not-allowed ";
  } else {
    if (isBtnStyle) {
      btnStyle += " bg-orange-500 hover:bg-orange-600 ";
    } else {
      btnStyle += " text-cyan-500 hover:text-cyan-600 ";
    }

    if (isWarning) {
      btnStyle += " bg-red-700 hover:text-yellow-400 ";
    }
  }

  return (
    <button className={btnStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;