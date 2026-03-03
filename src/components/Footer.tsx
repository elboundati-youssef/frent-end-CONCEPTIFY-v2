// --- FICHIER: src/components/Footer.tsx ---
import React from "react";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  return (
    <footer
      className="relative bg-surface pt-16 md:pt-32 pb-10 border-t border-white/5"
      id="contact"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-32">
          <ScrollReveal>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
              Prêt à créer
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0]">
                l'exception ?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              Discutons de votre prochain projet et voyons comment nous pouvons
              vous aider à atteindre vos objectifs.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Appelez-nous
                </p>
                <a
                  href="tel:+212539324232"
                  className="text-2xl md:text-3xl font-display font-medium hover:text-accent transition-colors"
                >
                  Fixe: +212 539 32 42 32
                </a>
                <br />
                <br />
                <a
                  href="tel:+212654179010"
                  className="text-2xl md:text-3xl font-display font-medium hover:text-accent transition-colors"
                >
                 Mobile: +212 654 17 90 10
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Écrivez-nous
                </p>
                <a
                  href="mailto:contact@conceptify.pro"
                  className="text-2xl md:text-3xl font-display font-medium hover:text-accent transition-colors break-all"
                >
                  contact@conceptify.pro
                </a>
                <br />
                <br />
                 <a
                  href="mailto:salaheddineous@gmail.com"
                  className="text-2xl md:text-3xl font-display font-medium hover:text-accent transition-colors break-all"
                >
                  salaheddineous@gmail.com
                </a>
                
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-bg p-6 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10">
            <div className="text-2xl font-display font-bold tracking-tighter mb-4 md:mb-0">
              CONCEPTIFY.
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Behance
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
             
              <div className="text-sm text-gray-600">
                © {new Date().getFullYear()} Conceptify. Tous droits réservés.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
