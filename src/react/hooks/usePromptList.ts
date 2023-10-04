import { useEffect, useState } from "react";
import { PromptDBEntry, db } from "../../content/db";

export const usePromptList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [prompts, setPrompts] = useState<Array<PromptDBEntry> | undefined>();

  useEffect(() => {
    (async () => {
      const prompts = await db.prompt.toArray();

      setIsLoading(false);
      setPrompts(prompts);
    })();
  }, []);

  return {
    isLoading,
    prompts,
  };
};
