# 🌟 GitHub + Codespaces Setup Guide for AdyaTribe

*This guide helps you sync your project between your local computer and GitHub Codespaces*

---

## 🎯 **Goal: Perfect Sync Between Local & Cloud**

You want to:
- Work on your computer (local development)
- Work in GitHub Codespaces (cloud development)  
- Have all changes sync automatically
- Never lose any work
- Switch between environments seamlessly

---

## 🚀 **Step 1: Push to GitHub (Do This Now)**

### **Option A: If you already have a GitHub repo for AdyaTribe**
```bash
cd D:\AdyaTribe
git add .
git commit -m "Initial AdyaTribe setup with mobile app structure"
git push origin main
```

### **Option B: Your existing repo setup**
Your repository is already set up at: **https://github.com/giquina/AdyaTribe**

To push your current work:
```bash
cd D:\AdyaTribe
git add .
git commit -m "Initial AdyaTribe setup with mobile app structure"
git push origin main
```

**✅ Success checkpoint:** Your code is now on GitHub!

---

## 🔄 **Step 2: Set Up Codespaces**

### **Create a Codespace:**
1. Go to your AdyaTribe repository: **https://github.com/giquina/AdyaTribe**
2. Click the green "Code" button
3. Click "Codespaces" tab
4. Click "Create codespace on main"
5. Wait for it to load (2-3 minutes)

### **Configure Codespace for React Native:**
Once your Codespace opens, run:
```bash
# Navigate to mobile app
cd mobile-app

# Install dependencies
npm install

# Start Expo (for web preview)
npm run web
```

**✅ Success checkpoint:** You can see your app running in the browser!

---

## 🔄 **Step 3: Daily Workflow for Perfect Sync**

### **When Starting Work (ALWAYS do this first):**

**On Local Computer:**
```bash
cd D:\AdyaTribe
git pull origin main
```

**In Codespaces:**
```bash
git pull origin main
```

This downloads any changes you made elsewhere.

### **While Working (Do this frequently):**

**Save your work every 30 minutes:**
```bash
# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Added email validation to onboarding step 3"

# Push to GitHub
git push origin main
```

### **When Switching Environments:**

**From Local to Codespaces:**
1. Commit and push from local
2. Open Codespaces
3. Run `git pull origin main`
4. Continue working

**From Codespaces to Local:**
1. Commit and push from Codespaces
2. Open local terminal
3. Run `git pull origin main` 
4. Continue working

---

## 💻 **Step 4: Codespace Development Setup**

### **VS Code Extensions (Auto-installed in Codespace):**
Create `.devcontainer/devcontainer.json`:

```json
{
  "name": "AdyaTribe Development",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-vscode.vscode-expo",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-json",
        "formulahendry.auto-rename-tag",
        "ms-vscode.vscode-typescript-next"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
    }
  },
  "forwardPorts": [19006, 19001, 19002],
  "postCreateCommand": "cd mobile-app && npm install"
}
```

### **For Mobile Testing in Codespaces:**
- Use Expo web preview (runs in browser)
- Use Expo development build
- Test on your phone by scanning QR code (if ports are forwarded)

---

## 🛠️ **Step 5: Essential Commands Reference**

### **Git Commands You'll Use Daily:**
```bash
# Check what changed
git status

# See your recent commits
git log --oneline -10

# Pull latest changes
git pull origin main

# Add all changes
git add .

# Commit with message
git commit -m "Your descriptive message here"

# Push to GitHub
git push origin main

# See differences in files
git diff
```

### **Project Commands:**
```bash
# Start mobile app
cd mobile-app && npm start

# Install new dependency
cd mobile-app && npm install package-name

# Reset if things break
cd mobile-app && rm -rf node_modules && npm install
```

---

## 🔧 **Step 6: Troubleshooting Sync Issues**

### **If you get merge conflicts:**
```bash
# Pull the latest changes
git pull origin main

# If there are conflicts, Git will tell you which files
# Open the files and look for these markers:
# <<<<<<< HEAD
# Your changes
# =======
# Other changes
# >>>>>>> branch-name

# Edit the file to keep the version you want
# Remove the conflict markers
# Then:
git add .
git commit -m "Resolved merge conflict"
git push origin main
```

### **If you accidentally work without pulling first:**
```bash
# Stash your current changes
git stash

# Pull the latest
git pull origin main

# Apply your changes back
git stash pop

# Resolve any conflicts, then commit and push
```

### **Emergency: Reset to last working version:**
```bash
# This will lose uncommitted changes!
git reset --hard origin/main
```

---

## 📱 **Step 7: Mobile Development in Codespaces**

### **Limitations:**
- Can't directly test on phone camera features
- No access to device sensors
- Limited native module testing

### **Solutions:**
1. **Use Expo Web** for UI development
2. **Test locally** for camera/native features
3. **Use Expo Development Build** for more native testing
4. **Develop in Codespaces, test locally**

### **Recommended Workflow:**
1. **Design & UI work** → Codespaces (faster, better tools)
2. **Camera/Native features** → Local development
3. **Database/API work** → Either (but Codespaces is great)
4. **Final testing** → Local with real device

---

## 🎯 **Step 8: Project-Specific Setup**

### **Environment Variables (for Firebase later):**
Create `.env` file in both environments:
```bash
# Firebase Config (you'll add these later)
EXPO_PUBLIC_FIREBASE_API_KEY=your_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain_here
# ... other Firebase config
```

### **Keep these files in sync:**
- All source code (`src/` folder)
- Configuration files (`package.json`, `app.json`)
- Documentation (`.md` files)
- Environment configs

### **Don't sync these (already in .gitignore):**
- `node_modules/` (too big, regenerated)
- `.env` files with secrets
- Build outputs
- Personal IDE settings

---

## ✅ **Success Checklist**

### **Setup Complete When:**
- [ ] Code is pushed to GitHub
- [ ] Codespace created and working
- [ ] Can run `npm start` in both environments
- [ ] Made a test change and synced successfully
- [ ] Both environments show the same app

### **Daily Workflow:**
- [ ] Always pull before starting work
- [ ] Commit and push frequently (every 30 minutes)
- [ ] Use descriptive commit messages
- [ ] Test app still works after syncing

---

## 🚨 **Emergency Procedures**

### **Lost Work Recovery:**
```bash
# Check if work is in git history
git reflog

# Recover from stash
git stash list
git stash apply stash@{0}

# Check GitHub for last pushed version
# Go to repo on GitHub.com
```

### **Corrupted Environment:**
1. **Codespace:** Delete and recreate from GitHub
2. **Local:** Delete node_modules, run `npm install`
3. **Both:** Reset to last known good commit

---

**🎉 You're now set up for seamless development across local and cloud environments!**

*Remember: When in doubt, commit and push. Better to have too many commits than lose work!*
