# Jest Unit Testing Guide

## Setup and Installation

### Prerequisites
- Node.js (v18.18.0 or higher)
- Angular project
- Jest dependencies

### Dependencies Installation
```bash
yarn add -D jest @types/jest @angular-builders/jest jest-preset-angular
```

## Configuration Files

### Jest Config
```javascript
// filepath: jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary']
};
```

### Setup File
```typescript
// filepath: setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();
```

## Running Tests
```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

## Writing Tests

### Component Test Example
```typescript
// filepath: src/app/features/landing/components/landing-page.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Best Practices

### Test Organization
- One test file per component/service
- Use descriptive test names
- Group related tests using describe blocks

### Test Structure
- Arrange-Act-Assert pattern
- Clear test setup
- Meaningful assertions

### Coverage
- Aim for high coverage
- Focus on critical paths
- Include edge cases

### Mocking
- Mock external dependencies
- Use `jest.spyOn` for method spies
- Avoid testing implementation details

