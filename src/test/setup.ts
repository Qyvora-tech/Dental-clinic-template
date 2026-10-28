import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// Polyfill Element.prototype.scrollTo
if (typeof Element.prototype.scrollTo !== "function") {
  Element.prototype.scrollTo = vi.fn();
}

// Polyfill Element.prototype.setPointerCapture and releasePointerCapture
if (typeof Element.prototype.setPointerCapture !== "function") {
  Element.prototype.setPointerCapture = vi.fn();
}
if (typeof HTMLElement.prototype.setPointerCapture !== "function") {
  HTMLElement.prototype.setPointerCapture = vi.fn();
}
if (typeof Element.prototype.releasePointerCapture !== "function") {
  Element.prototype.releasePointerCapture = vi.fn();
}
if (typeof HTMLElement.prototype.releasePointerCapture !== "function") {
  HTMLElement.prototype.releasePointerCapture = vi.fn();
}

// Polyfill window.IntersectionObserver
if (typeof window.IntersectionObserver === "undefined") {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];

    observe = vi.fn((target?: Element) => {
      if (this.callback && target) {
        this.callback(
          [
            {
              isIntersecting: true,
              target,
              intersectionRatio: 1,
              boundingClientRect: target.getBoundingClientRect
                ? target.getBoundingClientRect()
                : ({} as DOMRectReadOnly),
              intersectionRect: target.getBoundingClientRect
                ? target.getBoundingClientRect()
                : ({} as DOMRectReadOnly),
              rootBounds: null,
              time: Date.now(),
            } as IntersectionObserverEntry,
          ],
          this,
        );
      }
    });

    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);

    constructor(public callback?: IntersectionObserverCallback) {}
  }
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

// Polyfill window.matchMedia
if (typeof window.matchMedia !== "function") {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
