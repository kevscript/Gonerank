export type ButtonProps = {
  label: string;
  type?: "submit" | "button";
  className?: StringConstructor;
};

const Button = ({ label, className, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`min-w-[80px] px-4 py-1.5 border border-gray-400 rounded ${
        className || ""
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
