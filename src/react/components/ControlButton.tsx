import React from "react";

import classes from "./ControlButton.module.css";

type ControlButtonType = "download" | "copy";

interface ControlButtonProps {
  type: ControlButtonType;
  text: string;
  onClick: () => void;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  type,
  text,
  onClick,
}) => {
  return (
    <div
      className={`${classes.action} ${buttonClass(type)}`}
      aria-label={text}
      role="button"
      onClick={onClick}
    >
      <span>
        <span className={classes.icon}></span>
        <span className={classes.text}>{text}</span>
      </span>
    </div>
  );
};

const buttonClass = (type: ControlButtonType): string => {
  switch (type) {
    case "copy":
      return classes.copy;
    case "download":
      return classes.download;
  }
};
