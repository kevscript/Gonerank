export type SwitcherProps = {
  checked: boolean;
  handleToggle: () => unknown;
  id: string;
};

const Switcher = ({ checked, handleToggle, id }: SwitcherProps) => {
  return (
    <label htmlFor={id} className="relative flex items-center cursor-pointer">
      <input
        onChange={handleToggle}
        defaultChecked={checked}
        type="checkbox"
        id={id}
        className={`sr-only peer after:checked:translate-x-full checked:after:border-white checked:after:left-1.5`}
      />
      <div className="absolute w-4 h-4 transition-transform bg-white border-2 border-gray-200 rounded-full peer-checked:translate-x-full peer-checked:border-marine-200"></div>
      <div
        className={`border-2 h-4 w-8 rounded-full ${
          checked
            ? "bg-marine-600 border-marine-600"
            : "bg-gray-400 border-gray-400"
        }`}
      ></div>
    </label>
  );
};

export default Switcher;
