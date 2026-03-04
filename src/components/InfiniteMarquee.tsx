import React from "react";
import { motion } from "motion/react";

const InfiniteMarquee = () => {
  const items = [
    "Service fiable",
    "Solutions personnalisées",
    "Disponibilité 24/7",
    "Conseils d'experts",
    "Approche innovante",
    "Stratégies sur mesure",
  ];

  const MarqueeContent = ({ outline = false }: { outline?: boolean }) => (
    <div className="flex items-center gap-3 md:gap-12 px-2 md:px-6">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span
            className={`text-xl md:text-8xl font-black uppercase tracking-tighter ${outline ? "text-transparent" : "text-white"}`}
            style={outline ? { WebkitTextStroke: "1.5px #4DA8C8" } : {}}
          >
            {item}
          </span>
          <span
            className={`text-sm md:text-5xl ${outline ? "text-[#4DA8C8]" : "text-[#8E2A8B]"}`}
          >
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-[100vw] overflow-hidden py-6 md:py-24">
      <section className="py-3 md:py-10 bg-[#111] overflow-hidden border-y-2 md:border-y-4 border-[#8E2A8B] relative z-20 flex flex-col gap-2 md:gap-6 transform -skew-y-3 shadow-[0_0_50px_rgba(142,42,139,0.2)]">
        
        <div className="flex whitespace-nowrap relative">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </motion.div>
        </div>

        <div className="flex whitespace-nowrap relative">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            <MarqueeContent outline />
            <MarqueeContent outline />
            <MarqueeContent outline />
            <MarqueeContent outline />
          </motion.div>
        </div>
        
      </section>
    </div>
  );
};

export default InfiniteMarquee;