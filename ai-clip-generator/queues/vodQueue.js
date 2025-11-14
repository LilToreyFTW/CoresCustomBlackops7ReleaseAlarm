const Queue = require('bull');
const VODProcessor = require('../services/vodProcessor');
const KillFeedDetector = require('../services/killFeedDetector');
const ClipGenerator = require('../services/clipGenerator');

// Initialize Redis connection for queue
const VODQueue = new Queue('vod-processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Initialize services
const vodProcessor = new VODProcessor();
const killFeedDetector = new KillFeedDetector();
const clipGenerator = new ClipGenerator();

/**
 * Process VOD Job
 * This runs automatically when a VOD is added to the queue
 */
VODQueue.process('process-vod', async (job) => {
  const { vodUrl } = job.data;
  
  try {
    // Update progress
    job.progress(10);

    // Step 1: Download VOD
    console.log('Step 1: Downloading VOD...');
    const videoPath = await vodProcessor.downloadVOD(vodUrl);
    job.progress(30);

    // Step 2: Initialize kill feed detector
    console.log('Step 2: Initializing kill feed detector...');
    await killFeedDetector.initialize();
    job.progress(40);

    // Step 3: Process video and detect kill feeds
    console.log('Step 3: Detecting kill feeds...');
    const detections = await killFeedDetector.processVideo(videoPath);
    job.progress(60);

    // Step 4: Extract clips from TSlizzleKilla007's kill feed moments
    console.log('Step 4: Extracting clips of TSlizzleKilla007 kills...');
    const clipPaths = [];
    for (let i = 0; i < detections.length; i++) {
      const detection = detections[i];
      
      // Only process if TSlizzleKilla007 is the killer
      if (detection.killer && detection.killer.toLowerCase().includes('tslizzlekilla007')) {
        const clipPath = await clipGenerator.extractClip(
          videoPath,
          detection.timestamp - 3, // 3 seconds before kill (to capture the action)
          6, // 6 second clips (to show full kill sequence)
          `tslizzlekilla007-kill-${i + 1}-${detection.victim || 'enemy'}`
        );
        clipPaths.push({
          path: clipPath,
          timestamp: detection.timestamp,
          victim: detection.victim,
          weapon: detection.weapon,
          type: detection.type
        });
        console.log(`✅ Extracted kill clip: ${detection.victim} with ${detection.weapon} at ${detection.timestamp}s`);
      }
      job.progress(60 + (i + 1) * 10 / detections.length);
    }

    // Step 5: Create montage of TSlizzleKilla007's kills
    console.log(`Step 5: Creating montage of ${clipPaths.length} kills by TSlizzleKilla007...`);
    const clipFilePaths = clipPaths.map(c => c.path);
    const montagePath = await clipGenerator.createMontage(
      clipFilePaths,
      `tslizzlekilla007-montage-${Date.now()}`
    );
    job.progress(95);

    // Step 6: Enhance montage
    console.log('Step 6: Enhancing montage...');
    const finalMontage = await clipGenerator.enhanceMontage(montagePath);
    job.progress(100);

    return {
      success: true,
      videoPath,
      detections: detections.length,
      clips: clipPaths.length,
      montagePath: finalMontage
    };
  } catch (error) {
    console.error('Error processing VOD:', error);
    throw error;
  }
});

module.exports = VODQueue;

