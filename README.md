# Surya Raj - Portfolio v2
My personal portfolio website built with Angular. Visit [suryaraj.me](https://suryaraj.me).
---
## Tech Stack
- **Angular 16**
- **SCSS**
- **Angular Material**
- **Firebase Hosting**
---
## Local Development
### Prerequisites
- **Node.js**: 18.19.1
- **Yarn**: 1.22.19
### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/suryakantamangaraj/suryakantamangaraj.github.io.git
   cd suryakantamangaraj.github.io
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Serve the application locally:
   ```bash
   yarn start
   ```
---
## Available Scripts
- **`yarn start`**: Runs the development server at [http://localhost:4200](http://localhost:4200).
- **`yarn build`**: Builds the production-ready bundle.
- **`yarn lint`**: Lints TypeScript and SCSS files.
- **`yarn test`**: Runs unit tests.
- **`yarn deploy`**: Deploys the project to Firebase Hosting.
---
## Project Structure
```plaintext
src/
├── app/
│   ├── features/      # Feature modules (about, portfolio, etc.)
│   ├── layout/        # App layout components
│   ├── shared/        # Shared components, services
│   └── core/          # Core components (services, interfaces, data)
├── assets/            # Images, fonts, etc.
└── environments/      # Environment configurations
```
---
## Git Branches
- **`main`**: Production branch.
- **`prod-develop`**: Development branch.
- **`feature/*`**: Feature-specific branches.
---
## Contributing
1. Create a feature branch from `prod-develop`:
   ```bash
   git checkout -b feature/new-feature
   ```
2. Make changes and commit using conventional commit messages:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
3. Create a pull request to merge your feature branch into `prod-develop`.
---
## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
---
