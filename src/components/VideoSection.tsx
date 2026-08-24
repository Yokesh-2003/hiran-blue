'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
} from 'lucide-react';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Hidden by default; only shows on hover or click
  const [showControls, setShowControls] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverSeekTime, setHoverSeekTime] = useState<number | null>(null);
  const [hoverSeekPos, setHoverSeekPos] = useState<number>(0);
  const [clickPulse, setClickPulse] = useState<'play' | 'pause' | null>(null);

  // Auto-play when section enters viewport (Muted for autoplay policies)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Autoplay was blocked
                setIsPlaying(false);
              });
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update time and progress as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setCurrentTime(video.currentTime);
        setProgressPercent((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgressPercent(100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Flash / reveal controls temporarily on interaction
  const triggerControlsVisibility = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3200);
  };

  // Handle Play/Pause on click/tap
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    triggerControlsVisibility();

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          triggerPulse('play');
        })
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      triggerPulse('pause');
    }
  };

  const triggerPulse = (type: 'play' | 'pause') => {
    setClickPulse(type);
    setTimeout(() => setClickPulse(null), 500);
  };

  // Handle Mute/Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerControlsVisibility();
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      video.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  // Handle Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    triggerControlsVisibility();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  // Seek on Timeline Bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    triggerControlsVisibility();
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      if (duration) {
        setProgressPercent((newTime / duration) * 100);
      }
    }
  };

  // Restart video
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerControlsVisibility();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerControlsVisibility();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Timeline hover scrub preview
  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    setHoverSeekPos(clampedPos * 100);
    if (duration) {
      setHoverSeekTime(clampedPos * duration);
    }
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '00:00';
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseMove = () => {
    triggerControlsVisibility();
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-6 sm:py-12 lg:py-16 bg-[#fafafa] overflow-hidden border-b border-neutral-200"
    >
      {/* Ambient Glass Glow Layer */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-neutral-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Container */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-4 lg:p-5 bg-white/70 backdrop-blur-3xl border border-white/80 shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.09)] transition-all duration-500">
          
          {/* Video Player Viewport */}
          <div
            ref={containerRef}
            onClick={togglePlay}
            onContextMenu={(e) => e.preventDefault()}
            onMouseMove={handleMouseMove}
            onTouchStart={() => {
              triggerControlsVisibility();
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              triggerControlsVisibility();
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setShowControls(false);
            }}
            className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[16/9] max-h-[720px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl group cursor-pointer"
          >
            {/* Video */}
            <video
              ref={videoRef}
              src="/images/video.mp4"
              playsInline
              muted={isMuted}
              loop
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-cover pointer-events-auto"
            />

            {/* Bottom Gradient for contrast (Only visible on hover/tap) */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 pointer-events-none ${
                showControls || isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Click Pulse Ripple */}
            {clickPulse && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-ping duration-300">
                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#d4af37]/30 backdrop-blur-md flex items-center justify-center border border-[#d4af37]/60">
                  {clickPulse === 'play' ? (
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#d4af37] text-[#d4af37] translate-x-0.5" />
                  ) : (
                    <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-[#d4af37] text-[#d4af37]" />
                  )}
                </div>
              </div>
            )}

            {/* Center Play Button (When Paused & Active Controls) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all z-10 pointer-events-none">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#d4af37] text-neutral-950 flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.6)] backdrop-blur-md transform group-hover:scale-110 active:scale-95 transition-all border border-[#f3e5ab]">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-neutral-950 translate-x-0.5" />
                </div>
              </div>
            )}

            {/* RESPONSIVE FLOATING CONTROLS DOCK (HIDDEN BY DEFAULT; ONLY ON HOVER OR CLICK/TAP) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-2 sm:bottom-6 left-2 sm:left-8 right-2 sm:right-8 z-30 transition-all duration-300 ${
                showControls || isHovered
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              <div className="max-w-5xl mx-auto bg-neutral-950/70 hover:bg-neutral-950/80 backdrop-blur-2xl border border-white/20 rounded-xl sm:rounded-3xl p-2 sm:p-4 shadow-2xl transition-all">
                
                {/* 1. Precision Timeline Scrubber with Gold Luxury Accent */}
                <div
                  onMouseMove={handleProgressMouseMove}
                  onMouseLeave={() => setHoverSeekTime(null)}
                  className="relative flex items-center mb-1.5 sm:mb-3 group/timeline cursor-pointer py-1"
                >
                  {/* Hover Timestamp Tooltip (Desktop) */}
                  {hoverSeekTime !== null && (
                    <div
                      className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#d4af37] text-neutral-950 text-[10px] font-bold font-mono shadow-md pointer-events-none transition-all hidden sm:block"
                      style={{ left: `${hoverSeekPos}%` }}
                    >
                      {formatTime(hoverSeekTime)}
                    </div>
                  )}

                  {/* Track Background */}
                  <div className="w-full h-1 sm:h-2 bg-white/20 rounded-full overflow-hidden relative">
                    {/* Active Progress Bar in Luxury Gold */}
                    <div
                      className="h-full bg-gradient-to-r from-[#c59a3f] via-[#d4af37] to-[#f3e5ab] rounded-full relative transition-all duration-75 shadow-[0_0_12px_rgba(212,175,55,0.7)]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Glowing Circular Playhead Thumb in Luxury Gold */}
                  <div
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-[#d4af37] border-2 border-white rounded-full shadow-[0_0_12px_rgba(212,175,55,0.9)] -translate-x-1/2 pointer-events-none transition-all"
                    style={{ left: `${progressPercent}%` }}
                  />

                  {/* Invisible Range Slider */}
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    aria-label="Video Seek Bar"
                  />
                </div>

                {/* 2. Sleek Controls Toolbar */}
                <div className="flex items-center justify-between text-white text-[11px] sm:text-xs">
                  
                  {/* Left Controls: Play, Replay, Time */}
                  <div className="flex items-center gap-1.5 sm:gap-4">
                    {/* Play/Pause Button in Luxury Gold */}
                    <button
                      onClick={togglePlay}
                      className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#d4af37] text-neutral-950 hover:bg-[#c59a3f] flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.4)] focus:outline-none shrink-0"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-neutral-950" />
                      ) : (
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-neutral-950 translate-x-0.5" />
                      )}
                    </button>

                    {/* Replay Button */}
                    <button
                      onClick={handleRestart}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-[#d4af37] flex items-center justify-center transition-colors focus:outline-none hidden sm:flex"
                      aria-label="Restart Video"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* Digital Timestamp */}
                    <div className="text-[10px] sm:text-xs text-neutral-300 font-mono select-none px-1 tracking-tight sm:tracking-wider">
                      <span className="font-bold text-white">{formatTime(currentTime)}</span>
                      <span className="mx-1 text-neutral-500">/</span>
                      <span className="text-neutral-400">{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Right Controls: Volume / Mute, Fullscreen */}
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    
                    {/* Volume Group */}
                    <div className="flex items-center gap-2 group/vol">
                      <button
                        onClick={toggleMute}
                        className={`p-1.5 sm:px-3 sm:py-1.5 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 focus:outline-none ${
                          isMuted
                            ? 'bg-white/10 hover:bg-white/20 border-white/20 text-neutral-300'
                            : 'bg-[#d4af37] text-neutral-950 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        }`}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
                            <span className="text-[10px] uppercase font-bold tracking-wider hidden md:inline">Muted</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-neutral-950 animate-pulse" />
                            <span className="text-[10px] uppercase font-bold tracking-wider hidden md:inline">Audio On</span>
                          </>
                        )}
                      </button>

                      {/* Expandable Volume Slider on desktop */}
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#d4af37] hidden lg:block"
                        aria-label="Volume level"
                      />
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-[#d4af37] transition-colors focus:outline-none"
                      aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                      {isFullscreen ? (
                        <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
