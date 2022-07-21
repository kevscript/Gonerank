import React, { ReactNode, useState } from "react";
import TrashIcon from "../Icons/Trash";
import Button from "../shared/Button";
import Modal from "../shared/Modal";

export type DeleteWidgetProps = {
  children: ReactNode;
  onDelete: () => unknown;
  validation?: string | null;
};

const DeleteWidget = ({
  children,
  onDelete,
  validation = null,
}: DeleteWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [validationInput, setValidationInput] = useState("");

  const handleValidationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationInput(e.target.value);
  };

  const handleDelete = () => {
    if (validation) {
      if (validationInput.trim().toLowerCase() === validation.toLowerCase()) {
        onDelete();
        setIsOpen(false);
      } else {
        console.error("Wrong confirmation input");
      }
    } else {
      onDelete();
      setIsOpen(false);
    }
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
        {validation && (
          <label className="text-sm flex flex-col w-full mt-4">
            <span>Confirm deletion:</span>
            <input
              type="text"
              value={validationInput}
              onChange={handleValidationInput}
              placeholder={validation}
              className="h-8 px-2 mt-1 w-full border border-gray-300 outline-marine-600"
            />
          </label>
        )}
        <div className="w-full flex flex-row flex-nowrap justify-end mt-4 gap-x-2">
          <Button label="Cancel" onClick={() => setIsOpen(false)} />
          <Button label="Delete" onClick={handleDelete} />
        </div>
      </Modal>
    </>
  );
};

export default DeleteWidget;
