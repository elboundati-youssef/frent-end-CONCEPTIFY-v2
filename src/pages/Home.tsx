import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Magnetic from "../components/Magnetic";
import ScrollIndicator from "../components/ScrollIndicator";
import InfiniteMarquee from "../components/InfiniteMarquee";
import AnimatedCounter from "../components/AnimatedCounter";
import MarqueeLogos from "../components/MarqueeLogos";
import ProjectCard from "../components/ProjectCard";
import BentoCard from "../components/BentoCard";
import ScrollReveal from "../components/ScrollReveal";
import { projectsData, servicesData } from "../data";
import api from "../api/axios"; // Importation de l'API
import WhyChooseUs from "../components/WhyChooseUs";

// --- Helper pour les images ---
const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `http://localhost:8000/api/private-image/${path}`;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(111,66,193,0.15),_rgba(5,5,5,1)_60%)]" />
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#4DA8C8]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
        >
          Chez CONCEPTIFY,
          <br />
          nous créons{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]">
            l'exception.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light"
        >
          Bien plus qu'une agence, nous réinventons la connexion entre les
          marques et leur public.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8] rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
            <a
              href="/portfolio"
              className="relative inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 bg-surface rounded-full hover:bg-surface-hover border border-white/10 hover:border-white/20 overflow-hidden"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <span className="relative flex items-center gap-2">
                Découvrir nos projets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

const About = () => {
  const stats = [
    { num: 6, label: "Années d'expérience", isK: false },
    { num: 45, label: "Clients uniques", isK: false },
    { num: 1000, label: "Projets terminés", isK: true },
  ];

  return (
    <div className="bg-surface relative z-10">
      <section className="py-16 md:py-32" id="about">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                L'art de la
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]">
                  connexion.
                </span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Basée au Maroc depuis 2018, CONCEPTIFY est une agence créative
                indépendante qui repousse les limites de la communication
                traditionnelle. Nous concevons des stratégies sur-mesure et des
                expériences mémorables pour des marques ambitieuses. Notre ADN :
                Créativité, Innovation et Expertise.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="relative">
              <div className="aspect-square rounded-full overflow-hidden border border-white/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
                  alt="Notre équipe"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#4DA8C8]/20 rounded-full blur-3xl" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bandeau Statistiques Animé */}
      <section className="border-y border-white/10 bg-[#0a0a0a] py-10 md:py-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8E2A8B]/5 to-[#4DA8C8]/5" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={index}
                delay={index * 0.2}
                className="flex flex-col items-center justify-center flex-1 pt-8 md:pt-0 w-full"
              >
                <div className="text-6xl md:text-7xl font-black tracking-tighter flex items-baseline text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]">
                  <AnimatedCounter from={0} to={stat.num} isK={stat.isK} />
                  <span className="text-[#4DA8C8]">+</span>
                </div>
                <p className="text-xs text-gray-400 font-light uppercase tracking-[0.3em] mt-4 text-center">
                  {stat.label}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Section Statique comme demandé
const DomainesExpertise = () => {
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] relative z-10">
      <section
        id="domaines-expertise"
        className="min-h-screen relative container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col lg:flex-row"
      >
        {/* Colonne Gauche (Navigation Interactive) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-12 lg:pr-12 z-10">
          <div className="mb-8">
            <ScrollReveal>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">
                NOS SERVICES
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Domaines d'Expertise
              </h2>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-8">
            {servicesData.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveService(index)}
                >
                  {/* Desktop View */}
                  <h3
                    className={`hidden lg:block text-5xl xl:text-7xl font-black uppercase tracking-tighter transition-all duration-500
                      ${
                        activeService === index
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]"
                          : "text-transparent"
                      }`}
                    style={
                      activeService !== index
                        ? { WebkitTextStroke: "1px rgba(255,255,255,0.2)" }
                        : {}
                    }
                  >
                    {service.title}
                  </h3>

                  {/* Mobile View (Accordion style) */}
                  <div className="lg:hidden">
                    <h3
                      className={`text-4xl font-black uppercase tracking-tighter transition-all duration-500 mb-4
                        ${
                          activeService === index
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]"
                            : "text-transparent"
                        }`}
                      style={
                        activeService !== index
                          ? { WebkitTextStroke: "1px rgba(255,255,255,0.2)" }
                          : {}
                      }
                      onClick={() => setActiveService(index)}
                    >
                      {service.title}
                    </h3>
                    <AnimatePresence>
                      {activeService === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 mt-4">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                          </div>
                          <p className="text-gray-300 mb-6 text-lg">
                            {service.desc}
                          </p>
                          <button
                            onClick={() => navigate(`/service/${service.id}`)}
                            className="px-6 py-3 rounded-full border border-[#4DA8C8] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#4DA8C8] hover:text-black transition-colors mb-8"
                          >
                            Explorer
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Colonne Droite (Contenu Dynamique & Collant) - Hidden on Mobile */}
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <div className="sticky top-32 h-[70vh] w-full rounded-3xl overflow-hidden bg-[#111]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={servicesData[activeService].image}
                  alt={servicesData[activeService].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay & Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-2xl text-white font-light leading-relaxed mb-8 max-w-lg backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">
                      {servicesData[activeService].desc}
                    </p>

                    <Magnetic>
                      <button
                        onClick={() =>
                          navigate(`/service/${servicesData[activeService].id}`)
                        }
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-black/50 backdrop-blur-md rounded-full border border-[#4DA8C8] hover:bg-[#4DA8C8] hover:text-black overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm">
                          Explorer
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </Magnetic>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

// Section Dynamique (Connectée à la BDD via Portfolios)
const Expertise = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await api.get('/portfolio');
        const data = res.data?.data || res.data || [];
        
        // Formater les données de l'API pour qu'elles correspondent au composant BentoCard
        const formattedData = data.slice(0, 4).map((item: any, index: number) => {
          let className = "md:col-span-1 md:row-span-1";
          if (index === 0) className = "md:col-span-2 md:row-span-2";
          else if (index === 1) className = "md:col-span-2 md:row-span-1";

          return {
            id: item.id,
            title: item.title,
            image: getImageUrl(item.image),
            desc: item.description,
            className: className,
          };
        });

        setCategories(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des expertises", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpertise();
  }, []);

  return (
    <section
      className="py-16 md:py-32 relative z-10 bg-[#050505] overflow-hidden"
      id="expertises"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-20">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">
              NOS SECTEURS
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
              Domaines d'Intervention
            </h2>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-[#4DA8C8] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.id || idx} delay={idx * 0.15} className={cat.className}>
                <BentoCard
                  title={cat.title}
                  image={cat.image}
                  desc={cat.desc}
                  className="h-full w-full"
                  index={idx}
                />
              </ScrollReveal>
            ))}
            {categories.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                    Aucun secteur d'intervention disponible.
                </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// Section Dynamique (Connectée à la BDD via Références)
const PortfolioPreview = () => {
  const navigate = useNavigate();
  const [references, setReferences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const res = await api.get('/reference');
        const data = res.data?.data || res.data || [];
        // On récupère uniquement les 3 dernières références
        setReferences(data.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors de la récupération des références", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReferences();
  }, []);

  return (
    <section className="py-16 md:py-32 relative z-10 bg-bg" id="portfolio">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Nos Références
              </h2>
              <div className="w-20 h-1 bg-accent" />
            </div>
            <button
              onClick={() => navigate("/portfolio")}
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              Voir tout le portfolio <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-[#8E2A8B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
           {references.map((ref, index) => (
  <ScrollReveal key={ref.id} delay={index * 0.15}>
    <ProjectCard project={{
      id: ref.id,
      title: ref.title,
      // On passe les champs bruts, ProjectCard s'occupera du getImageUrl
      url: ref.url, 
      logo: ref.logo,
      instagram: ref.instagram,
      website: ref.website,
      portfolio: ref.portfolio?.title || "Référence",
      type: ref.url?.endsWith('mp4') ? "video" : "image"
    } as any} />
  </ScrollReveal>
))}
            {references.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                    Aucune référence disponible pour le moment.
                </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <PageTransition>
      <Hero />
      <InfiniteMarquee />
      <Expertise />
      <PortfolioPreview />
      <About />
      <WhyChooseUs />
      <DomainesExpertise />
      <ScrollReveal>
        <MarqueeLogos />
      </ScrollReveal>
    </PageTransition>
  );
};

export default Home;