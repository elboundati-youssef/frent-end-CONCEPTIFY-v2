import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Instagram, Globe, X } from "lucide-react";
import PageTransition from "../components/PageTransition";
import api from "../api/axios";

// --- Helper pour lire les médias ---
const getMediaUrl = (path: string | null | undefined) => {
  if (!path || path === "null" || path === "") return "";
  if (path.startsWith("http")) return path;
  // Nettoie le chemin (transforme les \ de Windows en / pour le web)
  const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
  return `http://localhost:8000/api/private-image/${cleanPath}`;
};

const Library = () => {
  const { id } = useParams(); // ID de la référence
  const [reference, setReference] = useState<any>(null);
  
  // États pour séparer la vidéo principale et la galerie
  const [mainVideo, setMainVideo] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. On utilise votre route /api/reference (qui appelle indexApi et renvoie du JSON)
        const refRes = await api.get('/reference');
        const allReferences = refRes.data?.data || refRes.data || [];
        
        // On cherche le client spécifique dans la liste
        const currentRef = allReferences.find((r: any) => String(r.id) === String(id));
        setReference(currentRef);

        // 2. On récupère TOUS les projets
        const projRes = await api.get('/project');
        const allProjects = projRes.data?.data || projRes.data || [];

        // 3. On filtre pour ne garder que les projets de CE client
        const clientProjects = allProjects.filter(
          (p: any) => String(p.reference_id) === String(id)
        );

        // 4. On isole la première vidéo trouvée pour la mettre en grand en haut
        const video = clientProjects.find((p: any) => p.type === 'video' || (p.link && String(p.link).includes('.mp4')));
        setMainVideo(video || null);

        // 5. On filtre explicitement les IMAGES pour la galerie en bas
        const images = clientProjects.filter((p: any) => {
            // Si c'est la vidéo principale, on l'exclut
            if (video && p.id === video.id) return false;
            
            // On s'assure que c'est bien une image
            return p.type === 'image' || (p.link && (String(p.link).includes('.jpg') || String(p.link).includes('.png') || String(p.link).includes('.webp')));
        });
        
        // Tri par ordre si disponible
        images.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setGalleryImages(images);

      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-4 border-[#0dcaf0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!reference) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <h1 className="text-3xl font-bold text-white">Client introuvable</h1>
      </div>
    );
  }

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <Link
        to="/portfolio"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Retour au portfolio
      </Link>

      {/* EN-TÊTE DU CLIENT */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tight text-white uppercase">
            {reference.title || "Projet"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md text-sm font-medium border border-white/10 text-white">
              {reference.portfolio?.title || "Référence"}
            </span>
            <div className="flex gap-2">
              {reference.instagram && reference.instagram !== "null" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(reference.instagram.startsWith('http') ? reference.instagram : `https://instagram.com/${reference.instagram.replace('@', '')}`, '_blank')}
                  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6f42c1] border border-white/10 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </motion.button>
              )}
              {reference.website && reference.website !== "null" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(reference.website.startsWith('http') ? reference.website : `https://${reference.website}`, '_blank')}
                  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0dcaf0] border border-white/10 transition-colors"
                >
                  <Globe className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ZONE GRANDE VIDÉO */}
      {mainVideo && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
        >
          <video 
            src={getMediaUrl(mainVideo.link)} 
            controls 
            autoPlay 
            muted 
            loop
            playsInline
            className="w-full max-h-[75vh] object-cover"
          />
        </motion.div>
      )}

      {/* GALERIE D'IMAGES */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((item: any, i: number) => (
          <motion.div
            key={item.id || i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: (i % 3) * 0.1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
            onClick={() => setSelectedImage(getMediaUrl(item.link))}
          >
           <img
              // L'ASTUCE EST ICI : on dit à React de prendre 'link', et si c'est vide, de prendre 'image'
              src={getMediaUrl(item.link || item.image)} 
              alt={`${reference.title} Média ${i}`}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>

      {/* MESSAGE SI AUCUN MÉDIA */}
      {!mainVideo && galleryImages.length === 0 && (
        <div className="text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-3xl">
          Aucun média n'a été trouvé pour ce client. Ajoutez des projets dans le Dashboard.
        </div>
      )}

      {/* LIGHTBOX (Zoom sur Image) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="En plein écran"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Library;