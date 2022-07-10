import {
  Control,
  Controller,
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
  Path,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type DateInputProps<FieldValues> = {
  control: Control<FieldValues, object>;
  error: Merge<FieldError, FieldErrorsImpl<DeepRequired<Date>>> | undefined;
  value: string | Date | number;
  rules?: any;
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
        <label
          className={`flex flex-col ${
            containerStyle ? containerStyle : "w-32"
          }`}
        >
          <span className="ml-2 text-sm">{label}</span>
          <DatePicker
            onChange={(date) => field.onChange(date)}
            selected={field.value as Date}
            dateFormat="dd/MM/yyyy"
            className={`h-10 px-2 bg-white border text-base rounded mt-1 w-full font-num ${
              error
                ? "border-red-400 outline-red-600"
                : value
                ? "border-marine-400 outline-marine-600 bg-marine-50"
                : "border-gray-200 outline-marine-600"
            }`}
            popperPlacement="bottom-start"
            showPopperArrow={false}
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
      )}
    />
  );
};

export default DateInput;
