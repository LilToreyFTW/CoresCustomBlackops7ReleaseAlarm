'use client'

import Timer from '@/components/Timer'
import Particles from '@/components/Particles'
import './page.css'

export default function TimerPage() {
  return (
    <>
      <div className="background-overlay"></div>
      <Particles />
      
      <div className="timer-only-container">
        <header className="timer-header">
          <div className="cod-logo-small">CALL OF DUTY</div>
          <div className="game-title-small">BLACK OPS 7</div>
        </header>

        <div className="timer-only-content">
          <div className="launch-info-minimal">
            <h1 className="title-minimal">OPERATION LAUNCH</h1>
            <p className="subtitle-minimal">PC Launch: 9:00 PM PST</p>
            <p className="date-minimal">November 13, 2025</p>
          </div>
          
          <Timer onLaunch={() => {}} />
        </div>
      </div>
    </>
  )
}

