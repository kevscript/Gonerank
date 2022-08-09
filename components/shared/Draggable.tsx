import { ReactNode, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const Draggable = ({ children }: { children: ReactNode }) => {
  const dragRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(dragRef);

  return (
    <div
      className={`max-w-max overflow-x-auto hide-scrollbar border-2 border-gray-100 dark:border-slate-600`}
      ref={dragRef}
      {...events}
    >
      {children}
    </div>
  );
};

export default Draggable;
