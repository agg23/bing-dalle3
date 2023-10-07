import { useEffect, useState } from "react";
import { PromptDBEntry, db } from "../../content/db";

export const usePromptList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [prompts, setPrompts] = useState<Array<PromptDBEntry> | undefined>();

  useEffect(() => {
    (async () => {
      const prompts = await db.prompt.toArray();

      prompts.sort((a, b) => b.recordTimestamp - a.recordTimestamp);

      setIsLoading(false);
      setPrompts(prompts);
    })();
  }, []);

  return {
    isLoading,
    prompts,
  };
};
