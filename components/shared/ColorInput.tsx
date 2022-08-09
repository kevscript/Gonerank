import useOutsideClick from "@/hooks/useOutsideClick";
import React, { useRef, useState } from "react";
import { ChromePicker, ColorChangeHandler } from "react-color";
import {
  FieldError,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type ColorInputProps = {
  name: string;
  label: string;
  error?: FieldError | undefined;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  containerStyle?: string;
  setValue: UseFormSetValue<any>;
  pickerWidth?: number;
  right?: boolean;
  initialValue?: string | undefined;
};

const ColorInput = ({
  name,
  label,
  error,
  register,
  options,
  containerStyle,
  setValue,
  pickerWidth,
  right,
  initialValue,
}: ColorInputProps) => {
  const [color, setColor] = useState(initialValue ? initialValue : "#000");
  const [isOpen, setIsOpen] = useState(false);

  const pickerRef = useRef(null);

  const handleColor: ColorChangeHandler = (clr) => {
    setValue(name, clr.hex);
    setColor(clr.hex);
  };
  const handleOpen = () => !isOpen && setIsOpen(true);

  useOutsideClick({ ref: pickerRef, action: () => setIsOpen(false) });

  return (
    <label
      ref={pickerRef}
      className={`relative flex flex-col min-w-0 mt-4 ${
        containerStyle ? containerStyle : "w-full"
      }`}
      onClick={handleOpen}
    >
      <span className="ml-2 text-sm">{label}</span>
      <div
        className={`w-full flex flex-nowrap items-center overflow-hidden mt-1 h-10 border rounded ${
          error
            ? "border-red-400 outline-red-500 bg-red-50"
            : "border-gray-200 outline-marine-600"
        }`}
      >
        <div
          className={`w-8 h-full border-r border-gray-200`}
          style={{ backgroundColor: color }}
        ></div>
        <input
          type="text"
          className={`w-full h-full pl-2 outline-none border-none ${
            error ? "bg-red-50" : ""
          }`}
          {...register(name, options)}
          defaultValue={color}
        />
      </div>

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

      {isOpen && (
        <div
          data-testid="picker"
          className={`absolute top-16 z-50 ${right && "right-0"}`}
        >
          <ChromePicker
            color={color}
            onChange={handleColor}
            disableAlpha
            styles={{
              default: {
                picker: { width: pickerWidth ? pickerWidth : 225 },
              },
            }}
          />
        </div>
      )}
    </label>
  );
};

export default ColorInput;
