// Target date: November 14, 2025 at 12:00 AM PST
// PST is UTC-8, so midnight PST = 8:00 AM UTC on November 14, 2025
const targetDate = new Date('2025-11-14T08:00:00Z'); // UTC time for midnight PST

// DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const statusElement = document.getElementById('status');
const alertOverlay = document.getElementById('alertOverlay');

let alertShown = false;
let audioContext = null;

// Initialize audio context for alert sound
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Play alert sound
function playAlertSound() {
    if (!audioContext) {
        initAudio();
    }
    
    if (audioContext) {
        // Create a beep sound using Web Audio API
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Play multiple beeps
        setTimeout(() => {
            const oscillator2 = audioContext.createOscillator();
            const gainNode2 = audioContext.createGain();
            
            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext.destination);
            
            oscillator2.frequency.value = 1000;
            oscillator2.type = 'sine';
            
            gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator2.start(audioContext.currentTime);
            oscillator2.stop(audioContext.currentTime + 0.5);
        }, 600);
        
        setTimeout(() => {
            const oscillator3 = audioContext.createOscillator();
            const gainNode3 = audioContext.createGain();
            
            oscillator3.connect(gainNode3);
            gainNode3.connect(audioContext.destination);
            
            oscillator3.frequency.value = 1200;
            oscillator3.type = 'sine';
            
            gainNode3.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator3.start(audioContext.currentTime);
            oscillator3.stop(audioContext.currentTime + 1);
        }, 1200);
    }
}

// Format number with leading zero
function formatTime(value) {
    return value.toString().padStart(2, '0');
}

// Update the countdown timer
function updateTimer() {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        // Time has arrived!
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        const statusIcon = statusElement.querySelector('.status-icon');
        const statusText = statusElement.querySelector('.status-text');
        if (statusIcon) statusIcon.textContent = '🎮';
        if (statusText) {
            statusText.textContent = 'MISSION GO - Black Ops 7 is NOW AVAILABLE!';
        } else {
            statusElement.innerHTML = '<span class="status-icon">🎮</span><span class="status-text">MISSION GO - Black Ops 7 is NOW AVAILABLE!</span>';
        }
        statusElement.style.background = 'rgba(76, 175, 80, 0.3)';
        statusElement.style.borderColor = 'rgba(76, 175, 80, 0.8)';
        statusElement.style.animation = 'pulse 1s ease-in-out infinite';
        
        // Show alert if not already shown
        if (!alertShown) {
            alertShown = true;
            alertOverlay.classList.add('show');
            playAlertSound();
            
            // Request notification permission and send notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Black Ops 7 is Available!', {
                    body: 'The game is now live! Time to play!',
                    icon: '🎮',
                    badge: '🎮'
                });
            }
        }
        return;
    }
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update display
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    
    // Update status message
    const statusIcon = statusElement.querySelector('.status-icon');
    const statusText = statusElement.querySelector('.status-text');
    let statusMsg = '';
    
    if (days > 0) {
        statusMsg = `Standing by... ${days} day${days > 1 ? 's' : ''} until launch`;
    } else if (hours > 0) {
        statusMsg = `Final countdown... ${hours} hour${hours > 1 ? 's' : ''} remaining`;
    } else if (minutes > 0) {
        statusMsg = `Almost there... ${minutes} minute${minutes > 1 ? 's' : ''} to go`;
    } else {
        statusMsg = `Final seconds... ${seconds} second${seconds > 1 ? 's' : ''} remaining`;
    }
    
    if (statusText) {
        statusText.textContent = statusMsg;
    } else {
        statusElement.innerHTML = `<span class="status-icon">⚡</span><span class="status-text">${statusMsg}</span>`;
    }
}

// Dismiss alert function
function dismissAlert() {
    alertOverlay.classList.remove('show');
}

// Create particle effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
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
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation for particles
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
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
        `;
        document.head.appendChild(style);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    createParticles();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    // Initialize audio
    initAudio();
    
    // Update timer immediately
    updateTimer();
    
    // Update timer every second
    setInterval(updateTimer, 1000);
});

// Also update on page visibility change to catch up if tab was inactive
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateTimer();
    }
});

