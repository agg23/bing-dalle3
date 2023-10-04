import React, { useMemo } from "react";
import { PromptDBEntry } from "../../content/db";
import { useGenerationImages } from "../hooks/useGenerationImages";
import { formatDatetimeNice } from "../../util/string";

interface GenerationProps {
  prompt: PromptDBEntry;
}

export const Generation: React.FC<GenerationProps> = ({ prompt }) => {
  const { images } = useGenerationImages(prompt.id);

  const imageUrls = useMemo(
    () => images?.map((entry) => URL.createObjectURL(entry.image)) ?? [],
    [images]
  );

  return (
    <div>
      <div>{prompt.prompt}</div>
      <div>{formatDatetimeNice(new Date(prompt.recordTimestamp))}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
          gap: 16,
        }}
      >
        {imageUrls.map((url) => (
          <img
            key={url}
            style={{ width: "100%", maxHeight: "100%" }}
            src={url}
          />
        ))}
      </div>
    </div>
  );
};
