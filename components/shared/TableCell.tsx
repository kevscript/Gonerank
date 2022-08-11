import { ReactNode } from "react";

export type TableCellProps = {
  children: ReactNode;
  className?: string;
  padding?: string;
  title?: string;
  header?: boolean;
};

const TableCell = ({
  children,
  className = "",
  padding = "px-2",
  title,
  header = false,
}: TableCellProps) => {
  const styles = `w-full h-full flex items-center bg-white dark:bg-dark-500 ${padding} ${className} ${
    header ? "bg-gray-50 dark:bg-dark-400" : "bg-white dark:bg-dark-500"
  }`;
  return (
    <div className={styles} title={title}>
      {children}
    </div>
  );
};

export default TableCell;
