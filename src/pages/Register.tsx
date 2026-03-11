import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Votre instance Axios configurée

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '' // Très important pour Laravel !
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Appel direct à votre route publique /api/register
      const res = await api.post('/register', formData);
      
      if (res.status === 201) {
        alert('🎉 Succès ! Le compte a été créé dans la base de données Hostinger.');
        navigate('/login'); // Redirection vers le login normal
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la création du compte.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Création Admin Secrète</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Nom</label>
            <input 
              type="text" name="name" required onChange={handleChange}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4DA8C8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Email</label>
            <input 
              type="email" name="email" required onChange={handleChange}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4DA8C8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Mot de passe</label>
            <input 
              type="password" name="password" required onChange={handleChange} minLength={8}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4DA8C8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Confirmer le mot de passe</label>
            <input 
              type="password" name="password_confirmation" required onChange={handleChange} minLength={8}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4DA8C8] transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8] text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Création en cours...' : 'Créer le compte'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;