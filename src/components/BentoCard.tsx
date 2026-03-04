// --- FICHIER: src/components/BentoCard.tsx ---
import React from "react";
import { motion } from "motion/react";

interface BentoCardProps {
  title: string;
  image: string;
  desc: string;
  className?: string;
  index: number;
}

const BentoCard = ({
  title,
  image,
  desc,
  className = "",
  index,
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      // Arrondis légèrement plus petits sur mobile
      className={`group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Padding réduit sur mobile (p-4), normal sur PC (md:p-8) */}
      <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
        
        {/* Titre : text-xl sur mobile (pour tenir sur 2 colonnes), text-4xl sur PC */}
        <h3 className="text-xl md:text-4xl font-bold text-white leading-tight md:leading-normal mb-0 group-hover:mb-1 md:group-hover:mb-3 transition-all duration-500 ease-out">
          {title}
        </h3>
        
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
          <div className="overflow-hidden">
            {/* Description : text-xs sur mobile, text-base sur PC */}
            <p className="text-gray-300 text-xs md:text-base leading-snug md:leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-100 mt-1 md:mt-0">
              {desc}
            </p>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default BentoCard;