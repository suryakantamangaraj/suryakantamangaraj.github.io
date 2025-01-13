# Development & Backup Strategy Guide

## Adding New Features to `prod-develop`

### **1. Clone and Setup**
```bash
# Clone repository
git clone https://github.com/username/portfolio-v2.git
cd portfolio-v2

# Switch to prod-develop
git checkout prod-develop
git pull origin prod-develop
```

---

### **2. Create a Feature Branch**
```bash
# Create and switch to feature branch
git checkout -b feature/new-feature
```

---

### **3. Make Changes**
Update the Angular application to include the new feature module:
```typescript
import { NgModule } from '@angular/core';
...existing code...
import { NewFeatureModule } from './features/new-feature/new-feature.module';

@NgModule({
  imports: [
    ...existing code...,
    NewFeatureModule
  ],
})
export class AppModule {}
```

---

### **4. Test Changes**
```bash
# Run tests
yarn test
yarn cypress:run

# Serve application
yarn start --port 4201
```

---

### **5. Commit Changes**
```bash
# Stage and commit
git add .
git commit -m "feat: add new feature
- Add new feature module
- Configure routing
- Update tests"
```

---

### **6. Push and Create a Pull Request**
```bash
# Push to remote
git push -u origin feature/new-feature

# Create a pull request on GitHub
# Base: prod-develop ← Compare: feature/new-feature
```

---

### **7. After PR Approval**
```bash
# Switch to prod-develop
git checkout prod-develop
git pull origin prod-develop

# Delete the feature branch
git branch -d feature/new-feature
```

---

## Backup Strategy

### **Weekly Backup Process**
```bash
# 1. Update prod-backup from prod-develop
git checkout prod-backup
git pull origin prod-develop

# 2. Create a timestamped tag
git tag backup/$(date +"%Y-%m-%d")

# 3. Push the backup
git push origin prod-backup
git push origin --tags
```

---

### **Restore from Backup**
```bash
# 1. View available backups
git tag -l "backup/*"

# 2. Create a restore branch
git checkout -b restore/feature backup/2024-01-14

# 3. Cherry-pick specific commits if needed
git cherry-pick <commit-hash>
```

---

## Backup Best Practices
- Perform weekly scheduled backups.
- Use **timestamped tags** for easy identification (e.g., `backup/YYYY-MM-DD`).
- Backup only source code, excluding build files.
- Maintain documentation of the restore process.
- Test the restore process quarterly to ensure reliability.

---

## Directory Structure
```plaintext
portfolio-v2/
├── master (production)
├── prod-develop (development)
│   └── feature/* (feature branches)
└── prod-backup
    └── backup/* (tagged backups)
```

---

## Example
```bash
# 1. From prod-develop, create feature branch
git checkout prod-develop
git pull origin prod-develop
git checkout -b feature/add-strategy-docs

# 2. Add new documentation
git add docs/Dev_Bckup_Strategy.md

# 3. Commit changes
git commit -m "docs: add development and backup strategy guide
- Add clone and setup instructions
- Add feature branch workflow
- Add backup procedures"

# 4. Push to remote
git push -u origin feature/add-strategy-docs

# 5. Create PR in GitHub UI
# From: feature/add-strategy-docs
# To: prod-develop
```
- After PR approval:
```bash
git checkout prod-develop
git pull origin prod-develop
git branch -d feature/add-strategy-docs
```
- If getting error while pull
```bash
# 1. Stash untracked file
git stash push --include-untracked

# 2. Pull latest changes
git pull origin prod-develop

# 3. Create feature branch
git checkout -b feature/add-strategy-docs

# 4. Apply stashed changes
git stash pop

# 5. Add and commit
git add docs/Dev_Bckup_Strategy.md
git commit -m "docs: add development and backup strategy guide
- Add clone and setup instructions
- Add feature branch workflow
- Add backup procedures"

# 6. Push to remote
git push -u origin feature/add-strategy-docs
```
---