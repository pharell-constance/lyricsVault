import { useState } from 'react';
import { Lock, Mail, User, Music } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5001/api/auth/register', { pseudo, email, password });
      alert('✨ Compte créé avec succès ! Bienvenue dans LyricsVault ❄️');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl">
              <Music className="text-cyan-600" size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-cyan-900 mb-2">LyricsVault</h1>
          <p className="text-cyan-700 font-semibold">Crée ton compte ❄️</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-cyan-100 animate-slideUp">
          <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">S'inscrire</h2>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-semibold text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Pseudo Input */}
            <div>
              <label className="block text-sm font-bold text-cyan-700 mb-2">Nom d'artiste</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-cyan-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Ton pseudo" 
                  required
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  className="w-full bg-cyan-50 border-2 border-cyan-200 rounded-xl py-3 pl-12 pr-4 text-cyan-900 placeholder-cyan-400 focus:outline-none focus:border-cyan-500 transition font-semibold"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-cyan-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-cyan-500" size={20} />
                <input 
                  type="email" 
                  placeholder="ton@email.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cyan-50 border-2 border-cyan-200 rounded-xl py-3 pl-12 pr-4 text-cyan-900 placeholder-cyan-400 focus:outline-none focus:border-cyan-500 transition font-semibold"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-cyan-700 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-cyan-500" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cyan-50 border-2 border-cyan-200 rounded-xl py-3 pl-12 pr-4 text-cyan-900 placeholder-cyan-400 focus:outline-none focus:border-cyan-500 transition font-semibold"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-bold py-4 rounded-xl hover:from-cyan-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-8 shadow-lg"
            >
              {isLoading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center border-t-2 border-cyan-100 pt-6">
            <p className="text-cyan-700 text-sm mb-3">
              Tu as déjà un compte ?
            </p>
            <Link 
              to="/login" 
              className="inline-block px-6 py-2 bg-cyan-100 text-cyan-700 font-bold rounded-full hover:bg-cyan-200 transition"
            >
              Se connecter
            </Link>
          </div>
        </div>

        {/* Demo Info */}
        <p className="text-center text-cyan-700 text-xs mt-8 font-semibold">
          🎵 Rejoins la communauté des auteurs-compositeurs
        </p>
      </div>
    </div>
  );
};

export default Register;