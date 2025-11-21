import { useState, useEffect, useRef } from 'react';
import { musicConfig } from '../config';

interface Song {
  title: string;
  artist: string;
  audioSrc: string;
  albumArtUrl: string;
}

export const SpotifyPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const wasPlayingRef = useRef(false);

  const GIST_USER = musicConfig.gistUser;
  const GIST_ID = musicConfig.gistId;
  const GIST_FILE = musicConfig.gistFile
  const GIST_RAW_URL = `https://gist.githubusercontent.com/${GIST_USER}/${GIST_ID}/raw/${GIST_FILE}.json?t=${Date.now()}`;

  // Fetch songs from Gist
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(GIST_RAW_URL);
        const data = await response.json();
        
        // Handle both formats: { songs: [...] } or direct array [...]
        const songsArray = Array.isArray(data) ? data : (data.songs || []);
        
        const formattedSongs = songsArray.map((song: any) => ({
          title: song.title,
          artist: song.artist,
          audioSrc: song.audioSrc,
          albumArtUrl: song.albumArtUrl
        }));
        
        setSongs(formattedSongs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setIsLoading(false);
      }
    };

    fetchSongs();

    // Show player after loading
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || songs.length === 0) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      
      // Auto-play jika sebelumnya sedang playing
      if (wasPlayingRef.current) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Auto-play error:', error);
          setIsPlaying(false);
          wasPlayingRef.current = false;
        });
      }
    };

    const handleEnded = () => {
      // Auto play next track saat lagu selesai
      wasPlayingRef.current = true;
      const newIndex = (currentTrackIndex + 1) % songs.length;
      setCurrentTrackIndex(newIndex);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Preload metadata
    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, songs]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Play error:', error);
      });
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePrev = () => {
    // Simpan kondisi playing sebelumnya
    wasPlayingRef.current = isPlaying;
    
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : songs.length - 1;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
  };

  const handleNext = () => {
    // Simpan kondisi playing sebelumnya
    wasPlayingRef.current = isPlaying;
    
    const newIndex = (currentTrackIndex + 1) % songs.length;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
  };

  if (isLoading || songs.length === 0) {
    return (
      <div 
        className="spotify-card spotify-theme"
        style={{ 
          display: isVisible ? 'block' : 'none'
        }}
      >
        <div className="spotify-header">
          <i className="fa-brands fa-spotify"></i>
          <span>Loading songs...</span>
        </div>
      </div>
    );
  }

  const currentTrack = songs[currentTrackIndex];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden audio element */}
      <audio 
        id="audio-player"
        ref={audioRef} 
        src={currentTrack.audioSrc}
        preload="metadata"
      />
      
      {/* Spotify Card */}
      <div 
        className="spotify-card spotify-theme"
        style={{ 
          display: isVisible ? 'block' : 'none'
        }}
      >
        {/* Header */}
        <div className="spotify-header">
          <i className="fa-brands fa-spotify"></i>
          <span>Listening on Spotify</span>
        </div>

        {/* Track Info */}
        <div className="spotify-content">
          <img
            id="spotify-album-art"
            src={currentTrack.albumArtUrl}
            alt={`${currentTrack.title} album art`}
          />
          <div className="spotify-info">
            <strong id="spotify-song-title">{currentTrack.title}</strong>
            <span id="spotify-artist-name">{currentTrack.artist}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="spotify-progress">
          <div 
            id="progress-bar-track" 
            onClick={handleProgressClick}
          >
            <div 
              id="progress-bar" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="spotify-time">
            <span id="current-time">{formatTime(currentTime)}</span>
            <span id="total-duration">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="spotify-controls">
          <button 
            id="prev-btn" 
            className="spotify-control"
            onClick={handlePrev}
          >
            <i className="fa-solid fa-backward-step"></i>
          </button>

          <button 
            id="play-pause-btn" 
            className="spotify-control main"
            onClick={handlePlayPause}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>

          <button 
            id="next-btn" 
            className="spotify-control"
            onClick={handleNext}
          >
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>
      </div>
    </>
  );
};