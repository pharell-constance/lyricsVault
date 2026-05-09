import React, { useState } from 'react';
import { Mic2, Lock, Mail } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Connexion réussie ! Bienvenue au studio.');
      // On redirigera vers le dashboard plus tard
    } catch (err) {
      alert('Erreur : Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vault-black px-4">
      <div className="max-w-md w-full bg-vault-dark border border-vault-gray p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-10">
          <Mic2 className="mx-auto text-white mb-4 opacity-50" size={40} />
          <h2 className="text-2xl font-extralight tracking-[0.3em] uppercase text-white">Connexion</h2>
          <p className="text-vault-soft text-sm mt-2">Entrez dans votre coffre-fort musical.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-vault-soft" size={18} />
            <input 
              type="email" 
              placeholder="Email"
              className="w-full bg-vault-black border border-vault-gray rounded-xl py-3 px-10 focus:outline-none focus:border-white transition-colors"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-vault-soft" size={18} />
            <input 
              type="password" 
              placeholder="Mot de passe"
              className="w-full bg-vault-black border border-vault-gray rounded-xl py-3 px-10 focus:outline-none focus:border-white transition-colors"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-vault-soft transition-all uppercase tracking-widest text-xs">
            Ouvrir le coffre
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;