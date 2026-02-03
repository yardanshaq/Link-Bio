import { useState, useEffect, useRef } from 'react';

interface Song {
  title: string;
  artist: string;
  audioSrc: string;
  albumArtUrl: string;
}

export const SpotifyPlayer = () => {
  // --- REFS ---
  const audioRef = useRef<HTMLAudioElement>(null);
  const nextAudioRef = useRef<HTMLAudioElement>(null);
  const prevAudioRef = useRef<HTMLAudioElement>(null);
  const wasPlayingRef = useRef(false);
  const isReadyToPlayRef = useRef(false);

  // --- STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // --- HELPER: Preload Images ---
  const preloadImages = (songsToLoad: Song[]) => {
    songsToLoad.forEach((song) => {
      const img = new Image();
      img.src = song.albumArtUrl;
    });
  };

  // --- FETCH SONGS (Metode Cepat via Public Folder) ---
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Fetch langsung ke file di folder public (sangat cepat, <10ms)
        const response = await fetch('/songs.json');
        
        if (!response.ok) {
          throw new Error(`Gagal memuat lagu: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle format array langsung atau object { songs: [] }
        const songsArray = Array.isArray(data) ? data : (data.songs || []);
        
        const formattedSongs = songsArray.map((song: any) => ({
          title: song.title,
          artist: song.artist,
          audioSrc: song.audioSrc,
          albumArtUrl: song.albumArtUrl
        }));
        
        setSongs(formattedSongs);
        setIsLoading(false);
        
        // Preload gambar segera
        preloadImages(formattedSongs);
      } catch (error) {
        console.error('Error loading songs:', error);
        setIsLoading(false);
      }
    };

    fetchSongs();

    // Munculkan player dengan animasi halus
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // --- PRELOAD NEXT/PREV AUDIO ---
  useEffect(() => {
    if (songs.length === 0) return;

    const nextIndex = (currentTrackIndex + 1) % songs.length;
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : songs.length - 1;

    if (nextAudioRef.current) {
      nextAudioRef.current.src = songs[nextIndex].audioSrc;
      nextAudioRef.current.load();
    }

    if (prevAudioRef.current) {
      prevAudioRef.current.src = songs[prevIndex].audioSrc;
      prevAudioRef.current.load();
    }
  }, [currentTrackIndex, songs]);

  // --- AUDIO EVENT LISTENERS ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || songs.length === 0) return;

    isReadyToPlayRef.current = false;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    const handleCanPlay = () => {
      isReadyToPlayRef.current = true;
      setIsBuffering(false);
      
      // Auto-resume jika sebelumnya playing
      if (wasPlayingRef.current) {
        audio.play().then(() => {
          setIsPlaying(true);
          wasPlayingRef.current = false;
        }).catch((error) => {
          console.error('Auto-play error:', error);
          setIsPlaying(false);
          wasPlayingRef.current = false;
        });
      }
    };

    const handleCanPlayThrough = () => {
      isReadyToPlayRef.current = true;
      setIsBuffering(false);
    };

    const handleEnded = () => {
      wasPlayingRef.current = true;
      handleNext();
    };

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      isReadyToPlayRef.current = true;
    };
    const handleLoadStart = () => {
      setIsBuffering(true);
      isReadyToPlayRef.current = false;
    };
    const handleLoadedData = () => setIsBuffering(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);

    audio.preload = 'auto';
    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentTrackIndex, songs]);

  // --- HANDLERS ---
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
      if (isReadyToPlayRef.current || audio.readyState >= 3) {
        audio.play().then(() => setIsPlaying(true)).catch(console.error);
      } else {
        setIsBuffering(true);
        const tryPlay = () => {
          if (audio.readyState >= 3) {
            audio.play().then(() => {
              setIsPlaying(true);
              setIsBuffering(false);
            }).catch(() => {
              setIsBuffering(false);
            });
          } else {
            setTimeout(tryPlay, 100);
          }
        };
        tryPlay();
      }
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
    wasPlayingRef.current = isPlaying;
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : songs.length - 1;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
  };

  const handleNext = () => {
    wasPlayingRef.current = isPlaying;
    const newIndex = (currentTrackIndex + 1) % songs.length;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
  };

  if (isLoading || songs.length === 0) {
    return (
      <div 
        className="spotify-card spotify-theme"
        style={{ display: isVisible ? 'block' : 'none' }}
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
      <audio id="audio-player" ref={audioRef} src={currentTrack.audioSrc} preload="auto" />
      <audio ref={nextAudioRef} preload="auto" style={{ display: 'none' }} />
      <audio ref={prevAudioRef} preload="auto" style={{ display: 'none' }} />
      
      <div 
        className="spotify-card spotify-theme"
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <div className="spotify-header">
          <i className="fa-brands fa-spotify"></i>
          <span>Listening on Spotify</span>
        </div>

        <div className="spotify-content">
          <img
            id="spotify-album-art"
            src={currentTrack.albumArtUrl}
            alt={`${currentTrack.title} album art`}
            loading="eager"
            decoding="async"
            style={{ 
              opacity: isBuffering ? 0.7 : 1,
              transition: 'opacity 0.2s ease' 
            }}
          />
          <div className="spotify-info">
            <strong id="spotify-song-title">{currentTrack.title}</strong>
            <span id="spotify-artist-name">{currentTrack.artist}</span>
          </div>
        </div>

        <div className="spotify-progress">
          <div id="progress-bar-track" onClick={handleProgressClick}>
            <div id="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="spotify-time">
            <span id="current-time">{formatTime(currentTime)}</span>
            <span id="total-duration">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="spotify-controls">
          <button id="prev-btn" className="spotify-control" onClick={handlePrev}>
            <i className="fa-solid fa-backward-step"></i>
          </button>

          <button id="play-pause-btn" className="spotify-control main" onClick={handlePlayPause}>
            {isBuffering ? (
               <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
               <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            )}
          </button>

          <button id="next-btn" className="spotify-control" onClick={handleNext}>
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>
      </div>
    </>
  );
};
