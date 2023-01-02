export type ButtonProps = {
  label: string;
  type?: "submit" | "button";
  className?: StringConstructor;
  onClick?: () => unknown;
  disabled?: boolean;
  variety?: "primary" | "secondary";
};

const Button = ({
  label,
  className,
  onClick,
  type = "button",
  disabled,
  variety = "primary",
  ...restProps
}: ButtonProps) => {
  const primaryStyles =
    "bg-marine-600 text-white hover:bg-marine-700 dark:hover:bg-marine-500";
  const secondaryStyles =
    "border border-marine-600 text-marine-600  dark:text-white hover:bg-marine-100 dark:hover:bg-marine-500 dark:hover:border-marine-500";

  const styles = variety === "secondary" ? secondaryStyles : primaryStyles;

  return (
    <button
      {...restProps}
      type={type}
      className={`min-w-[80px] px-4 py-1.5 drop-shadow rounded-sm  ${
        className || ""
      } ${
        disabled
          ? "bg-gray-100 dark:bg-dark-300 border-none dark:text-gray-400 text-gray-600"
          : `${styles}`
      }`}
      onClick={onClick}
      disabled={disabled}
      name={label}
    >
      {label}
    </button>
  );
};

export default Button;
