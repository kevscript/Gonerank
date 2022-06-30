export type SwitcherProps = {
  checked: boolean;
  handleToggle: () => unknown;
};

const Switcher = ({ checked, handleToggle }: SwitcherProps) => {
  return (
    <label
      htmlFor="switcher"
      className="flex items-center cursor-pointer relative"
    >
      <input
        onChange={handleToggle}
        defaultChecked={checked}
        type="checkbox"
        id="switcher"
        className={`sr-only peer after:checked:translate-x-full checked:after:border-white checked:after:left-1.5`}
      />
      <div className="absolute h-4 w-4 rounded-full bg-white border-2 border-gray-200 transition-transform peer-checked:translate-x-full peer-checked:border-blue-200"></div>
      <div
        className={`border-2 h-4 w-8 rounded-full ${
          checked
            ? "bg-blue-600 border-blue-600"
            : "bg-gray-400 border-gray-400  "
        }`}
      ></div>
    </label>
  );
};

export default Switcher;
