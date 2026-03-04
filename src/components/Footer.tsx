import React from "react";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-16 md:pt-32 pb-10 border-t border-white/5 overflow-hidden" id="contact">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-32">
          
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
              Prêt à créer<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]">
                l'exception ?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
              Discutons de votre prochain projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
            </p>

            {/* BLOC DES COORDONNÉES */}
            <div className="flex flex-col space-y-10">
              
              {/* LIGNE 1 : ADRESSE (Prend toute la largeur) */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-sans font-bold">Visitez-nous</p>
                <p className="text-lg md:text-xl font-display font-medium text-white leading-relaxed">
                  Sat village, en face station Ifriqia,<br />
                  Immeuble Roua N° 2<br />
                  <span className="text-gray-400">Tanger, Maroc</span>
                </p>
              </div>

              {/* LIGNE 2 : TÉLÉPHONE ET EMAIL (Côte à côte sur la même ligne) */}
              <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
                
                {/* TÉLÉPHONE */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-sans font-bold">Appelez-nous</p>
                  <div className="flex flex-col space-y-2">
                    <a href="tel:+212539324232" className="text-lg md:text-xl font-display font-medium text-white hover:text-[#4DA8C8] transition-colors">
                      <span className="text-gray-500 text-base mr-2 font-normal">Fixe:</span> +212 539 32 42 32
                    </a>
                    <a href="tel:+212654179010" className="text-lg md:text-xl font-display font-medium text-white hover:text-[#4DA8C8] transition-colors">
                      <span className="text-gray-500 text-base mr-2 font-normal">Mobile:</span> +212 654 17 90 10
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-sans font-bold">Écrivez-nous</p>
                  <div className="flex flex-col space-y-2">
                    <a href="mailto:contact@conceptify.pro" className="text-lg md:text-xl font-display font-medium text-white hover:text-[#8E2A8B] transition-colors">
                      contact@conceptify.pro
                    </a>
                    <a href="mailto:salaheddineous@gmail.com" className="text-lg md:text-xl font-display font-medium text-white hover:text-[#8E2A8B] transition-colors">
                      salaheddineous@gmail.com
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </ScrollReveal>

          {/* FORMULAIRE DE CONTACT (Colonne droite) */}
          <ScrollReveal delay={0.2}>
            <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
              <ContactForm />
            </div>
          </ScrollReveal>

        </div>

        {/* LIGNE DU BAS (BOTTOM FOOTER) */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
            <img src="/img/Conceptify_logo-01.png" alt="Conceptify Logo" className="h-8 md:h-10 w-auto object-contain" />
            
            <div className="flex gap-6 text-sm font-medium tracking-wide text-gray-400 uppercase">
              <a href="https://www.instagram.com/conceptify.pro/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/conceptify-pro/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
            
            <div className="text-xs text-gray-600 font-medium">
              © {new Date().getFullYear()} Conceptify. Tous droits réservés.
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};

export default Footer;