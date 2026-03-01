// --- FICHIER: src/pages/Portfolio.tsx ---
import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Magnetic from "../components/Magnetic";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const categories = [
    "Tous",
    "PROJETS SPÉCIAUX",
    "REAL ESTATE",
    "GROUPES SCOLAIRES",
    "SANTÉ ET BIEN-ÊTRE",
  ];

  const filteredProjects =
    activeFilter === "Tous"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <Link
        to="/#portfolio"
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

        {/* Filters */}
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

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Portfolio;
