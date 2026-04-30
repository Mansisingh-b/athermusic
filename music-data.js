/**
 * Aether Music - Music Library Data
 * 
 * This file contains the complete music library with metadata for all tracks.
 * Synced with user's YouTube preferences.
 */

const musicLibrary = [
  {
    id: 1,
    title: "Sunrise Vibes",
    artist: "Cosmic Rays",
    mood: "happy",
    youtubeId: "7qX3SHr4734",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverUrl: "https://img.youtube.com/vi/7qX3SHr4734/maxresdefault.jpg",
    duration: 195,
    dateAdded: "2026-01-28",
    popularity: 92
  },
  {
    id: 2,
    title: "Electric Dreams",
    artist: "Neon Pulse",
    mood: "happy",
    youtubeId: "oypCJZrNfqA",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl: "https://img.youtube.com/vi/oypCJZrNfqA/maxresdefault.jpg",
    duration: 210,
    dateAdded: "2026-01-25",
    popularity: 88
  },
  {
    id: 3,
    title: "Golden Hour",
    artist: "Solar Waves",
    mood: "happy",
    youtubeId: "9XpjsneBjLw",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverUrl: "https://img.youtube.com/vi/9XpjsneBjLw/maxresdefault.jpg",
    duration: 180,
    dateAdded: "2026-01-20",
    popularity: 95
  },
  {
    id: 4,
    title: "Midnight Coffee",
    artist: "Lo-Fi Collective",
    mood: "lofi",
    youtubeId: "Z0TlsxW8E2A",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverUrl: "https://img.youtube.com/vi/Z0TlsxW8E2A/maxresdefault.jpg",
    duration: 165,
    dateAdded: "2026-01-30",
    popularity: 94
  },
  {
    id: 5,
    title: "Rainy Window",
    artist: "Chill Beats",
    mood: "lofi",
    youtubeId: "DEWzT1geuPU",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    coverUrl: "https://img.youtube.com/vi/DEWzT1geuPU/maxresdefault.jpg",
    duration: 190,
    dateAdded: "2026-01-27",
    popularity: 89
  },
  {
    id: 6,
    title: "Lazy Sunday",
    artist: "Mellow Minds",
    mood: "lofi",
    youtubeId: "2BJp6EzE7jY",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    coverUrl: "https://img.youtube.com/vi/2BJp6EzE7jY/maxresdefault.jpg",
    duration: 175,
    dateAdded: "2026-01-22",
    popularity: 91
  },
  {
    id: 7,
    title: "Cozy Nights",
    artist: "Ambient Dreams",
    mood: "lofi",
    youtubeId: "90QqkQNzMFk",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    coverUrl: "https://img.youtube.com/vi/90QqkQNzMFk/maxresdefault.jpg",
    duration: 200,
    dateAdded: "2026-01-18",
    popularity: 87
  },
  {
    id: 8,
    title: "Cosmic Journey",
    artist: "Aether Collective",
    mood: "lofi",
    youtubeId: "gCWaRhNUvfc",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverUrl: "https://img.youtube.com/vi/gCWaRhNUvfc/maxresdefault.jpg",
    duration: 215,
    dateAdded: "2026-02-01",
    popularity: 98
  },
  {
    id: 9,
    title: "Deep Concentration",
    artist: "Brain Waves",
    mood: "study",
    youtubeId: "WPni755-Krg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    coverUrl: "https://img.youtube.com/vi/WPni755-Krg/maxresdefault.jpg",
    duration: 300,
    dateAdded: "2026-01-26",
    popularity: 93
  },
  {
    id: 10,
    title: "Library Ambience",
    artist: "Quiet Mind",
    mood: "study",
    youtubeId: "s6XIt0vUq6A",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    coverUrl: "https://img.youtube.com/vi/s6XIt0vUq6A/maxresdefault.jpg",
    duration: 270,
    dateAdded: "2026-01-21",
    popularity: 85
  },
  {
    id: 11,
    title: "Productivity Peak",
    artist: "Focus Factory",
    mood: "study",
    youtubeId: "amfWIRasxtI",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    coverUrl: "https://img.youtube.com/vi/amfWIRasxtI/maxresdefault.jpg",
    duration: 255,
    dateAdded: "2026-01-16",
    popularity: 88
  },
  {
    id: 12,
    title: "Nebula Drift",
    artist: "Space Sounds",
    mood: "study",
    youtubeId: "5gO0xpY_Y3E",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl: "https://img.youtube.com/vi/5gO0xpY_Y3E/maxresdefault.jpg",
    duration: 285,
    dateAdded: "2026-01-23",
    popularity: 86
  },
  {
    id: 13,
    title: "Starlight Lullaby",
    artist: "Dream Weavers",
    mood: "sleep",
    youtubeId: "FnrCF2eJ0EQ",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    coverUrl: "https://img.youtube.com/vi/FnrCF2eJ0EQ/maxresdefault.jpg",
    duration: 360,
    dateAdded: "2026-01-29",
    popularity: 97
  },
  {
    id: 14,
    title: "Ocean Whispers",
    artist: "Tranquil Sounds",
    mood: "sleep",
    youtubeId: "Wqx06DtYIZs",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    coverUrl: "https://img.youtube.com/vi/Wqx06DtYIZs/maxresdefault.jpg",
    duration: 420,
    dateAdded: "2026-01-24",
    popularity: 92
  },
  {
    id: 15,
    title: "Moonlit Dreams",
    artist: "Night Sky",
    mood: "sleep",
    youtubeId: "5phYJeVAC1Y",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    coverUrl: "https://img.youtube.com/vi/5phYJeVAC1Y/maxresdefault.jpg",
    duration: 390,
    dateAdded: "2026-01-19",
    popularity: 94
  },
  {
    id: 16,
    title: "Peaceful Slumber",
    artist: "Rest & Relax",
    mood: "sleep",
    youtubeId: "1ZYbU82GVz4",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    coverUrl: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg",
    duration: 480,
    dateAdded: "2026-01-14",
    popularity: 90
  },
  {
    id: 17,
    title: "Focus Flow",
    artist: "Study Sessions",
    mood: "study",
    youtubeId: "am1VJP0RnmQ",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    coverUrl: "https://img.youtube.com/vi/am1VJP0RnmQ/maxresdefault.jpg",
    duration: 240,
    dateAdded: "2026-01-31",
    popularity: 96
  }
];

const moodConfig = {
  all: {
    name: "All Tracks",
    primary: "#8b5cf6",
    secondary: "#ec4899"
  },
  happy: {
    name: "Happy",
    primary: "#ec4899",
    secondary: "#f59e0b"
  },
  lofi: {
    name: "Lofi/Chill",
    primary: "#06b6d4",
    secondary: "#8b5cf6"
  },
  study: {
    name: "Study",
    primary: "#3b82f6",
    secondary: "#06b6d4"
  },
  sleep: {
    name: "Sleep",
    primary: "#7c3aed",
    secondary: "#d946ef"
  },
  trending: {
    name: "Trending",
    primary: "#d946ef",
    secondary: "#ec4899"
  },
  recommended: {
    name: "Recommended",
    primary: "#8b5cf6",
    secondary: "#3b82f6"
  }
};

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getTracksByMood(mood) {
  if (mood === 'all') return musicLibrary;
  if (mood === 'trending') {
    return [...musicLibrary].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }
  return musicLibrary.filter(track => track.mood === mood);
}

function getRecommendedTracks(lastMood) {
  if (!lastMood || lastMood === 'all') {
    return [...musicLibrary].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  }
  return musicLibrary.filter(track => track.mood === lastMood);
}

function searchTracks(query) {
  const lowerQuery = query.toLowerCase();
  return musicLibrary.filter(track => 
    track.title.toLowerCase().includes(lowerQuery) ||
    track.artist.toLowerCase().includes(lowerQuery) ||
    track.mood.toLowerCase().includes(lowerQuery)
  );
}

function sortTracks(tracks, sortBy) {
  const sorted = [...tracks];
  switch(sortBy) {
    case 'date':
      return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case 'popularity':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}
