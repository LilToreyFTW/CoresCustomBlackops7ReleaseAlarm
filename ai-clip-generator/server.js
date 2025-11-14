const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const VODProcessor = require('./services/vodProcessor');
const ClipGenerator = require('./services/clipGenerator');
const KillFeedDetector = require('./services/killFeedDetector');

const app = express();
app.use(express.json());

// VOD Processing Queue
const VODQueue = require('./queues/vodQueue');

// Initialize services
const vodProcessor = new VODProcessor();
const clipGenerator = new ClipGenerator();
const killFeedDetector = new KillFeedDetector();

/**
 * API Endpoint: Start processing a Kick VOD
 * POST /api/process-vod
 * Body: { vodUrl: "https://kick.com/liltorey/videos/..." }
 */
app.post('/api/process-vod', async (req, res) => {
  try {
    const { vodUrl } = req.body;
    
    if (!vodUrl) {
      return res.status(400).json({ error: 'VOD URL is required' });
    }

    // Add VOD to processing queue
    const job = await VODQueue.add('process-vod', {
      vodUrl,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      jobId: job.id,
      message: 'VOD processing started'
    });
  } catch (error) {
    console.error('Error starting VOD processing:', error);
    res.status(500).json({ error: 'Failed to start processing' });
  }
});

/**
 * API Endpoint: Get processing status
 * GET /api/status/:jobId
 */
app.get('/api/status/:jobId', async (req, res) => {
  try {
    const job = await VODQueue.getJob(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const state = await job.getState();
    const progress = job.progress || 0;

    res.json({
      jobId: job.id,
      state,
      progress,
      data: job.returnvalue
    });
  } catch (error) {
    console.error('Error getting job status:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

/**
 * API Endpoint: Get generated clips
 * GET /api/clips
 */
app.get('/api/clips', async (req, res) => {
  try {
    // TODO: Implement clip retrieval from storage
    res.json({
      clips: [],
      message: 'Clips endpoint - to be implemented'
    });
  } catch (error) {
    console.error('Error getting clips:', error);
    res.status(500).json({ error: 'Failed to get clips' });
  }
});

// Bull Board for queue monitoring
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(VODQueue)],
  serverAdapter
});

app.use('/admin/queues', serverAdapter.getRouter());

/**
 * API Endpoint: Health check
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI Clip Generator',
    player: 'TSlizzleKilla007'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AI Clip Generator Server running on port ${PORT}`);
  console.log(`📊 Queue Dashboard: http://localhost:${PORT}/admin/queues`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🎮 Tracking kills for: TSlizzleKilla007`);
});

