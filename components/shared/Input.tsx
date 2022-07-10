import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

export type InputProps = {
  name: string;
  label: string;
  error: FieldError | undefined;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  containerStyle?: string;
  value: string | number | Date | boolean;
  type?: string;
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
      className={`flex flex-col min-w-0 ${
        containerStyle ? containerStyle : "w-full"
      }`}
    >
      <span className="ml-2 text-sm">{label}</span>
      <input
        {...register(name, options)}
        type={type ? type : "text"}
        className={`h-10 rounded bg-white border  px-2 text-base mt-1 ${
          error
            ? "border-red-400 outline-red-500"
            : value
            ? "border-marine-400 outline-marine-600 bg-marine-50"
            : "border-gray-200 outline-marine-600"
        }`}
      />
      <div className="min-h-[20px] w-full">
        {error && (
          <span
            className="block text-sm ml-2 text-red-500"
            data-testid={`error-${name}`}
          >
            {error.message}
          </span>
        )}
      </div>
    </label>
  );
};

export default Input;
