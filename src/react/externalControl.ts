let startupCallback: (() => void) | undefined = undefined;

export const registerReactStartupCallback = (
  callback: (() => void) | undefined
) => {
  startupCallback = callback;
};

export const reactStartup = () => {
  startupCallback?.();
};
