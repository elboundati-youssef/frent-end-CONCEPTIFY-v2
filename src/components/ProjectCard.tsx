import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Instagram, Folder, Globe } from "lucide-react";

// --- Helper pour lire les images de l'API ---
const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "";
  // Si c'est déjà une URL complète (ex: http://localhost... ou https://unsplash...), on la retourne telle quelle
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  // Sinon on ajoute la route de l'API Laravel
  return `https://conceptify.pro/api/private-image/${path}`;
};

// On utilise "any" pour le type afin d'accepter facilement les données de Laravel
const ProjectCard = ({ project }: { project: any }) => {
  const navigate = useNavigate();

  // --- Mappage intelligent des données (API vs Statique) ---
  // On cherche "url" (API), "image" (API transformée) ou "img" (Statique)
  const bgImage = getImageUrl(project.url || project.image || project.img);
  
  // On gère le logo s'il existe
  const logoImage = project.logo && project.logo !== "" ? getImageUrl(project.logo) : null;
  
  // On cherche "title" (API) ou "client" (Statique)
  const title = project.title || project.client || "Projet Sans Nom";
  
  const websiteUrl = project.website;
  const instagramUrl = project.instagram;
  const targetId = project.id;

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
      // L'aspect ratio est conservé, les marges basses sont réduites sur mobile
      className="relative aspect-[4/5] overflow-hidden rounded-xl group break-inside-avoid mb-4 md:mb-6 cursor-pointer"
    >
      {/* Background Image with ultra-slow zoom */}
      {bgImage && (
        <motion.img
          variants={{
            hover: { scale: 1.05, transition: { duration: 1.5, ease: "easeOut" } }
          }}
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Dark Overlay - darkens slightly on hover */}
      <motion.div 
        variants={{
          hidden: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
          hover: { backgroundColor: "rgba(0, 0, 0, 0.7)" }
        }}
        initial="hidden"
        className="absolute inset-0 pointer-events-none transition-colors duration-500" 
      />

      {/* Client Logo OR Title (Centered) */}
      <div className="absolute inset-0 m-auto flex flex-col items-center justify-center pointer-events-none p-2 md:p-4">
        <motion.div
          variants={{
            hover: { y: -10, transition: { duration: 0.4, ease: "easeOut" } }
          }}
          className="flex items-center justify-center w-full h-full"
        >
          {/* Si on a un logo, on l'affiche. Sinon on affiche le titre en texte */}
          {logoImage && !logoImage.endsWith('null') ? (
            <img 
              src={logoImage} 
              alt={title} 
              // Le logo prend un peu plus d'espace sur mobile pour rester lisible
              className="max-w-[85%] md:max-w-[70%] max-h-[50%] md:max-h-[60%] object-contain drop-shadow-2xl" 
              referrerPolicy="no-referrer"
            />
          ) : (
            // Le texte est plus petit sur mobile (text-base)
            <h3 className="text-base md:text-3xl font-bold text-white text-center drop-shadow-lg px-2">
              {title}
            </h3>
          )}
        </motion.div>
      </div>

      {/* Action Buttons (Appearing on hover) */}
      {/* Boutons plus bas sur mobile (bottom-4) et espacement réduit (gap-2) */}
      <div className="absolute bottom-4 md:bottom-10 left-0 right-0 flex justify-center items-center gap-2 md:gap-4 z-10 px-2">
        
        {/* Button 1: Instagram (S'affiche uniquement si renseigné) */}
        {instagramUrl && (
          <motion.button 
            variants={buttonVariants}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            // Boutons plus petits sur mobile (w-8 h-8)
            className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group/btn transition-all duration-300 hover:bg-white/20 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              // Formatage du lien Instagram (ajoute https:// si l'utilisateur a juste mis @pseudo)
              const finalLink = instagramUrl.startsWith('http') 
                ? instagramUrl 
                : `https://instagram.com/${instagramUrl.replace('@', '')}`;
              window.open(finalLink, '_blank');
            }}
          >
            {/* Icône plus petite sur mobile (w-4 h-4) */}
            <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/btn:text-[#6f42c1] transition-colors duration-300" />
          </motion.button>
        )}

        {/* Button 2: Bibliothèque (Toujours présent) */}
        <motion.button 
          variants={buttonVariants}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/reference/${targetId}`);
          }}
          className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group/btn transition-all duration-300 hover:bg-white/20 hover:scale-110 relative overflow-hidden"
        >
          <svg width="0" height="0">
            <linearGradient id="purple-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#6f42c1" offset="0%" />
              <stop stopColor="#0dcaf0" offset="100%" />
            </linearGradient>
          </svg>
          <Folder className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/btn:[stroke:url(#purple-cyan-grad)] transition-all duration-300" />
        </motion.button>

        {/* Button 3: Site web (S'affiche uniquement si renseigné) */}
        {websiteUrl && (
          <motion.button 
            variants={buttonVariants}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
            className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group/btn transition-all duration-300 hover:bg-white/20 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              const finalWebsite = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
              window.open(finalWebsite, '_blank');
            }}
          >
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/btn:text-[#0dcaf0] transition-colors duration-300" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;