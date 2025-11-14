const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs').promises;

/**
 * Clip Generator Service
 * Creates montages from detected kill feed moments
 */
class ClipGenerator {
  constructor() {
    this.clipsDir = path.join(__dirname, '../clips');
    this.montagesDir = path.join(__dirname, '../montages');
    this.ensureDirectories();
  }

  async ensureDirectories() {
    try {
      await fs.mkdir(this.clipsDir, { recursive: true });
      await fs.mkdir(this.montagesDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directories:', error);
    }
  }

  /**
   * Extract clip from video
   * @param {string} videoPath - Source video
   * @param {number} startTime - Start time in seconds
   * @param {number} duration - Clip duration in seconds
   * @param {string} outputName - Output filename
   * @returns {string} Path to generated clip
   */
  async extractClip(videoPath, startTime, duration, outputName) {
    const outputPath = path.join(this.clipsDir, `${outputName}.mp4`);

    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .setStartTime(startTime)
        .setDuration(duration)
        .output(outputPath)
        .on('end', () => {
          console.log(`Clip created: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Error creating clip:', err);
          reject(err);
        })
        .run();
    });
  }

  /**
   * Create montage from multiple clips
   * @param {Array} clipPaths - Array of clip file paths
   * @param {string} outputName - Output montage filename
   * @returns {string} Path to generated montage
   */
  async createMontage(clipPaths, outputName) {
    const outputPath = path.join(this.montagesDir, `${outputName}.mp4`);
    const concatFile = path.join(this.montagesDir, 'concat-list.txt');

    // Create concat file for FFmpeg
    const concatContent = clipPaths
      .map(clip => `file '${path.resolve(clip)}'`)
      .join('\n');
    
    await fs.writeFile(concatFile, concatContent);

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(concatFile)
        .inputOptions(['-f', 'concat', '-safe', '0'])
        .outputOptions(['-c', 'copy'])
        .output(outputPath)
        .on('end', () => {
          console.log(`Montage created: ${outputPath}`);
          fs.unlink(concatFile).catch(console.error);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Error creating montage:', err);
          reject(err);
        })
        .run();
    });
  }

  /**
   * Add effects to montage (transitions, music, etc.)
   * @param {string} montagePath 
   * @param {Object} options 
   * @returns {string}
   */
  async enhanceMontage(montagePath, options = {}) {
    // TODO: Add transitions, music, effects
    // - Crossfade transitions between clips
    // - Background music
    // - Text overlays showing "TSlizzleKilla007" and kill stats
    // - Slow motion effects on headshots
    // - Kill counter overlay
    // - Weapon name overlays
    
    const enhancedPath = montagePath.replace('.mp4', '-enhanced.mp4');
    
    return new Promise((resolve, reject) => {
      // TODO: Use FFmpeg to add:
      // - Fade in/out transitions
      // - Background music
      // - Text overlays with player name and stats
      
      // For now, return original
      resolve(montagePath);
    });
  }

  /**
   * Create montage with player name overlay
   * @param {Array} clipPaths - Array of clip objects with metadata
   * @param {string} playerName - Player name to display
   * @param {string} outputName - Output montage filename
   * @returns {string}
   */
  async createPlayerMontage(clipPaths, playerName, outputName) {
    // TODO: Create montage with:
    // - Player name overlay: "TSlizzleKilla007"
    // - Kill counter
    // - Weapon stats
    // - Best kills highlighted
    
    return this.createMontage(
      clipPaths.map(c => typeof c === 'string' ? c : c.path),
      outputName
    );
  }
}

module.exports = ClipGenerator;

