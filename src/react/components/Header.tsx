import React, { useLayoutEffect, useRef } from "react";
import { CloseButton } from "./CloseButton";

import classes from "./Header.module.css";

export const Header: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const defaultHeader = document
      .getElementById("giheadlgsrch")
      ?.cloneNode(true);

    if (defaultHeader) {
      ref.current?.appendChild(defaultHeader);
    }
  }, []);

  return (
    <div className={classes.header}>
      <div
        ref={ref}
        className={`gihead ${classes.existingHeaderWrapper}`}
      ></div>
      <CloseButton />
    </div>
  );
};
