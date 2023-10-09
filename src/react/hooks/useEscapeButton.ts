import { useEffect } from "react";

export const useEscapeButton = (callback: () => void, disable?: boolean) => {
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    if (disable) {
      return;
    }

    console.log("Creating listener");

    window.addEventListener("keydown", onKeydown);

    return () => {
      console.log("removing listener");
      window.removeEventListener("keydown", onKeydown);
    };
  }, [callback, disable]);
};
