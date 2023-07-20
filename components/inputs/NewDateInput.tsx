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
  value: string | Date | number;
  rules?: RegisterOptions;
  name: Path<FieldValues>;
  containerStyle?: string;
  label: string;
};

const DateInput = <T,>({
  control,
  error,
  value,
  rules,
  name,
  label,
  containerStyle,
}: DateInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <label className={`flex items-center h-12 w-fit`}>
          <div className="px-4 min-w-[128px] rounded-l-sm border-l border-t border-b border-neutral-600 h-full flex items-center">
            <span className="text-sm text-neutral-300">{label}</span>
          </div>
          <div
            className={`flex items-center h-full border rounded-r-sm outline-none overflow-hidden ${
              error ? "border-red-600/70" : "border-neutral-600"
            }`}
          >
            <DatePicker
              onChange={(date) => date && field.onChange(noTimezone(date))}
              selected={field.value as Date}
              dateFormat="dd/MM/yyyy"
              className="flex-1 w-32 h-12 px-4 rounded-r-sm outline-none cursor-pointer bg-black/50 font-num"
              popperPlacement="bottom-start"
              showPopperArrow={false}
            />
          </div>
        </label>
      )}
    />
  );
};

export default DateInput;
