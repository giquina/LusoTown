# 🚀 First Codespaces Prompt - Continue AdyaTribe Development

*Copy and paste this message to Claude in GitHub Codespaces to continue your development*

---

Hi Claude! I'm continuing development of **AdyaTribe** in GitHub Codespaces. I just finished setting up the project foundation on my local machine and pushed everything to GitHub.

## 📍 **Project Context**
- **Repository:** https://github.com/giquina/AdyaTribe (you should be in this Codespace)
- **App:** Community platform for 30+ single & childfree women
- **Tech:** React Native + Expo, Firebase (planned), Stripe (planned)
- **Phase:** Foundation complete, working on onboarding flow

## ✅ **What's Already Complete**
1. **Project Structure:** Full mobile app setup with React Native + Expo
2. **Design System:** Complete colors, typography, spacing in `mobile-app/src/constants/Styles.js`
3. **Onboarding Steps 1-2:** 
   - ✅ First name collection with validation
   - ✅ Date of birth with 30+ age verification
4. **Architecture:** Component structure, navigation framework
5. **Documentation:** All project guides and AI agent configurations

## 🎯 **Current Goal: Complete Email Step (Step 3)**
I need to implement the email validation step in the onboarding flow. This should:
- Collect user's email address
- Validate email format in real-time
- Show helpful error messages
- Continue to Step 4 when valid
- Include back navigation

## 📱 **Current Status**
- The app runs successfully with Steps 1-2 working
- User can enter name, select birth date, and navigate between steps
- Ready to add Step 3 (email) to `OnboardingFlow.js`

## 🛠️ **What I Need Help With**
1. **Implementation guidance** for EmailStep.js component
2. **Integration** with the existing OnboardingFlow navigation
3. **Best practices** for email validation in React Native
4. **Testing approach** to ensure it works properly

## 📂 **Key Files to Work With**
- `mobile-app/src/screens/onboarding/OnboardingFlow.js` - Main navigation
- `mobile-app/src/screens/onboarding/EmailStep.js` - Need to create this
- `mobile-app/src/constants/Styles.js` - Design system to use

## 🎨 **Design Requirements**
- Follow existing design patterns from Steps 1-2
- Use consistent styling from the design system
- Include step indicator (3 of 7)
- Friendly, welcoming tone for 30+ women
- Accessible and mobile-optimized

## 🧠 **My Learning Level**
I'm a beginner with React Native, so please:
- Explain concepts clearly with "what" and "why"
- Provide complete, working code examples
- Break complex tasks into small steps
- Help me understand patterns for future features

## 🔧 **Environment Setup**
The Codespace should be pre-configured with all dependencies. If needed:
```bash
cd mobile-app
npm install
npm start
```

## 📋 **Success Criteria**
By the end of this session, I should have:
- A working EmailStep.js component
- Email validation with user feedback
- Smooth navigation between Steps 2-3-4
- Understanding of the pattern for future steps

## 🤖 **Available Resources**
- All project documentation in the repo
- Specialized AI agents in `/claude-agents/` folder
- Complete project context in `claude.md`
- Step-by-step instructions in `DEVELOPMENT_INSTRUCTIONS.md`

Ready to continue building this amazing community app! Where should we start with the email step implementation? 🚀

---

*Note: Feel free to reference any files in the repository - everything is set up and documented for seamless development!*
