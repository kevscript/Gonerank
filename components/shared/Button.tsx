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
}: ButtonProps) => {
  const primaryStyles =
    "bg-marine-600 text-white hover:bg-marine-700 dark:hover:bg-marine-500";
  const secondaryStyles =
    "border-2 border-marine-600 text-marine-600  dark:text-white hover:bg-marine-100 dark:hover:bg-marine-500 dark:hover:border-marine-500";

  const styles = variety === "secondary" ? secondaryStyles : primaryStyles;

  return (
    <button
      type={type}
      className={`min-w-[80px] px-4 py-1.5 drop-shadow rounded  ${styles} ${
        className || ""
      } ${disabled && "bg-gray-100 border-none text-gray-600"}`}
      onClick={onClick}
      disabled={disabled}
      name={label}
    >
      {label}
    </button>
  );
};

export default Button;
