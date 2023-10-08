const stripShrunkImageUrl = (url: string): string => {
  const sections = url.split("?");

  return sections[0];
};

interface ImageGeneration {
  id: string;
  prompt: string;
  imageUrls: string[];
}

const QUERY_STRING_ID_REGEX = /id=(.*?)(&|$|;)/;

export const grabRecentGenerations = (): ImageGeneration[] => {
  // Get anchor tags of previous generations
  const imageGroups = document.getElementsByClassName("girr_set");

  const generations: ImageGeneration[] = [];

  for (const group of imageGroups) {
    const titleAttribute = group.attributes.getNamedItem("title");
    const hrefAttribute = group.attributes.getNamedItem("href");

    if (!titleAttribute || !hrefAttribute) {
      console.error("Unknown prompt or id");
      continue;
    }

    const title = titleAttribute.value;
    const href = hrefAttribute.value;

    const images = group.getElementsByTagName("img");

    if (images.length < 1) {
      // No child images, ignore this generation (probably still generating)
      continue;
    }

    const imageUrls: string[] = [];
    for (const image of images) {
      const src = image.attributes.getNamedItem("src");

      if (!src) {
        // Skip this image
        continue;
      }

      imageUrls.push(stripShrunkImageUrl(src.value));
    }

    const splitHref = href.split("/");

    if (splitHref.length < 1) {
      continue;
    }

    const idSegment = splitHref[splitHref.length - 1].split("?");

    const queryIdMatch =
      idSegment.length > 1 ? idSegment[1].match(QUERY_STRING_ID_REGEX) : null;

    let id: string;

    if (queryIdMatch) {
      // ID is in query string
      id = queryIdMatch[1];
    } else {
      // ID is in path
      id = idSegment[0];
    }

    generations.push({ id, prompt: title, imageUrls });
  }

  return generations;
};
