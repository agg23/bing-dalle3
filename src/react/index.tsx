import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

export const startReact = (reactRoot: Element) => {
  createRoot(reactRoot).render(<App />);
};
