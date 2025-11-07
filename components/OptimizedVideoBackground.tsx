'use client';

import { useEffect, useState, useRef } from 'react';

interface OptimizedVideoBackgroundProps {
  videoSrc: string;
  gradient: string;
  slideIndex: number;
}

export default function OptimizedVideoBackground({ videoSrc, gradient, slideIndex }: OptimizedVideoBackgroundProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Background images for mobile/fallback - Unsplash images
  const backgroundImages = [
    '/images/hero/hero-slide-1.jpg', // Data infrastructure
    '/images/hero/hero-slide-2.jpg', // Trading systems
    '/images/hero/hero-slide-3.jpg'  // Engineering solutions
  ];

  useEffect(() => {
    // Desktop = video, Mobile = imagen
    const isDesktop = window.innerWidth >= 768;
    
    if (isDesktop) {
      // En desktop, cargar video después de un pequeño delay
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    
    if (videoRef.current) {
      // Asegurar que el video se reproduce
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Video autoplay prevented:', error);
          // Intentar reproducir de nuevo
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }, 1000);
        });
      }
      
      // Pausar video cuando no está visible para ahorrar recursos
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(videoRef.current);
      
      return () => observer.disconnect();
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setShouldLoadVideo(false);
  };

  return (
    <>
      {/* Video para Desktop */}
      {shouldLoadVideo && !videoError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onEnded={() => {
            // Asegurar que el loop funciona
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play().catch(() => {});
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 video-background ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            filter: 'brightness(0.7)'
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      
      {/* Background Image para Mobile */}
      {!shouldLoadVideo || videoError ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 hero-bg-optimized"
            style={{
              backgroundImage: `url(${backgroundImages[slideIndex % backgroundImages.length]})`
            }}
          />
          {/* Overlay con gradiente para mejor legibilidad en móvil */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-1000 opacity-70`}
          />
        </>
      ) : (
        /* Gradient Overlay para video en desktop */
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-50' : 'opacity-70'
          }`}
        />
      )}
      
      {/* Patrón sutil para textura - Simplificado */}
      <div className="absolute inset-0 opacity-5 bg-grid-pattern pointer-events-none"></div>
    </>
  );
}
