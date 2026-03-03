import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/authService"; // Assurez-vous que le chemin est correct

const Login = () => {
  // États pour stocker les données du formulaire et le statut de la requête
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Fonction déclenchée lors de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // On réinitialise l'erreur à chaque tentative
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      // Si la connexion réussit, on redirige vers le dashboard
      navigate("/dashboard");
    } catch (err: any) {
      // Si Laravel renvoie une erreur (ex: 401 Identifiants invalides)
      setError(
        err.response?.data?.message || "Une erreur est survenue lors de la connexion."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6f42c1]/20 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0dcaf0]/20 rounded-full blur-3xl mix-blend-screen pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-display font-bold tracking-tighter inline-block mb-2">
            CONCEPTIFY<span className="text-[#0dcaf0]">.</span>
          </Link>
          <h1 className="text-2xl font-semibold mt-6">Espace Administration</h1>
          <p className="text-gray-400 mt-2 text-sm">Connectez-vous pour gérer votre contenu</p>
        </div>

        {/* Affichage du message d'erreur s'il y en a un */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] focus:ring-1 focus:ring-[#6f42c1] transition-all"
              placeholder="admin@conceptify.ma"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0dcaf0] focus:ring-1 focus:ring-[#0dcaf0] transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className={`w-full relative group overflow-hidden rounded-xl border px-4 py-3 font-medium transition-all ${
                isLoading 
                  ? "bg-white/5 border-white/5 text-gray-500 cursor-not-allowed" 
                  : "bg-white/10 border-white/10 hover:border-transparent text-white"
              }`}
            >
              {!isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              <span className="relative z-10 transition-colors">
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;