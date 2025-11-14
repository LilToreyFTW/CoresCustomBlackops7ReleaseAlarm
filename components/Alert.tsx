'use client'

interface AlertProps {
  show: boolean
  onDismiss: () => void
}

export default function Alert({ show, onDismiss }: AlertProps) {
  if (!show) return null

  return (
    <div className="alert-overlay show" onClick={onDismiss}>
      <div className="alert-box" onClick={(e) => e.stopPropagation()}>
        <div className="alert-icon">🚨</div>
        <h2>MISSION GO</h2>
        <p>Black Ops 7 is now available!</p>
        <p className="alert-subtext">Time to deploy, soldier.</p>
        <button onClick={onDismiss} className="alert-button">
          ACKNOWLEDGED
        </button>
      </div>
    </div>
  )
}

