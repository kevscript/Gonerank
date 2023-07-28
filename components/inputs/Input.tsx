import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

export type InputProps = {
  name: string;
  label: string;
  error: FieldError | undefined;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  containerStyle?: string;
  value?: string | number | Date | boolean;
  type?: "number" | "text";
  defaultValue?: string | number | Date | boolean;
};

const Input = ({
  name,
  label,
  error,
  register,
  options,
  containerStyle,
  type,
}: InputProps) => {
  return (
    <label
      className={`flex flex-col min-w-fit ${
        containerStyle ? "w-fit" : "flex-1"
      }`}
    >
      <div className="flex flex-1">
        <div className="flex items-center h-12 px-4 border-t border-b border-l rounded-l-sm min-w-[128px] border-neutral-300 dark:border-neutral-600">
          <span className="text-sm dark:text-neutral-300">{label}</span>
        </div>
        <div
          className={`flex items-center h-12 border rounded-r-sm ${
            error
              ? "border-red-600/70"
              : "border-neutral-300 dark:border-neutral-600"
          } ${containerStyle ? containerStyle : "flex-1"}`}
        >
          <input
            className={`h-full px-4 rounded-r-sm outline-none cursor-pointer dark:bg-black/50 w-full`}
            {...register(name, options)}
            type={type ? type : "text"}
            min={type === "number" ? 0 : undefined}
            max={type === "number" ? 99 : undefined}
          />
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

export default Input;
