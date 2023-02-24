import { ReactNode } from "react";

type VisxChartContainerProps = {
  title: string;
  children: ReactNode;
};

const VisxChartContainer = ({ title, children }: VisxChartContainerProps) => {
  return (
    <div className="flex flex-col bg-gray-100 rounded-md dark:bg-dark-500">
      <div className="flex items-center px-8 pt-8 pb-4 bg-gray-200 rounded-t-md dark:bg-dark-400">
        <h3 className="text-sm lg:text-base">{title}</h3>
      </div>
      <div className="p-4"> {children}</div>
    </div>
  );
};

export default VisxChartContainer;
