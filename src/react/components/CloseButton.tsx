import React from "react";

import classes from "./CloseButton.module.css";

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button className={classes.close} type="button" onClick={onClose}>
      <span className={classes.icon}></span>
    </button>
  );
};
