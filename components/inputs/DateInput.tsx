import {
  Control,
  Controller,
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
  Path,
  RegisterOptions,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { noTimezone } from "@/utils/noTimezone";

export type DateInputProps<FieldValues> = {
  control: Control<FieldValues, object>;
  error: Merge<FieldError, FieldErrorsImpl<DeepRequired<Date>>> | undefined;
  value?: string | Date | number;
  rules?: RegisterOptions;
  name: Path<FieldValues>;
  containerStyle?: string;
  label: string;
};

const DateInput = <T,>({
  control,
  error,
  rules,
  name,
  label,
  value,
  containerStyle,
}: DateInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
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
              className={`flex items-center h-12 border rounded-r-sm outline-none overflow-hidden ${
                error
                  ? "border-red-600/70"
                  : "border-neutral-300 dark:border-neutral-600"
              } ${containerStyle ? containerStyle : "flex-1"}`}
            >
              <DatePicker
                onChange={(date) => date && field.onChange(noTimezone(date))}
                selected={field.value as Date}
                dateFormat="dd/MM/yyyy"
                className="flex-1 w-full h-12 px-4 rounded-r-sm outline-none cursor-pointer dark:bg-black/50 font-num"
                popperPlacement="bottom-start"
                showPopperArrow={false}
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
      )}
    />
  );
};

export default DateInput;
