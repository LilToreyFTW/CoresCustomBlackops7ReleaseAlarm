# Deployment Guide

## 🚀 Deploy to GitHub and Vercel

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `GameLaunchAlarm` (or any name you prefer)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/GameLaunchAlarm.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Or if you prefer SSH:**
```bash
git remote add origin git@github.com:YOUR_USERNAME/GameLaunchAlarm.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Website (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in (use GitHub to sign in)
2. Click "Add New..." → "Project"
3. Import your `GameLaunchAlarm` repository
4. Vercel will auto-detect the settings:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Click "Deploy"
6. Wait for deployment (usually takes 1-2 minutes)
7. Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (run this in your project directory)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? GameLaunchAlarm (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

### Step 4: Verify YouTube Video Works

The YouTube video should work automatically on Vercel. If it doesn't:

1. Check that the iframe URL is correct in `index.html`
2. Make sure the video is set to public on YouTube
3. The video should work on both local and deployed versions

### Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## ✅ Verification Checklist

- [ ] Code pushed to GitHub
- [ ] Repository is public (or you've configured Vercel access)
- [ ] Vercel deployment successful
- [ ] Website loads correctly
- [ ] Timer is counting down
- [ ] YouTube video plays
- [ ] Responsive design works on mobile
- [ ] Alerts work when timer reaches zero

## 🔧 Troubleshooting

### YouTube Video Not Loading
- Check browser console for errors
- Verify the video ID in the iframe URL
- Make sure the video is not set to private

### Vercel Deployment Fails
- Check that all files are committed to Git
- Verify `vercel.json` is correct
- Check Vercel build logs for errors

### Timer Not Working
- Check browser console for JavaScript errors
- Verify the target date in `timer.js` is correct
- Make sure JavaScript is enabled in browser

## 📝 Next Steps

After deployment:
1. Share your live URL with others
2. Monitor the countdown as launch approaches
3. Test the alert system before launch day
4. Consider adding analytics (Google Analytics, etc.)

---

**Your site is now live! 🎉**

