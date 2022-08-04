import { ReactNode, useState } from "react";
import ArchiveIcon from "../Icons/Archive";
import PaperIcon from "../Icons/Paper";
import Button from "../shared/Button";
import Modal from "../shared/Modal";

export type ArchiveWidgetProps = {
  children: ReactNode;
  archived: boolean;
  onStatusChange: () => void;
};

const ArchiveWidget = ({
  children,
  archived,
  onStatusChange,
}: ArchiveWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUpdate = () => {
    onStatusChange();
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`group w-full h-full flex justify-center items-center cursor-pointer ${
          archived
            ? "bg-amber-600/20 hover:bg-amber-600/30"
            : "bg-amber-300/20 hover:bg-amber-300/30"
        }`}
        onClick={() => setIsOpen(true)}
      >
        {archived ? (
          <ArchiveIcon className="w-5 h-5 fill-amber-600/80 group-hover:fill-amber-600" />
        ) : (
          <PaperIcon className="w-5 h-5 fill-amber-400/80 group-hover:fill-amber-400" />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full">{children}</div>
        <div className="w-full flex flex-row flex-nowrap justify-end mt-4 gap-x-2">
          <Button
            label="Annuler"
            onClick={() => setIsOpen(false)}
            variety="secondary"
          />
          <Button
            label={archived ? "Restorer" : "Archiver"}
            onClick={handleStatusUpdate}
          />
        </div>
      </Modal>
    </>
  );
};

export default ArchiveWidget;
