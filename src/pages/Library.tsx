import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Instagram, Globe, X } from "lucide-react";
import PageTransition from "../components/PageTransition";
import api from "../api/axios";
import { projectsData } from "../data";

// --- Helper pour lire les médias ---
const getMediaUrl = (path: string | null | undefined) => {
  if (!path || path === "null" || path === "") return "";
  if (path.startsWith("http")) return path;
  const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
  return `http://localhost:8000/api/private-image/${cleanPath}`;
};

const Library = () => {
  const { id } = useParams();
  const [reference, setReference] = useState<any>(null);
  const [mainVideo, setMainVideo] = useState<any>(null);
  const [galleryMedia, setGalleryMedia] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- LOGIQUE SEO (SANS LIBRAIRIE EXTERNE) ---
  useEffect(() => {
    if (reference) {
      const pageTitle = `${reference.title || "Projet"} | Portfolio Conceptify`;
      const pageDesc = `Découvrez les réalisations de Conceptify pour ${reference.title || "ce client"}. Agence de communication et développement au Maroc.`;
      
      // 1. Changer le titre de l'onglet
      document.title = pageTitle;
      
      // 2. Changer la description Google (meta description)
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", pageDesc);
      }
    }
    
    // Remettre le titre par défaut quand on quitte la page
    return () => {
      document.title = "Conceptify | Agence Digitale & IA au Maroc";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", "Chez CONCEPTIFY, nous propulsons les marques avec des solutions créatives et innovantes.");
      }
    };
  }, [reference]); // S'exécute dès que "reference" est chargé
  // --------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const refRes = await api.get('/reference');
        const allReferences = refRes.data?.data || refRes.data || [];

        const projRes = await api.get('/project');
        const allProjects = projRes.data?.data || projRes.data || [];

        if (allReferences.length > 0) {
          const currentRef = allReferences.find((r: any) => String(r.id) === String(id));
          setReference(currentRef);

          const clientProjects = allProjects.filter(
            (p: any) => String(p.reference_id) === String(id)
          );

          const firstVideo = clientProjects.find((p: any) => p.type === 'video' || (p.link && String(p.link).includes('.mp4')));
          setMainVideo(firstVideo || null);

          const remainingMedia = clientProjects.filter((p: any) => {
            if (firstVideo && p.id === firstVideo.id) return false;
            return true;
          });
          remainingMedia.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          setGalleryMedia(remainingMedia);

        } else {
          const staticProject = projectsData.find(p => String(p.id) === String(id));

          if (staticProject) {
            setReference({
              id: staticProject.id,
              title: staticProject.client,
              portfolio: { title: staticProject.category },
              instagram: null,
              website: staticProject.website || null,
            });

            const firstVideo = staticProject.gallery.find(g => g.type === "video");
            setMainVideo(firstVideo ? { id: 0, link: firstVideo.url, type: "video" } : null);

            const remaining = staticProject.gallery
              .filter(g => g !== firstVideo)
              .map((g, i) => ({ id: i + 1, link: g.url, type: g.type }));
            setGalleryMedia(remaining);
          }
        }

      } catch (error) {
        const staticProject = projectsData.find(p => String(p.id) === String(id));

        if (staticProject) {
          setReference({
            id: staticProject.id,
            title: staticProject.client,
            portfolio: { title: staticProject.category },
            instagram: null,
            website: staticProject.website || null,
          });

          const firstVideo = staticProject.gallery.find(g => g.type === "video");
          setMainVideo(firstVideo ? { id: 0, link: firstVideo.url, type: "video" } : null);

          const remaining = staticProject.gallery
            .filter(g => g !== firstVideo)
            .map((g, i) => ({ id: i + 1, link: g.url, type: g.type }));
          setGalleryMedia(remaining);
        }
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
    <PageTransition className="pt-32 pb-20 min-h-screen container mx-auto px-4 md:px-6">
      <Link
        to="/portfolio"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 md:mb-12 transition-colors group text-sm md:text-base"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Retour au portfolio
      </Link>

      {/* EN-TÊTE DU CLIENT */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <h1 className="text-3xl md:text-7xl font-bold mb-4 md:mb-6 font-display tracking-tight text-white uppercase break-words">
            {reference.title || "Projet"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 backdrop-blur-md text-xs md:text-sm font-medium border border-white/10 text-white">
              {reference.portfolio?.title || "Référence"}
            </span>
            <div className="flex gap-2">
              {reference.instagram && reference.instagram !== "null" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(reference.instagram.startsWith('http') ? reference.instagram : `https://instagram.com/${reference.instagram.replace('@', '')}`, '_blank')}
                  className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6f42c1] border border-white/10 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </motion.button>
              )}
              {reference.website && reference.website !== "null" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(reference.website.startsWith('http') ? reference.website : `https://${reference.website}`, '_blank')}
                  className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0dcaf0] border border-white/10 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ZONE GRANDE VIDÉO (La première vidéo prend toute la largeur) */}
      {mainVideo && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mb-10 md:mb-16 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
        >
          <video
            src={getMediaUrl(mainVideo.link)}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-h-[50vh] md:max-h-[75vh] object-cover"
          />
        </motion.div>
      )}

      {/* GALERIE */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {galleryMedia.map((item: any, i: number) => {
          const isVideo = item.type === 'video' || (item.link && String(item.link).includes('.mp4'));
          const url = getMediaUrl(item.link || item.image);

          return (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group rounded-xl md:rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 aspect-square md:aspect-[4/5]"
              onClick={() => setSelectedMedia(item)}
            >
              {isVideo ? (
                <video
                  src={url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={url}
                  alt={`${reference.title} Média ${i}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                {isVideo && (
                  <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm transition-opacity duration-300">
                    Lecture
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MESSAGE SI AUCUN MÉDIA */}
      {!mainVideo && galleryMedia.length === 0 && (
        <div className="text-center py-10 md:py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl md:rounded-3xl text-sm md:text-base">
          Aucun média n'a été trouvé pour ce client. Ajoutez des projets dans le Dashboard.
        </div>
      )}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12 cursor-zoom-out"
          >
            {selectedMedia.type === 'video' || (selectedMedia.link && String(selectedMedia.link).includes('.mp4')) ? (
              <motion.video
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={getMediaUrl(selectedMedia.link || selectedMedia.image)}
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={getMediaUrl(selectedMedia.link || selectedMedia.image)}
                alt="En plein écran"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors z-50"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Library;