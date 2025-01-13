# Testing Guide

## Quick Start

- **Run Unit Tests**:
  ```bash
  yarn test
  ```

- **Run E2E Tests**:
  ```bash
  yarn cypress:open
  ```

---

## Unit Testing (Jest)

### Setup Test File
Create a test file for your component (e.g., `example.component.spec.ts`):
```typescript
// filepath: src/app/features/example/example.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## E2E Testing (Cypress)

### Navigation Test
Write a navigation test to ensure sections are accessible:
```typescript
// filepath: cypress/e2e/navigation.cy.ts
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate sections', () => {
    cy.get('[data-test="nav-about"]').click();
    cy.url().should('include', '/about');
  });
});
```

---

## Data Attributes for E2E Testing
Use `data-test` attributes to create reliable selectors for E2E tests:
```html
<!-- Example -->
<div data-test="section-name">
  <button data-test="action-button">Click Me</button>
</div>
```

---

## Commands Reference

### Unit Tests
- Run tests:
  ```bash
  yarn test
  ```

- Watch mode:
  ```bash
  yarn test:watch
  ```

- Generate coverage report:
  ```bash
  yarn test:coverage
  ```

### E2E Tests
- Open Cypress UI:
  ```bash
  yarn cypress:open
  ```

- Run Cypress in headless mode:
  ```bash
  yarn cypress:run
  ```

---

## Best Practices

### Unit Tests
1. **Structure**: Use one test file per component.
2. **Focus**: Test behavior, not implementation details.
3. **Selectors**: Use `data-test` attributes for better reliability.
4. **Mocking**: Mock external dependencies and services.

### E2E Tests
1. **Critical Paths**: Focus on testing user-critical flows.
2. **Independence**: Ensure tests are independent and can run in isolation.
3. **Selectors**: Use custom commands and avoid flaky selectors.
4. **Stability**: Keep tests simple and avoid over-complication.

---
