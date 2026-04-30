/**
 * Aether Music - Simplified YouTube Player
 * Guaranteed cross-module compatibility
 */

let player = null;
let isAPIReady = false;

// Shared utility (duplicate to avoid dependency issues)
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// YouTube IFrame API Ready callback
window.onYouTubeIframeAPIReady = function() {
  console.log('✅ YouTube IFrame API Ready');
  isAPIReady = true;
  initializePlayer();
};

function initializePlayer() {
  const playerDiv = document.getElementById('youtube-player');
  if (!playerDiv) {
    console.error('❌ youtube-player div not found in DOM!');
    return;
  }

  console.log('🎵 Initializing YouTube Backend...');
  
  player = new YT.Player('youtube-player', {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      playsinline: 1,
      enablejsapi: 1
    },
    events: {
      onReady: onReady,
      onStateChange: onStateChange,
      onError: onError
    }
  });
}

function onReady(event) {
  console.log('✅ YouTube Player Ready');
  window.ytPlayer = player;
  window.ytReady = true;
  player.setVolume(AppState.volume * 100 || 70);
}

function onStateChange(event) {
  const states = {
    '-1': 'unstarted',
    '0': 'ended',
    '1': 'playing',
    '2': 'paused',
    '3': 'buffering',
    '5': 'cued'
  };
  
  console.log('📺 YT State:', states[event.data] || event.data);
  
  if (event.data === YT.PlayerState.ENDED) {
    if (typeof playNext === 'function') playNext();
  } else if (event.data === YT.PlayerState.PLAYING) {
    if (window.AppState) AppState.isPlaying = true;
    if (window.DOM && DOM.waveform) DOM.waveform.classList.remove('paused');
    if (typeof updatePlayPauseButton === 'function') updatePlayPauseButton();
    startProgress();
  } else if (event.data === YT.PlayerState.PAUSED) {
    if (window.AppState) AppState.isPlaying = false;
    if (window.DOM && DOM.waveform) DOM.waveform.classList.add('paused');
    if (typeof updatePlayPauseButton === 'function') updatePlayPauseButton();
    stopProgress();
  } else if (event.data === YT.PlayerState.CUED) {
    // Attempt to get duration earlier if possible
    try {
      if (window.DOM && player.getDuration) {
        DOM.totalTime.textContent = formatTime(player.getDuration());
      }
    } catch(e) {}
  }
}

function onError(event) {
  console.error('❌ YouTube Error Code:', event.data);
  let msg = 'Playback error';
  if (event.data === 2) msg = 'Invalid video ID';
  if (event.data === 5) msg = 'HTML5 player error';
  if (event.data === 100) msg = 'Video not found/removed';
  if (event.data === 101 || event.data === 150) msg = 'Video not embeddable';
  
  console.warn('Handling YouTube Error:', msg);
  
  // Show user notification via app DOM if possible
  if (window.DOM) {
    DOM.playerTitle.textContent = `Error: ${msg}`;
  }

  // Skip to next after short delay
  setTimeout(() => {
    if (typeof playNext === 'function') playNext();
  }, 2000);
}

let progressTimer = null;

function startProgress() {
  if (progressTimer) clearInterval(progressTimer);
  
  progressTimer = setInterval(() => {
    if (player && player.getCurrentTime && window.DOM && window.DOM.progressFill) {
      try {
        const current = player.getCurrentTime();
        const total = player.getDuration();
        
        if (total > 0) {
          const percent = (current / total) * 100;
          window.DOM.progressFill.style.width = percent + '%';
          window.DOM.currentTime.textContent = formatTime(current);
          window.DOM.totalTime.textContent = formatTime(total);
        }
      } catch (e) {
        console.error("Progress update failed:", e);
      }
    }
  }, 500); // 500ms is enough and more stable
}

function stopProgress() {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
}

// Export global control object
window.YouTubePlayer = {
  play: (videoId) => {
    if (!player || !window.ytReady) {
      console.warn('⏳ YouTube player not ready, retrying in 500ms...');
      setTimeout(() => window.YouTubePlayer.play(videoId), 500);
      return;
    }
    
    console.log(`▶️ YouTube playing: ${videoId}`);
    player.loadVideoById(videoId);
    player.playVideo();
    startProgress(); // Direct start to be responsive
  },
  
  pause: () => {
    if (player && player.pauseVideo) player.pauseVideo();
  },
  
  resume: () => {
    if (player && player.playVideo) player.playVideo();
  },
  
  stop: () => {
    if (player && player.stopVideo) player.stopVideo();
  },
  
  setVolume: (vol) => {
    if (player && player.setVolume) player.setVolume(vol * 100);
  },
  
  seek: (seconds) => {
    if (player && player.seekTo) player.seekTo(seconds, true);
  },
  
  isReady: () => !!window.ytReady
};

console.log('📺 YouTube module initialized');

