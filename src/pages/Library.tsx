// --- FICHIER: src/pages/Library.tsx ---
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Instagram, Globe, X } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { projectsData, GalleryItem } from "../data";

const Library = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Projet introuvable</h1>
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tight">
            {project.client}
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md text-sm font-medium border border-white/10 text-white">
              {project.category}
            </span>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent border border-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent border border-white/10 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {project.gallery?.map((item: GalleryItem, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: (i % 3) * 0.1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
            onClick={() => item.type === "image" && setSelectedImage(item.url)}
          >
            {item.type === "image" ? (
              <>
                <img
                  src={item.url}
                  alt={`${project.client} ${i}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </>
            ) : (
              <video
                src={item.url}
                controls
                className="w-full h-auto object-cover"
              />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="En plein écran"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
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
