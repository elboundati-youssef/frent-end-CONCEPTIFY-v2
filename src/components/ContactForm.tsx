// --- FICHIER: src/components/ContactForm.tsx ---
import React from "react";
import { ArrowRight } from "lucide-react";

const ContactForm = () => {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Nom complet
        </label>
        <input
          type="text"
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Parlez-nous de votre projet..."
        />
      </div>
      <button className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
        Envoyer le message
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
};

export default ContactForm;
