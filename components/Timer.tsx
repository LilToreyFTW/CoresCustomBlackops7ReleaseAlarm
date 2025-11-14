'use client'

import { useEffect, useState, useRef } from 'react'

// Target date: November 14, 2025 at 12:00 AM PST
// PST is UTC-8, so midnight PST = 8:00 AM UTC on November 14, 2025
const TARGET_DATE = new Date('2025-11-14T08:00:00Z')

interface TimerProps {
  onLaunch: () => void
}

export default function Timer({ onLaunch }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [status, setStatus] = useState('Standing by for launch...')
  const [isLaunched, setIsLaunched] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const alertShownRef = useRef(false)

  useEffect(() => {
    // Initialize audio context
    const initAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (e) {
        console.log('Web Audio API not supported')
      }
    }
    initAudio()

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    const updateTimer = () => {
      const now = new Date()
      const difference = TARGET_DATE.getTime() - now.getTime()

      if (difference <= 0) {
        // Time has arrived!
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setStatus('MISSION GO - Black Ops 7 is NOW AVAILABLE!')
        setIsLaunched(true)

        // Show alert if not already shown
        if (!alertShownRef.current) {
          alertShownRef.current = true
          onLaunch()
          playAlertSound()

          // Send notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Black Ops 7 is Available!', {
              body: 'The game is now live! Time to play!',
              icon: '🎮',
              badge: '🎮',
            })
          }
        }
        return
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      // Update status message
      let statusMsg = ''
      if (days > 0) {
        statusMsg = `Standing by... ${days} day${days > 1 ? 's' : ''} until launch`
      } else if (hours > 0) {
        statusMsg = `Final countdown... ${hours} hour${hours > 1 ? 's' : ''} remaining`
      } else if (minutes > 0) {
        statusMsg = `Almost there... ${minutes} minute${minutes > 1 ? 's' : ''} to go`
      } else {
        statusMsg = `Final seconds... ${seconds} second${seconds > 1 ? 's' : ''} remaining`
      }
      setStatus(statusMsg)
    }

    // Update immediately
    updateTimer()

    // Update every second
    const interval = setInterval(updateTimer, 1000)

    // Update on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTimer()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [onLaunch])

  const playAlertSound = () => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (e) {
        return
      }
    }

    const ctx = audioContextRef.current
    if (!ctx) return

    // First beep
    const oscillator1 = ctx.createOscillator()
    const gainNode1 = ctx.createGain()
    oscillator1.connect(gainNode1)
    gainNode1.connect(ctx.destination)
    oscillator1.frequency.value = 800
    oscillator1.type = 'sine'
    gainNode1.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    oscillator1.start(ctx.currentTime)
    oscillator1.stop(ctx.currentTime + 0.5)

    // Second beep
    setTimeout(() => {
      const oscillator2 = ctx.createOscillator()
      const gainNode2 = ctx.createGain()
      oscillator2.connect(gainNode2)
      gainNode2.connect(ctx.destination)
      oscillator2.frequency.value = 1000
      oscillator2.type = 'sine'
      gainNode2.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
      oscillator2.start(ctx.currentTime)
      oscillator2.stop(ctx.currentTime + 0.5)
    }, 600)

    // Third beep
    setTimeout(() => {
      const oscillator3 = ctx.createOscillator()
      const gainNode3 = ctx.createGain()
      oscillator3.connect(gainNode3)
      gainNode3.connect(ctx.destination)
      oscillator3.frequency.value = 1200
      oscillator3.type = 'sine'
      gainNode3.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1)
      oscillator3.start(ctx.currentTime)
      oscillator3.stop(ctx.currentTime + 1)
    }, 1200)
  }

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0')
  }

  return (
    <>
      <div className="timer-container">
        <div className="time-unit">
          <div className="time-value">{formatTime(timeLeft.days)}</div>
          <div className="time-label">Days</div>
        </div>
        <div className="separator">:</div>
        <div className="time-unit">
          <div className="time-value">{formatTime(timeLeft.hours)}</div>
          <div className="time-label">Hours</div>
        </div>
        <div className="separator">:</div>
        <div className="time-unit">
          <div className="time-value">{formatTime(timeLeft.minutes)}</div>
          <div className="time-label">Minutes</div>
        </div>
        <div className="separator">:</div>
        <div className="time-unit">
          <div className="time-value">{formatTime(timeLeft.seconds)}</div>
          <div className="time-label">Seconds</div>
        </div>
      </div>

      <div className={`status ${isLaunched ? 'launched' : ''}`}>
        <span className="status-icon">{isLaunched ? '🎮' : '⚡'}</span>
        <span className="status-text">{status}</span>
      </div>
    </>
  )
}

