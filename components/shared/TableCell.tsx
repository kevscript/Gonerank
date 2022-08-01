import { ReactNode } from "react";

export type TableCellProps = {
  children: ReactNode;
  className?: string;
  padding?: string;
  title?: string;
};

const TableCell = ({
  children,
  className = "",
  padding = "px-2",
  title,
}: TableCellProps) => {
  const styles = `w-full h-full flex items-center ${padding} ${className}`;
  return (
    <div className={styles} title={title}>
      {children}
    </div>
  );
};

export default TableCell;
