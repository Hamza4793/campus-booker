# GitHub Setup Instructions for CampusBooker

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" button in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `campus-booker`
   - **Description**: `Campus facility booking system built with React - Book labs, libraries, auditoriums, and sports halls with clash detection and admin approval`
   - **Visibility**: Public ☑️
   - **Add a README file**: ❌ (we already have one)
   - **Add .gitignore**: ❌ (we already have one)
   - **Choose a license**: Choose your preferred license

5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/campus-booker.git

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Upload

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded

## Step 4: Make Repository Public (if not already)

If you accidentally created it as private:
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Danger Zone"
4. Click "Change repository visibility"
5. Select "Make public" and confirm

## Step 5: Enable GitHub Pages (Optional - for live demo)

1. Go to repository "Settings"
2. Scroll down to "Pages" section
3. Under "Build and deployment", select "Deploy from a branch"
4. Source: "Deploy from a branch"
5. Branch: "main" and folder: "/root"
6. Click "Save"
7. Wait a few minutes, then visit: `https://YOUR_USERNAME.github.io/campus-booker`

## Repository Structure After Upload

Your GitHub repository will contain:
- ✅ Complete React application
- ✅ Comprehensive README with setup instructions
- ✅ Professional project structure
- ✅ All components and utilities
- ✅ CSS styles and responsive design
- ✅ Demo data and documentation

## Sharing Your Project

Once public, you can share:
- **Repository URL**: `https://github.com/YOUR_USERNAME/campus-booker`
- **Live Demo URL** (if GitHub Pages enabled): `https://YOUR_USERNAME.github.io/campus-booker`

## Next Steps

1. **Add a License**: Consider adding MIT or Apache 2.0 license
2. **Add Issues Template**: Create templates for bug reports and feature requests
3. **Add Contributing Guidelines**: Help others contribute to your project
4. **Create Releases**: Tag versions for better project management

## Project Highlights for README

Your project is ready to showcase:
- 🏫 Campus facility booking system
- 🚫 Advanced clash detection algorithm
- 👑 Admin approval workflow
- 💾 LocalStorage persistence
- 📱 Responsive design
- 🎨 Modern UI/UX
- 📚 Comprehensive documentation
- 🔧 Production-ready code

---

**Your CampusBooker project is now ready for the world! 🚀**
