/**
 * Aether Music - Main Application
 * 
 * Core Features:
 * - Audio playback with Web Audio API
 * - Mood-based filtering
 * - Search functionality
 * - Sorting options
 * - Theme toggle with persistence
 * - Keyboard shortcuts
 * - Auto-play next track
 */

// ===========================
// STATE MANAGEMENT
// ===========================
window.AppState = {
  currentTrack: null,
  currentTrackIndex: -1,
  isPlaying: false,
  currentMood: 'all',
  currentSort: 'default',
  searchQuery: '',
  volume: 0.7,
  isMuted: false,
  theme: localStorage.getItem('aether-theme') || 'dark',
  lastPlayedMood: localStorage.getItem('aether-last-mood') || null,
  filteredTracks: [...musicLibrary]
};
const AppState = window.AppState;

// ===========================
// DOM ELEMENTS
// ===========================
window.DOM = {
  // Audio
  audio: document.getElementById('audioPlayer'),
  
  // Player controls
  player: document.getElementById('player'),
  playPauseBtn: document.getElementById('playPauseBtn'),
  playPauseIcon: document.getElementById('playPauseIcon'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  
  // Player info
  playerImage: document.getElementById('playerImage'),
  playerTitle: document.getElementById('playerTitle'),
  playerArtist: document.getElementById('playerArtist'),
  
  // Progress
  progressBar: document.getElementById('progressBar'),
  progressFill: document.getElementById('progressFill'),
  currentTime: document.getElementById('currentTime'),
  totalTime: document.getElementById('totalTime'),
  
  // Volume
  volumeBtn: document.getElementById('volumeBtn'),
  volumeIcon: document.getElementById('volumeIcon'),
  volumeSlider: document.getElementById('volumeSlider'),
  volumeFill: document.getElementById('volumeFill'),
  
  // Waveform
  waveform: document.getElementById('waveform'),
  
  // UI Controls
  searchInput: document.getElementById('searchInput'),
  moodButtons: document.getElementById('moodButtons'),
  sortSelect: document.getElementById('sortSelect'),
  musicGrid: document.getElementById('musicGrid'),
  trackCount: document.getElementById('trackCount'),
  emptyState: document.getElementById('emptyState'),
  
  // Theme
  themeToggle: document.getElementById('themeToggle'),
  themeIcon: document.getElementById('themeIcon')
};
const DOM = window.DOM;

// ===========================
// INITIALIZATION
// ===========================
function init() {
  // Set initial theme
  document.body.setAttribute('data-theme', AppState.theme);
  updateThemeIcon();
  
  // Set initial volume
  DOM.audio.volume = AppState.volume;
  
  // Render initial tracks
  renderTracks();
  
  // Setup event listeners
  setupEventListeners();
  
  console.log('🎵 Aether Music initialized');
}

// ===========================
// EVENT LISTENERS
// ===========================
function setupEventListeners() {
  // Player controls
  DOM.playPauseBtn.addEventListener('click', togglePlayPause);
  DOM.prevBtn.addEventListener('click', playPrevious);
  DOM.nextBtn.addEventListener('click', playNext);
  
  // Progress bar
  DOM.progressBar.addEventListener('click', seek);
  
  // Volume controls
  DOM.volumeBtn.addEventListener('click', toggleMute);
  DOM.volumeSlider.addEventListener('click', setVolume);
  
  // Audio events
  DOM.audio.addEventListener('timeupdate', updateProgress);
  DOM.audio.addEventListener('ended', handleTrackEnd);
  DOM.audio.addEventListener('loadedmetadata', handleMetadataLoaded);
  
  // Search
  DOM.searchInput.addEventListener('input', handleSearch);
  
  // Mood buttons
  DOM.moodButtons.addEventListener('click', handleMoodClick);
  
  // Sort
  DOM.sortSelect.addEventListener('change', handleSort);
  
  // Theme toggle
  DOM.themeToggle.addEventListener('click', toggleTheme);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboard);
}

// ===========================
// TRACK RENDERING
// ===========================
function renderTracks() {
  // Apply filters
  let tracks = [...musicLibrary];
  
  // Filter by mood
  if (AppState.currentMood === 'trending') {
    tracks = [...musicLibrary].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  } else if (AppState.currentMood === 'recommended') {
    tracks = getRecommendedTracks(AppState.lastPlayedMood);
  } else if (AppState.currentMood !== 'all') {
    tracks = tracks.filter(track => track.mood === AppState.currentMood);
  }
  
  // Filter by search
  if (AppState.searchQuery) {
    const query = AppState.searchQuery.toLowerCase();
    tracks = tracks.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.mood.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  if (AppState.currentSort !== 'default') {
    tracks = sortTracks(tracks, AppState.currentSort);
  }
  
  // Store filtered tracks
  AppState.filteredTracks = tracks;
  
  // Update track count
  DOM.trackCount.textContent = `${tracks.length} track${tracks.length !== 1 ? 's' : ''}`;
  
  // Render or show empty state
  if (tracks.length === 0) {
    DOM.musicGrid.classList.add('hidden');
    DOM.emptyState.classList.remove('hidden');
  } else {
    DOM.musicGrid.classList.remove('hidden');
    DOM.emptyState.classList.add('hidden');
    
    // Clear grid
    DOM.musicGrid.innerHTML = '';
    
    // Render cards
    tracks.forEach((track, index) => {
      const card = createTrackCard(track, index);
      DOM.musicGrid.appendChild(card);
    });
  }
}

function createTrackCard(track, index) {
  const card = document.createElement('article');
  card.className = 'music-card';
  card.setAttribute('data-track-id', track.id);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Play ${track.title} by ${track.artist}`);
  
  // Use cover from track data (YouTube thumbnail or custom)
  const coverUrl = track.coverUrl;
  
  card.innerHTML = `
    <div class="card-image-container">
      <img 
        src="${coverUrl}" 
        alt="${track.title} album cover" 
        class="card-image"
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/300x300/${getMoodColor(track.mood)}/ffffff?text=${encodeURIComponent(track.title)}'"
      >
      <div class="play-overlay">
        <div class="play-icon">
          <i class="fas fa-play"></i>
        </div>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">${track.title}</h3>
      <p class="card-artist">${track.artist}</p>
      <div class="card-footer">
        <span class="mood-tag" style="background: linear-gradient(135deg, ${moodConfig[track.mood].primary}, ${moodConfig[track.mood].secondary})">
          ${moodConfig[track.mood].name}
        </span>
        <span class="card-duration">${formatDuration(track.duration)}</span>
      </div>
    </div>
  `;
  
  // Click handler
  card.addEventListener('click', () => playTrack(index));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      playTrack(index);
    }
  });
  
  return card;
}

function getMoodColor(mood) {
  const colors = {
    happy: 'ec4899',
    lofi: '06b6d4',
    study: '3b82f6',
    sleep: '7c3aed'
  };
  return colors[mood] || '8b5cf6';
}

// ===========================
// PLAYBACK CONTROLS
// ===========================
// ===========================
// PLAYBACK CONTROLS
// ===========================
function playTrack(index) {
  const track = AppState.filteredTracks[index];
  if (!track) {
    console.error('No track at index:', index);
    return;
  }
  
  console.log('🎵 PLAYING:', track.title);
  
  AppState.currentTrack = track;
  AppState.currentTrackIndex = index;
  
  // Update UI immediately
  DOM.playerImage.src = track.coverUrl;
  DOM.playerTitle.textContent = track.title;
  DOM.playerArtist.textContent = track.artist;
  DOM.player.classList.add('active');
  DOM.currentTime.textContent = "0:00";
  DOM.totalTime.textContent = formatTime(track.duration);
  DOM.progressFill.style.width = "0%";
  
  // STOP EVERYTHING FIRST
  DOM.audio.pause();
  DOM.audio.src = ""; // Clear source to prevent noise
  if (window.YouTubePlayer && window.YouTubePlayer.isReady()) {
    window.YouTubePlayer.stop();
  }
  
  const isYouTube = track.youtubeId && track.youtubeId.length > 2;

  if (isYouTube) {
    console.log('📺 Mode: YouTube');
    if (window.YouTubePlayer) {
      window.YouTubePlayer.play(track.youtubeId);
      // State will be updated via YouTube onStateChange
    } else {
      console.error('❌ YouTube Player module missing!');
      alert('YouTube player not loaded properly.');
    }
  } else {
    console.log('🔊 Mode: HTML5 Audio');
    DOM.audio.src = track.audioUrl;
    DOM.audio.load();
    DOM.audio.volume = AppState.volume;
    
    const playPromise = DOM.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        AppState.isPlaying = true;
        DOM.waveform.classList.remove('paused');
        updatePlayPauseButton();
      }).catch(err => {
        console.error('❌ HTML5 Audio Error:', err);
        AppState.isPlaying = false;
        updatePlayPauseButton();
        if (err.name === 'NotAllowedError') {
          alert('Click PLAY to start music');
        }
      });
    }
  }
  
  // Save mood
  AppState.lastPlayedMood = track.mood;
  localStorage.setItem('aether-last-mood', track.mood);
}

function togglePlayPause() {
  if (!AppState.currentTrack) {
    playTrack(0);
    return;
  }
  
  const isYouTube = AppState.currentTrack.youtubeId && AppState.currentTrack.youtubeId.length > 2;
  
  if (AppState.isPlaying) {
    if (isYouTube && window.YouTubePlayer) {
      window.YouTubePlayer.pause();
    } else {
      DOM.audio.pause();
    }
    AppState.isPlaying = false;
    DOM.waveform.classList.add('paused');
  } else {
    if (isYouTube) {
      if (window.YouTubePlayer) {
        window.YouTubePlayer.resume();
        AppState.isPlaying = true;
        DOM.waveform.classList.remove('paused');
      } else {
        alert('YouTube player not ready.');
      }
    } else {
      DOM.audio.play().then(() => {
        AppState.isPlaying = true;
        DOM.waveform.classList.remove('paused');
      }).catch(err => {
        console.error('Toggle play error:', err);
        alert('Playback failed. Please check your connection.');
      });
    }
  }
  
  updatePlayPauseButton();
}

function playNext() {
  if (AppState.filteredTracks.length === 0) return;
  
  const nextIndex = (AppState.currentTrackIndex + 1) % AppState.filteredTracks.length;
  playTrack(nextIndex);
}

function playPrevious() {
  if (AppState.filteredTracks.length === 0) return;
  
  const prevIndex = AppState.currentTrackIndex - 1 < 0 
    ? AppState.filteredTracks.length - 1 
    : AppState.currentTrackIndex - 1;
  playTrack(prevIndex);
}

function handleTrackEnd() {
  // Auto-play next track
  playNext();
}

function updatePlayPauseButton() {
  if (AppState.isPlaying) {
    DOM.playPauseIcon.className = 'fas fa-pause';
    DOM.playPauseBtn.setAttribute('aria-label', 'Pause');
  } else {
    DOM.playPauseIcon.className = 'fas fa-play';
    DOM.playPauseBtn.setAttribute('aria-label', 'Play');
  }
}

// ===========================
// PROGRESS & TIME
// ===========================
function updateProgress() {
  const { currentTime, duration } = DOM.audio;
  
  if (duration) {
    const progress = (currentTime / duration) * 100;
    DOM.progressFill.style.width = `${progress}%`;
    DOM.progressBar.setAttribute('aria-valuenow', Math.round(progress));
  }
  
  DOM.currentTime.textContent = formatTime(currentTime);
}

function handleMetadataLoaded() {
  DOM.totalTime.textContent = formatTime(DOM.audio.duration);
}

function seek(e) {
  const rect = DOM.progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  
  // YouTube track
  if (AppState.currentTrack && AppState.currentTrack.youtubeId && AppState.currentTrack.youtubeId !== 'placeholder') {
    if (window.YouTubePlayer) {
      const duration = window.ytPlayer && window.ytPlayer.getDuration ? window.ytPlayer.getDuration() : 180;
      const time = percent * duration;
      window.YouTubePlayer.seek(time);
    }
  } else {
    const time = percent * DOM.audio.duration;
    if (!isNaN(time)) {
      DOM.audio.currentTime = time;
    }
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===========================
// VOLUME CONTROLS
// ===========================
function setVolume(e) {
  const rect = DOM.volumeSlider.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  const volume = Math.max(0, Math.min(1, percent));
  
  AppState.volume = volume;
  AppState.isMuted = false;
  
  // Set both players
  DOM.audio.volume = volume;
  if (window.YouTubePlayer) {
    window.YouTubePlayer.setVolume(volume);
  }
  
  DOM.volumeFill.style.width = `${volume * 100}%`;
  DOM.volumeSlider.setAttribute('aria-valuenow', Math.round(volume * 100));
  
  updateVolumeIcon();
}

function toggleMute() {
  AppState.isMuted = !AppState.isMuted;
  
  if (AppState.isMuted) {
    DOM.audio.volume = 0;
    if (window.YouTubePlayer) {
      window.YouTubePlayer.setVolume(0);
    }
    DOM.volumeFill.style.width = '0%';
  } else {
    DOM.audio.volume = AppState.volume;
    if (window.YouTubePlayer) {
      window.YouTubePlayer.setVolume(AppState.volume);
    }
    DOM.volumeFill.style.width = `${AppState.volume * 100}%`;
  }
  
  updateVolumeIcon();
}

function updateVolumeIcon() {
  if (AppState.isMuted || AppState.volume === 0) {
    DOM.volumeIcon.className = 'fas fa-volume-mute';
    DOM.volumeBtn.setAttribute('aria-label', 'Unmute');
  } else if (AppState.volume < 0.5) {
    DOM.volumeIcon.className = 'fas fa-volume-down';
    DOM.volumeBtn.setAttribute('aria-label', 'Mute');
  } else {
    DOM.volumeIcon.className = 'fas fa-volume-up';
    DOM.volumeBtn.setAttribute('aria-label', 'Mute');
  }
}

// ===========================
// FILTERING & SORTING
// ===========================
function handleMoodClick(e) {
  const btn = e.target.closest('.mood-btn');
  if (!btn) return;
  
  const mood = btn.dataset.mood;
  
  // Update active state
  document.querySelectorAll('.mood-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  
  // Update state and render
  AppState.currentMood = mood;
  renderTracks();
}

function handleSearch(e) {
  AppState.searchQuery = e.target.value;
  renderTracks();
}

function handleSort(e) {
  AppState.currentSort = e.target.value;
  renderTracks();
}

// ===========================
// THEME TOGGLE
// ===========================
function toggleTheme() {
  AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', AppState.theme);
  localStorage.setItem('aether-theme', AppState.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  if (AppState.theme === 'dark') {
    DOM.themeIcon.className = 'fas fa-moon';
  } else {
    DOM.themeIcon.className = 'fas fa-sun';
  }
}

// ===========================
// KEYBOARD SHORTCUTS
// ===========================
function handleKeyboard(e) {
  // Don't trigger if user is typing in input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
    return;
  }
  
  switch(e.key) {
    case ' ':
      e.preventDefault();
      togglePlayPause();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      playPrevious();
      break;
    case 'ArrowRight':
      e.preventDefault();
      playNext();
      break;
  }
}

// ===========================
// LAZY LOADING (Intersection Observer)
// ===========================
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'
});

// Observe images when they're added to the DOM
function observeImages() {
  document.querySelectorAll('.card-image').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===========================
// START APPLICATION
// ===========================
document.addEventListener('DOMContentLoaded', init);

// Export for debugging
window.AetherMusic = {
  state: AppState,
  playTrack,
  togglePlayPause,
  playNext,
  playPrevious
};
