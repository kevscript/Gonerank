import { ReactNode, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const Draggable = ({ children }: { children: ReactNode }) => {
  const dragRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(dragRef);

  return (
    <div
      className={`w-full overflow-x-auto hide-scrollbar`}
      ref={dragRef}
      {...events}
    >
      {children}
    </div>
  );
};

export default Draggable;
