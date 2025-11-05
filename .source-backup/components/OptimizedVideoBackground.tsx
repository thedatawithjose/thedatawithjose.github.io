'use client';

import { useEffect, useState } from 'react';

interface OptimizedVideoBackgroundProps {
  videoSrc: string;
  gradient: string;
}

export default function OptimizedVideoBackground({ videoSrc, gradient }: OptimizedVideoBackgroundProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Detectar si es desktop y tiene buena conexión
    const isDesktop = window.innerWidth >= 768;
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isGoodConnection = !connection || connection.effectiveType === '4g' || connection.effectiveType === '3g';
    
    // Solo cargar video en desktop con buena conexión
    if (isDesktop && isGoodConnection) {
      setShouldLoadVideo(true);
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <>
      {shouldLoadVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      
      {/* Fallback gradient - siempre visible hasta que cargue el video */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  );
}
