import React, { useEffect, useState } from "react";
import { usePromptList } from "./hooks/usePromptList";
import { Generation } from "./components/Generation";
import { Header } from "./components/Header";
import { SingleImageOverlay } from "./components/SingleImageOverlay";
import { PromptImageWithUrl } from "./types";

import classes from "./App.module.css";
import { hideReact } from "../content/inject";
import { useEscapeButton } from "./hooks/useEscapeButton";
import { registerReactStartupCallback } from "./externalControl";
export const App: React.FC<{}> = () => {
  const { prompts } = usePromptList();

  // When first starting up, we immediately start displaying
  const [show, setShow] = useState(true);

  const [openImage, setOpenImage] = useState<PromptImageWithUrl | undefined>(
    undefined
  );

  const onClose = () => {
    console.log("Closing", openImage);
    if (!!openImage) {
      // Close image overlay
      setOpenImage(undefined);
    } else {
      setShow(false);
      hideReact();
    }
  };

  useEscapeButton(onClose);

  useEffect(() => {
    registerReactStartupCallback(() => setShow(true));

    return () => registerReactStartupCallback(undefined);
  }, []);

  return (
    show && (
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
    )
  );
};
