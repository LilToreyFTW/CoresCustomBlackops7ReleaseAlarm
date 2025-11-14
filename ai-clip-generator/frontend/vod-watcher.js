/**
 * Frontend VOD Watcher
 * Invisibly monitors Kick VODs on the website and triggers processing
 */

class VODWatcher {
  constructor() {
    this.apiUrl = process.env.API_URL || 'http://localhost:3001';
    this.watchedVODs = new Set();
    this.isWatching = false;
  }

  /**
   * Start watching for Kick VOD embeds on the page
   */
  startWatching() {
    if (this.isWatching) return;
    
    this.isWatching = true;
    console.log('🎬 VOD Watcher started');

    // Watch for Kick iframes
    this.observeKickEmbeds();
    
    // Check existing embeds
    this.checkExistingEmbeds();
  }

  /**
   * Observe DOM for new Kick video embeds
   */
  observeKickEmbeds() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            this.checkForKickEmbed(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Check for Kick embed in element
   */
  checkForKickEmbed(element) {
    // Check if element is an iframe with Kick source
    if (element.tagName === 'IFRAME') {
      const src = element.src || '';
      if (src.includes('kick.com') || src.includes('player.kick.com')) {
        this.handleKickEmbed(src);
      }
    }

    // Check children
    const iframes = element.querySelectorAll?.('iframe');
    iframes?.forEach(iframe => {
      const src = iframe.src || '';
      if (src.includes('kick.com') || src.includes('player.kick.com')) {
        this.handleKickEmbed(src);
      }
    });
  }

  /**
   * Check existing embeds on page load
   */
  checkExistingEmbeds() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const src = iframe.src || '';
      if (src.includes('kick.com') || src.includes('player.kick.com')) {
        this.handleKickEmbed(src);
      }
    });
  }

  /**
   * Handle Kick embed detection
   */
  async handleKickEmbed(embedSrc) {
    try {
      // Extract VOD URL from embed source
      const vodUrl = this.extractVODUrl(embedSrc);
      
      if (!vodUrl || this.watchedVODs.has(vodUrl)) {
        return; // Already processed
      }

      console.log('📹 New Kick VOD detected:', vodUrl);
      this.watchedVODs.add(vodUrl);

      // Send to backend for processing
      await this.processVOD(vodUrl);
    } catch (error) {
      console.error('Error handling Kick embed:', error);
    }
  }

  /**
   * Extract VOD URL from embed source
   */
  extractVODUrl(embedSrc) {
    // Extract video ID from embed URL
    // Format: https://player.kick.com/liltorey?video=VIDEO_ID
    const videoMatch = embedSrc.match(/video=([a-f0-9-]+)/);
    if (videoMatch) {
      const videoId = videoMatch[1];
      return `https://kick.com/liltorey/videos/${videoId}`;
    }
    return null;
  }

  /**
   * Send VOD to backend for processing
   */
  async processVOD(vodUrl) {
    try {
      const response = await fetch(`${this.apiUrl}/api/process-vod`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vodUrl })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ VOD processing started:', data.jobId);
        this.monitorProgress(data.jobId);
      } else {
        console.error('❌ Failed to start processing:', data.error);
      }
    } catch (error) {
      console.error('Error sending VOD for processing:', error);
    }
  }

  /**
   * Monitor processing progress
   */
  async monitorProgress(jobId) {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${this.apiUrl}/api/status/${jobId}`);
        const status = await response.json();

        if (status.state === 'completed') {
          console.log('🎉 VOD processing completed!');
          console.log('📊 Results:', status.data);
          // TODO: Display notification or update UI
        } else if (status.state === 'failed') {
          console.error('❌ VOD processing failed');
        } else {
          console.log(`⏳ Processing... ${status.progress}%`);
          // Check again in 5 seconds
          setTimeout(checkStatus, 5000);
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    checkStatus();
  }
}

// Auto-start when script loads
if (typeof window !== 'undefined') {
  const watcher = new VODWatcher();
  
  // Start watching when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => watcher.startWatching());
  } else {
    watcher.startWatching();
  }

  // Export for manual control
  window.VODWatcher = watcher;
}

// For Node.js/Next.js
if (typeof module !== 'undefined') {
  module.exports = VODWatcher;
}

