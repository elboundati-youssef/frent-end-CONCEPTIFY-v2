// --- FICHIER: src/components/MarqueeLogos.tsx ---
import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Building2,
  HeartPulse,
  GraduationCap,
  Globe,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

const MarqueeLogos = () => {
  const logos = [
    { name: "EMAAR", icon: Building2 },
    { name: "ATLAS", icon: HeartPulse },
    { name: "DESCARTES", icon: GraduationCap },
    { name: "MALL", icon: Globe },
    { name: "MANSOUR", icon: Sparkles },
    { name: "STUDIO", icon: ImageIcon },
  ];

  const LogoItem = ({ logo }: { logo: any }) => (
    <div className="flex items-center justify-center gap-4 px-16 py-12 border-r border-gray-800 min-w-[350px] opacity-60 hover:opacity-100 transition-opacity duration-300">
      <logo.icon className="w-8 h-8 text-white" />
      <span className="text-3xl font-display font-bold text-white tracking-wider uppercase">
        {logo.name}
      </span>
    </div>
  );

  return (
    <section className="py-32 bg-black relative z-10">
      <div className="relative flex overflow-hidden w-full border-y border-gray-800">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {/* First set */}
          <div className="flex items-center">
            {logos.map((logo, idx) => (
              <LogoItem key={`logo-1-${idx}`} logo={logo} />
            ))}
          </div>
          {/* Second set for infinite loop */}
          <div className="flex items-center">
            {logos.map((logo, idx) => (
              <LogoItem key={`logo-2-${idx}`} logo={logo} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 flex justify-center">
        <Link
          to="/partenaires"
          className="px-10 py-4 rounded-full border border-white text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300"
        >
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default MarqueeLogos;
