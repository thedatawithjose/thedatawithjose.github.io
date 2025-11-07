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

  // Background images for mobile/fallback
  const backgroundImages = [
    '/images/backgrounds/data-engineering-bg-1.jpg', // Abstract data visualization
    '/images/backgrounds/data-engineering-bg-2.jpg', // Network connections
    '/images/backgrounds/data-engineering-bg-3.jpg'  // Code/algorithms
  ];

  useEffect(() => {
    // Detectar capacidades del dispositivo
    const isDesktop = window.innerWidth >= 1024; // Más restrictivo
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isGoodConnection = !connection || connection.effectiveType === '4g';
    const hasGoodGPU = window.devicePixelRatio <= 2; // Evitar dispositivos con alta densidad
    
    // Solo cargar video en condiciones óptimas
    if (isDesktop && isGoodConnection && hasGoodGPU) {
      setShouldLoadVideo(true);
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    // Optimización adicional: pausar video cuando no está visible
    if (videoRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      });
      observer.observe(videoRef.current);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setShouldLoadVideo(false);
  };

  return (
    <>
      {/* Video para Desktop (solo si las condiciones son óptimas) */}
      {shouldLoadVideo && !videoError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none" // Cambio: carga solo cuando es necesario
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            willChange: 'transform',
            transform: 'translate3d(0,0,0)', // Mejor para GPU
            backfaceVisibility: 'hidden',
            filter: 'brightness(0.7)' // Oscurecer para mejor legibilidad
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      
      {/* Background Image para Mobile/Fallback */}
      {!shouldLoadVideo || videoError ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${backgroundImages[slideIndex % backgroundImages.length]})`,
            filter: 'brightness(0.6) contrast(1.1)'
          }}
        />
      ) : null}
      
      {/* Gradient Overlay - siempre presente para legibilidad */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-60' : 'opacity-80'
        }`}
      />
      
      {/* Patrón sutil para textura */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </>
  );
}
