import React from "react";
import { motion } from "motion/react";
import { Sparkles, Rocket, Award, Handshake } from "lucide-react";

const WhyChooseUs = () => {
  // Configuration des cartes avec vos couleurs personnalisées
  const values = [
    {
      icon: Sparkles,
      title: "Créativité audacieuse",
      desc: <>Nous brisons les conventions pour imaginer des solutions innovantes <br/>et originales.</>,
      descMobile:<>Nous brisons <br/>les conventions pour imaginer des solutions innovantes et originales.</>,
      color: "text-[#8E2A8B]", // Primary Purple
      glowColor: "bg-[#8E2A8B]",
      delay: 0.1
    },
    {
      icon: Rocket,
      title: "Innovation continue",
      desc: <>Toujours à la pointe, nous intégrons <br/>les dernières technologies pour un impact maximal.</>,
      descMobile: <>Toujours à la pointe, <br/>nous intégrons les dernières technologies pour un impact maximal.</>,
      color: "text-[#4DA8C8]", // Primary Blue
      glowColor: "bg-[#4DA8C8]",
      delay: 0.2
    },
    {
      icon: Award,
      title: "Excellence opérationnelle",
      desc: <>Un service irréprochable où chaque détail est soigné pour garantir votre satisfaction.</>,
      descMobile: <>Un service irréprochable <br/>où chaque détail est soigné pour garantir <br/>votre satisfaction.</>,
      color: "text-[#8E2A8B]", // Primary Purple
      glowColor: "bg-[#8E2A8B]",
      delay: 0.3
    },
    {
      icon: Handshake,
      title: "Engagement client",
      desc: <>Des partenariats basés sur la confiance,<br/> le respect et le succès partagé.</>,
      descMobile: <>Des partenariats basés <br/>sur la confiance, le respect et le succès partagé.</>,
      color: "text-[#4DA8C8]", // Primary Blue
      glowColor: "bg-[#4DA8C8]",
      delay: 0.4
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#050505]">
      {/* Lumières d'ambiance en arrière-plan (Vos couleurs) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#8E2A8B]/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#4DA8C8]/10 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" />

      {/* Conteneur principal élargi (max-w-screen-2xl) pour laisser de la place aux 4 cartes */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-screen-2xl">
        
        {/* ========================================== */}
        {/* PARTIE 1 : POURQUOI NOUS CHOISIR ?         */}
        {/* ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6 justify-center">
            <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]"></div>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#4DA8C8]">
              Pourquoi Nous Choisir ?
            </h2>
            <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-[#4DA8C8] to-[#8E2A8B]"></div>
          </div>
          
          <h3 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 md:mb-8 text-white">
            Bien plus qu'une <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]">
              simple agence.
            </span>
          </h3>
          
         <p className="text-base md:text-xl text-gray-400 leading-relaxed px-2">
  <span className="hidden md:inline">
    En choisissant <span className="text-white font-semibold">CONCEPTIFY</span>, vous optez pour un partenaire stratégique qui comprend <br/>vos défis, partage votre vision et s'engage à faire la différence. <br/>Nos compétences en création de contenu, gestion événementielle, stratégies <br/>de communication et accompagnement professionnel sont à votre disposition <br/> pour vous aider à atteindre et dépasser vos objectifs.
  </span>
  <span className="md:hidden">
    En choisissant <span className="text-white font-semibold">CONCEPTIFY</span>,<br/> vous optez pour un partenaire stratégique <br/>qui comprend vos défis, partage votre vision et s'engage à faire la différence.<br/> Nos compétences en création de contenu, gestion événementielle, stratégies <br/>de communication et accompagnement professionnel sont à votre disposition<br/> pour vous aider à atteindre et dépasser<br/> vos objectifs.
  </span>
</p>
        </motion.div>

        {/* ========================================== */}
        {/* PARTIE 2 : NOS VALEURS & CARTES            */}
        {/* ========================================== */}
        <div className="pt-12 md:pt-16 border-t border-white/10 relative">
          {/* Ligne lumineuse au-dessus du titre */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#4DA8C8] to-transparent opacity-50"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <h4 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 md:mb-4">Nos Valeurs</h4>
            <p className="text-gray-400 text-sm md:text-lg">Le fondement de notre excellence.</p>
          </motion.div>

          {/* GRILLE DE CARTES (2 colonnes sur mobile, 4 sur ordinateur) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {values.map((valeur, index) => {
              const Icon = valeur.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: valeur.delay, ease: "easeOut" }}
                  // PADDING RÉDUIT SUR MOBILE (p-4 au lieu de p-8)
                  className="group relative p-4 md:p-8 rounded-2xl md:rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col h-full"
                >
                  {/* Ligne de couleur animée en haut de la carte */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100"></div>
                  
                  {/* Halo lumineux interne (Glow) qui apparaît au survol */}
                  <div className={`absolute -top-10 -right-10 w-32 md:w-48 h-32 md:h-48 rounded-full blur-[60px] md:blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${valeur.glowColor}`} />

                  {/* Conteneur de l'icône (Plus petit sur mobile) */}
                  <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${valeur.color}`} />
                  </div>

                  {/* Textes (Plus petits sur mobile pour tenir sur 2 colonnes) */}
                  <div className="relative z-10 flex-1">
                    <h5 className="text-sm md:text-xl font-display font-semibold text-white mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300 leading-tight">
                      {valeur.title}
                    </h5>
                   <p className="text-[10px] md:text-sm leading-snug md:leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
  <span className="hidden md:inline">{valeur.desc}</span>
  <span className="md:hidden">{valeur.descMobile}</span>
</p>
                  </div>

                  {/* Numéro de fond discret (Watermark ajusté pour mobile) */}
                  <div className="absolute -bottom-2 md:-bottom-4 -right-1 text-[50px] md:text-[80px] font-display font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 select-none pointer-events-none">
                    0{index + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;