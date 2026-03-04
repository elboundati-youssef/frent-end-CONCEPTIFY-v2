import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import api from "../api/axios";
import { logosData } from "../data";

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

        if (data.length > 0) {
          setReferences(data);
        } else {
          setReferences(logosData.map(l => ({ id: l.id, title: l.title, logo: l.logo })));
        }
      } catch (error) {
        setReferences(logosData.map(l => ({ id: l.id, title: l.title, logo: l.logo })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferences();
  }, []);

  const LogoItem = ({ item }: { item: any }) => {
    const logoUrl = getImageUrl(item.logo);

    return (
      // CORRECTION : Ajout de "shrink-0" pour empêcher le navigateur mobile d'écraser la div
      <div className="shrink-0 flex items-center justify-center px-6 py-6 md:px-16 md:py-12 border-r border-gray-800 min-w-[130px] md:min-w-[250px] opacity-60 hover:opacity-100 transition-all duration-300 group">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={item.title || "Logo Client"} 
            className="max-h-10 md:max-h-20 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <Building2 className="w-8 h-8 md:w-12 md:h-12 text-gray-500 group-hover:text-white transition-colors" />
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-32 bg-black relative z-10 flex justify-center items-center">
        <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </section>
    );
  }

  if (references.length === 0 && !isLoading) return null;

  const displayLogos = references.length < 5 ? [...references, ...references, ...references, ...references] : references;
  const animationDuration = Math.max(20, displayLogos.length * 3);

  return (
    <section className="py-16 md:py-32 bg-black relative z-10 overflow-hidden">
      <div className="relative flex overflow-hidden w-full border-y border-gray-800">
        <motion.div
          // CORRECTION : Ajout de "w-max" pour forcer la largeur maximale (au-delà de l'écran)
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: animationDuration }}
        >
          <div className="flex items-center">
            {displayLogos.map((ref, idx) => (
              <LogoItem key={`logo-1-${idx}`} item={ref} />
            ))}
          </div>
          <div className="flex items-center">
            {displayLogos.map((ref, idx) => (
              <LogoItem key={`logo-2-${idx}`} item={ref} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-10 md:mt-20 flex justify-center">
        <Link
          to="/portfolio"
          className="px-8 py-3 md:px-10 md:py-4 rounded-full border border-white text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300"
        >
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default MarqueeLogos;