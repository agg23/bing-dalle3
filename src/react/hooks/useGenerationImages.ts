import { useEffect, useState } from "react";
import { ImageDBEntry, db } from "../../content/db";
import Dexie from "dexie";

export const useGenerationImages = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Array<ImageDBEntry> | undefined>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const images = await db.image
        .where("[id+index]")
        .between([id, Dexie.minKey], [id, Dexie.maxKey])
        .toArray();

      setIsLoading(false);
      setImages(images);
    })();
  }, [id]);

  return {
    isLoading,
    images,
  };
};
