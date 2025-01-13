# Development Guide

## Local Development

### Start Development Server
- Start the Angular application:
  ```bash
  yarn start --port 4201
  ```

- Start with Hot Module Replacement (HMR):
  ```bash
  yarn start --hmr
  ```

---

## Code Generation

- **Generate a Component**:
  ```bash
  ng g c features/new-feature
  ```

- **Generate a Service**:
  ```bash
  ng g s core/services/new-service
  ```

---

## Code Standards

### TypeScript
- **Use Interfaces for Models**:
  ```typescript
  interface User {
    id: string;
    name: string;
  }
  ```

- **Use Enums for Constants**:
  ```typescript
  enum Role {
    Admin = 'admin',
    User = 'user'
  }
  ```

### Angular
- Use **lazy loading** for features.
- Enable **OnPush** change detection for components.
- Follow the **container/presenter pattern** for component organization.

### SCSS
- Use **BEM naming convention**:
  ```scss
  .block {
    &__element {
      &--modifier { }
    }
  }
  ```

---

## Build & Deploy

### Development Build
- Create a development build:
  ```bash
  yarn build
  ```

### Production Build
- Build for production:
  ```bash
  yarn build --configuration production
  ```

- Run the production build locally:
  ```bash
  yarn start --configuration production
  ```

---

## Common Issues

### Port Already in Use
- Find the process using the port:
  ```bash
  lsof -i :4201
  ```

- Kill the process:
  ```bash
  kill -9 <PID>
  ```

---

### Clear Cache
- Clear Angular cache:
  ```bash
  rm -rf .angular/cache
  ```

- Clear `node_modules` and reinstall:
  ```bash
  rm -rf node_modules
  yarn install
  ```

---

## Best Practices
1. Follow **Angular's best practices** for performance and maintainability.
2. Write **unit tests** for new features.
3. Maintain consistent **code styling** with TypeScript and SCSS conventions.
