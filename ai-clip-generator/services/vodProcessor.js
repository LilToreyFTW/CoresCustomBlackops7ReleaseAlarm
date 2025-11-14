const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

/**
 * VOD Processor Service
 * Handles downloading and processing Kick VODs
 */
class VODProcessor {
  constructor() {
    this.downloadDir = path.join(__dirname, '../downloads');
    this.processedDir = path.join(__dirname, '../processed');
    this.ensureDirectories();
  }

  async ensureDirectories() {
    try {
      await fs.mkdir(this.downloadDir, { recursive: true });
      await fs.mkdir(this.processedDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directories:', error);
    }
  }

  /**
   * Download VOD from Kick
   * @param {string} vodUrl - Kick VOD URL
   * @returns {string} Path to downloaded video file
   */
  async downloadVOD(vodUrl) {
    try {
      console.log(`Downloading VOD from: ${vodUrl}`);
      
      // Extract video ID from URL
      const videoId = this.extractVideoId(vodUrl);
      const outputPath = path.join(this.downloadDir, `${videoId}.mp4`);

      // TODO: Implement actual Kick VOD download
      // This would require:
      // 1. Kick API access or web scraping
      // 2. Getting video stream URL
      // 3. Downloading video file
      // 4. Saving to local storage

      // For now, return placeholder
      console.log(`VOD would be downloaded to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error('Error downloading VOD:', error);
      throw error;
    }
  }

  /**
   * Extract video ID from Kick URL
   * @param {string} url 
   * @returns {string}
   */
  extractVideoId(url) {
    // Extract from: https://kick.com/liltorey/videos/53dc400d-213c-4a6b-9722-ca1c88a62929
    const match = url.match(/videos\/([a-f0-9-]+)/);
    return match ? match[1] : Date.now().toString();
  }

  /**
   * Extract frames from video at specified intervals
   * @param {string} videoPath 
   * @param {number} interval - Seconds between frames
   * @returns {Array} Array of frame paths
   */
  async extractFrames(videoPath, interval = 1) {
    const framesDir = path.join(this.processedDir, 'frames');
    await fs.mkdir(framesDir, { recursive: true });

    return new Promise((resolve, reject) => {
      const frames = [];
      let frameCount = 0;

      ffmpeg(videoPath)
        .on('end', () => {
          console.log(`Extracted ${frameCount} frames`);
          resolve(frames);
        })
        .on('error', (err) => {
          console.error('Error extracting frames:', err);
          reject(err);
        })
        .screenshots({
          timestamps: this.generateTimestamps(videoPath, interval),
          filename: 'frame-%s.png',
          folder: framesDir
        })
        .on('filenames', (filenames) => {
          filenames.forEach((filename) => {
            frames.push(path.join(framesDir, filename));
            frameCount++;
          });
        });
    });
  }

  /**
   * Generate timestamps for frame extraction
   * @param {string} videoPath 
   * @param {number} interval 
   * @returns {Array}
   */
  async generateTimestamps(videoPath, interval) {
    // TODO: Get video duration and generate timestamps
    // For now, return sample timestamps
    return ['00:00:01', '00:00:02', '00:00:03'];
  }

  /**
   * Get video metadata
   * @param {string} videoPath 
   * @returns {Object}
   */
  async getVideoMetadata(videoPath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          duration: metadata.format.duration,
          width: metadata.streams[0].width,
          height: metadata.streams[0].height,
          fps: metadata.streams[0].r_frame_rate
        });
      });
    });
  }
}

module.exports = VODProcessor;

