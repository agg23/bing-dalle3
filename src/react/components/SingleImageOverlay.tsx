import React, { useMemo } from "react";
import { PromptImageWithUrl } from "../types";

import { buildExportFilename, formatDatetimeNice } from "../../util/string";
import { downloadUri } from "../../util/util";

import classes from "./SingleImageOverlay.module.css";
import { ControlButton } from "./ControlButton";

interface SingleImageOverlayProps {
  image: PromptImageWithUrl | undefined;
}

export const SingleImageOverlay: React.FC<SingleImageOverlayProps> = ({
  image,
}) => {
  const datetime = useMemo(
    () =>
      image
        ? formatDatetimeNice(new Date(image.prompt.recordTimestamp))
        : undefined,
    [image]
  );

  return (
    image && (
      <div className={classes.overlay}>
        <div className={classes.content}>
          <div className={classes.imageWrapper}>
            <img id="bing-image" src={image.url} />
          </div>
          <div className={classes.controls}>
            <div className={classes.prompt}>{image.prompt.prompt}</div>
            <div className={classes.date}>Saved on {datetime}</div>
            <div className={classes.buttons}>
              {/* Firefox doesn't support image copying, so this is disabled */}
              {/* <div
                className={`${classes.action} ${classes.copy}`}
                aria-label="Copy"
                role="button"
              >
                <span>
                  <span className={classes.icon}></span>
                  <span className={classes.text}>Copy</span>
                </span>
              </div> */}
              <ControlButton
                type="download"
                text="Download"
                onClick={() =>
                  downloadUri(
                    image.url,
                    buildExportFilename(
                      image.prompt.prompt,
                      image.prompt.recordTimestamp
                    )
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
