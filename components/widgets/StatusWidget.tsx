import { ReactNode, useState } from "react";
import EyeIcon from "../Icons/Eye";
import EyeClosedIcon from "../Icons/EyeClosedIcon";
import TrashIcon from "../Icons/Trash";
import Button from "../shared/Button";
import Modal from "../shared/Modal";

export type StatusWIdgetProps = {
  children: ReactNode;
  active: boolean;
  onStatusChange: () => void;
};

const StatusWidget = ({
  children,
  active,
  onStatusChange,
}: StatusWIdgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUpdate = () => {
    onStatusChange();
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`group w-full h-full flex justify-center items-center cursor-pointer ${
          active
            ? "bg-green-100 hover:bg-green-300"
            : "bg-gray-100 hover:bg-gray-300"
        }`}
        onClick={() => setIsOpen(true)}
      >
        {active ? (
          <EyeIcon className="w-5 h-5 fill-gray-500 group-hover:fill-white" />
        ) : (
          <EyeClosedIcon className="w-5 h-5 fill-gray-500 group-hover:fill-gray-600" />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full">{children}</div>
        <div className="w-full flex flex-row flex-nowrap justify-end mt-4 gap-x-2">
          <Button label="Cancel" onClick={() => setIsOpen(false)} />
          <Button
            label={active ? "Deactivate" : "Activate"}
            onClick={handleStatusUpdate}
          />
        </div>
      </Modal>
    </>
  );
};

export default StatusWidget;