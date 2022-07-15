import { ReactNode, useState } from "react";
import TrashIcon from "../Icons/Trash";
import Button from "../shared/Button";
import Modal from "../shared/Modal";

export type DeleteWidgetProps = {
  children: ReactNode;
  onDelete: () => void;
};

const DeleteWidget = ({ children, onDelete }: DeleteWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="bg-red-100 group hover:bg-red-400 w-full h-full flex justify-center items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <TrashIcon className="w-4 h-4 fill-black group-hover:fill-white" />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full">{children}</div>
        <div className="w-full flex flex-row flex-nowrap justify-end mt-4 gap-x-2">
          <Button label="Cancel" onClick={() => setIsOpen(false)} />
          <Button label="Delete" onClick={handleDelete} />
        </div>
      </Modal>
    </>
  );
};

export default DeleteWidget;
