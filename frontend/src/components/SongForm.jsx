import { useState } from 'react';
import { Loader } from 'lucide-react';

const SongForm = ({ initialData = null, onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [lyrics, setLyrics] = useState(initialData?.lyrics || '');
  const [status, setStatus] = useState(initialData?.status || 'Brouillon');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }

    if (!lyrics.trim()) {
      setError('Les paroles sont obligatoires');
      return;
    }

    try {
      await onSubmit({ title, lyrics, status });
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 rounded-lg p-4">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest text-cyan-700 mb-3">
          Titre de la chanson
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Midnight Whispers..."
          className="w-full bg-white border-2 border-cyan-200 rounded-xl py-3 px-4 text-cyan-900 placeholder-cyan-400 focus:outline-none focus:border-cyan-500 transition font-semibold"
        />
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest text-cyan-700 mb-3">
          Paroles
        </label>
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Écris tes paroles ici... 🎵"
          rows="10"
          className="w-full bg-white border-2 border-cyan-200 rounded-xl py-3 px-4 text-cyan-900 placeholder-cyan-400 focus:outline-none focus:border-cyan-500 transition resize-none font-medium"
        />
        <p className="text-xs text-cyan-600 mt-2 font-semibold">{lyrics.length} caractères</p>
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest text-cyan-700 mb-3">
          Statut
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-white border-2 border-cyan-200 rounded-xl py-3 px-4 text-cyan-900 focus:outline-none focus:border-cyan-500 transition font-semibold"
        >
          <option value="Brouillon">📝 Brouillon</option>
          <option value="En cours">🎵 En cours</option>
          <option value="Terminé">✅ Terminée</option>
          <option value="Publiée">🎤 Publiée</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-bold py-3 rounded-xl hover:from-cyan-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md"
        >
          {isLoading && <Loader size={20} className="animate-spin" />}
          {initialData ? '💾 Mettre à jour' : '✨ Créer la chanson'}
        </button>
      </div>
    </form>
  );
};

export default SongForm;
