'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Timer from '@/components/Timer'
import Alert from '@/components/Alert'
import Particles from '@/components/Particles'

export default function Home() {
  const [showAlert, setShowAlert] = useState(false)

  return (
    <>
      <div className="background-overlay"></div>
      <Particles />
      
      <div className="container">
        <header className="main-header">
          <div className="cod-logo">CALL OF DUTY</div>
          <div className="game-title">BLACK OPS 7</div>
        </header>

        <div className="content">
          <div className="header-image-container">
            <Image
              src="/game_launch_header_image/game_launch.png"
              alt="Black Ops 7 Launch"
              width={1200}
              height={600}
              className="header-image"
              priority
            />
          </div>

          <div className="launch-info">
            <h1 className="title">OPERATION LAUNCH</h1>
            <p className="subtitle">PC Launch: 9:00 PM PST (Steam & Battle.net)</p>
            <p className="date">November 13, 2025</p>
          </div>
          
          <Timer onLaunch={() => setShowAlert(true)} />

          <div className="timezone-info">
            <h3 className="timezone-title">Launch Times by Region</h3>
            <div className="timezone-grid">
              <div className="timezone-item">
                <div className="timezone-region">West Coast North America</div>
                <div className="timezone-time">9:00 PM PST</div>
                <div className="timezone-date">Nov. 13</div>
              </div>
              <div className="timezone-item">
                <div className="timezone-region">East Coast North America</div>
                <div className="timezone-time">12:00 AM EST</div>
                <div className="timezone-date">Nov. 14</div>
              </div>
              <div className="timezone-item">
                <div className="timezone-region">Brazil</div>
                <div className="timezone-time">12:00 AM BRT</div>
                <div className="timezone-date">Nov. 14</div>
              </div>
              <div className="timezone-item">
                <div className="timezone-region">United Kingdom</div>
                <div className="timezone-time">12:00 AM GMT</div>
                <div className="timezone-date">Nov. 14</div>
              </div>
              <div className="timezone-item">
                <div className="timezone-region">Western Europe</div>
                <div className="timezone-time">12:00 AM CET</div>
                <div className="timezone-date">Nov. 14</div>
              </div>
              <div className="timezone-item">
                <div className="timezone-region">Japan</div>
                <div className="timezone-time">12:00 AM JST</div>
                <div className="timezone-date">Nov. 14</div>
              </div>
              <div className="timezone-item">
                <div className="timezone-region">East Coast Australia</div>
                <div className="timezone-time">12:00 AM AEDT</div>
                <div className="timezone-date">Nov. 14</div>
              </div>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🎮</div>
              <div className="info-title">Platforms</div>
              <div className="info-text">PC • Xbox • PlayStation</div>
            </div>
            <div className="info-card">
              <div className="info-icon">⏱️</div>
              <div className="info-title">Preload</div>
              <div className="info-text">Available Now</div>
            </div>
            <div className="info-card">
              <div className="info-icon">🌐</div>
              <div className="info-title">Timezone</div>
              <div className="info-text">Pacific Standard Time</div>
            </div>
          </div>

          <div className="trailer-container">
            <h2 className="section-title">OFFICIAL TRAILER</h2>
            <iframe 
              className="trailer-video"
              src="https://www.youtube.com/embed/7qX66lBJHTg?start=1&autoplay=0&rel=0"
              title="Black Ops 7 Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="purchase-section">
            <div className="purchase-header">
              <div className="purchase-icon">💰</div>
              <h2 className="section-title">PRE-ORDER NOW</h2>
              <p className="purchase-subtitle">Get the Vault Edition before midnight!</p>
            </div>
            <div className="vault-edition-image-container">
              <Image
                src="/Vault-Edition-Image/G5llxqsWAAEZHOn.jpeg"
                alt="Call of Duty Black Ops 7 Vault Edition"
                width={800}
                height={600}
                className="vault-edition-image"
                priority={false}
              />
            </div>
            <div className="purchase-options">
              <a 
                href="https://store.steampowered.com/app/1938090/Call_of_Duty/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="purchase-button steam-button"
              >
                <div className="purchase-button-icon">🎮</div>
                <div className="purchase-button-content">
                  <div className="purchase-button-title">Steam</div>
                  <div className="purchase-button-subtitle">BUY VAULT EDITION BEFORE MIDNIGHT</div>
                </div>
                <div className="purchase-button-arrow">→</div>
              </a>
              <a 
                href="https://www.xbox.com/en-US/games/call-of-duty-black-ops-7#purchaseoptions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="purchase-button xbox-button"
              >
                <div className="purchase-button-icon">🎯</div>
                <div className="purchase-button-content">
                  <div className="purchase-button-title">Xbox</div>
                  <div className="purchase-button-subtitle">BUY VAULT EDITION BEFORE MIDNIGHT</div>
                </div>
                <div className="purchase-button-arrow">→</div>
              </a>
              <a 
                href="https://store.playstation.com/en-us/product/UP0002-PPSA01649_00-CODBO7VAULT00001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="purchase-button playstation-button"
              >
                <div className="purchase-button-icon">🎮</div>
                <div className="purchase-button-content">
                  <div className="purchase-button-title">PlayStation</div>
                  <div className="purchase-button-subtitle">BUY VAULT EDITION BEFORE MIDNIGHT</div>
                </div>
                <div className="purchase-button-arrow">→</div>
              </a>
            </div>
          </div>

          <div className="kick-section">
            <div className="kick-header">
              <div className="kick-icon">🎮</div>
              <h2 className="section-title">WATCH LIVE ON KICK</h2>
            </div>
            <div className="kick-content">
              <p className="kick-description">
                Join us live on Kick when Black Ops 7 launches! We'll be streaming the game as soon as it's available.
              </p>
              <a 
                href="https://kick.com/liltorey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="kick-link"
              >
                <span className="kick-link-text">Watch Live on Kick</span>
                <span className="kick-link-icon">🔴</span>
              </a>
              <div className="kick-preview">
                <h3 className="kick-preview-title">Game Preview</h3>
                <iframe 
                  className="trailer-video kick-video"
                  src="https://www.youtube.com/embed/7qX66lBJHTg?start=1&autoplay=0&rel=0"
                  title="Black Ops 7 Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <footer className="footer">
            <p>Stay locked and loaded. The mission begins soon.</p>
            <p className="footer-small">© 2025 Activision Publishing, Inc. All rights reserved.</p>
          </footer>
        </div>
      </div>
      
      <Alert show={showAlert} onDismiss={() => setShowAlert(false)} />
    </>
  )
}

