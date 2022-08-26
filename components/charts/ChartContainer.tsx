export type ChartContainerProps = {
  title: string;
  children: React.ReactNode;
};

const ChartContainer = ({ title, children }: ChartContainerProps) => {
  return (
    <div className="flex flex-col w-full p-8 bg-red-600 rounded dark:bg-dark-500 drop-shadow-sm">
      <h3 className="">{title}</h3>
      <div className="flex-1 mt-8">{children}</div>
    </div>
  );
};

export default ChartContainer;
