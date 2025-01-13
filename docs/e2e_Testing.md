# E2E Testing Guide

## Setup and Installation

### Prerequisites
- Node.js (v18.18.0 or higher)
- Yarn package manager
- Angular CLI

### Installation Steps
```bash
# Install Cypress and Angular schematic
yarn add -D cypress @cypress/schematic
ng add @cypress/schematic
```

## Running Tests
```bash
# Start development server
yarn start --port 4201

# Open Cypress Test Runner
yarn cypress open

# Run tests headlessly
yarn cypress run
```

## Test Structure
```
cypress/
├── e2e/                    # Test files
│   └── navigation.cy.ts    # Navigation tests
├── fixtures/               # Test data
│   └── example.json        # Sample data
└── support/                # Support files
    └── commands.ts         # Custom commands
```

## Data Attributes

Use these selectors in components:

- `[data-test="landing-page"]`
- `[data-test="nav-about"]`
- `[data-test="portfolio-section"]`
- `[data-test="contact-section"]`

## Best Practices

### Selectors
- Use `data-test` attributes
- Avoid using CSS classes/IDs
- Keep selectors simple

### Test Organization
- One test file per feature
- Use `beforeEach` for setup
- Clean up after tests

### Commands
- Create custom commands for repeated actions
- Keep tests DRY
- Use TypeScript for better intellisense

### CI/CD
- Run tests in the pipeline
- Generate reports
- Save artifacts

## Examples

### Navigation Test
```typescript
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate through sections', () => {
    cy.get('[data-test="landing-page"]').should('be.visible')
    cy.get('[data-test="nav-about"]').click()
    cy.url().should('include', '/about')
  })
})
```
