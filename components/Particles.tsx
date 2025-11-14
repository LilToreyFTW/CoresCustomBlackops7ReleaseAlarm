'use client'

import { useEffect, useRef } from 'react'

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particleCount = 50

    // Add CSS animation if not already added
    if (!document.getElementById('particle-styles')) {
      const style = document.createElement('style')
      style.id = 'particle-styles'
      style.textContent = `
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0.8;
          }
        }
      `
      document.head.appendChild(style)
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(227, 30, 36, 0.6);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 10px rgba(227, 30, 36, 0.8);
      `
      container.appendChild(particle)
    }

    return () => {
      // Cleanup particles on unmount
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="particles" />
}

