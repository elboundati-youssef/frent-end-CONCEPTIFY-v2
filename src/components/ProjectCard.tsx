// --- FICHIER: src/components/ProjectCard.tsx ---
import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Instagram, Folder, Globe } from "lucide-react";
import { Project } from "../data";

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();

  // Animation variants for the action buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover="hover"
      className="relative aspect-[4/5] overflow-hidden rounded-xl group break-inside-avoid mb-6 cursor-pointer"
    >
      {/* Background Image with ultra-slow zoom */}
      <motion.img
        variants={{
          hover: { scale: 1.05, transition: { duration: 1.5, ease: "easeOut" } }
        }}
        src={project.img}
        alt={project.client}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />

      {/* Dark Overlay - darkens slightly on hover */}
      <motion.div 
        variants={{
          hidden: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
          hover: { backgroundColor: "rgba(0, 0, 0, 0.6)" }
        }}
        initial="hidden"
        className="absolute inset-0 pointer-events-none transition-colors duration-500" 
      />

      {/* Client Logo (Centered) */}
      <div className="absolute inset-0 m-auto flex flex-col items-center justify-center pointer-events-none p-4">
        <motion.div
          variants={{
            hover: { y: -20, transition: { duration: 0.4, ease: "easeOut" } }
          }}
          className="flex items-center justify-center w-full h-full"
        >
          {project.logo ? (
            <img src={project.logo} alt={project.client} className="max-w-[60%] max-h-[60%] object-contain" />
          ) : (
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
              {project.client}
            </h3>
          )}
        </motion.div>
      </div>

      {/* Action Buttons (Appearing on hover) */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-4 z-10">
        {/* Button 1: Instagram */}
        <motion.button 
          variants={buttonVariants}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group/btn transition-all duration-300 hover:bg-white/20 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            // Add instagram link logic here if available
          }}
        >
          <Instagram className="w-5 h-5 text-white group-hover/btn:text-[#6f42c1] transition-colors duration-300" />
        </motion.button>

        {/* Button 2: Bibliothèque */}
        <motion.button 
          variants={buttonVariants}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/reference/${project.id}`);
          }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group/btn transition-all duration-300 hover:bg-white/20 hover:scale-110 relative overflow-hidden"
        >
          {/* Gradient text effect for the icon requires an SVG mask or specific CSS, 
              using a simpler approach with a gradient background clip for the icon if possible, 
              or just a solid color that represents the gradient. 
              Here we use a trick to apply gradient to the stroke/fill of the icon. */}
          <svg width="0" height="0">
            <linearGradient id="purple-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#6f42c1" offset="0%" />
              <stop stopColor="#0dcaf0" offset="100%" />
            </linearGradient>
          </svg>
          <Folder className="w-5 h-5 text-white group-hover/btn:[stroke:url(#purple-cyan-grad)] transition-all duration-300" />
        </motion.button>

        {/* Button 3: Site web (Conditional) */}
        {project.website && (
          <motion.button 
            variants={buttonVariants}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group/btn transition-all duration-300 hover:bg-white/20 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.website, '_blank');
            }}
          >
            <Globe className="w-5 h-5 text-white group-hover/btn:text-[#0dcaf0] transition-colors duration-300" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
