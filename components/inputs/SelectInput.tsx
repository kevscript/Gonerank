import { ReactNode } from "react";
import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type SelectInputProps<FieldValues> = {
  label: string;
  name: Path<FieldValues>;
  register: UseFormRegister<FieldValues>;
  error: FieldError | undefined;
  value: string | Date | number | boolean;
  options?: RegisterOptions;
  children: ReactNode;
  containerStyle?: string;
};

const SelectInput = <T,>({
  register,
  label,
  error,
  value,
  options,
  name,
  children,
  containerStyle,
}: SelectInputProps<T>) => {
  return (
    <label
      className={`flex flex-col min-w-0 mt-4 ${
        containerStyle ? containerStyle : "w-full flex-1"
      }`}
    >
      <span className="ml-2 text-sm">{label}</span>
      <select
        defaultValue={""}
        {...register(name, options)}
        className={`h-10 px-2 cursor-pointer bg-white dark:bg-dark-400 border text-base rounded mt-1 ${
          error
            ? "border-red-400 outline-red-600 bg-red-50"
            : value
            ? "border-marine-400 outline-marine-600 bg-marine-50"
            : "border-gray-200 outline-marine-600"
        }`}
      >
        {children}
      </select>
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

export default SelectInput;
