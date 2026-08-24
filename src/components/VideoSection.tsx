'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickPulse, setClickPulse] = useState<'play' | 'pause' | null>(null);
  const [hoverSeekTime, setHoverSeekTime] = useState<number | null>(null);
  const [hoverSeekPos, setHoverSeekPos] = useState<number>(0);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSectionVisibleRef = useRef<boolean>(false);
  const userManuallyPausedRef = useRef<boolean>(false);

  // Play Helper
  const playVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  }, []);

  // Pause Helper
  const pauseVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // 1. Tab Visibility Change (Auto-pause when switching tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseVideo();
      } else {
        // Only resume if user did NOT explicitly pause and section is in view
        if (isSectionVisibleRef.current && !userManuallyPausedRef.current) {
          playVideo();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [playVideo, pauseVideo]);

  // 2. IntersectionObserver for Scroll-triggered Auto-play / Auto-pause
  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            isSectionVisibleRef.current = true;
            // Only auto-play if the user has NOT manually paused the video
            if (!document.hidden && !userManuallyPausedRef.current) {
              playVideo();
            }
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
            isSectionVisibleRef.current = false;
            pauseVideo();
          }
        });
      },
      {
        threshold: [0, 0.15, 0.3, 0.6, 1.0],
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, [playVideo, pauseVideo]);

  // 3. Video Events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgressPercent((video.currentTime / video.duration) * 100);
      }
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      userManuallyPausedRef.current = true;
      pauseVideo();
      setClickPulse('pause');
    } else {
      userManuallyPausedRef.current = false;
      playVideo();
      setClickPulse('play');
    }
    setTimeout(() => setClickPulse(null), 400);
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Volume slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
      if (duration) {
        setProgressPercent((time / duration) * 100);
      }
    }
  };

  // Progress hover preview
  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverSeekPos(pos * 100);
    setHoverSeekTime(pos * (duration || 0));
  };

  // Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Restart
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    userManuallyPausedRef.current = false;
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    playVideo();
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
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
              setShowControls(true);
              if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
              controlsTimeoutRef.current = setTimeout(() => {
                if (isPlaying) setShowControls(false);
              }, 3000);
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              setShowControls(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              if (isPlaying) setShowControls(false);
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

            {/* Bottom Gradient for contrast */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 pointer-events-none ${
                showControls || !isPlaying || isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Click Pulse Ripple */}
            {clickPulse && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-ping duration-300">
                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/40">
                  {clickPulse === 'play' ? (
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5" />
                  ) : (
                    <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-white text-white" />
                  )}
                </div>
              </div>
            )}

            {/* Center Play Button (When Paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all z-10 pointer-events-none">
                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-2xl backdrop-blur-md transform group-hover:scale-110 active:scale-95 transition-all border border-white">
                  <Play className="w-5 h-5 sm:w-8 sm:h-8 fill-neutral-950 translate-x-0.5" />
                </div>
              </div>
            )}

            {/* RESPONSIVE FLOATING CONTROLS DOCK (Scaled for mobile & desktop) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-2 sm:bottom-6 left-2 sm:left-8 right-2 sm:right-8 z-30 transition-all duration-300 ${
                showControls || !isPlaying || isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="max-w-5xl mx-auto bg-neutral-950/70 hover:bg-neutral-950/80 backdrop-blur-2xl border border-white/20 rounded-xl sm:rounded-3xl p-2 sm:p-4 shadow-2xl transition-all">
                
                {/* 1. Precision Timeline Scrubber */}
                <div
                  onMouseMove={handleProgressMouseMove}
                  onMouseLeave={() => setHoverSeekTime(null)}
                  className="relative flex items-center mb-1.5 sm:mb-3 group/timeline cursor-pointer py-1"
                >
                  {/* Hover Timestamp Tooltip (Desktop) */}
                  {hoverSeekTime !== null && (
                    <div
                      className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded-md bg-white text-black text-[10px] font-bold font-mono shadow-md pointer-events-none transition-all hidden sm:block"
                      style={{ left: `${hoverSeekPos}%` }}
                    >
                      {formatTime(hoverSeekTime)}
                    </div>
                  )}

                  {/* Track Background */}
                  <div className="w-full h-1 sm:h-2 bg-white/25 rounded-full overflow-hidden relative">
                    {/* Active Progress Bar */}
                    <div
                      className="h-full bg-white rounded-full relative transition-all duration-75"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Glowing Circular Playhead Thumb */}
                  <div
                    className="absolute w-2.5 h-2.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)] -translate-x-1/2 pointer-events-none transition-all"
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
                    {/* Play/Pause Button */}
                    <button
                      onClick={togglePlay}
                      className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-md focus:outline-none shrink-0"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3 h-3 sm:w-4 sm:h-4 fill-neutral-950" />
                      ) : (
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-neutral-950 translate-x-0.5" />
                      )}
                    </button>

                    {/* Replay Button */}
                    <button
                      onClick={handleRestart}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none hidden sm:flex"
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
                            : 'bg-white text-neutral-950 border-white shadow-sm'
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
                        className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white hidden lg:block"
                        aria-label="Volume level"
                      />
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 focus:outline-none shrink-0"
                      aria-label="Fullscreen"
                      title="Toggle Fullscreen"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
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
