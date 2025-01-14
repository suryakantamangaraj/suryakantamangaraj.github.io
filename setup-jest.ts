import 'jest-preset-angular/setup-jest';

// Global mocks for Jest
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance']
  })
});

// Mock animate for animations
Object.defineProperty(Element.prototype, 'animate', {
  value: () => ({
    finished: Promise.resolve(),
    cancel: () => {}
  })
});