import 'jest-preset-angular/setup-jest';
import 'jest-extended';

// Global mocks
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
  }),
});

// Animation mocks
Object.defineProperty(window, 'Element', {
  value: class {
    animate() {
      return {
        addEventListener: () => {},
        play: () => {},
        cancel: () => {},
        finished: Promise.resolve(),
      };
    }
  },
});

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
