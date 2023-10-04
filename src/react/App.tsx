import React from "react";
import { usePromptList } from "./hooks/usePromptList";
import { Generation } from "./components/Generation";

export const App: React.FC<{}> = () => {
  const { prompts } = usePromptList();

  console.log("App render");

  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      {prompts?.map((prompt) => (
        <Generation key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
};
