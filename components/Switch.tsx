import React from "react";

type SwitchProps = {
  isOn: boolean;
  primary: string;
  secondary: string;
  handleToggle: () => unknown;
};

const Switch = ({ isOn, handleToggle, primary, secondary }: SwitchProps) => {
  const toggleClass = " transform translate-x-4";
  return (
    <>
      <div
        className={`relative w-8 h-4 flex items-center rounded-full cursor-pointer ${
          isOn ? secondary : primary
        }`}
        onClick={() => handleToggle()}
      >
        {/* Switch */}
        <div
          className={`absolute bg-black h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            isOn ? toggleClass : null
          }`}
        ></div>
      </div>
    </>
  );
};

export default Switch;
