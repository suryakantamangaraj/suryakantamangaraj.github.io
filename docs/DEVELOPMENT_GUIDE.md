# Development Guide

## Prerequisites
- **Node.js** (v18.18.0 or higher)
- **npm/yarn**
- **Angular CLI**
- **Git**

---

## Initial Setup

### Step 1: Install Node.js & Angular CLI
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 18
nvm install 18.18.0
nvm use 18.18.0

# Install Angular CLI
npm install -g @angular/cli@16
```

### Step 2: Project Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-v2.git
cd portfolio-v2

# Install dependencies
yarn install
```

---

## Code Quality Tools

### ESLint Setup
1. Install ESLint:
   ```bash
   yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```

2. Create an ESLint configuration file (`.eslintrc.json`):
   ```json
   {
     "root": true,
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint"],
     "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended"
     ]
   }
   ```

### Prettier Setup
1. Install Prettier:
   ```bash
   yarn add -D prettier
   ```

2. Create a Prettier configuration file (`.prettierrc`):
   ```json
   {
     "singleQuote": true,
     "semi": true,
     "tabWidth": 2,
     "printWidth": 100,
     "trailingComma": "es5"
   }
   ```

---

### Husky Setup
1. Install Husky:
   ```bash
   yarn add -D husky
   yarn husky install
   ```

2. Add a pre-commit hook:
   ```bash
   npx husky add .husky/pre-commit "yarn lint-staged"
   ```

---

### Lint-Staged Setup
Add the following to your `package.json`:
```json
{
  "lint-staged": {
    "src/**/*.{ts,scss,html}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
}
```

---

## Development Workflow

### Starting the Development Server
```bash
yarn start
```

### Building the Project
- **Development Build**:
  ```bash
  yarn build
  ```

- **Production Build**:
  ```bash
  yarn build --configuration production
  ```

### Running Tests
- **Unit Tests**:
  ```bash
  yarn test
  ```

- **E2E Tests**:
  ```bash
  yarn cypress:open
  ```

---

## Code Generation
- **Generate a Component**:
  ```bash
  ng generate component features/new-feature
  ```

- **Generate a Service**:
  ```bash
  ng generate service core/services/new-service
  ```

---

## Git Workflow

### Create a Feature Branch
```bash
git checkout -b feature/new-feature
```

### Make Changes and Commit
```bash
git add .
git commit -m "feat: add new feature"
```

### Push Changes
```bash
git push origin feature/new-feature
```

---

## Deployment

### Build for Production
```bash
yarn build --configuration production
```

### Deploy (Example using Firebase)
```bash
firebase deploy
```

---

## Best Practices
- Follow the [Angular Style Guide](https://angular.io/guide/styleguide).
- Write meaningful commit messages.
- Update documentation regularly.
- Add unit tests for new features.

---
