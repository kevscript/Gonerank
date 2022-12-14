import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

export type InputProps = {
  name: string;
  label: string;
  error: FieldError | undefined;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  containerStyle?: string;
  value: string | number | Date | boolean;
  type?: "number" | "text";
};

const Input = ({
  name,
  label,
  error,
  register,
  options,
  containerStyle,
  value,
  type,
}: InputProps) => {
  return (
    <label
      className={`flex flex-col min-w-0 mt-4 ${
        containerStyle ? containerStyle : "w-full"
      }`}
    >
      <span className="ml-2 text-sm">{label}</span>
      <input
        {...register(name, options)}
        type={type ? type : "text"}
        min={type === "number" ? 0 : undefined}
        max={type === "number" ? 12 : undefined}
        className={`h-10 rounded bg-white dark:bg-dark-400 border px-2 text-base mt-1 ${
          error
            ? "border-red-400 outline-red-500 bg-red-50"
            : value || value === 0
            ? "border-marine-400 outline-marine-600 bg-marine-50"
            : "border-gray-200 outline-marine-600"
        }`}
      />

      {error && (
        <div className="w-full">
          <span
            className="block ml-2 text-sm text-red-500"
            data-testid={`error-${name}`}
          >
            {error.message}
          </span>
        </div>
      )}
    </label>
  );
};

export default Input;
