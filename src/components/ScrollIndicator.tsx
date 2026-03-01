// --- FICHIER: src/components/ScrollIndicator.tsx ---
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 right-10 md:bottom-16 md:right-16 z-50 hidden md:flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="relative w-32 h-32 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
          <text className="text-[10.5px] font-bold uppercase tracking-[0.18em] fill-white">
            <textPath href="#circlePath" startOffset="0%">
              Conceptify • Agence de créativité • Conceptify • Agence de
              créativité •
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
        <ArrowDown className="w-5 h-5 text-[#0dcaf0]" />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
