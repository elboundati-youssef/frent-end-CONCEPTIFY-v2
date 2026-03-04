// --- FICHIER: src/components/Footer.tsx ---
import React from "react";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  return (
    <footer className="relative bg-surface pt-16 md:pt-32 pb-10 border-t border-white/5" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-32">
          
          <ScrollReveal>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
              Prêt à créer<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8]">
                l'exception ?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-md">
              Discutons de votre prochain projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
            </p>

            {/* BLOC OPTIMISÉ : Le style est défini ICI une seule fois */}
            <div className="space-y-8 text-lg md:text-xl font-display font-medium text-white">
              
              {/* ADRESSE */}
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-sans font-normal">Visitez-nous</p>
                <p className="leading-relaxed">
                  Sat village, en face station Ifriqia,<br />
                  Immeuble Roua N° 2<br />
                  <span className="text-gray-400">Tanger, Maroc</span>
                </p>
              </div>

              {/* TÉLÉPHONE */}
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-sans font-normal">Appelez-nous</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+212539324232" className="hover:text-[#0dcaf0] transition-colors">
                    <span className="text-gray-500 text-base">Fixe:</span> +212 539 32 42 32
                  </a>
                  <a href="tel:+212654179010" className="hover:text-[#0dcaf0] transition-colors">
                    <span className="text-gray-500 text-base">Mobile:</span> +212 654 17 90 10
                  </a>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-sans font-normal">Écrivez-nous</p>
                <div className="flex flex-col gap-1">
                  <a href="mailto:contact@conceptify.pro" className="hover:text-[#0dcaf0] transition-colors break-all">
                    contact@conceptify.pro
                  </a>
                  <a href="mailto:salaheddineous@gmail.com" className="hover:text-[#0dcaf0] transition-colors break-all">
                    salaheddineous@gmail.com
                  </a>
                </div>
              </div>

            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-bg p-6 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <ContactForm />
            </div>
          </ScrollReveal>

        </div>

        {/* BOTTOM FOOTER OPTIMISÉ */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
            <img src="/img/Conceptify_logo-01.png" alt="Conceptify Logo" className="h-8 md:h-10 w-auto object-contain" />
            
            <div className="flex gap-6 text-gray-400">
              <a href="https://www.instagram.com/conceptify.pro/" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/conceptify-pro/" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
            
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Conceptify. Tous droits réservés.
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};

export default Footer;