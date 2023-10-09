import { reactStartup } from "../react/externalControl";
import { startReact } from "../react/index";

const STYLE_TITLE = "bing-dalle3-styles";
const INJECTED_BASE_CLASS = "bing-dalle3-injected";
const REACT_ROOT_ID = "bing-dalle3-react-root";

const restoreBody = () => {
  // Restore root's overflow
  document.documentElement.style.overflow = "";
};

const clearOldElements = () => {
  restoreBody();

  const injectedElements = document.querySelectorAll(`.${INJECTED_BASE_CLASS}`);

  for (const element of injectedElements) {
    element.remove();
  }
};

const injectStylesheet = () => {
  const existingStyles = document.getElementsByTagName("style");

  for (const style of existingStyles) {
    if (style.title === STYLE_TITLE) {
      // We've found it, remove it
      style.remove();
      break;
    }
  }

  const style = document.createElement("style");
  style.type = "text/css";
  // Used to find it again
  style.title = STYLE_TITLE;

  style.textContent = `
    .injected_button {
      /* 2px is due to spacing with the hide blocked checkbox */
      margin: 2px 8px 8px 8px;
    }

    body .injected_button:hover {
      /* Keep border on hover */
      border: solid 2px #e63887;;
    }
  `;

  document.head.appendChild(style);
};

const openSeeAll = () => {
  // Disable root overflow
  document.documentElement.style.overflow = "hidden";

  if (document.getElementById(REACT_ROOT_ID)) {
    // React is already running, just start rendering again
    reactStartup();
  } else {
    const reactRoot = document.createElement("div");
    reactRoot.id = REACT_ROOT_ID;
    reactRoot.className = INJECTED_BASE_CLASS;

    document.body.append(reactRoot);

    startReact(reactRoot);
  }
};

export const injectInPage = () => {
  clearOldElements();

  injectStylesheet();

  // Header
  const headers = document.getElementsByClassName("girrheader");

  if (headers.length < 1) {
    console.error("Cannot find Recent images header. Aborting");
    return;
  }

  const header = headers.item(0)!;

  const seeAllButton = document.createElement("a");
  seeAllButton.className = `${INJECTED_BASE_CLASS} gi_btn_s injected_button`;
  seeAllButton.type = "button";
  seeAllButton.title = "See all";
  seeAllButton.href = "javascript:void(0)";
  seeAllButton.onclick = openSeeAll;
  seeAllButton.innerText = "See all";

  header.insertAdjacentElement("afterend", seeAllButton);
};

export const hideReact = restoreBody;
