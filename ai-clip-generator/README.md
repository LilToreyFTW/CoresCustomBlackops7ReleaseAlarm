# Autonomous AI Clip Generator for TSlizzleKilla007 Kills

An AI-powered system that automatically watches Kick VODs on your website, detects when **TSlizzleKilla007** gets kills in Call of Duty, and generates montage clips of YOUR kills only.

## 🎯 Features

- **Autonomous VOD Monitoring**: Automatically detects and processes Kick VODs on your website
- **Player-Specific Detection**: AI detects kills specifically by **TSlizzleKilla007** (your in-game name)
- **Kill Feed Analysis**: Uses OCR to read kill feed text and identify your kills
- **Automatic Clip Generation**: Creates individual clips from YOUR kill moments only
- **Montage Creation**: Compiles YOUR kills into epic montages
- **Background Processing**: Runs invisibly while users watch VODs
- **Queue System**: Handles multiple VODs with job queuing
- **Smart Filtering**: Only captures kills where YOU are the killer, not deaths

## 🏗️ Architecture

### Components:

1. **Frontend VOD Watcher** (`frontend/vod-watcher.js`)
   - Monitors page for Kick video embeds
   - Automatically triggers processing when VOD is detected
   - Runs invisibly in the background

2. **Backend API** (`server.js`)
   - RESTful API for VOD processing
   - Job queue management
   - Status tracking

3. **VOD Processor** (`services/vodProcessor.js`)
   - Downloads Kick VODs
   - Extracts video frames
   - Handles video metadata

4. **Kill Feed Detector** (`services/killFeedDetector.js`)
   - AI model for detecting kill feeds
   - Analyzes video frames
   - Extracts kill information

5. **Clip Generator** (`services/clipGenerator.js`)
   - Extracts clips from kill moments
   - Creates montages
   - Adds effects and transitions

## 🛠️ Technology Stack

- **Backend**: Node.js, Express
- **Video Processing**: FFmpeg
- **AI/ML**: TensorFlow/PyTorch (Python)
- **Queue**: Bull (Redis)
- **Computer Vision**: OpenCV
- **Frontend**: JavaScript (runs on your website)

## 📋 Setup Instructions

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup.

### Quick Start:

1. Install dependencies:
```bash
npm install
pip install tensorflow opencv-python numpy
```

2. Install FFmpeg and Redis

3. Train the kill feed detection model (requires training data)

4. Start the server:
```bash
npm start
```

5. The frontend watcher automatically starts on your website

## 🎮 How It Works

1. **Detection**: VOD Watcher detects Kick video embeds on your website
2. **Download**: Backend downloads the VOD from Kick
3. **Analysis**: AI analyzes video frames to detect kill feeds
4. **Extraction**: Clips are extracted from kill moments (2s before, 5s total)
5. **Montage**: Clips are compiled into a montage
6. **Delivery**: Final montage is available via API

## ⚠️ Important Requirements

### Training Data Needed:
- Screenshots of COD gameplay WITH kill feeds visible
- Screenshots of COD gameplay WITHOUT kill feeds
- Labeled dataset for training the AI model

### Computational Resources:
- CPU: Multi-core recommended
- GPU: Optional but significantly faster
- RAM: 8GB+ recommended
- Storage: Space for videos and clips

### API Access:
- Kick VOD download may require API access or web scraping
- Consider rate limits and terms of service

## 🔧 Configuration

Edit `.env` file:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3001
API_URL=http://localhost:3001
```

## 📡 API Endpoints

- `POST /api/process-vod` - Start processing a VOD
- `GET /api/status/:jobId` - Get processing status
- `GET /api/clips` - Get generated clips
- `GET /admin/queues` - Queue dashboard

## 🚀 Next Steps

1. **Collect Training Data**: Gather COD gameplay screenshots
2. **Train Model**: Run training script with your data
3. **Test Detection**: Verify kill feed detection accuracy
4. **Fine-tune**: Adjust detection parameters
5. **Deploy**: Set up on production server
6. **Monitor**: Watch queue dashboard for processing

## 📝 Notes

- This is a foundation/framework that needs:
  - Actual Kick VOD download implementation
  - Trained kill feed detection model
  - Production deployment setup
  - Storage solution (S3, etc.)
  - Error handling and retry logic

- The system is designed to be extensible and can be enhanced with:
  - Better AI models
  - More sophisticated clip selection
  - Advanced video effects
  - Automatic upload to YouTube/TikTok
  - Notification system
