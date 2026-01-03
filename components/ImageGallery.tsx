"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const images = [
    { url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', title: 'Gourmet Pasta', desc: 'Fresh Italian Style' },
    { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', title: 'Fresh Salad', desc: 'Organic & Healthy' },
    { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', title: 'Delicious Pancakes', desc: 'Sweet & Fluffy' },
    { url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', title: 'Cheese Pizza', desc: 'Wood Fired' },
    { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', title: 'Tasty Salad Bowl', desc: 'Farm Fresh' },
    { url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800', title: 'Grilled Steak', desc: 'Premium Beef' },
    { url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800', title: 'Burger & Fries', desc: 'Classic Combo' },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const diff = startX - e.pageX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
    const diff = (index - currentIndex + images.length) % images.length;
    const totalSlides = images.length;

    if (diff === 0) {
      return {
        transform: 'translateX(0%) scale(1.2)',
        opacity: 1,
        zIndex: 50,
      };
    }

    if (diff === 1 || diff === totalSlides - 1) {
      const direction = diff === 1 ? 1 : -1;
      return {
        transform: `translateX(${direction * 75}%) scale(0.9)`,
        opacity: 0.75,
        zIndex: 40,
      };
    }

    return {
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <section style={styles.gallerySection}>
      <style>{`
        @keyframes bgPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slideUp {
          to { transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; filter: blur(20px); }
          50% { opacity: 0.8; filter: blur(25px); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes dotPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      {/* Background */}
      <div style={styles.galleryBg}>
        <div style={styles.bgOverlay} />
      </div>
      
      {/* Fog overlays */}
      <div style={{...styles.fogOverlay, ...styles.fogTop}} />
      <div style={{...styles.fogOverlay, ...styles.fogBottom}} />
      <div style={{...styles.fogOverlay, ...styles.fogLeft}} />
      <div style={{...styles.fogOverlay, ...styles.fogRight}} />

      {/* Floating particles */}
      <div style={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            ...styles.particle,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* Header */}
      <div style={styles.galleryHeader}>
        <div style={styles.headerDecoration}>
          <span style={styles.decorationLine} />
          <span style={styles.decorationDot} />
          <span style={styles.decorationLine} />
        </div>
        <h2 style={styles.galleryTitle}>
          Our <span style={styles.titleHighlight}>Culinary Gallery</span>
        </h2>
        <p style={styles.gallerySubtitle}>
          A visual journey through our masterfully crafted dishes
        </p>
      </div>

      {/* Gallery Container */}
      <div 
        style={styles.galleryContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div style={styles.galleryStage}>
          {/* Slides */}
          <div style={styles.slidesContainer}>
            {images.map((image, index) => {
              const slideStyle = getSlideStyle(index);
              const isActive = index === currentIndex;
              
              return (
                <div
                  key={index}
                  style={{
                    ...styles.gallerySlide,
                    ...slideStyle,
                    cursor: isActive ? 'default' : 'pointer'
                  }}
                  onClick={() => goToSlide(index)}
                >
                  <div style={{
                    ...styles.slideCard,
                    boxShadow: isActive 
                      ? '0 60px 120px -20px rgba(249, 115, 22, 0.4), 0 40px 80px -30px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                      : '0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                  }}>
                    <div style={styles.imageContainer}>
                      <img
                        src={image.url}
                        alt={image.title}
                        style={{
                          ...styles.slideImage,
                          transform: isActive ? 'scale(1.05)' : 'scale(1)'
                        }}
                        draggable="false"
                      />
                      
                      {isActive && (
                        <>
                          <div style={styles.imageOverlay} />
                          <div style={{...styles.shineEffect, animation: 'shine 2s ease-in-out 0.5s'}} />
                          <div style={styles.imageInfo}>
                            <div style={styles.infoBadge}>Featured</div>
                            <h3 style={styles.imageTitle}>{image.title}</h3>
                            <p style={styles.imageDesc}>{image.desc}</p>
                          </div>
                        </>
                      )}
                    </div>
                    {isActive && <div style={styles.cardGlow} />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button onClick={prevSlide} style={{...styles.navButton, ...styles.navPrev}} aria-label="Previous slide">
            <ChevronLeft style={styles.navIcon} />
          </button>
          
          <button onClick={nextSlide} style={{...styles.navButton, ...styles.navNext}} aria-label="Next slide">
            <ChevronRight style={styles.navIcon} />
          </button>
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
 gallerySection: {
  position: 'relative',
  width: '100%',
  minHeight: 'auto',           
  paddingTop: '6rem',        
  paddingBottom: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
},
  galleryBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #FDFAEF 0%, #F5EFE0 50%, #FFF8E7 100%)',
    zIndex: 0,
  },
  bgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255, 200, 124, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 150, 100, 0.1) 0%, transparent 50%)',
    animation: 'bgPulse 8s ease-in-out infinite',
  },
  fogOverlay: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 10,
  },
  fogTop: {
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'linear-gradient(to bottom, rgba(253, 250, 239, 1) 0%, rgba(253, 250, 239, 0.8) 30%, rgba(253, 250, 239, 0) 100%)',
  },
  fogBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'linear-gradient(to top, rgba(253, 250, 239, 1) 0%, rgba(253, 250, 239, 0.8) 30%, rgba(253, 250, 239, 0) 100%)',
  },
  fogLeft: {
    top: 0,
    bottom: 0,
    left: 0,
    width: '60px',
    background: 'linear-gradient(to right, rgba(253, 250, 239, 1) 0%, rgba(253, 250, 239, 0.6) 50%, rgba(253, 250, 239, 0) 100%)',
  },
  fogRight: {
    top: 0,
    bottom: 0,
    right: 0,
    width: '60px',
    background: 'linear-gradient(to left, rgba(253, 250, 239, 1) 0%, rgba(253, 250, 239, 0.6) 50%, rgba(253, 250, 239, 0) 100%)',
  },
  particles: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  particle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: 'radial-gradient(circle, rgba(255, 150, 100, 0.6) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float linear infinite',
  },
  galleryHeader: {
    position: 'relative',
    zIndex: 20,
    textAlign: 'center',
    marginBottom: '3rem',
  },
  headerDecoration: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  decorationLine: {
    width: '60px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #F97316, transparent)',
    borderRadius: '2px',
  },
  decorationDot: {
    width: '8px',
    height: '8px',
    background: 'linear-gradient(135deg, #F97316, #EF4444)',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(249, 115, 22, 0.6)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  galleryTitle: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 800,
    color: '#1e293b',
    marginBottom: '1rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  titleHighlight: {
    background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  gallerySubtitle: {
    fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
    color: '#64748b',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  galleryContainer: {
    position: 'relative',
    zIndex: 15,
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
galleryStage: {
  position: 'relative',
  width: '100%',
  height: 'clamp(360px, 42vh, 480px)', 
  perspective: '2000px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
  slidesContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
  },
  gallerySlide: {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: 'clamp(260px, 32vw, 420px)',  
  height: 'clamp(340px, 40vh, 460px)', 
  transformStyle: 'preserve-3d',
  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
  marginLeft: 'calc(-1 * clamp(130px, 16vw, 210px))',
  marginTop: 'calc(-1 * clamp(170px, 20vh, 230px))',
},
  slideCard: {
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  background: '#fff',
},
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
    userSelect: 'none',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)',
    opacity: 1,
  },
  shineEffect: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%, transparent 100%)',
    transform: 'translateX(-100%)',
  },
  imageInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 'clamp(1.25rem, 3vw, 1.75rem)',
    transform: 'translateY(0)',
    animation: 'slideUp 0.6s ease-out 0.3s backwards',
  },
  infoBadge: {
    display: 'inline-block',
    padding: '0.35rem 0.9rem',
    background: 'linear-gradient(135deg, #F97316, #EF4444)',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderRadius: '2rem',
    marginBottom: '0.75rem',
    boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
  },
  imageTitle: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: 800,
    color: 'white',
    marginBottom: '0.4rem',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.02em',
  },
  imageDesc: {
    fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
  },
  cardGlow: {
    position: 'absolute',
    inset: '-2px',
    background: 'linear-gradient(135deg, #F97316, #EF4444)',
    borderRadius: '1.5rem',
    opacity: 0.6,
    zIndex: -1,
    filter: 'blur(20px)',
    animation: 'glowPulse 2s ease-in-out infinite',
  },
  navButton: {
  position: 'absolute',
  top: '55%',              
  transform: 'translateY(-50%)',
  width: '2.25rem',
  height: '2.25rem',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 40,
},

  navPrev: {
    left: 'clamp(0.75rem, 3vw, 1.5rem)',
  },
  navNext: {
    right: 'clamp(0.75rem, 3vw, 1.5rem)',
  },
  navIcon: {
    width: 'clamp(1.25rem, 3vw, 1.75rem)',
    height: 'clamp(1.25rem, 3vw, 1.75rem)',
    color: '#1e293b',
  },
};

export default ImageGallery;