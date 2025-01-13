# Git Workflow Guide

## Branch Strategy

```plaintext
master
└── prod-develop
    ├── feature/name
    └── bugfix/name
```

---

## Workflow Steps

### **1. Start a New Feature**
1. Update the `prod-develop` branch:
   ```bash
   git checkout prod-develop
   git pull origin prod-develop
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```

---

### **2. Development**
1. Make changes to the code.
2. Stage and commit the changes:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. Push changes to the remote repository:
   ```bash
   git push origin feature/new-feature
   ```

---

### **3. Create a Pull Request**
1. Create a pull request from `feature/new-feature` → `prod-develop`.
2. Fill in the PR template.
3. Request code review from peers.
4. Ensure all tests pass before merging.

---

### **4. Merge to Production**
1. Merge from `prod-develop` → `master`.
2. Requirements for merging:
   - At least **2 approvals**.
   - All tests must pass.
3. Auto-deployment is triggered upon merging.

---

## Protection Rules

### **`master` Branch**
- Protected branch.
- Requires a pull request for changes.
- Requires:
  - **2 reviewer approvals**.
  - All tests to pass.

### **`prod-develop` Branch**
- Main development branch.
- Requires:
  - **1 reviewer approval**.
  - All tests to pass.

---

## Commands Reference

### **View Branches**
```bash
git branch -a
```

### **Update a Branch**
```bash
git pull origin branch-name
```

### **Delete a Branch**
- Soft delete:
  ```bash
  git branch -d feature/name
  ```

- Force delete:
  ```bash
  git branch -D feature/name
  ```