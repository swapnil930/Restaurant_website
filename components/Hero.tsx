"use client";

import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const h3Ref = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!h3Ref.current || !buttonRef.current) return;

    gsap.fromTo(
      h3Ref.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.3 }
    );

    gsap.fromTo(
      ".star svg",
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.4 }
    );

    const btn = buttonRef.current;
    const shake = () =>
      gsap.fromTo(btn, { x: 0, rotate: 0 }, { x: 2, rotate: 2, repeat: 5, yoyo: true, duration: 0.1 });

    btn.addEventListener("mouseenter", shake);
    return () => btn.removeEventListener("mouseenter", shake);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/video-poster.jpg"
      >
        <source src="/videos/background_video.mp4" type="video/mp4" />
      </video>

      {/* 🔲 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ⭐ Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 text-white text-center">
        
        {/* Rating */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-300">Google:</p>
          <div className="flex items-center gap-2">
            <div className="star flex gap-[2px] text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-gray-300">(4.9)</p>
          </div>
        </div>

        {/* Main Text */}
        <div className="max-w-xl flex flex-col gap-4">
          <h3
            ref={h3Ref}
            className="text-3xl md:text-4xl font-semibold leading-tight"
          >
            Crafted to perfection, one brew at a time.
          </h3>

          <p className="text-gray-300 text-base md:text-lg">
            Where coffee, pastries, and great moments brew together!
          </p>

          <button
            ref={buttonRef}
            onClick={() => scrollToSection("menu")}
            className="mx-auto mt-4 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Discover Our Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
