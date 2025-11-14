# Cloud Deployment Guide

Deploy the AI Clip Generator to cloud platforms (not on your local computer).

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
railway login
```

2. **Deploy:**
```bash
cd ai-clip-generator
railway init
railway up
```

3. **Add Redis:**
```bash
railway add redis
```

4. **Set Environment Variables:**
```bash
railway variables set NODE_ENV=production
railway variables set PORT=3001
```

5. **Get your API URL:**
```bash
railway domain
```

### Option 2: Render.com

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **New → Web Service**
3. **Connect your GitHub repository**
4. **Settings:**
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Docker
5. **Add Redis:**
   - New → Redis
   - Copy connection details
6. **Environment Variables:**
   - `REDIS_HOST` = (from Redis service)
   - `REDIS_PORT` = (from Redis service)
   - `NODE_ENV` = production
   - `PORT` = 3001
7. **Deploy!**

### Option 3: Fly.io

1. **Install Fly CLI:**
```bash
curl -L https://fly.io/install.sh | sh
```

2. **Login:**
```bash
fly auth login
```

3. **Initialize:**
```bash
cd ai-clip-generator
fly launch
```

4. **Add Redis:**
```bash
fly redis create
```

5. **Deploy:**
```bash
fly deploy
```

### Option 4: AWS (EC2/ECS)

1. **Build Docker image:**
```bash
docker build -t cod-clip-generator .
```

2. **Push to ECR:**
```bash
aws ecr create-repository --repository-name cod-clip-generator
docker tag cod-clip-generator:latest <account>.dkr.ecr.<region>.amazonaws.com/cod-clip-generator:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/cod-clip-generator:latest
```

3. **Deploy to ECS or EC2:**
   - Use ECS Fargate for serverless
   - Or EC2 instance for persistent storage

### Option 5: Google Cloud Run

1. **Install gcloud CLI:**
```bash
# Follow: https://cloud.google.com/sdk/docs/install
```

2. **Build and deploy:**
```bash
cd ai-clip-generator
gcloud builds submit --tag gcr.io/[PROJECT-ID]/cod-clip-generator
gcloud run deploy cod-clip-generator \
  --image gcr.io/[PROJECT-ID]/cod-clip-generator \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

3. **Add Redis:**
   - Use Google Cloud Memorystore (Redis)

### Option 6: DigitalOcean App Platform

1. **Go to:** https://cloud.digitalocean.com/apps
2. **Create App → GitHub**
3. **Select repository**
4. **Configure:**
   - **Type:** Docker
   - **Dockerfile Path:** `ai-clip-generator/Dockerfile`
5. **Add Redis Database**
6. **Set Environment Variables**
7. **Deploy!**

## 🔧 Environment Variables

Set these in your cloud platform:

```env
NODE_ENV=production
PORT=3001
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_PASSWORD=<if-required>
```

## 📡 Update Frontend

After deployment, update your Next.js app to point to the cloud API:

1. **Update `components/VODWatcher.tsx`:**
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-deployed-url.com'
```

2. **Add to `.env.local`:**
```env
NEXT_PUBLIC_API_URL=https://your-deployed-url.com
```

## 🗄️ Storage Considerations

For cloud deployment, consider:

1. **Cloud Storage:**
   - AWS S3
   - Google Cloud Storage
   - Azure Blob Storage
   - DigitalOcean Spaces

2. **Update `vodProcessor.js`** to use cloud storage:
```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Upload videos to S3 instead of local storage
```

## 💰 Cost Estimates

- **Railway:** ~$5-20/month (includes Redis)
- **Render:** ~$7-25/month (includes Redis)
- **Fly.io:** ~$5-15/month + Redis
- **AWS/GCP:** Pay-as-you-go (can be $10-50/month)
- **DigitalOcean:** ~$12-25/month

## ✅ Post-Deployment Checklist

- [ ] API is accessible at deployed URL
- [ ] Health check endpoint works: `/api/health`
- [ ] Redis is connected
- [ ] Frontend is updated with new API URL
- [ ] Test VOD processing
- [ ] Monitor logs for errors
- [ ] Set up monitoring/alerts

## 🐛 Troubleshooting

### Redis Connection Issues
- Check Redis host/port in environment variables
- Verify Redis is accessible from your app
- Check firewall rules

### FFmpeg Not Found
- Ensure Dockerfile includes FFmpeg installation
- Check build logs

### Storage Issues
- Use cloud storage instead of local filesystem
- Configure volume mounts in Docker

## 📝 Next Steps

1. Deploy to your chosen platform
2. Update frontend API URL
3. Test with a VOD
4. Monitor performance
5. Scale as needed

