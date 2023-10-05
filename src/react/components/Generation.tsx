import React, { useMemo } from "react";
import { PromptDBEntry } from "../../content/db";
import { useGenerationImages } from "../hooks/useGenerationImages";
import { formatDatetimeNice } from "../../util/string";

import classes from "./Generation.module.css";

interface GenerationProps {
  prompt: PromptDBEntry;
}

export const Generation: React.FC<GenerationProps> = ({ prompt }) => {
  const { images } = useGenerationImages(prompt.id);

  const imageUrls = useMemo(
    () => images?.map((entry) => URL.createObjectURL(entry.image)) ?? [],
    [images]
  );

  const imgElements = imageUrls.map((url) => (
    <div className={classes.imageWrapper}>
      <img key={url} className={classes.image} src={url} />
    </div>
  ));

  const row0: React.ReactNode[] = [];
  const row1: React.ReactNode[] = [];
  for (let i = 0; i < imgElements.length; i++) {
    const element = imgElements[i];

    if (i > 1) {
      row1.push(element);
    } else {
      row0.push(element);
    }
  }

  const imageGrid =
    imgElements.length === 2
      ? `${classes.imageGrid} ${classes.twoItemImageGrid}`
      : classes.imageGrid;

  return (
    <div className={classes.wrapper}>
      <div className={imageGrid}>
        <div className={classes.row}>
          {row0.map((img, i) => (
            <div key={i} className={classes.rowItem}>
              {img}
            </div>
          ))}
        </div>
        {row1.length > 0 && (
          <div className={classes.row}>
            {row1.map((img, i) => (
              <div key={i} className={classes.rowItem}>
                {img}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classes.controls}>
        <div>{prompt.prompt}</div>
        <div>{formatDatetimeNice(new Date(prompt.recordTimestamp))}</div>
      </div>
    </div>
  );
};
