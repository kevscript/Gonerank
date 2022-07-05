import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  error: FieldError | undefined;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  width?: string;
  value: string;
  isTouched?: boolean;
};

const Input = ({
  name,
  label,
  error,
  register,
  options,
  width,
  value,
  isTouched,
}: InputProps) => {
  return (
    <label className={`flex flex-col mt-4 min-w-0 ${width ? width : "w-full"}`}>
      <span className="ml-2 text-sm">{label}</span>
      <input
        {...register(name, options)}
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
          <span className="block text-sm ml-2 text-red-500">
            {error.message}
          </span>
        )}
      </div>
    </label>
  );
};

export default Input;
