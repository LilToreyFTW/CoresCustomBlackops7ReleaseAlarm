# Installation Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Python** (v3.8 or higher) with pip
3. **FFmpeg** - Video processing
4. **Redis** - Queue management
5. **GPU** (optional but recommended) - For faster AI processing

## Step 1: Install System Dependencies

### FFmpeg Installation

**Windows:**
```bash
# Download from https://ffmpeg.org/download.html
# Add to system PATH
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

### Redis Installation

**Windows:**
- Download from https://redis.io/download
- Or use WSL

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis
```

## Step 2: Install Node.js Dependencies

```bash
cd ai-clip-generator
npm install
```

## Step 3: Install Python Dependencies

```bash
pip install tensorflow opencv-python numpy pillow
# For GPU support:
pip install tensorflow-gpu
```

## Step 4: Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

## Step 5: Train Kill Feed Detection Model

**Important:** You need training data first!

1. Collect screenshots from COD gameplay
2. Label them (has kill feed / no kill feed)
3. Organize in folders:
   ```
   training_data/
     kill_feed/
       image1.jpg
       image2.jpg
     no_kill_feed/
       image1.jpg
       image2.jpg
   ```
4. Run training:
```bash
python scripts/trainKillFeedDetector.py
```

## Step 6: Start the Server

```bash
npm start
```

The server will run on `http://localhost:3001`

## API Usage

### Process a VOD

```bash
curl -X POST http://localhost:3001/api/process-vod \
  -H "Content-Type: application/json" \
  -d '{"vodUrl": "https://kick.com/liltorey/videos/..."}'
```

### Check Status

```bash
curl http://localhost:3001/api/status/{jobId}
```

### View Queue Dashboard

Visit: `http://localhost:3001/admin/queues`

## ⚠️ Important Notes

- **Training Data Required**: The AI model needs to be trained on COD kill feed screenshots
- **Computational Resources**: Video processing is CPU/GPU intensive
- **Storage**: Ensure sufficient disk space for videos and clips
- **Kick API**: May need to implement web scraping or use Kick's API if available

