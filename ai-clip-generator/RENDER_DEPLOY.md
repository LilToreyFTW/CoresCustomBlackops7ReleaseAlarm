# 🚀 Deploy to Render.com (Easiest Alternative)

## Step-by-Step Guide

### 1. Sign Up
- Go to https://render.com
- Click "Get Started for Free"
- Sign up with GitHub (easiest)

### 2. Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub account if not already
4. Select repository: `CoresCustomBlackops7ReleaseAlarm`
5. Click "Connect"

### 3. Configure Service
Fill in the form:
- **Name:** `cod-clip-generator`
- **Region:** Choose closest to you (US East, US West, etc.)
- **Branch:** `main`
- **Root Directory:** `ai-clip-generator`
- **Runtime:** `Docker`
- **Dockerfile Path:** `ai-clip-generator/Dockerfile`
- **Docker Context:** `ai-clip-generator`
- **Instance Type:** Free (or Starter for $7/month)

### 4. Add Redis Database
1. Click "New +" → "Redis"
2. Name: `cod-clip-redis`
3. Plan: Free (or Starter for production)
4. Region: Same as your web service
5. Click "Create Redis"

### 5. Link Redis to Web Service
1. Go back to your Web Service
2. Click "Environment" tab
3. Add these variables:
   ```
   NODE_ENV=production
   PORT=3001
   REDIS_HOST=<copy from Redis service>
   REDIS_PORT=<copy from Redis service>
   REDIS_PASSWORD=<if set in Redis>
   ```

To get Redis values:
- Go to your Redis service
- Copy "Internal Redis URL" or use the individual values shown

### 6. Deploy
1. Click "Create Web Service"
2. Render will build and deploy automatically
3. Watch the logs - takes 5-10 minutes first time

### 7. Get Your URL
Once deployed:
- Your service URL: `https://cod-clip-generator.onrender.com`
- Or custom domain if you set one up

### 8. Update Frontend
1. Add to `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=https://cod-clip-generator.onrender.com
   ```

2. Push to GitHub (Vercel will auto-deploy)

### 9. Test
Visit: `https://cod-clip-generator.onrender.com/api/health`

Should see:
```json
{
  "status": "healthy",
  "service": "AI Clip Generator",
  "player": "TSlizzleKilla007"
}
```

## 🎯 That's It!

Your AI is now running in the cloud on Render!

## 💡 Tips

- **Free tier:** Services spin down after 15 min inactivity (wakes up on first request)
- **Starter plan ($7/month):** Always on, better for production
- **Monitoring:** Check logs in Render dashboard
- **Auto-deploy:** Every push to `main` branch auto-deploys

## 🐛 Troubleshooting

**Build fails?**
- Check logs in Render dashboard
- Ensure Dockerfile is correct
- Verify all dependencies in package.json

**Redis connection issues?**
- Use "Internal Redis URL" from Redis service
- Check environment variables are set correctly
- Verify Redis is in same region

**Service won't start?**
- Check PORT is set to 3001
- Verify health check endpoint works
- Check logs for errors

