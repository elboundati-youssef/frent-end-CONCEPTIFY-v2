// --- FICHIER: src/pages/ServiceDetail.tsx ---
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { servicesData } from "../data";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === id);

  // --- LOGIQUE SEO DYNAMIQUE POUR LA PAGE SERVICE ---
  useEffect(() => {
    if (service) {
      // 1. Titre dynamique basé sur le nom du service
      document.title = `${service.title} | Conceptify Agence Digitale`;
      
      // 2. Description dynamique basée sur la description du service
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        // On coupe la description si elle est trop longue pour Google (max ~160 caractères)
        const cleanDesc = service.descdetail.substring(0, 155) + "...";
        metaDescription.setAttribute("content", cleanDesc);
      }
    }

    // 3. Nettoyage au moment de quitter la page
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
  }, [service]);
  // ------------------------------------------------

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Service introuvable</h1>
      </div>
    );
  }

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen container mx-auto px-4 md:px-6">
      <Link
        to="/#domaines-expertise"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Retour aux services
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 font-display tracking-tight">
            {service.title}
          </h1>
          <div className="w-20 h-1 bg-accent mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed whitespace-pre-line">
  <span className="hidden md:inline">{service.descdetail}</span>
  <span className="md:hidden">{service.descdetailMobile}</span>
</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full aspect-video rounded-3xl overflow-hidden mb-16"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Notre Méthodologie</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
  <span className="hidden md:inline">Nous abordons chaque projet avec une approche stratégique et créative. <br/>Notre objectif est de comprendre en profondeur vos besoins pour proposer <br/>des solutions sur-mesure qui font la différence.</span>
  <span className="md:hidden">Nous abordons chaque projet avec une approche stratégique et créative. <br/>Notre objectif est de comprendre en profondeur vos besoins pour proposer des solutions<br/> sur-mesure qui font la différence.</span>
</p>
<p className="text-gray-400 leading-relaxed">
  <span className="hidden md:inline">De la conception à l'exécution, notre équipe d'experts vous accompagne <br/>à chaque étape pour garantir le succès de votre initiative.</span>
  <span className="md:hidden">De la conception à l'exécution, notre équipe d'experts vous accompagne à chaque étape <br/>pour garantir le succès de votre initiative.</span>
</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Pourquoi nous choisir ?</h2>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
  <span className="text-[#0dcaf0] font-bold mt-1">✓</span>
  <span>
    <span className="hidden md:inline">Une expertise reconnue dans le domaine avec des résultats prouvés.</span>
    <span className="md:hidden">Une expertise reconnue dans le domaine <br/>avec des résultats prouvés.</span>
  </span>
</li>
<li className="flex items-start gap-3">
  <span className="text-[#0dcaf0] font-bold mt-1">✓</span>
  <span>
    <span className="hidden md:inline">Une approche personnalisée et centrée sur vos objectifs spécifiques.</span>
    <span className="md:hidden">Une approche personnalisée et centrée <br/>sur vos objectifs spécifiques.</span>
  </span>
</li>
<li className="flex items-start gap-3">
  <span className="text-[#0dcaf0] font-bold mt-1">✓</span>
  <span>
    <span className="hidden md:inline">Une équipe passionnée, créative et toujours à l'affût des dernières tendances.</span>
    <span className="md:hidden">Une équipe passionnée, créative et toujours <br/>à l'affût des dernières tendances.</span>
  </span>
</li>
          </ul>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ServiceDetail;