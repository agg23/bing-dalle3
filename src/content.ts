import { fetchBlobWithRetry } from "./content/api";
import { db } from "./content/db";
import { injectInPage } from "./content/inject";
import { grabRecentGenerations } from "./content/page";

import "./react/index";

const run = async () => {
  console.log("Starting Bing DALL-E 3 Exporter");

  const generations = grabRecentGenerations();

  const recordTimestamp = Date.now();

  let newGenerations = 0;
  for (const { id, prompt, imageUrls } of generations) {
    // Check if this image group is already stored
    try {
      const entryExists = (await db.image.where("id").equals(id).count()) !== 0;

      if (entryExists) {
        continue;
      }
    } catch (e) {
      console.error(e);
      continue;
    }

    newGenerations += 1;

    // Run the image fetch concurrently
    const images = await Promise.all(imageUrls.map(fetchBlobWithRetry));

    try {
      db.transaction("rw", db.image, db.prompt, async () => {
        // TODO: Can these be called concurrently?
        await db.prompt.add({
          id,
          prompt,
          recordTimestamp,
        });

        for (let i = 0; i < images.length; i++) {
          const image = images[i];

          if (!image) {
            // Couldn't get image, give up on this index
            continue;
          }

          await db.image.add({
            id,
            index: i,
            image,
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  console.log(`Completed storing image batch. ${newGenerations} new`);
};

run();
injectInPage();
