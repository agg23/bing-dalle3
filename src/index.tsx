import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./react/App";

console.log("injecting react");

const id = "bing-dalle3-react-root";

let reactRoot = document.getElementById(id);

if (!reactRoot) {
  reactRoot = document.createElement("div");
  reactRoot.id = id;

  reactRoot.style.position = "fixed";
  reactRoot.style.top = "0";
  reactRoot.style.bottom = "0";
  reactRoot.style.left = "0";
  reactRoot.style.right = "0";
  reactRoot.style.zIndex = "100";
  reactRoot.style.background = "rgba(255,255,255,0.5)";

  document.body.append(reactRoot);
}

createRoot(reactRoot).render(<App />);
