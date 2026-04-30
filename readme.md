# 🎵 Aether Music

A **production-ready, visually stunning mood-based music streaming website** with a cosmic "Liquid Cosmos" design aesthetic.

![Aether Music](https://img.shields.io/badge/Status-Production%20Ready-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

### 🎨 Design & Aesthetics

- **Liquid Cosmos Theme**: Cosmic nebula with fluid gradients
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: 60fps transitions and floating elements
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Fully Responsive**: Mobile, tablet, desktop, and large screen support

### 🎵 Music Features

- **Mood-Based Navigation**: Happy, Lofi/Chill, Study, Sleep, Trending, Recommended
- **18+ Sample Tracks**: Comprehensive music library across all moods
- **Smart Filtering**: Filter by mood with smooth transitions
- **Search Functionality**: Search by title, artist, or mood
- **Sorting Options**: Sort by date, popularity, or alphabetically

### 🎛️ Music Player

- **Floating Sticky Player**: Spotify-style persistent player
- **Full Controls**: Play/pause, next, previous, seek, volume, mute
- **Visual Feedback**: Waveform animation, progress bar, time display
- **Keyboard Shortcuts**: Space (play/pause), arrows (prev/next)
- **Auto-Play**: Automatically plays next track

### ⚡ Performance

- **Lazy Loading**: Images load as you scroll
- **GPU Acceleration**: Smooth 60fps animations
- **Optimized Assets**: Efficient loading and rendering
- **Accessibility**: WCAG AA compliant with ARIA labels

---

## 🚀 Quick Start

### Installation

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser
3. **Start exploring** the music library!

```bash
# If using a local server (recommended)
# Python 3
python -m http.server 8000

# Node.js
npx serve

# Then open http://localhost:8000
```

### File Structure

```
aether-music/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with Liquid Cosmos theme
├── app.js              # Core application logic
├── music-data.js       # Music library data
├── README.md           # This file
└── assets/
    ├── covers/         # Album cover images
    └── audio/          # Audio files (add your own)
```

---

## 📚 Usage Guide

### Adding New Music

To add new tracks to the library, edit `music-data.js`:

```javascript
{
  id: 19,                                    // Unique ID
  title: "Your Track Title",                 // Track name
  artist: "Artist Name",                     // Artist name
  mood: "happy",                             // Mood: happy, lofi, study, sleep
  audioUrl: "assets/audio/your-track.mp3",   // Audio file path
  coverUrl: "assets/covers/your-cover.jpg",  // Cover image path
  duration: 180,                             // Duration in seconds
  dateAdded: "2026-02-01",                   // Date added (YYYY-MM-DD)
  popularity: 85                             // Popularity score (1-100)
}
```

### Keyboard Shortcuts

| Key               | Action         |
| ----------------- | -------------- |
| `Space`           | Play/Pause     |
| `→` (Right Arrow) | Next track     |
| `←` (Left Arrow)  | Previous track |

### Mood Categories

- **All Tracks**: View entire library
- **Happy**: Upbeat, energetic tracks
- **Lofi/Chill**: Relaxed, ambient music
- **Study**: Focus and concentration music
- **Sleep**: Peaceful, calming tracks
- **Trending**: Newest additions
- **Recommended**: Based on your last played mood

---

## 🎨 Customization

### Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
  --color-purple: #8b5cf6;
  --color-pink: #ec4899;
  --color-cyan: #06b6d4;
  --color-blue: #3b82f6;
  --color-violet: #7c3aed;
  --color-magenta: #d946ef;
}
```

### Typography

Change fonts by updating the Google Fonts import:

```css
@import url("https://fonts.googleapis.com/css2?family=YourFont&display=swap");
```

### Mood Colors

Customize mood-specific colors in `music-data.js`:

```javascript
const moodConfig = {
  happy: {
    name: "Happy",
    primary: "#ec4899",
    secondary: "#f59e0b",
  },
  // ... add more moods
};
```

---

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Semantic markup with ARIA labels
- **CSS3**: Grid, Flexbox, CSS Variables, Animations
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Web Audio API**: Audio playback control
- **Intersection Observer**: Lazy loading images
- **LocalStorage**: Theme and preference persistence

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance Targets

- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **TTI**: < 5s
- **CLS**: < 0.1

---

## 🎯 Deployment

### Static Hosting

Deploy to any static hosting service:

#### **Netlify**

```bash
# Drag and drop the folder to Netlify
# Or use Netlify CLI
netlify deploy --prod
```

#### **Vercel**

```bash
vercel --prod
```

#### **GitHub Pages**

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch and folder
4. Save and deploy

#### **Cloudflare Pages**

1. Connect your Git repository
2. Build command: (none)
3. Output directory: `/`
4. Deploy

---

## 🎵 Audio Files

**Important**: This demo uses placeholder audio URLs. To use real audio:

1. Add your audio files to `assets/audio/`
2. Update `audioUrl` in `music-data.js`
3. Ensure files are royalty-free or properly licensed

### Recommended Audio Sources

- [Free Music Archive](https://freemusicarchive.org/)
- [Incompetech](https://incompetech.com/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Bensound](https://www.bensound.com/)

---

## 🖼️ Album Covers

Album covers are generated as placeholders. For production:

1. Add cover images to `assets/covers/`
2. Update `coverUrl` in `music-data.js`
3. Recommended size: 500x500px or 1000x1000px
4. Format: JPG or WebP for best performance

---

## ♿ Accessibility

- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Clear focus states
- **Screen Reader Support**: Semantic HTML structure
- **Reduced Motion**: Respects `prefers-reduced-motion`

---

## 📱 Responsive Breakpoints

| Device       | Breakpoint | Grid Columns |
| ------------ | ---------- | ------------ |
| Small Mobile | < 480px    | 2            |
| Mobile       | < 768px    | 2-3          |
| Tablet       | < 1024px   | 3-4          |
| Desktop      | < 1600px   | 4-5          |
| Large Screen | > 1600px   | 5+           |

---

## 🐛 Troubleshooting

### Audio Not Playing

1. Check browser console for errors
2. Verify audio file paths in `music-data.js`
3. Ensure audio files are in correct format (MP3, OGG, WAV)
4. Check browser autoplay policies

### Images Not Loading

1. Verify image paths in `music-data.js`
2. Check file permissions
3. Use browser DevTools to inspect network requests

### Theme Not Persisting

1. Check if localStorage is enabled
2. Clear browser cache and reload
3. Check browser privacy settings

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**Note**: Ensure all music and images used are properly licensed for your use case.

---

## 🌟 Credits

- **Design**: Inspired by modern music streaming platforms
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)

---

## 📞 Support

For issues or questions:

- Open an issue on GitHub
- Check the troubleshooting section
- Review the code comments for implementation details

---

## 🎉 Enjoy Aether Music!

Built with ❤️ for music lovers and cosmic dreamers.

**Happy Listening! 🎵✨**
