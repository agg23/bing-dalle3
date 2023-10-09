import React, { useMemo } from "react";
import { ImageDBEntry, PromptDBEntry } from "../../content/db";
import { useGenerationImages } from "../hooks/useGenerationImages";
import { buildExportFilename, formatDatetimeNice } from "../../util/string";
import mergeImages from "merge-images";

import classes from "./Generation.module.css";
import { PromptImageWithUrl } from "../types";
import { ControlButton } from "./ControlButton";
import { downloadUri } from "../../util/util";

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
    <div className={classes.generation}>
      <div className="spacer"></div>
      <div className={imageGrid}>
        <div className={classes.row}>{row0.map(renderImageItem)}</div>
        {row1.length > 0 && (
          <div className={classes.row}>{row1.map(renderImageItem)}</div>
        )}
      </div>
      <div className={classes.controls}>
        <div className={classes.prompt}>{prompt.prompt}</div>
        <div className={classes.date}>
          {formatDatetimeNice(new Date(prompt.recordTimestamp))}
        </div>
        <div className={classes.buttons}>
          <ControlButton
            type="download"
            text="Download All"
            onClick={() => {
              for (const image of imagesWithUrls) {
                downloadUri(
                  image.url,
                  buildExportFilename(prompt.prompt, prompt.recordTimestamp)
                );
              }
            }}
          />
          <ControlButton
            type="download"
            text="Download Combined"
            onClick={async () => {
              const exportFilename = buildExportFilename(
                prompt.prompt,
                prompt.recordTimestamp
              );

              const combinedUrl = await combineImages(imagesWithUrls);

              downloadUri(combinedUrl, exportFilename);
            }}
          />
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

const combineImages = async (
  images: Array<{
    url: string;
  }>
): Promise<string> => {
  const imageSize = 1024;
  const margin = 48;

  if (images.length === 1) {
    return images[0].url;
  }

  let width = imageSize;
  if (images.length > 1) {
    width = imageSize + margin + imageSize;
  }

  let height = imageSize;
  if (images.length > 2) {
    height = imageSize + margin + imageSize;
  }

  return await mergeImages(
    images.map((image, i) => {
      let x: number;

      if (images.length === 3 && i === 2) {
        // Bottom centered icon, so special position
        x = (imageSize + margin) / 2;
      } else if (i % 2 === 0) {
        // Left side
        x = 0;
      } else {
        // Right side
        x = imageSize + margin;
      }

      let y: number;

      if (i < 2) {
        // Top
        y = 0;
      } else {
        // Bottom
        y = imageSize + margin;
      }

      return { src: image.url, x, y };
    }),
    {
      width,
      height,
    }
  );
};
