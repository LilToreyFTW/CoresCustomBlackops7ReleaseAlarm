# 🚀 Quick Deploy to Cloud (5 Minutes)

## Option 1: Render.com (Recommended - Free Tier Available)

### Step 1: Sign up
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `CoresCustomBlackops7ReleaseAlarm`
3. Settings:
   - **Name:** `cod-clip-generator`
   - **Root Directory:** `ai-clip-generator`
   - **Environment:** `Docker`
   - **Dockerfile Path:** `ai-clip-generator/Dockerfile`
   - **Build Command:** (leave empty, Docker handles it)
   - **Start Command:** `node server.js`

### Step 3: Add Redis
1. Click "New +" → "Redis"
2. Name: `cod-clip-redis`
3. Plan: Free (or Starter for production)
4. Copy the Redis connection details

### Step 4: Set Environment Variables
In your Web Service → Environment:
```
NODE_ENV=production
PORT=3001
REDIS_HOST=<from Redis service>
REDIS_PORT=<from Redis service>
REDIS_PASSWORD=<if set>
```

### Step 5: Deploy
Click "Create Web Service" - Render auto-deploys!

### Step 6: Get Your URL
Your service gets a URL like: `https://cod-clip-generator.onrender.com`

### Step 7: Update Frontend
Add to `.env.local`:
```
NEXT_PUBLIC_API_URL=https://cod-clip-generator.onrender.com
```

## Option 2: Fly.io (Great Free Tier)

### Step 1: Install Fly CLI
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

### Step 2: Login
```bash
fly auth login
```

### Step 3: Initialize
```bash
cd ai-clip-generator
fly launch
```
- App name: `cod-clip-generator`
- Region: Choose closest to you
- PostgreSQL: No
- Redis: Yes (creates automatically)

### Step 4: Deploy
```bash
fly deploy
```

### Step 5: Get URL
```bash
fly open
```

### Step 6: Update Frontend
Add to `.env.local`:
```
NEXT_PUBLIC_API_URL=https://cod-clip-generator.fly.dev
```

## Option 3: DigitalOcean App Platform

### Step 1: Sign up
1. Go to https://cloud.digitalocean.com/apps
2. Sign up

### Step 2: Create App
1. Click "Create App"
2. Connect GitHub → Select repository
3. Configure:
   - **Type:** Docker
   - **Dockerfile Path:** `ai-clip-generator/Dockerfile`
   - **Root Directory:** `ai-clip-generator`

### Step 3: Add Redis Database
1. Click "Add Resource" → "Database"
2. Choose Redis
3. Plan: Basic ($15/month) or Dev ($12/month)

### Step 4: Set Environment Variables
```
NODE_ENV=production
PORT=8080
REDIS_HOST=<from database>
REDIS_PORT=25061
REDIS_PASSWORD=<from database>
```

### Step 5: Deploy
Click "Create Resources" - Deploys automatically!

## Option 4: Vercel (Serverless Functions)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd ai-clip-generator
vercel
```

### Step 3: Add Redis
Use Upstash Redis (free tier):
1. Go to https://upstash.com
2. Create Redis database
3. Copy connection string

### Step 4: Set Environment Variables
In Vercel dashboard:
```
REDIS_URL=<upstash-connection-string>
NODE_ENV=production
```

## Option 5: AWS (Free Tier Available)

### Step 1: Install AWS CLI
```bash
# Follow: https://aws.amazon.com/cli/
```

### Step 2: Create ECS Task
1. Go to AWS Console → ECS
2. Create cluster (Fargate)
3. Create task definition (use Dockerfile)
4. Deploy service

### Step 3: Add ElastiCache Redis
1. Create ElastiCache Redis cluster
2. Get connection endpoint

### Step 4: Set Environment Variables
In ECS task definition:
```
REDIS_HOST=<elasticache-endpoint>
REDIS_PORT=6379
NODE_ENV=production
```

## ✅ Test After Deployment

Visit: `https://your-url.com/api/health`

Should return:
```json
{
  "status": "healthy",
  "service": "AI Clip Generator",
  "player": "TSlizzleKilla007"
}
```

## 💰 Cost Comparison

- **Render:** Free tier (spins down after inactivity) or $7/month
- **Fly.io:** Free tier (3 VMs) + $0.02/hour for Redis
- **DigitalOcean:** $12-25/month (includes Redis)
- **Vercel:** Free tier + Upstash Redis free tier
- **AWS:** Free tier for 12 months, then pay-as-you-go

## 🎯 Recommended: Render.com

**Why Render?**
- ✅ Easy setup
- ✅ Free tier available
- ✅ Built-in Redis
- ✅ Auto-deploys from GitHub
- ✅ No credit card needed for free tier

## 📝 Next Steps

1. Choose your platform
2. Deploy following steps above
3. Update frontend with API URL
4. Test with a VOD
5. Monitor logs
