import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  size = "small",
  variant = "confirm",
  className,
  handleClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        css.button,
        css[size],
        css[variant],
        className && className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
