import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import api from "../api/axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const ContactForm = () => {
  // On retire le statut "success" puisqu'on va recharger la page
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setErrorMessage("Veuillez cocher la case 'Je suis un humain'.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"), 
      "h-captcha-response": captchaToken, 
    };

    try {
      await api.post("/send-mail", data);
      
      // La ligne magique : on actualise la page directement !
      window.location.reload();

    } catch (error: any) {
      console.error("DÉTAILS DE L'ERREUR:", error.response);
      setStatus("error");
      
      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
      
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

  // On a supprimé le bloc if (status === "success") { ... }

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

      <div className="flex justify-center">
        <HCaptcha
          sitekey="9fc0f82e-09d0-4a6a-8914-34cc7d282800"
          onVerify={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken("")}
          ref={captchaRef}
          theme="dark" 
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !captchaToken} 
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