export type ChartContainerProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const ChartContainer = ({ title, subtitle, children }: ChartContainerProps) => {
  return (
    <div className="flex flex-col w-full rounded dark:bg-dark-500 drop-shadow-sm">
      <div className="flex items-center w-full h-16 px-8 rounded-t dark:bg-dark-400">
        <h3 className="">{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="w-full p-8 min-h-fit">{children}</div>
    </div>
  );
};

export default ChartContainer;
