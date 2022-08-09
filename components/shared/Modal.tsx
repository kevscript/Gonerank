import { ReactNode } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../Icons/Close";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const handleClose = (
    e: React.MouseEvent<HTMLDivElement>,
    propagate: boolean
  ) => {
    if (!propagate && e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    } else if (propagate) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-screen h-screen bg-black/80"
        onClick={(e) => handleClose(e, false)}
      >
        <div className="relative bg-white dark:bg-slate-700 w-10/12 max-w-[768px] h-fit max-h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden">
          <div
            className="absolute flex items-center justify-center w-4 h-4 right-2 top-2"
            onClick={(e) => handleClose(e, true)}
          >
            <CloseIcon className="w-3 h-3 dark:fill-white" />
          </div>

          <div className="w-full p-4">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("portalRoot")!
  );
};

export default Modal;
