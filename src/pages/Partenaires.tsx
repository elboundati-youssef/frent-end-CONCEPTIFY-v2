import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, HeartPulse, GraduationCap, Globe, Sparkles, Image as ImageIcon } from "lucide-react";
import PageTransition from "../components/PageTransition";

const Partenaires = () => {
  const logos = [
    { name: "EMAAR", icon: Building2, desc: "Real Estate Development" },
    { name: "ATLAS", icon: HeartPulse, desc: "Healthcare & Wellness" },
    { name: "DESCARTES", icon: GraduationCap, desc: "Education Group" },
    { name: "MALL", icon: Globe, desc: "Retail & Commerce" },
    { name: "MANSOUR", icon: Sparkles, desc: "Luxury Brand" },
    { name: "STUDIO", icon: ImageIcon, desc: "Creative Agency" },
    { name: "NOVA", icon: Building2, desc: "Architecture" },
    { name: "PULSE", icon: HeartPulse, desc: "Fitness Centers" },
    { name: "ACADEMY", icon: GraduationCap, desc: "Higher Education" },
    { name: "GLOBAL", icon: Globe, desc: "International Trade" },
    { name: "LUMINA", icon: Sparkles, desc: "Lighting Solutions" },
    { name: "VISION", icon: ImageIcon, desc: "Media Production" },
  ];

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>

        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white"
          >
            Ils nous font confiance
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-20 h-1 bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0] origin-left" 
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-gray-400 max-w-2xl font-light"
          >
            Découvrez les entreprises et institutions qui ont choisi de collaborer avec Conceptify pour réinventer leur communication.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="group relative flex flex-col items-center justify-center p-8 md:p-12 bg-[#111] rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6f42c1]/0 to-[#0dcaf0]/0 group-hover:from-[#6f42c1]/10 group-hover:to-[#0dcaf0]/10 transition-colors duration-500" />
              <logo.icon className="w-12 h-12 text-gray-500 group-hover:text-white mb-6 transition-colors duration-500" />
              <span className="text-xl font-bold text-gray-300 group-hover:text-white tracking-wider uppercase transition-colors duration-500">
                {logo.name}
              </span>
              <span className="text-xs text-gray-600 group-hover:text-gray-400 mt-2 text-center transition-colors duration-500">
                {logo.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Partenaires;
