# Surya Raj - Portfolio v2

[![Angular](https://img.shields.io/badge/Angular-21-dd0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v24_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-Tested-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

My personal portfolio website built with modern web technologies. Visit the live site at [suryaraj.me](https://suryaraj.me).

---

## 🚀 Tech Stack & Tooling

### Core
- **Framework:** Angular 21
- **Language:** TypeScript 5.9
- **Styling:** SCSS & Angular Material

### Development & Quality Assurance
- **Unit Testing:** Jest (configured with JSdom)
- **E2E Testing:** Cypress
- **Formatting:** Prettier
- **Linting:** ESLint & Stylelint
- **Git Hooks:** Husky & lint-staged

### Deployment & CI
- **Hosting:** Firebase Hosting
- **Bundle Analysis:** Webpack Bundle Analyzer

---

## 💻 Local Development

### Prerequisites

Ensure you have the following installed to run the project locally:
- **Node.js**: v24.13.1 LTS (Auto-configured via `.nvmrc`)
- **Yarn**: v1.22.x

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/suryakantamangaraj/suryakantamangaraj.github.io.git
   cd suryakantamangaraj.github.io
   ```

2. **Set Node Version (if using NVM):**
   ```bash
   nvm use
   ```

3. **Install dependencies:**
   ```bash
   yarn install
   ```

4. **Serve the application:**
   ```bash
   yarn start
   ```
   Navigate to `http://localhost:4200/` to view it in your browser. The app will automatically reload if you change any of the source files.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `yarn start` | Runs the development server on `localhost:4200` |
| `yarn build` | Builds the production-ready application bundle |
| `yarn test` | Executes unit tests via Jest |
| `yarn test:watch` | Runs unit tests in watch mode |
| `yarn test:coverage`| Generates test coverage reports |
| `yarn lint` | Lints TypeScript and SCSS files |
| `yarn format` | Formats all code using Prettier |
| `yarn analyze` | Builds the app and generates a Webpack bundle analysis report |
| `yarn cypress:open` | Opens the Cypress E2E test runner |

---

## 📂 Project Structure

```plaintext
src/
├── app/
│   ├── core/          # Singleton services, models, and interceptors
│   ├── features/      # Lazy-loaded feature modules (About, Portfolio, Contact, etc.)
│   ├── layout/        # Global layout structural components (Header, Footer, Nav)
│   └── shared/        # Reusable UI components, directives, and pipes
├── assets/            # Static assets (images, icons, fonts)
├── environments/      # Environment-specific configuration files
└── styles/            # Global SCSS variables, mixins, and themes
```

---

## 🌿 Git Strategy & Workflow

This repository follows a structured branching model:
- **`main`**: Production branch. Deployments are triggered from here.
- **`prod-develop`**: Primary development integration branch.
- **`feature/*`**: Scoped branches for new features or implementations.

### Contributing

1. Create a feature branch originating from `prod-develop`:
   ```bash
   git checkout -b feature/your-awesome-feature
   ```
2. Commit your changes utilizing conventional commit messages. Husky will automatically lint and format your staged files:
   ```bash
   git add .
   git commit -m "feat: add awesome new feature"
   ```
3. Push your branch and create a Pull Request against `prod-develop`.

---

## 📄 License

This project is open-sourced software licensed under the **[MIT License](LICENSE)**.
