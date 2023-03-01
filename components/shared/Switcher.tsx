export type SwitcherProps = {
  checked: boolean;
  handleToggle: () => unknown;
  id: string;
};

const Switcher = ({ checked, handleToggle, id }: SwitcherProps) => {
  return (
    <label htmlFor={id} className="relative flex items-center cursor-pointer">
      <span className="sr-only" aria-label={id}>
        {id}
      </span>
      <input
        onChange={handleToggle}
        defaultChecked={checked}
        type="checkbox"
        id={id}
        className={`sr-only peer after:checked:translate-x-full checked:after:border-white checked:after:left-1.5`}
      />
      <div className="absolute flex items-center justify-center w-4 h-4 transition-transform bg-gray-200 border-2 border-gray-300 rounded-full peer-checked:bg-marine-500 peer-checked:translate-x-full peer-checked:border-marine-600"></div>

      <div
        className={`border-2 h-4 w-8 rounded-full ${
          checked
            ? "bg-marine-400 border-marine-600"
            : "bg-gray-100 border-gray-300"
        }`}
      ></div>
    </label>
  );
};

export default Switcher;
