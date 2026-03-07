import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const ScrollLogo = () => {
  const { scrollY } = useScroll();
  
  // Main dot physics - highly responsive
  const smoothScroll = useSpring(scrollY, {
    damping: 30,
    stiffness: 150,
    mass: 0.5
  });

  // Trail physics - progressively lazier to create a fine stretching effect
  const smoothScrollTrail1 = useSpring(scrollY, { damping: 35, stiffness: 120, mass: 0.6 });
  const smoothScrollTrail2 = useSpring(scrollY, { damping: 40, stiffness: 90, mass: 0.7 });
  const smoothScrollTrail3 = useSpring(scrollY, { damping: 45, stiffness: 60, mass: 0.8 });

  const speed = 0.8;

  // --- DÉTECTION DE L'ÉCRAN POUR LA TAILLE DE L'ORBITE ---
  const [orbitSize, setOrbitSize] = useState({ rX: 32, rY: 30 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Tailles pour MOBILE
        setOrbitSize({ rX: 28, rY: 26 }); 
      } else {
        // Tailles pour DESKTOP
        setOrbitSize({ rX: 34, rY: 32 }); 
      }
    };

    handleResize(); // Vérifier au chargement
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rX = orbitSize.rX; 
  const rY = orbitSize.rY;
  // ------------------------------------------------------

  // --- POSITION DE DÉPART DU POINT ---
  // 0 = Droite, 90 = Bas, 180 = Gauche, 270 = Haut
  const startPosition = 65; 

  // Calculs avec la nouvelle position de départ
  const angle = useTransform(smoothScroll, (v) => (v * speed + startPosition) * (Math.PI / 180));
  const dotX = useTransform(angle, (a) => Math.cos(a) * rX);
  const dotY = useTransform(angle, (a) => Math.sin(a) * rY);

  const angleT1 = useTransform(smoothScrollTrail1, (v) => (v * speed + startPosition) * (Math.PI / 180));
  const t1X = useTransform(angleT1, (a) => Math.cos(a) * rX);
  const t1Y = useTransform(angleT1, (a) => Math.sin(a) * rY);

  const angleT2 = useTransform(smoothScrollTrail2, (v) => (v * speed + startPosition) * (Math.PI / 180));
  const t2X = useTransform(angleT2, (a) => Math.cos(a) * rX);
  const t2Y = useTransform(angleT2, (a) => Math.sin(a) * rY);

  const angleT3 = useTransform(smoothScrollTrail3, (v) => (v * speed + startPosition) * (Math.PI / 180));
  const t3X = useTransform(angleT3, (a) => Math.cos(a) * rX);
  const t3Y = useTransform(angleT3, (a) => Math.sin(a) * rY);

  // Rotation for the dynamic light inside the SVG
  const lightRotation = useTransform(smoothScroll, (v) => v * speed + 90);

  return (
    <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 group mr-4">
      {/* Conteneur global légèrement plus grand pour laisser la place à l'orbite (w-14 / w-16) */}
      
      {/* Le 'C' SVG - (w-10 / w-12) */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_2px_10px_rgba(77,168,200,0.2)] transition-transform duration-700 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="matte-teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6BC5D8" />
            <stop offset="100%" stopColor="#4DA8C8" />
          </linearGradient>
          <linearGradient id="matte-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A84395" />
            <stop offset="100%" stopColor="#8E2A8B" />
          </linearGradient>
          <radialGradient id="dynamic-light" cx="50%" cy="5%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        <mask id="c-mask">
          <path 
            d="M 85 15 A 45 45 0 1 0 85 85 L 68 68 A 22 22 0 1 1 68 32 Z" 
            fill="white" 
          />
        </mask>
        
        <g mask="url(#c-mask)">
          <rect x="0" y="0" width="100" height="100" fill="url(#matte-teal)" />
          <polygon points="40,-10 110,-10 110,45" fill="url(#matte-purple)" />
          <polygon points="-10,55 -10,110 45,110" fill="url(#matte-purple)" />
          <polygon points="65,65 110,65 110,110" fill="url(#matte-purple)" />

          <motion.rect 
            x="0" y="0" width="100" height="100" 
            fill="url(#dynamic-light)" 
            style={{ rotate: lightRotation, originX: "50px", originY: "50px" }}
            className="mix-blend-overlay"
          />
        </g>

        <path 
          d="M 85 15 A 45 45 0 1 0 85 85 L 68 68 A 22 22 0 1 1 68 32 Z" 
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />
      </svg>
      
      {/* Orbit Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        <motion.div 
          className="absolute w-1 h-1 rounded-full bg-[#4DA8C8] opacity-30 blur-[0.5px]"
          style={{ x: t3X, y: t3Y }}
        />

        <motion.div 
          className="absolute w-1.5 h-1.5 rounded-full bg-[#4DA8C8] opacity-50"
          style={{ x: t2X, y: t2Y }}
        />

        <motion.div 
          className="absolute w-2 h-2 rounded-full bg-[#4DA8C8] opacity-80"
          style={{ x: t1X, y: t1Y }}
        />

        <motion.div 
          className="absolute w-2.5 h-2.5 rounded-full bg-[#4DA8C8] shadow-[0_0_8px_rgba(77,168,200,0.9)]"
          style={{ x: dotX, y: dotY }}
        />
        
      </div>
    </div>
  );
};

export default ScrollLogo;