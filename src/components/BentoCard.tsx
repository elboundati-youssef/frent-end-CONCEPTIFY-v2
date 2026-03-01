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
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${className}`}
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

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-0 group-hover:mb-3 transition-all duration-500 ease-out">
          {title}
        </h3>
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
          <div className="overflow-hidden">
            <p className="text-gray-300 text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-100">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BentoCard;
