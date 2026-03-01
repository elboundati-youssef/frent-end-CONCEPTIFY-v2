// --- FICHIER: src/components/InfiniteMarquee.tsx ---
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
    <div className="flex items-center gap-12 px-6">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span
            className={`text-5xl md:text-8xl font-black uppercase tracking-tighter ${outline ? "text-transparent" : "text-white"}`}
            style={outline ? { WebkitTextStroke: "2px #0dcaf0" } : {}}
          >
            {item}
          </span>
          <span
            className={`text-3xl md:text-5xl ${outline ? "text-[#0dcaf0]" : "text-[#6f42c1]"}`}
          >
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section className="py-10 bg-[#111] overflow-hidden border-y-4 border-[#6f42c1] relative z-20 flex flex-col gap-6 transform -skew-y-3 my-24 shadow-[0_0_50px_rgba(111,66,193,0.2)]">
      {/* Ligne 1 : vers la gauche */}
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

      {/* Ligne 2 : vers la droite */}
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
  );
};

export default InfiniteMarquee;
