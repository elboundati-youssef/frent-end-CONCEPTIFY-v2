import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Magnetic from "../components/Magnetic";
import ProjectCard from "../components/ProjectCard";
import api from "../api/axios";

const Portfolio = () => {
  const [references, setReferences] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [refRes, portRes] = await Promise.all([
          api.get('/reference'),
          api.get('/portfolio')
        ]);
        
        // Extraction sécurisée des données
        setReferences(refRes.data?.data || refRes.data || []);
        setPortfolios(portRes.data?.data || portRes.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement du portfolio", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Génération dynamique des catégories à partir de la base de données
  const categories = ["Tous", ...portfolios.map(p => p.title.toUpperCase())];

  // Filtrage intelligent
  const filteredProjects = activeFilter === "Tous"
    ? references
    : references.filter((ref) => 
        ref.portfolio?.title?.toUpperCase() === activeFilter || 
        ref.portfolio_id?.toString() === portfolios.find(p => p.title.toUpperCase() === activeFilter)?.id.toString()
      );

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
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tight">
          Notre Portfolio
        </h1>
        <div className="w-20 h-1 bg-accent mb-12" />

        {/* Filters Dynamiques */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Magnetic key={cat} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0] rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500" />
              <button
                onClick={() => setActiveFilter(cat)}
                className={`relative px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
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
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#0dcaf0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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