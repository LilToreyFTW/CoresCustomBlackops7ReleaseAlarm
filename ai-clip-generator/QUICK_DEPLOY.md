# 🚀 Quick Deploy to Cloud (5 Minutes)

## Easiest Option: Railway

### Step 1: Sign up
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Create Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository: `CoresCustomBlackops7ReleaseAlarm`
4. Select root directory: `ai-clip-generator`

### Step 3: Add Redis
1. Click "+ New"
2. Select "Redis"
3. Railway automatically connects it

### Step 4: Set Environment Variables
In Railway dashboard → Variables:
```
NODE_ENV=production
PORT=3001
```

Redis variables are auto-set by Railway!

### Step 5: Deploy
Railway automatically deploys when you push to GitHub!

### Step 6: Get Your URL
1. Click on your service
2. Click "Settings" → "Generate Domain"
3. Copy the URL (e.g., `https://cod-clip-generator-production.up.railway.app`)

### Step 7: Update Frontend
1. Add to `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
```

2. Redeploy your Next.js app on Vercel

## ✅ Done!

Your AI is now running in the cloud! It will automatically:
- Watch for Kick VODs on your website
- Detect TSlizzleKilla007 kills
- Generate montages

## 🎯 Test It

Visit: `https://your-railway-url.railway.app/api/health`

Should return:
```json
{
  "status": "healthy",
  "service": "AI Clip Generator",
  "player": "TSlizzleKilla007"
}
```

## 💰 Cost

Railway free tier: $5 credit/month
- Perfect for testing!
- Upgrade when you need more

