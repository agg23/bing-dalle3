import React, { useState } from "react";
import { usePromptList } from "./hooks/usePromptList";
import { Generation } from "./components/Generation";
import { Header } from "./components/Header";
import { SingleImageOverlay } from "./components/SingleImageOverlay";
import { PromptImageWithUrl } from "./types";

import classes from "./App.module.css";
import { killReact } from "../content/inject";
export const App: React.FC<{}> = () => {
  const { prompts } = usePromptList();

  const [openImage, setOpenImage] = useState<PromptImageWithUrl | undefined>(
    undefined
  );

  const onClose = () => {
    if (!!openImage) {
      // Close image overlay
      setOpenImage(undefined);
    } else {
      killReact();
    }
  };

  return (
    <div className={classes.app}>
      <div
        className={
          !!openImage
            ? `${classes.mainScroll} ${classes.disabled}`
            : classes.mainScroll
        }
      >
        <Header onClose={onClose} />
        <SingleImageOverlay image={openImage} />
        {prompts?.map((prompt) => (
          <Generation
            key={prompt.id}
            prompt={prompt}
            setOpenImage={setOpenImage}
          />
        ))}
      </div>
    </div>
  );
};
