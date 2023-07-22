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
  value?: string | Date | number | boolean;
  options?: RegisterOptions;
  children: ReactNode;
  containerStyle?: string;
};

const SelectInput = <T,>({
  register,
  label,
  error,
  options,
  name,
  children,
  containerStyle,
}: SelectInputProps<T>) => {
  return (
    <label
      className={`flex flex-col min-w-fit ${
        containerStyle ? "w-fit" : "flex-1"
      }`}
    >
      <div className="flex flex-1">
        <div className="flex items-center h-12 px-4 border-t border-b border-l rounded-l-sm min-w-[128px] border-neutral-600">
          <span className="text-sm text-neutral-300"> {label}</span>
        </div>
        <div
          className={`flex items-center h-12 border rounded-r-sm ${
            error ? "border-red-600/70" : "border-neutral-600"
          } ${containerStyle ? containerStyle : "flex-1"}`}
        >
          <select
            className="w-full h-full px-4 rounded-r-sm outline-none appearance-none cursor-pointer bg-black/50"
            {...register(name, options)}
          >
            {children}
          </select>
        </div>
      </div>
      {error && (
        <span
          className="block mt-2 ml-32 text-xs text-red-500"
          data-testid={`error-${name}`}
        >
          {error.message}
        </span>
      )}
    </label>
  );
};

export default SelectInput;
