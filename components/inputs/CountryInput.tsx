import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Image from "next/image";
import countries from "@/utils/countries";
import { SelectHTMLAttributes } from "react";

export type InputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  error: FieldError | undefined;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  containerStyle?: string;
  countryCode: string;
  country: string;
  children: React.ReactNode;
};

const CountryInput = ({
  name,
  options,
  register,
  label,
  country,
  countryCode,
  error,
  containerStyle,
  children,
  ...selectProps
}: InputProps) => {
  return (
    <label
      className={`flex flex-col min-w-fit ${
        containerStyle ? "w-fit" : "flex-1"
      }`}
    >
      <div className="flex flex-1">
        <div className="flex items-center h-12 px-4 border-t border-b border-l rounded-l-sm min-w-[128px] border-neutral-300 dark:border-neutral-600">
          <span className="text-sm dark:text-neutral-300"> {label}</span>
        </div>
        <div className="flex items-center justify-center w-20 h-12 border-t border-b border-l border-neutral-300 dark:border-neutral-600">
          {countryCode ? (
            <Image
              src={`https://flagcdn.com/h20/${countryCode.toLowerCase()}.png`}
              width={24}
              height={16}
              alt={country}
              title={country}
            />
          ) : (
            <div className="flex items-center justify-center w-6 h-4 bg-neutral-600">
              <span className="text-xs text-white" data-testid="empty-flag">
                ?
              </span>
            </div>
          )}
        </div>
        <div
          className={`relative flex overflow-hidden h-12 border rounded-r-sm ${
            error
              ? "border-red-600/70"
              : "border-neutral-300 dark:border-neutral-600"
          } ${containerStyle ? containerStyle : "flex-1"}`}
        >
          <select
            className="w-full h-12 px-4 rounded-r-sm outline-none appearance-none cursor-pointer dark:bg-black/50"
            {...register(name, options)}
            {...selectProps}
          >
            {children}
          </select>
          <div className="absolute right-0 flex items-center justify-center w-16 h-full">
            <span className="italic uppercase dark:text-neutral-300 text-neutral-600">
              {countryCode}
            </span>
          </div>
        </div>
      </div>
      {error && (
        <span
          className="block mt-2 text-xs text-red-500 ml-52"
          data-testid={`error-${name}`}
        >
          {error.message}
        </span>
      )}
    </label>
  );
};

export default CountryInput;
