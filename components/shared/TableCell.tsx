import { ReactNode } from "react";

export type TableCellProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => unknown;
};

const TableCell = ({ children, className, onClick }: TableCellProps) => {
  return (
    <div
      className={`w-full h-full px-2 flex items-center ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TableCell;
