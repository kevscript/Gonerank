export type ButtonProps = {
  label: string;
  type?: "submit" | "button";
  className?: StringConstructor;
  onClick?: () => unknown;
  disabled?: boolean;
};

const Button = ({
  label,
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`min-w-[80px] px-4 py-1.5 border border-gray-400 drop-shadow rounded ${
        className || ""
      } ${disabled && "bg-red-100"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
