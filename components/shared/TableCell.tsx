import { ReactNode } from "react";

export type TableCellProps = {
  children: ReactNode;
  className?: string;
  padding?: string;
};

const TableCell = ({
  children,
  className = "",
  padding = "px-2",
}: TableCellProps) => {
  const styles = `w-full h-full flex items-center ${padding} ${className}`;
  return <div className={styles}>{children}</div>;
};

export default TableCell;
