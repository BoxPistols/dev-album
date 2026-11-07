import "@testing-library/jest-dom/vitest";

// Node 25以降は組み込みのlocalStorageがglobalThisにあり、--localstorage-file無しだと
// undefinedを返す。これがjsdomのlocalStorageより優先されるので、jsdomの実体を明示して渡す
const jsdomWindow = (globalThis as { jsdom?: { window: Window } }).jsdom?.window;
if (jsdomWindow && !globalThis.localStorage) {
  Object.defineProperty(globalThis, "localStorage", {
    value: jsdomWindow.localStorage,
    configurable: true,
  });
}
