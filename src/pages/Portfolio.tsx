import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Magnetic from "../components/Magnetic";
import ProjectCard from "../components/ProjectCard";
import api from "../api/axios";
import { projectsData, secteursData } from "../data";

const Portfolio = () => {
  const location = useLocation(); 
  const initialFilter = location.state?.filter || "Tous";

  const [references, setReferences] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  // -----------------------------------------------------------

  // --- LOGIQUE SEO POUR LA PAGE PORTFOLIO ---
  useEffect(() => {
    document.title = "Notre Portfolio | Conceptify Agence Digitale";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content", 
        "Découvrez les réalisations de Conceptify. Création de sites web, applications mobiles, identité visuelle et projets d'Intelligence Artificielle au Maroc."
      );
    }
    
    return () => {
      document.title = "Conceptify | Agence Digitale & IA au Maroc";
      const defaultMeta = document.querySelector('meta[name="description"]');
      if (defaultMeta) {
        defaultMeta.setAttribute(
          "content", 
          "Chez CONCEPTIFY, nous propulsons les marques avec des solutions créatives et innovantes."
        );
      }
    };
  }, []);
  // ------------------------------------------

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [refRes, portRes] = await Promise.all([
          api.get('/reference'),
          api.get('/portfolio')
        ]);

        const refData = refRes.data?.data || refRes.data || [];
        const portData = portRes.data?.data || portRes.data || [];

        if (refData.length > 0) {
          setReferences(refData);
        } else {
          setReferences(projectsData.map(p => ({
            id: p.id,
            title: p.client,
            url: p.img,
            logo: null,
            instagram: null,
            website: p.website || null,
            portfolio: { title: p.category },
            type: "image",
          })));
        }

        if (portData.length > 0) {
          setPortfolios(portData);
        } else {
          // MODIFICATION MINEURE ICI : Ajout de s.desc pour garder la description en mémoire
          setPortfolios(secteursData.map(s => ({ id: s.id, title: s.title, desc: s.desc, description: s.desc })));
        }

      } catch (error) {
        setReferences(projectsData.map(p => ({
          id: p.id,
          title: p.client,
          url: p.img,
          logo: p.logo || null,
          instagram: p.instagram || null,
          website: p.website || null,
          portfolio: { title: p.category },
          type: "image",
        })));
        // MODIFICATION MINEURE ICI : Ajout de s.desc pour le catch aussi
        setPortfolios(secteursData.map(s => ({ id: s.id, title: s.title, desc: s.desc, description: s.desc })));
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const categories = ["Tous", ...portfolios.map(p => p.title.toUpperCase())];

  const filteredProjects = activeFilter === "Tous"
    ? references
    : references.filter((ref) =>
        ref.portfolio?.title?.toUpperCase() === activeFilter ||
        ref.portfolio_id?.toString() === portfolios.find(p => p.title.toUpperCase() === activeFilter)?.id.toString()
      );

  // NOUVEAUTÉ : On cherche la description du portfolio actif
  const activePortfolioData = portfolios.find(p => p.title.toUpperCase() === activeFilter);
  const activeDesc = activePortfolioData?.description || activePortfolioData?.desc;

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Retour à l'accueil
      </Link>

      <div className="mb-16">
       {/* Titre réduit : text-3xl sur mobile au lieu de 5xl */}
        <h1 className="text-3xl md:text-7xl font-bold mb-4 md:mb-6 font-display tracking-tight">
          Notre Portfolio
        </h1>
        <div className="w-12 md:w-20 h-1 bg-accent mb-8 md:mb-12" />

        {/* Gap réduit de gap-3 à gap-2 pour gagner de l'espace */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <Magnetic key={cat} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8] rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500" />
              <button
                onClick={() => setActiveFilter(cat)}
               
                className={`relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                  activeFilter === cat
                    ? "bg-white text-black border-white"
                    : "bg-surface text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            </Magnetic>
          ))}
        </div>

        {/* NOUVEAUTÉ : Affichage de la description avec une belle animation */}
        <AnimatePresence mode="wait">
          {activeFilter !== "Tous" && activeDesc && (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-8 max-w-4xl overflow-hidden"
            >
              <p className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line border-l-2 border-[#4DA8C8] pl-4">
                {activeDesc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#0dcaf0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((ref) => (
              <ProjectCard key={ref.id} project={ref} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isLoading && filteredProjects.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Aucun projet trouvé dans cette catégorie.
        </div>
      )}
    </PageTransition>
  );
};

export default Portfolio;