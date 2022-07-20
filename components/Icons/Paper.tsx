import { SvgIconProps } from "./types";

const PaperIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      className={className}
      viewBox="0 0 368.553 368.553"
    >
      <path d="M239.68 0H42.695v368.553h283.164V86.811L239.68 0zm4.377 25.7 56.288 56.701h-56.288V25.7zM57.695 353.553V15h171.362v82.401h81.802v256.151H57.695v.001z" />
      <path d="M86.435 82.401H208.31v15H86.435zM86.435 151.122H282.12v15H86.435zM86.435 219.843H282.12v15H86.435zM86.435 288.563H282.12v15H86.435z" />
    </svg>
  );
};

export default PaperIcon;
