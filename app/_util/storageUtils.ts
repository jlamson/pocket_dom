"use client";

/**
 * Checks for the availability of the provided storage type on the browser. This
 * implementation is from
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability Mozilla's WebStorage API docs}.
 * @param type either "localStorage" or "sessionStorage"
 * @returns true if the storage type is available, false otherwise
 */
export const storageAvailable = (type: "localStorage" | "sessionStorage") => {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    console.error("storageAvailable error:", e);
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
};

export const NOOP_STORAGE: Storage = {
  length: 0,
  clear: () => {},
  getItem: (key) => null,
  key: (index) => null,
  removeItem: (key) => {},
  setItem: (key, value) => {},
};
