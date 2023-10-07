import React, { useMemo } from "react";
import { ImageDBEntry, PromptDBEntry } from "../../content/db";
import { useGenerationImages } from "../hooks/useGenerationImages";
import { formatDatetimeNice } from "../../util/string";

import classes from "./Generation.module.css";
import { PromptImageWithUrl } from "../types";

interface GenerationProps {
  prompt: PromptDBEntry;

  setOpenImage: (image: PromptImageWithUrl | undefined) => void;
}

interface ImageWithUrl {
  image: ImageDBEntry;
  url: string;
}

export const Generation: React.FC<GenerationProps> = ({
  prompt,
  setOpenImage,
}) => {
  const { images } = useGenerationImages(prompt.id);

  const imagesWithUrls = useMemo(
    () =>
      images?.map((entry) => ({
        url: URL.createObjectURL(entry.image),
        image: entry,
      })) ?? [],
    [images]
  );

  const row0: ImageWithUrl[] = [];
  const row1: ImageWithUrl[] = [];
  for (let i = 0; i < imagesWithUrls.length; i++) {
    const element = imagesWithUrls[i];

    if (i > 1) {
      row1.push(element);
    } else {
      row0.push(element);
    }
  }

  const imageGrid =
    imagesWithUrls.length === 2
      ? `${classes.imageGrid} ${classes.twoItemImageGrid}`
      : classes.imageGrid;

  const renderImageItem = (img: ImageWithUrl, i: number) => (
    <div
      key={i}
      className={classes.rowItem}
      onClick={() => setOpenImage({ ...img, prompt })}
    >
      <div className={classes.imageWrapper}>
        <img key={img.url} className={classes.image} src={img.url} />
      </div>
    </div>
  );

  return (
    <div className={classes.wrapper}>
      <div className={imageGrid}>
        <div className={classes.row}>{row0.map(renderImageItem)}</div>
        {row1.length > 0 && (
          <div className={classes.row}>{row1.map(renderImageItem)}</div>
        )}
      </div>
      <div className={classes.controls}>
        <div>{prompt.prompt}</div>
        <div>{formatDatetimeNice(new Date(prompt.recordTimestamp))}</div>
      </div>
    </div>
  );
};
