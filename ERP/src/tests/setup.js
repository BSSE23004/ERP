import "@testing-library/jest-dom";

/**
 * Setup file for tests
 * Runs before all tests
 */

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock localStorage
const localStorageMock = {
  getItem: (key) => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};
global.localStorage = localStorageMock;

// Suppress console errors in tests
global.console.error = () => {};
