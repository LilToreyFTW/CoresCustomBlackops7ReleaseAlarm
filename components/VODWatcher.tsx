'use client'

import { useEffect } from 'react'

/**
 * VOD Watcher Component
 * Automatically detects and processes Kick VODs for clip generation
 */
export default function VODWatcher() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    const watchedVODs = new Set<string>()

    /**
     * Extract VOD URL from embed source
     */
    const extractVODUrl = (embedSrc: string): string | null => {
      const videoMatch = embedSrc.match(/video=([a-f0-9-]+)/)
      if (videoMatch) {
        const videoId = videoMatch[1]
        return `https://kick.com/liltorey/videos/${videoId}`
      }
      return null
    }

    /**
     * Send VOD to backend for processing
     */
    const processVOD = async (vodUrl: string) => {
      try {
        const response = await fetch(`${API_URL}/api/process-vod`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ vodUrl })
        })

        const data = await response.json()
        
        if (data.success) {
          console.log('✅ VOD processing started:', data.jobId)
          // Monitor progress in background
          monitorProgress(data.jobId)
        }
      } catch (error) {
        console.error('Error sending VOD for processing:', error)
      }
    }

    /**
     * Monitor processing progress
     */
    const monitorProgress = async (jobId: string) => {
      const checkStatus = async () => {
        try {
          const response = await fetch(`${API_URL}/api/status/${jobId}`)
          const status = await response.json()

          if (status.state === 'completed') {
            console.log('🎉 VOD processing completed!')
            console.log('📊 Results:', status.data)
          } else if (status.state === 'failed') {
            console.error('❌ VOD processing failed')
          } else {
            console.log(`⏳ Processing... ${status.progress}%`)
            setTimeout(checkStatus, 5000)
          }
        } catch (error) {
          console.error('Error checking status:', error)
        }
      }
      checkStatus()
    }

    /**
     * Handle Kick embed detection
     */
    const handleKickEmbed = async (embedSrc: string) => {
      const vodUrl = extractVODUrl(embedSrc)
      
      if (!vodUrl || watchedVODs.has(vodUrl)) {
        return
      }

      console.log('📹 New Kick VOD detected:', vodUrl)
      watchedVODs.add(vodUrl)
      await processVOD(vodUrl)
    }

    /**
     * Check for Kick embeds
     */
    const checkForKickEmbeds = () => {
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach(iframe => {
        const src = iframe.src || ''
        if (src.includes('kick.com') || src.includes('player.kick.com')) {
          handleKickEmbed(src)
        }
      })
    }

    /**
     * Observe DOM for new embeds
     */
    const observer = new MutationObserver(() => {
      checkForKickEmbeds()
    })

    // Start watching
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Check existing embeds
    checkForKickEmbeds()

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  // This component doesn't render anything visible
  return null
}

