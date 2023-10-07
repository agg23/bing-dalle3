import React from "react";
import { usePromptList } from "./hooks/usePromptList";
import { Generation } from "./components/Generation";
import { Header } from "./components/Header";

import classes from "./App.module.css";

export const App: React.FC<{}> = () => {
  const { prompts } = usePromptList();

  console.log("App render");

  return (
    <div className={classes.app}>
      <div className={classes.mainScroll}>
        <Header />
        {prompts?.map((prompt) => (
          <Generation key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};
