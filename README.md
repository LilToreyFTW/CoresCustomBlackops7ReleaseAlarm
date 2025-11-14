# Call of Duty: Black Ops 7 - Launch Countdown Timer

A professional, fully-featured Next.js countdown timer website for Call of Duty: Black Ops 7 launch. Built with Next.js 14, React, and TypeScript, optimized for Vercel deployment.

## 🎮 Features

- ⏰ **Real-time Countdown Timer** - Live countdown showing days, hours, minutes, and seconds until launch
- 🚨 **Visual & Audio Alerts** - Full-screen alert with sound when the game becomes available
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🔔 **Browser Notifications** - Desktop notifications when the game launches (with permission)
- 🎨 **COD-Themed Design** - Military-inspired UI with animations and particle effects
- 🎬 **Official Trailer** - Embedded YouTube trailer for the game
- ⚡ **Live Status Updates** - Dynamic status messages based on time remaining
- 🚀 **Next.js 14** - Built with the latest Next.js App Router
- ⚛️ **React 18** - Modern React with hooks
- 📘 **TypeScript** - Fully typed for better development experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📋 Launch Details

- **Release Date:** November 14, 2025
- **Release Time:** Midnight PST (12:00 AM)
- **Platforms:** PC, Xbox, PlayStation

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Styled components
- **Google Fonts** - Orbitron & Rajdhani fonts
- **YouTube Embed API** - Video integration

## 📁 Project Structure

```
GameLaunchAlarm/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── Timer.tsx           # Countdown timer component
│   ├── Alert.tsx           # Launch alert component
│   └── Particles.tsx       # Particle effects component
├── public/
│   └── game_launch_header_image/
│       └── game_launch.png # Header image
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🌐 Deploy to Vercel

### Option 1: Via Vercel Website (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"
7. Your site will be live in 1-2 minutes!

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## ✅ Features Breakdown

### Timer Functionality
- Accurate countdown to the exact launch time
- Handles timezone conversion (PST to UTC)
- Updates every second
- Continues working even when tab is inactive

### Alert System
- Full-screen modal when game launches
- Three-tone audio alert sequence
- Browser notification support
- Dismissible alert overlay

### Visual Effects
- Animated particle background
- Glowing text effects
- Smooth transitions and animations
- Hover effects on interactive elements
- Responsive design for all screen sizes

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 License

This project is for educational/personal use. Call of Duty and Black Ops are trademarks of Activision Publishing, Inc.

## 🤝 Contributing

Feel free to fork this project and customize it for other game launches!

---

**Stay locked and loaded. The mission begins soon.** 🎮
