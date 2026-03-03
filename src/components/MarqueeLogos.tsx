import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import api from "../api/axios";

// --- Helper pour formater l'URL de l'image privée ---
const getImageUrl = (path: string | null | undefined) => {
  if (!path || path === "null" || path === "") return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
  return `http://localhost:8000/api/private-image/${cleanPath}`;
};

const MarqueeLogos = () => {
  const [references, setReferences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const res = await api.get('/reference');
        const data = res.data?.data || res.data || [];
        setReferences(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des logos :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferences();
  }, []);

  const LogoItem = ({ item }: { item: any }) => {
    const logoUrl = getImageUrl(item.logo); // On récupère le vrai logo

    return (
      <div className="flex items-center justify-center px-16 py-12 border-r border-gray-800 min-w-[250px] opacity-60 hover:opacity-100 transition-all duration-300 group">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={item.title} 
            // La taille a été augmentée ici : max-h-20 au lieu de max-h-12
            className="max-h-20 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          // J'ai aussi augmenté la taille de l'icône par défaut (w-12 h-12)
          <Building2 className="w-12 h-12 text-gray-500 group-hover:text-white transition-colors" />
        )}
        {/* Le texte (item.title) a été supprimé ici pour ne garder que le logo */}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-32 bg-black relative z-10 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </section>
    );
  }

  // S'il n'y a aucun partenaire, on cache la section pour garder le site propre
  if (references.length === 0) return null;

  // ASTUCE : Si vous n'avez que 2 ou 3 références, le bandeau risque d'avoir des trous.
  // On duplique artificiellement la liste pour s'assurer que l'écran est toujours rempli.
  const displayLogos = references.length < 5 ? [...references, ...references, ...references] : references;

  // La durée de l'animation s'adapte au nombre de logos pour ne pas défiler trop vite
  const animationDuration = Math.max(20, displayLogos.length * 3);

  return (
    <section className="py-32 bg-black relative z-10">
      <div className="relative flex overflow-hidden w-full border-y border-gray-800">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: animationDuration }}
        >
          {/* Premier bloc */}
          <div className="flex items-center">
            {displayLogos.map((ref, idx) => (
              <LogoItem key={`logo-1-${idx}`} item={ref} />
            ))}
          </div>
          {/* Deuxième bloc identique (pour créer la boucle infinie parfaite) */}
          <div className="flex items-center">
            {displayLogos.map((ref, idx) => (
              <LogoItem key={`logo-2-${idx}`} item={ref} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 flex justify-center">
        {/* J'ai mis à jour le lien pour qu'il pointe vers votre nouvelle page portfolio */}
        <Link
          to="/portfolio"
          className="px-10 py-4 rounded-full border border-white text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300"
        >
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default MarqueeLogos;