import React from "react";
import { killReact } from "../../content/inject";

import classes from "./CloseButton.module.css";

export const CloseButton = () => {
  return (
    <button className={classes.close} type="button" onClick={killReact}>
      <span className={classes.icon}></span>
    </button>
  );
};
