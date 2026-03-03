import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import api from "../api/axios";

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    // Données sans le captcha
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"), 
    };

    try {
      await api.post("/send-mail", data);
      
      setStatus("success");
      (e.target as HTMLFormElement).reset();

    } catch (error: any) {
      console.error("DÉTAILS DE L'ERREUR:", error.response);
      setStatus("error");
      
      if (error.response?.status === 422) {
          const errors = error.response.data.errors;
          if (errors) {
              setErrorMessage(Object.values(errors).flat().join(' '));
          } else {
              setErrorMessage(error.response.data.error || "Données invalides.");
          }
      } else {
          setErrorMessage(
            error.response?.data?.message || "Une erreur serveur est survenue. Veuillez réessayer plus tard."
          );
      }
    }
  };

  if (status === "success") {
    return (
      <div className="bg-surface border border-white/10 rounded-2xl p-8 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-[#0dcaf0] animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-white">Message envoyé !</h3>
        <p className="text-gray-400">
          Merci pour votre message. Notre équipe vous recontactera très prochainement.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#6f42c1] hover:text-[#0dcaf0] transition-colors text-sm font-medium mt-4 inline-block"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Nom complet</label>
        <input
          name="name"
          type="text"
          required
          disabled={status === "loading"}
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#6f42c1] transition-colors disabled:opacity-50"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          disabled={status === "loading"}
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#6f42c1] transition-colors disabled:opacity-50"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          disabled={status === "loading"}
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#6f42c1] transition-colors resize-none disabled:opacity-50"
          placeholder="Parlez-nous de votre projet..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            Envoyer le message
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;